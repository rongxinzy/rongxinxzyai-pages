import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { client } from './client-demo-source.mjs';
import { DemoMessage } from '../src/live-demo/constants.ts';

const requireClient = createRequire(path.join(client, 'package.json'));
const { chromium } = requireClient('playwright');
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
    'C:/Users/Administrator/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
});
const evidence = mkdtempSync(path.join(tmpdir(), 'zhiyuan-demo-resilience-'));
const catalog = JSON.parse(readFileSync(path.join(client, 'public/quick-actions.json'), 'utf8'));
const translations = JSON.parse(
  readFileSync(path.join(client, 'public/quick-actions-i18n.json'), 'utf8'),
);
const results = [];
try {
  for (const english of [false, true]) {
    const locale = english ? 'en' : 'zh';
    const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
    const errors = [];
    const missing = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error' || /Translation missing/.test(message.text()))
        errors.push(message.text());
    });
    page.on('response', response => {
      if (response.status() >= 400)
        missing.push({ url: response.url(), status: response.status() });
    });
    const frame = page.frameLocator('#workbench iframe');
    try {
      // Hold the actual entry bundle past the former fatal deadline.
      let release;
      const gate = new Promise(resolve => {
        release = resolve;
      });
      await page.route('**/client-demo/client.js', async route => {
        await gate;
        await route.continue();
      });
      await page.goto(`http://127.0.0.1:5187/${english ? 'en/' : ''}#workbench`, {
        waitUntil: 'domcontentloaded',
      });
      await page.locator('.demo-stage').scrollIntoViewIfNeeded();
      await page
        .getByText(english ? 'Loading is taking longer. Still waiting.' : '加载较慢，仍在等待。', {
          exact: true,
        })
        .waitFor({ timeout: 30000 });
      assert.equal(await page.getByText(/演示加载失败|The demo could not load/).count(), 0);
      assert.equal(await page.locator('#workbench iframe').count(), 1);
      release();
      await frame
        .getByRole('button', { name: /思考了 7 秒|Thought for 7s/ })
        .waitFor({ timeout: 30000 });
      await page
        .getByRole('button', { name: english ? 'Reset demo' : '重置演示', exact: true })
        .and(page.locator(':enabled'))
        .waitFor();
      const embedded = page.frames().find(item => item.url().includes('/client-demo/'));
      // Simulate operational events without suppressing browser diagnostics.
      await embedded.evaluate(() => {
        window.dispatchEvent(
          new ErrorEvent('error', {
            message: 'Operational test',
            error: new Error('Operational test'),
          }),
        );
        window.dispatchEvent(
          new PromiseRejectionEvent('unhandledrejection', {
            promise: Promise.resolve(),
            reason: new Error('Operational test'),
          }),
        );
      });
      await page
        .getByText(
          english
            ? 'An operation could not finish. Continue or reset the demo.'
            : '部分操作未完成，可继续使用或重置演示。',
          { exact: true },
        )
        .waitFor();
      assert.equal(await page.locator('.demo-loading').count(), 0);
      await frame
        .locator('aside')
        .getByRole('button', { name: /^(自动化|Automation)$/ })
        .click();
      await frame.getByRole('button', { name: /任务操作|Task actions/ }).waitFor();
      await frame.getByTestId('sidebar-new-conversation').click();
      let checkedImages = 0;
      for (const action of catalog.actions) {
        await frame.getByTestId('sidebar-new-conversation').click();
        await frame
          .getByRole('button', { name: translations[locale][action.id].label, exact: true })
          .click();
        const images = frame.locator('.theme-page-case-gallery-card img');
        assert.equal(await images.count(), action.prompts.filter(prompt => prompt.preview).length);
        for (const img of await images.all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate(node => node.decode());
          assert.ok(
            await img.evaluate(node => node.complete && node.naturalWidth > 0),
            'Broken case preview',
          );
          checkedImages++;
        }
        await frame.locator('.theme-page-case-gallery-card').first().click();
        const dialog = frame.getByRole('dialog');
        await dialog.waitFor();
        for (const img of await dialog.locator('img').all())
          await img.evaluate(node => node.decode());
        await page.keyboard.press('Escape');
      }
      await page
        .locator('.demo-window')
        .screenshot({ path: path.join(evidence, `${locale}-cases.png`) });
      assert.deepEqual(errors, []);
      assert.deepEqual(missing, []);
      await embedded.evaluate(
        type => window.parent.postMessage({ type }, location.origin),
        DemoMessage.Error,
      );
      await page.getByText(/演示加载失败|The demo could not load/).waitFor();
      await page.getByRole('button', { name: english ? 'Retry' : '重新加载', exact: true }).click();
      await frame
        .getByRole('button', { name: /思考了 7 秒|Thought for 7s/ })
        .waitFor({ timeout: 30000 });
      results.push({ locale, checkedImages, errors, missing, passed: true });
      console.log(
        `PASS ${locale}: delayed boot recovery, nonfatal events, fatal retry, ${checkedImages} native case images and dialogs`,
      );
    } catch (error) {
      await page.screenshot({ path: path.join(evidence, `${locale}-failure.png`) }).catch(() => {});
      results.push({ locale, errors, missing, passed: false, error: String(error) });
      throw error;
    } finally {
      await page.close();
    }
  }
} finally {
  writeFileSync(path.join(evidence, 'results.json'), JSON.stringify(results, null, 2));
  console.log(`Evidence: ${evidence}`);
  await browser.close();
}
