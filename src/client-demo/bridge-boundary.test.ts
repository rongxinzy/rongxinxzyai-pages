import { expect, test, vi } from 'vitest';
import { classifyDemoOperation, createDemoBridge, DemoOperation } from './bridge-boundary';

test('blocks unimplemented mutations without reporting success or losing result fields', async () => {
  const unsupported = vi.fn(() => 'Desktop required');
  const failed = vi.fn(() => 'Operation failed');
  const bridge = createDemoBridge({
    defaults: { auth: { login: async () => ({ success: true, status: 'idle' }) } },
    handlers: {},
    subscribe: () => () => undefined,
    unsupported,
    failed,
  });
  const result = await (bridge.auth as { login: () => Promise<unknown> }).login();
  expect(result).toMatchObject({
    success: false,
    status: 'idle',
    cancelled: true,
    error: 'Desktop required',
  });
  expect(unsupported).toHaveBeenCalledOnce();
  expect(failed).not.toHaveBeenCalled();
  expect(bridge.nonexistent).toBeUndefined();
});

test('clones mock data, keeps getters typed and returns synchronous event cleanup', async () => {
  const cleanup = vi.fn();
  const data = { items: ['sales'] };
  const bridge = createDemoBridge({
    defaults: { models: { list: async () => data, onChanged: () => cleanup } },
    handlers: {},
    subscribe: () => cleanup,
    unsupported: () => '',
    failed: () => '',
  });
  const models = bridge.models as {
    list: () => Promise<typeof data>;
    onChanged: () => typeof cleanup;
  };
  const result = await models.list();
  result.items.pop();
  expect(data.items).toEqual(['sales']);
  expect(models.onChanged()).toBe(cleanup);
});

test.each([
  () => {
    throw new Error('sync');
  },
  async () => {
    throw new Error('async');
  },
])('contains bridge failures, including rejected promises', async handler => {
  const failed = vi.fn(() => 'Operation failed');
  const bridge = createDemoBridge({
    defaults: {},
    handlers: { save: handler },
    subscribe: () => () => undefined,
    unsupported: () => '',
    failed,
  });
  await expect((bridge.save as () => Promise<unknown>)()).resolves.toMatchObject({
    success: false,
  });
  expect(failed).toHaveBeenCalledOnce();
});

test('classifies external effects separately from reads and log export separately from logging', () => {
  for (const path of [
    'im.startGateway',
    'auth.communityLogin',
    'appUpdate.checkNow',
    'shell.openPath',
    'log.exportZip',
    'skills.testEmailConnectivity',
    'codingAgent.commitAndPushGitChanges',
  ]) {
    expect(classifyDemoOperation(path, false)).toBe(DemoOperation.Blocked);
  }
  for (const path of [
    'magpie.providers',
    'magpie.routingGroups',
    'managedProviders.aisphereSnapshot',
  ]) {
    expect(classifyDemoOperation(path, false)).toBe(DemoOperation.Read);
  }
  expect(classifyDemoOperation('log.fromRenderer', false)).toBe(DemoOperation.Lifecycle);
});
