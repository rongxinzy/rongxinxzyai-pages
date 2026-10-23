import { expect, test, vi } from 'vitest';
import { DEFAULT_IM_CONFIG } from '@client/types/im';
import { createIm } from '@client/browserMock/generated/createIm';
import { installImMocks, mergeImConfig } from './im-mocks';
import type { DemoHandler } from './bridge-boundary';

vi.mock('./boundary-notice', () => ({ desktopOnly: () => 'Desktop required' }));

test('partial WeChat updates preserve all required config fields', () => {
  const initial = structuredClone(DEFAULT_IM_CONFIG);
  let config = mergeImConfig(initial, { weixin: { workspaceId: 'q3' } });
  config = mergeImConfig(config, { weixin: { allowFrom: ['wxid_1'] } });
  config = mergeImConfig(config, { weixin: { dmPolicy: 'allowlist' } });
  expect(config.weixin.allowFrom).toEqual(['wxid_1']);
  expect(config.weixin.workspaceId).toBe('q3');
  expect(config.weixin.groupAllowFrom).toEqual([]);
  expect(config.feishu).toEqual(initial.feishu);
  expect(initial.weixin.workspaceId).toBe('');
});

test('channel creation is local, stable and never claims a connection or enables a gateway', async () => {
  let methods: Record<string, DemoHandler> = {};
  const defaults = createIm({
    warnOnce: () => undefined,
    subscribe: () => () => undefined,
    emit: () => undefined,
  });
  installImMocks((_prefix, handlers) => {
    methods = handlers;
  }, defaults);
  for (const label of ['DingTalk', 'Feishu', 'Wecom', 'QQ', 'Telegram', 'Discord']) {
    const first = (await methods[`add${label}Instance`]('One', 'q3')) as {
      instance: { instanceId: string; enabled: boolean };
    };
    const second = (await methods[`add${label}Instance`]('Two', 'q3')) as typeof first;
    expect(first.instance.instanceId).not.toBe(second.instance.instanceId);
    expect(first.instance.enabled).toBe(false);
    expect(
      await methods[`set${label}InstanceConfig`](first.instance.instanceId, { enabled: true }),
    ).toMatchObject({ success: false });
    expect(
      await methods[`set${label}InstanceConfig`](first.instance.instanceId, {
        instanceName: 'Renamed',
      }),
    ).toMatchObject({ success: true });
    await methods[`delete${label}Instance`](first.instance.instanceId);
  }
  expect(await methods.setConfig({ weixin: { enabled: true } })).toMatchObject({ success: false });
  for (const name of ['weixinLoginStart', 'weixinLoginPoll', 'startGateway', 'testGateway']) {
    expect(await methods[name]('weixin')).toMatchObject({
      success: false,
      error: 'Desktop required',
    });
  }
  expect(await methods.getStatus()).toMatchObject({ status: { weixin: { connected: false } } });
  expect(await methods.getConfig()).toMatchObject({
    config: { weixin: { enabled: false, allowFrom: [] } },
  });
});
