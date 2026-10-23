// Requires the client checkout's existing Playwright install. No site dependency is added.
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { client, clientSource } from './client-demo-source.mjs';

const requireClient = createRequire(path.join(client, 'package.json'));
const { chromium } = requireClient('playwright');
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const browser = await chromium.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
});
const report = {
  measuredAt: new Date().toISOString(),
  browser: browser.version(),
  viewport: '1440x1000, DPR 1',
  cache: 'disabled',
  reducedMotion: true,
  samplesPerSite: 1,
  clientRevision: clientSource.revision,
  sites: [],
};

for (const url of process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['https://www.rongxzyai.com/', 'http://127.0.0.1:5187/']) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  let phase = 'initial';
  const requests = new Map();
  const bodyReads = [];
  context.on('request', request => {
    if (!request.url().startsWith('http')) return;
    requests.set(request, {
      phase,
      url: request.url(),
      type: request.resourceType(),
      transferred: 0,
      decoded: 0,
      status: 0,
    });
  });
  context.on('response', response => {
    const item = requests.get(response.request());
    if (item) {
      item.status = response.status();
      item.encoding = response.headers()['content-encoding'] || 'identity';
    }
  });
  context.on('requestfinished', request => {
    const item = requests.get(request);
    if (!item) return;
    bodyReads.push(
      (async () => {
        const results = await Promise.allSettled([
          request.sizes().then(sizes => {
            item.transferred = sizes.responseBodySize + sizes.responseHeadersSize;
          }),
          request.response().then(async response => {
            item.decoded = (await response.body()).byteLength;
          }),
        ]);
        if (results[0].status === 'rejected') item.transferUnavailable = true;
        if (results[1].status === 'rejected') item.bodyUnavailable = true;
      })(),
    );
  });
  context.on('requestfailed', request => {
    const item = requests.get(request);
    if (item) item.failure = request.failure()?.errorText || 'Request failed';
  });
  const settle = async () => {
    await page.waitForLoadState('networkidle', { timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(1000);
  };
  console.log('Measuring', url);
  await page.goto(url, { waitUntil: 'load' });
  await settle();
  // Start attribution before scrolling: the current demo starts automatically.
  phase = 'workbench';
  await page.locator('#workbench').scrollIntoViewIfNeeded();
  await settle();
  const start = page.locator('#workbench button').filter({ hasText: '开始体验' });
  const demoSelector = '#workbench iframe[src*="/client-demo/"]';
  const interactive =
    (await start.count()) > 0 || (await page.locator(demoSelector).count()) > 0;
  console.log('Gallery ready', url, 'interactive:', interactive);
  if (interactive) {
    if (await start.count()) await start.click();
    await page.frameLocator(demoSelector).locator('aside').waitFor({ timeout: 25000 });
    await page
      .frameLocator(demoSelector)
      .getByRole('button', { name: /思考了 7 秒|Thought for 7s/ })
      .waitFor({ timeout: 25000 });
    await settle();
    await page.locator('.demo-window').screenshot({
      path: fileURLToPath(new URL('../reports/live-demo-workbench.png', import.meta.url)),
    });
    phase = 'navigation';
    const frame = page.frameLocator(demoSelector);
    for (const name of ['本地推理', '编程', '待办', '自动化', '活动', '专家']) {
      await frame.locator('aside').getByRole('button', { name, exact: true }).first().click();
      await settle();
      console.log('Visited', name);
    }
    await frame.getByRole('tab', { name: '技能', exact: true }).click();
    await settle();
  } else {
    // Visit every static HTML/image panel in the current live gallery.
    phase = 'gallery-rest';
    for (const panel of await page.locator('#workbench iframe, #workbench img').all()) {
      await panel.scrollIntoViewIfNeeded();
      await settle();
    }
  }
  await Promise.race([
    Promise.allSettled(bodyReads),
    new Promise(resolve => setTimeout(resolve, 10000)),
  ]);
  const items = [...requests.values()];
  const phases = {};
  for (const item of items) {
    const total = (phases[item.phase] ||= { requests: 0, transferred: 0, decoded: 0, byType: {} });
    total.requests++;
    total.transferred += item.transferred;
    total.decoded += item.decoded;
    const type = (total.byType[item.type] ||= { requests: 0, transferred: 0, decoded: 0 });
    type.requests++;
    type.transferred += item.transferred;
    type.decoded += item.decoded;
  }
  report.sites.push({ url, interactive, phases, requests: items });
  console.log(JSON.stringify({ url, interactive, phases }, null, 2));
  await context.close();
}
await browser.close();
const output = fileURLToPath(
  new URL('../reports/live-demo-resource-measurements.json', import.meta.url),
);
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
