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
const evidence = mkdtempSync(path.join(tmpdir(), 'zhiyuan-demo-model-lifecycle-'));
const results = [];
try {
  for (const english of [false, true]) {
    const locale = english ? 'en' : 'zh-CN';
    const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.stack));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    const frame = page.frameLocator('#workbench iframe');
    const healthy = async () => {
      assert.deepEqual(errors, [], 'Model operation crashed the client');
      assert.equal(await page.locator('.demo-loading').count(), 0, 'Host failure overlay appeared');
    };
    try {
      await page.goto(`http://127.0.0.1:5187/${english ? 'en/' : ''}#workbench`);
      await page.locator('.demo-stage').scrollIntoViewIfNeeded();
      await frame
        .getByRole('button', { name: /思考了 7 秒|Thought for 7s/ })
        .waitFor({ timeout: 30000 });
      await frame
        .locator('aside')
        .getByRole('button', { name: /^(本地推理|Edge Inference|Local Inference)$/ })
        .click();
      await frame.getByRole('tab', { name: /^(本地模型|Local Models)$/ }).click();
      const unload = frame.locator('[data-local-inference-unload-button]');
      await unload.waitFor();
      await unload.click();
      await page.waitForTimeout(1500);
      await healthy();
      if (process.argv.includes('--reproduce-model')) continue;
      const start = frame.locator('[data-local-inference-model-action-button]').first();
      for (let attempt = 0; attempt < 3; attempt++) {
        await start.click();
        await frame.getByRole('dialog').waitFor();
        await page.keyboard.press('Escape');
        await unload.waitFor();
        await healthy();
        if (attempt < 2) {
          await unload.click();
          await page.waitForTimeout(1500);
          await healthy();
        }
      }
      // Include the native five-second poll after several mutations.
      await page.waitForTimeout(5500);
      await healthy();
      const embedded = page.frames().find(item => item.url().includes('/client-demo/'));
      const state = await embedded.evaluate(async () => ({
        running: await window.electron.llamacpp.listRunningModels(),
        local: await window.electron.llamacpp.listLocalModels(),
      }));
      assert.equal(state.running.length, 1);
      assert.equal(state.running[0].name, state.local[0].name);
      assert.equal(state.local[0].status, 'loaded');

      await frame.getByRole('button', { name: 'visitor@zhiyuan.local', exact: true }).click();
      assert.equal(
        await frame.getByRole('menuitem', { name: /退出登录|Log Out|Sign Out/i }).count(),
        0,
      );
      await page.keyboard.press('Escape');
      // The native account menu closes on outside pointer input.
      await frame.getByRole('button', { name: 'visitor@zhiyuan.local', exact: true }).click();
      assert.equal(await frame.locator('.window-controls-floating').count(), 0);
      await frame.getByRole('button', { name: /^(本地模型设置|Local Settings)$/ }).click();
      assert.equal(
        await frame
          .getByRole('menuitem', { name: /^(运行环境|Runtime|访问|Access|模型库|Model Library)$/ })
          .count(),
        0,
      );
      await frame.getByRole('menuitem', { name: /统一内存|Memory Management/ }).click();
      await frame
        .getByRole('dialog')
        .getByRole('button', { name: /^(保存|Save)$/ })
        .click();
      await healthy();
      // Native model inspector, preference persistence and honest empty logs.
      await frame.locator('[data-local-inference-model-actions-button]').click();
      await frame.getByRole('menuitem', { name: /打开检查器|Open Inspector/ }).click();
      const inspector = frame.locator('aside[aria-hidden="false"]');
      await inspector.getByRole('combobox', { name: /保持活跃时间|Keep Alive Time/ }).click();
      await frame.getByRole('option', { name: /^(5 分钟|5 minutes)$/i }).click();
      await inspector.getByRole('button', { name: /^(保存|Save)$/ }).click();
      assert.equal(
        (await embedded.evaluate(() => window.electron.llamacpp.getModelPreferences()))['Qwen3-8B']
          .residency.idleMinutes,
        5,
      );
      const logs = inspector.getByRole('tab', { name: /执行日志|Execution Logs/ });
      // Let the outer site's smooth scrolling settle before pointer input.
      await logs.hover();
      await page.waitForTimeout(700);
      await logs.click();
      await inspector.getByText(/暂无模型日志|No model logs yet/).waitFor();
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      await healthy();
      // Deleting the only model must leave a usable empty state and marketplace.
      await unload.click();
      await page.waitForTimeout(1500);
      await frame.locator('[data-local-inference-model-actions-button]').click();
      await frame.locator('[data-local-inference-delete-button]').click();
      await frame
        .getByRole('dialog')
        .getByRole('button', { name: /^(删除|Delete)$/ })
        .click();
      await frame.locator('[data-local-inference-model-card-frame]').waitFor({ state: 'detached' });
      assert.deepEqual(
        await embedded.evaluate(() => window.electron.llamacpp.listLocalModels()),
        [],
      );
      await healthy();
      await frame.getByRole('tab', { name: /^(模型市场|Model Marketplace|Marketplace)$/ }).click();
      await frame
        .getByRole('button', { name: /^(安装|校验并安装|Install|Verify & install)$/ })
        .first()
        .click();
      await page.waitForTimeout(1500);
      await healthy();
      assert.equal(
        (await embedded.evaluate(() => window.electron.llamacpp.listLocalModels())).length,
        1,
      );
      await frame.getByRole('tab', { name: /^(本地模型|Local Models)$/ }).click();
      await start.click();
      await frame.getByRole('dialog').waitFor();
      await page.keyboard.press('Escape');
      await unload.waitFor();
      await healthy();
      await page.locator('.demo-window').screenshot({ path: path.join(evidence, `${locale}.png`) });
      results.push({ locale, errors, passed: true });
      console.log(
        `PASS ${locale}: model cycles, preferences, logs, delete/reinstall, bounded account/window/settings`,
      );
    } catch (error) {
      await page.screenshot({ path: path.join(evidence, `${locale}-failure.png`) }).catch(() => {});
      results.push({ locale, errors, passed: false, error: String(error) });
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
