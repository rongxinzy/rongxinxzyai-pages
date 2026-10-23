import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { client } from './client-demo-source.mjs';

const requireClient = createRequire(path.join(client, 'package.json'));
const { chromium } = requireClient('playwright');
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
    'C:/Users/Administrator/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
});
const evidence = mkdtempSync(path.join(tmpdir(), 'zhiyuan-demo-entry-'));
const results = [];
try {
  for (const variant of [
    { name: 'zh-desktop', locale: 'zh-CN', width: 1440, dpr: 1 },
    { name: 'en-dpr2', locale: 'en', width: 1440, dpr: 2 },
    { name: 'zh-mobile', locale: 'zh-CN', width: 390, dpr: 2 },
    { name: 'en-reduced', locale: 'en', width: 1440, dpr: 1, reduced: true },
  ]) {
    const english = variant.locale === 'en';
    const context = await browser.newContext({
      viewport: { width: variant.width, height: 1080 },
      deviceScaleFactor: variant.dpr,
      reducedMotion: variant.reduced ? 'reduce' : 'no-preference',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.addInitScript(() => {
      window.entryFrames = [];
      window.startupPhases = [];
      const observer = new MutationObserver(() => {
        for (const [name, selector] of [
          ['particle', '#root [role="status"] canvas'],
          ['static', '#root [role="status"] img'],
          ['skeleton', '#root [data-slot="skeleton"]'],
          ['logo', '#root .theme-logo-loading-mark'],
          ['home', '#root .theme-home-greeting'],
        ]) {
          if (document.querySelector(selector) && !window.startupPhases.includes(name))
            window.startupPhases.push(name);
        }
      });
      observer.observe(document, { childList: true, subtree: true });
      const record = () => {
        window.entryFrames.push(scrollY);
        if (window.entryFrames.length < 120) requestAnimationFrame(record);
      };
      requestAnimationFrame(record);
    });
    try {
      const url = `http://127.0.0.1:5187/${english ? 'en/' : ''}`;
      await page.goto(url);
      await page.locator('#hero-title').waitFor();
      await page.waitForTimeout(1200);
      assert.ok((await page.evaluate(() => window.entryFrames)).every(y => y === 0));
      await page
        .locator('#workbench')
        .evaluate(node => node.scrollIntoView({ behavior: 'instant' }));
      await page.reload();
      await page.locator('#hero-title').waitFor();
      await page.waitForTimeout(1500);
      const frames = await page.evaluate(() => window.entryFrames);
      assert.ok(
        frames.every(y => y === 0),
        'Reload restored the old demo scroll position',
      );
      assert.equal(await page.locator('#workbench nav, .demo-scene').count(), 0);
      assert.equal(await page.locator('#workbench iframe').count(), 0, 'Demo eagerly loaded');
      assert.equal(
        await page
          .getByRole('button', {
            name: /^(开始体验|Explore the workspace|全屏体验|Enter fullscreen)$/,
          })
          .count(),
        0,
      );
      await page.screenshot({ path: path.join(evidence, `${variant.name}-top.png`) });
      // User-initiated anchors remain available after initial positioning.
      await page.locator('a[href="#workbench"]').first().click();
      const frame = page.frameLocator('#workbench iframe');
      const boot = frame
        .locator(variant.reduced ? '[role="status"] img' : '[role="status"] canvas')
        .first();
      await boot.waitFor({ timeout: 20000 });
      await page.locator('.demo-loading').waitFor({ state: 'hidden' });
      await page
        .locator('.demo-stage')
        .screenshot({ path: path.join(evidence, `${variant.name}-boot.png`) });
      await frame.locator('aside').waitFor({ timeout: 25000 });
      await frame.getByRole('button', { name: /思考了 7 秒|Thought for 7s/ }).waitFor();
      const embedded = page.frames().find(item => item.url().includes('/client-demo/'));
      assert.ok(embedded);
      const phases = await embedded.evaluate(() => window.startupPhases);
      assert.ok(phases.includes(variant.reduced ? 'static' : 'particle'));
      assert.ok(phases.includes('skeleton'), 'Native session skeleton never appeared');
      assert.equal(phases.includes('logo'), false, 'A second logo loader appeared');
      assert.equal(phases.includes('home'), false, 'The empty home flashed before the session');
      if (variant.width >= 1280) {
        const description = await page.locator('.demo-description').evaluate(node => ({
          height: node.getBoundingClientRect().height,
          lineHeight: parseFloat(getComputedStyle(node).lineHeight),
        }));
        assert.ok(description.height <= description.lineHeight + 1, 'Desktop description wraps');
      }
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        'Outer page overflows',
      );
      await page
        .locator('.demo-window')
        .screenshot({ path: path.join(evidence, `${variant.name}-ready.png`) });
      if (variant.name === 'zh-desktop' || variant.name === 'en-dpr2') {
        const mode = frame.locator('aside').getByRole('switch').first();
        await mode.click();
        const sidebar = frame.locator('aside');
        await sidebar
          .getByRole('treeitem', { name: english ? /Choose a local model/ : /选择本地模型/ })
          .first()
          .click();
        await frame
          .getByText(english ? 'What should I compare first?' : '先比较哪些能力比较合适？', {
            exact: true,
          })
          .waitFor();
        await frame.getByRole('textbox').fill(english ? 'Make it concise.' : '再简洁一点。');
        await frame.getByRole('button', { name: 'Submit', exact: true }).click();
        await frame
          .getByText(
            english ? /Start with Qwen3 8B\. Compare summaries/ : /先试 Qwen3 8B，用同样的问题比较/,
          )
          .waitFor();
        await sidebar
          .getByRole('treeitem', { name: english ? /Polish a weekly update/ : /整理一段工作周报/ })
          .first()
          .click();
        await frame
          .getByText(english ? 'Make the next steps easier to scan.' : '把下周计划改成清单。', {
            exact: true,
          })
          .waitFor();
        assert.equal(
          await frame.getByRole('button', { name: /Bash.*已完成|Read.*Completed/ }).count(),
          0,
        );
        await page
          .locator('.demo-stage')
          .screenshot({ path: path.join(evidence, `${variant.name}-chat.png`) });
        await mode.click();
        await sidebar
          .getByRole('treeitem', {
            name: english ? /Write the Q3 sales analysis/ : /撰写第三季度销售分析报告/,
          })
          .first()
          .waitFor();
      }
      await page
        .getByRole('button', { name: english ? 'Reset demo' : '重置演示', exact: true })
        .click();
      await frame.locator('[role="status"]').first().waitFor();
      await frame.locator('aside').waitFor({ timeout: 25000 });
      assert.deepEqual(errors, []);
      results.push({ ...variant, initialFrames: frames, phases, errors, passed: true });
      console.log(
        `PASS ${variant.name}: first paint/reload, scroll autostart, particle-to-skeleton, removed controls, conversation fixtures`,
      );
    } catch (error) {
      await page
        .screenshot({ path: path.join(evidence, `${variant.name}-failure.png`) })
        .catch(() => {});
      results.push({ ...variant, errors, passed: false, error: String(error) });
      throw error;
    } finally {
      await context.close();
    }
  }
} finally {
  writeFileSync(path.join(evidence, 'results.json'), JSON.stringify(results, null, 2));
  console.log(`Evidence: ${evidence}`);
  await browser.close();
}
