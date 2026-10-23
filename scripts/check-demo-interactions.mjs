// Run against a production preview. Reuses the client's installed Playwright.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { client, clientSource } from './client-demo-source.mjs';
import { checkDemoSidebar } from './check-demo-sidebar.mjs';
import { clientLayoutPatches } from './client-demo-layout-patch.mjs';
import { clientLoadingPatches } from './client-demo-loading-patch.mjs';

const requireClient = createRequire(path.join(client, 'package.json'));
const { chromium } = requireClient('playwright');
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const browser = await chromium.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
});
const baseURL =
  process.argv.slice(2).find(arg => !arg.startsWith('--')) || 'http://127.0.0.1:5187/';
const evidence = mkdtempSync(path.join(tmpdir(), 'zhiyuan-demo-interactions-'));
const results = [];

try {
  const variants = process.argv.includes('--sidebar-only')
    ? []
    : [
        { name: 'desktop', width: 1440, deviceScaleFactor: 1, reducedMotion: 'no-preference' },
        { name: 'desktop-dpr2', width: 2048, deviceScaleFactor: 2, reducedMotion: 'no-preference' },
        { name: 'reduced-motion', width: 1440, deviceScaleFactor: 1, reducedMotion: 'reduce' },
      ];
  for (const variant of variants) {
    const context = await browser.newContext({
      viewport: { width: variant.width, height: 1080 },
      deviceScaleFactor: variant.deviceScaleFactor,
      reducedMotion: variant.reducedMotion,
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [];
    const diagnostics = [];
    page.on('pageerror', error => errors.push(error.stack));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
      if (message.text().startsWith('DemoBrowserDiagnostic ')) {
        diagnostics.push(JSON.parse(message.text().slice('DemoBrowserDiagnostic '.length)));
      }
    });
    // These browser-generated ErrorEvents have no Error object and do not
    // surface in Playwright's pageerror event. Record them independently.
    await page.addInitScript(() => {
      window.addEventListener('error', event => {
        console.log(
          'DemoBrowserDiagnostic ' +
            JSON.stringify({
              message: event.message,
              exception: Boolean(event.error),
            }),
        );
      });
    });
    const frame = page.frameLocator('#workbench iframe');
    const healthy = async () => {
      assert.equal(await page.locator('.demo-loading').count(), 0, 'Demo became unavailable');
      assert.deepEqual(errors, []);
    };
    // Physical input exercises animation/layout and pointer behavior that a
    // dispatchEvent click with reduced motion misses.
    const click = async control => {
      await control.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await page.waitForTimeout(350);
      const box = await control.boundingBox();
      assert.ok(box, 'Control has no layout box');
      const left = Math.max(0, box.x);
      const right = Math.min(variant.width, box.x + box.width);
      assert.ok(
        right > left && box.y >= 0 && box.y + box.height <= 1080,
        'Control is outside the viewport',
      );
      await page.mouse.move(left + Math.min(32, (right - left) / 2), box.y + box.height / 2);
      await page.waitForTimeout(150);
      await page.mouse.down();
      await page.mouse.up();
      await page.waitForTimeout(750);
      await healthy();
    };
    try {
      await page.goto(new URL('#workbench', baseURL).href);
      await page.locator('.demo-stage').scrollIntoViewIfNeeded();
      const provenance = await (
        await page.request.get(new URL('/client-demo/source.json', baseURL).href)
      ).json();
      assert.equal(
        provenance.revision,
        clientSource.revision,
        'Preview serves an outdated client bundle',
      );
      assert.equal(provenance.sourceTreeHasLocalChanges, false);
      assert.deepEqual(
        provenance.patches,
        [...clientLayoutPatches, ...clientLoadingPatches],
        'Preview renderer patches are stale',
      );
      const thinking = frame.getByRole('button', { name: /思考了 7 秒/ });
      await thinking.waitFor({ timeout: 25000 });
      assert.equal(await frame.getByRole('button', { name: /已完成.*思考/ }).count(), 0);
      assert.equal(await frame.locator('.theme-chat-tool-trigger').count(), 4);
      assert.ok(await frame.locator('.theme-chat-tool-summary').first().isVisible());
      await page.locator('.demo-window').evaluate(node => {
        window.scrollTo({
          top: window.scrollY + node.getBoundingClientRect().top - 90,
          behavior: 'instant',
        });
      });
      await checkDemoSidebar(page, frame, evidence, variant.name);
      await click(thinking);
      assert.equal(await thinking.getAttribute('aria-expanded'), 'true');
      await frame
        .getByText('读取季度销售表和周报，对比分区域营收、毛利率与预算执行情况，整理报告与建议。', {
          exact: true,
        })
        .waitFor();
      for (const [name, index] of [
        ['Read', 0],
        ['Read', 1],
        ['Bash', 0],
        ['Write', 0],
      ]) {
        const tool = frame.getByRole('button', { name: new RegExp(`${name}.*已完成`) }).nth(index);
        await click(tool);
        assert.equal(await tool.getAttribute('aria-expanded'), 'true');
      }
      await frame
        .getByText('已保存销售分析报告：output/Q3-sales-report.docx', { exact: true })
        .waitFor();
      await click(thinking);
      assert.equal(await thinking.getAttribute('aria-expanded'), 'false');
      await click(thinking);
      assert.equal(await thinking.getAttribute('aria-expanded'), 'true');
      await healthy();

      const embedded = page.frames().find(item => item.url().includes('/client-demo/'));
      assert.ok(embedded);
      // Both native notification messages must leave the already-running UI usable.
      await embedded.evaluate(() => {
        window.dispatchEvent(
          new ErrorEvent('error', {
            message: 'ResizeObserver loop completed with undelivered notifications.',
          }),
        );
        window.dispatchEvent(
          new ErrorEvent('error', { message: 'ResizeObserver loop limit exceeded' }),
        );
      });
      await page.waitForTimeout(250);
      await healthy();
      await page.screenshot({ path: path.join(evidence, `${variant.name}.png`) });

      if (variant.name === 'desktop') {
        await click(
          frame
            .locator('aside')
            .getByRole('treeitem', { name: /核对各区域预算执行表/ })
            .first(),
        );
        await click(frame.getByRole('button', { name: /思考了 7 秒/ }));
        await frame
          .getByText(
            '先按区域对齐预算与实际费用，再核对促销、库存和获客费用的归属，区分已确认事项与需要业务负责人补充凭证的事项。',
            { exact: true },
          )
          .waitFor();
        await click(frame.getByRole('button', { name: /Read.*regional_budget_q3.xlsx.*已完成/ }));
        await frame
          .getByText('已读取区域预算表，包含区域、预算科目、预算金额、实际费用和费用说明。', {
            exact: true,
          })
          .waitFor();
        assert.equal(
          await frame
            .getByText(
              '季度营收：4,826 万元；同比增长 9.8%。毛利率：31.2%；环比下降 1.4 个百分点。',
              { exact: true },
            )
            .count(),
          0,
        );
        await page.screenshot({ path: path.join(evidence, 'budget.png') });
        await frame.getByRole('textbox').fill('保留预算核对事项，按负责人整理。');
        await click(frame.getByRole('button', { name: 'Submit', exact: true }));
        await frame
          .locator('.is-assistant')
          .nth(1)
          .getByText(/第三季度区域预算核对清单/)
          .waitFor();
        await healthy();

        await click(frame.locator('aside').getByRole('button', { name: '编程', exact: true }));
        await frame
          .getByText('已编写 analyze_q3.py，使用 pandas 汇总区域营收并计算同比变化。', {
            exact: true,
          })
          .waitFor();
        await click(frame.getByRole('button', { name: /思考完成/ }));
        await click(frame.getByRole('button', { name: /Bash.*analyze_q3.py.*已完成/ }));
        await page.screenshot({ path: path.join(evidence, 'coding-sales.png') });
        await click(
          frame
            .locator('aside')
            .getByRole('treeitem', { name: /reconcile_budget.py/ })
            .first(),
        );
        await frame
          .getByText('已编写 reconcile_budget.py，按区域和费用科目核对预算执行。', { exact: true })
          .waitFor();
        await click(frame.getByRole('button', { name: /思考完成/ }));
        await click(frame.getByRole('button', { name: /Bash.*reconcile_budget.py.*已完成/ }));
        await frame
          .getByText('核对完成：已按区域汇总差异，将缺少费用说明和待补充凭证的条目列入跟进清单。', {
            exact: true,
          })
          .waitFor();
        await page.screenshot({ path: path.join(evidence, 'coding-budget.png') });
        for (const name of ['本地推理', '待办', '自动化', '活动', '专家']) {
          await click(frame.locator('aside').getByRole('button', { name, exact: true }).first());
        }
        await click(frame.getByRole('tab', { name: '技能', exact: true }));
        await page.screenshot({ path: path.join(evidence, 'skills.png') });
        assert.equal(await frame.getByText('（演示）', { exact: false }).count(), 0);
      }

      // Actual exceptions still reach the parent failure UI; retry must recover.
      await embedded.evaluate(() => {
        window.dispatchEvent(
          new ErrorEvent('error', {
            message: 'Controlled regression error',
            error: new Error('Controlled regression error'),
          }),
        );
      });
      await page.getByText('演示加载失败，请重试。', { exact: true }).waitFor();
      await page.getByRole('button', { name: '重新加载', exact: true }).click();
      await frame.getByRole('button', { name: /思考了 7 秒/ }).waitFor({ timeout: 25000 });
      await page.waitForTimeout(250);
      await healthy();
      results.push({ ...variant, diagnostics, passed: true });
      console.log(
        `PASS ${variant.name}: real pointer expansion, code details, notification handling, exception and retry`,
      );
    } catch (error) {
      await page
        .screenshot({ path: path.join(evidence, `${variant.name}-failure.png`) })
        .catch(() => {});
      results.push({ ...variant, diagnostics, errors, passed: false, error: String(error) });
      throw error;
    } finally {
      await context.close();
    }
  }
  // The same client layout must reserve its translated time label and retain
  // the theme's hover/focus affordances at the minimum embedded canvas size.
  for (const locale of ['zh-CN', 'en']) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      await page.goto(new URL(`/client-demo/index.html?locale=${locale}`, baseURL).href);
      await page.locator('.sidebar-session-row').first().waitFor();
      for (const dark of [false, true]) {
        await page.locator('html').evaluate((node, enabled) => {
          node.classList.toggle('dark', enabled);
          node.classList.toggle('light', !enabled);
          node.setAttribute('data-theme', enabled ? 'zenith-dark' : 'zenith-light');
        }, dark);
        const name = `sidebar-${locale}-${dark ? 'dark' : 'light'}`;
        const measurements = await checkDemoSidebar(page, page, evidence, name);
        assert.deepEqual(errors, []);
        results.push({ name, measurements, passed: true });
        console.log(`PASS ${name}: title, timestamp and actions retain separate slots`);
      }
    } finally {
      await context.close();
    }
  }
} finally {
  writeFileSync(path.join(evidence, 'results.json'), JSON.stringify(results, null, 2) + '\n');
  console.log(`Evidence: ${evidence}`);
  await browser.close();
}
