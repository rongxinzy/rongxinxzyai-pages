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
const direct = process.env.DEMO_CLIENT_URL;
const origin = direct ? new URL(direct).origin : 'http://127.0.0.1:5187';
const evidence = mkdtempSync(path.join(tmpdir(), 'zhiyuan-demo-boundaries-'));
const results = [];
try {
  for (const english of [false, true]) {
    const locale = english ? 'en' : 'zh-CN';
    const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
    page.setDefaultTimeout(10000);
    const errors = [];
    const external = [];
    let popups = 0;
    page.on('pageerror', error => errors.push(error.stack));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('popup', popup => {
      popups++;
      void popup.close();
    });
    page.on('request', request => {
      if (request.url().startsWith('http') && new URL(request.url()).origin !== origin)
        external.push(request.url());
    });
    await page.addInitScript(() => {
      window.demoOperations = [];
      window.addEventListener('zhiyuan-demo:operation', event =>
        window.demoOperations.push(event.detail),
      );
      window.addEventListener('zhiyuan-demo:capabilities', event => {
        window.demoCapabilities = event.detail;
      });
    });
    const frame = direct ? page : page.frameLocator('#workbench iframe');
    let clientFrame;
    const healthy = async () => {
      assert.deepEqual(errors, [], 'Client emitted an exception or console error');
      assert.deepEqual(external, [], 'Demo attempted a real external request');
      assert.equal(popups, 0, 'Demo opened an authentication/external popup');
      assert.equal(await page.locator('.demo-loading').count(), 0, 'Host failure overlay appeared');
      assert.equal(
        await frame
          .getByRole('button', { name: /页面加载失败|Page failed|Failed to load/i })
          .count(),
        0,
        'Client error boundary appeared',
      );
    };
    const click = async control => {
      await control.click();
      await page.waitForTimeout(180);
      await healthy();
    };
    const settings = async () => {
      await click(frame.getByRole('button', { name: 'visitor@zhiyuan.local', exact: true }));
      await click(
        frame.getByRole('menuitem', { name: english ? 'Settings' : '设置', exact: true }),
      );
    };
    try {
      await page.goto(
        direct
          ? `${direct.split('?')[0]}?locale=${locale}`
          : `${origin}/${english ? 'en/' : ''}#workbench`,
        { timeout: 60000 },
      );
      if (!direct) await page.locator('.demo-stage').scrollIntoViewIfNeeded();
      await frame
        .getByRole('button', { name: 'visitor@zhiyuan.local', exact: true })
        .waitFor({ timeout: 60000 });
      clientFrame = direct
        ? page.mainFrame()
        : page.frames().find(item => item.url().includes('/client-demo/'));
      assert.ok(clientFrame);
      await settings();
      const nav = frame.getByRole('navigation', {
        name: english ? 'Settings' : '设置',
        exact: true,
      });
      const imName = english ? 'IM Bot' : 'IM 机器人';
      await click(nav.getByRole('button', { name: imName, exact: true }));
      const im = frame.getByRole('region', { name: imName, exact: true });
      await click(im.getByRole('combobox').first());
      await click(
        frame.getByRole('option', {
          name: english ? 'Quarterly analysis' : '季度经营分析',
          exact: true,
        }),
      );
      await click(im.locator('summary'));
      await im.locator('#weixin-allow-user').fill('wxid_sample');
      await im.locator('#weixin-allow-user').press('Enter');
      await page.waitForTimeout(250);
      for (let count = 0; count < 3; count++) await click(im.getByRole('switch').first());
      await click(
        im.getByRole('button', {
          name: english ? 'Scan to Connect WeChat' : '扫码连接微信',
          exact: true,
        }),
      );
      for (let count = 0; count < 2; count++) {
        await click(im.getByRole('button', { name: /刷新二维码|Refresh QR/i }));
      }
      await click(
        im.getByRole('button', { name: english ? 'Test Connectivity' : '测试连通性', exact: true }),
      );
      // Close the native connectivity result modal before continuing.
      if (await frame.getByRole('dialog').count()) {
        await page.keyboard.press('Escape');
      }
      const config = await clientFrame.evaluate(() => window.electron.im.getConfig());
      assert.equal(config.config.weixin.enabled, false);
      assert.deepEqual(config.config.weixin.allowFrom, ['wxid_sample']);
      assert.equal(config.config.weixin.workspaceId, 'q3');
      assert.equal(
        (await clientFrame.evaluate(() => window.electron.im.getStatus())).status.weixin.connected,
        false,
      );
      // Real client per-platform forms use local instances with unique IDs.
      for (const platform of ['DingTalk', 'Feishu', 'WeCom', 'QQ']) {
        await click(im.getByRole('button', { name: new RegExp(platform) }).first());
        await click(im.getByRole('button', { name: /添加实例|Add Instance/i }));
        await healthy();
        const project = im.getByRole('combobox').first();
        await click(project);
        await click(
          frame.getByRole('option', {
            name: english ? 'Quarterly analysis' : '季度经营分析',
            exact: true,
          }),
        );
        if (platform === 'WeCom') {
          await click(im.getByRole('button', { name: /扫码|Scan/i }).first());
        }
      }
      await page.screenshot({ path: path.join(evidence, `${locale}-im.png`) });

      const sections = english
        ? [
            'General',
            'Appearance',
            'Shortcuts',
            'Model',
            'Platform Models',
            'Memory',
            'Email',
            'About',
          ]
        : ['通用', '外观', '快捷键', '模型', '平台模型', '记忆', '邮箱', '关于'];
      const visitedSettings = [];
      for (const name of sections) {
        await click(nav.getByRole('button', { name, exact: true }));
        visitedSettings.push(name);
        if (name === '通用' || name === 'General') {
          const switches = frame.getByRole('region', { name, exact: true }).getByRole('switch');
          for (let index = 0; index < (await switches.count()); index++) {
            if (await switches.nth(index).isEnabled()) {
              await click(switches.nth(index));
              await click(switches.nth(index));
            }
          }
        }
        if (name === '模型' || name === 'Model') {
          const tabs = frame.getByRole('region', { name, exact: true }).getByRole('tab');
          for (let index = 0; index < (await tabs.count()); index++) await click(tabs.nth(index));
        }
        if (name === '平台模型' || name === 'Platform Models') {
          await frame.getByRole('textbox').fill('https://example.invalid');
          await click(frame.getByRole('button', { name: /连接并获取模型|Connect.*Models/i }));
          assert.equal(
            (await clientFrame.evaluate(() => window.electron.managedProviders.aisphereSnapshot()))
              .status,
            'unconfigured',
          );
        }
      }
      await click(frame.getByRole('button', { name: /检查更新|Check for Updates/i, exact: true }));
      await click(frame.getByRole('button', { name: /导出日志|Export Logs/i, exact: true }));
      await click(frame.getByRole('link').first());
      await page.screenshot({ path: path.join(evidence, `${locale}-about.png`) });

      // Call known unsupported operations through the exact bridge mounted in
      // the App, including terminal, filesystem, Git, auth and installation.
      const blocked = await clientFrame.evaluate(async () => {
        const paths = [
          ...new Set([
            ...window.demoCapabilities
              .filter(item => item.operation === 'blocked')
              .map(item => item.path),
            'im.weixinLoginStart',
            'im.startGateway',
            'auth.communityLogin',
            'shell.openPath',
            'log.exportZip',
          ]),
        ];
        const values = [];
        for (const path of paths) {
          let method = window.electron;
          for (const key of path.split('.')) method = method[key];
          const result = await method({});
          values.push({
            path,
            success: result?.success,
            ok: result?.ok,
            canceled: result?.canceled,
          });
        }
        return values;
      });
      for (const value of blocked) {
        if (value.canceled === true) continue;
        assert.notEqual(value.success, true, `${value.path} claims success`);
        assert.notEqual(value.ok, true, `${value.path} claims success`);
      }
      assert.ok(blocked.length > 100, 'Unimplemented desktop APIs were not audited');
      await healthy();
      // Deleting every sample must not remove the templates used by creation.
      const emptyState = await clientFrame.evaluate(async () => {
        const api = window.electron;
        const sessions = await api.cowork.listSessions({});
        for (const session of sessions.sessions) await api.cowork.deleteSession(session.id);
        const created = await api.cowork.startSession({
          prompt: 'A fresh task after deleting all sessions',
        });
        const workspaces = await api.codingAgent.listWorkspaces();
        for (const workspace of workspaces.workspaces)
          await api.codingAgent.deleteWorkspace(workspace.id);
        const empty = await api.codingAgent.createSession({ prompt: 'No project' });
        const recreated = await api.codingAgent.createWorkspace({
          name: 'Fresh',
          primaryRoot: '/workspace/fresh',
        });
        const scheduled = await api.scheduledTasks.list();
        for (const task of scheduled.tasks) await api.scheduledTasks.delete(task.id);
        const newTask = await api.scheduledTasks.create({ name: 'Fresh schedule' });
        return { session: created.session, empty, recreated, newTask };
      });
      assert.ok(emptyState.session.id);
      assert.equal(emptyState.empty.success, false);
      assert.ok(emptyState.recreated.workspaces[0].sources.length);
      assert.ok(emptyState.newTask.task.schedule);
      await page.waitForTimeout(1000);
      await healthy();
      const operations = await clientFrame.evaluate(() => window.demoOperations);
      results.push({
        locale,
        visitedSettings,
        blocked,
        operations,
        errors,
        external,
        popups,
        passed: true,
      });
      console.log(
        `PASS ${locale}: IM, settings, unsupported effects, navigation and empty-state recreation`,
      );
    } catch (error) {
      await page.screenshot({ path: path.join(evidence, `${locale}-failure.png`) }).catch(() => {});
      results.push({ locale, errors, external, popups, passed: false, error: String(error) });
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
