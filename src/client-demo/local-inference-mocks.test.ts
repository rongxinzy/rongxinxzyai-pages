import { afterEach, expect, test, vi } from 'vitest';
import { LlamaCppMemoryPolicy, LlamaCppModelResidencyMode } from '@shared/llamacpp';
import { createLocalInferenceMocks } from './local-inference-mocks';
import { DemoInstallPhase, DemoModelState } from './constants';
import { DemoOperationUnavailable } from './bridge-boundary';

const setup = () => {
  const catalog = [
    { name: 'Qwen3-8B', repoId: 'qwen/qwen3', filePath: 'Qwen3-8B.gguf', installed: true },
  ];
  const emit = vi.fn();
  return {
    catalog,
    emit,
    api: createLocalInferenceMocks({ catalog, emit, unavailable: 'Desktop required' }),
  };
};
afterEach(() => vi.useRealTimers());

test('unload and reload preserve complete native snapshots over repeated cycles', async () => {
  const { api, emit } = setup();
  for (let index = 0; index < 3; index++) {
    expect(await api.unloadModel('Qwen3-8B')).toEqual({
      success: true,
      runningModels: [],
      confirmed: true,
    });
    expect((await api.listLocalModels())[0].status).toBe(DemoModelState.Unloaded);
    expect(await api.loadModel({ model: 'Qwen3-8B' })).toMatchObject({
      success: true,
      runningModels: [{ name: 'Qwen3-8B', status: DemoModelState.Loaded }],
    });
  }
  const models = await api.listRunningModels();
  models.pop();
  expect(await api.listRunningModels()).toHaveLength(1);
  expect(emit).toHaveBeenCalledTimes(6);
});

test('preferences persist while desktop service changes cannot alter memory-only config', async () => {
  const { api } = setup();
  const preference = {
    ctxSize: 8192,
    residency: { mode: LlamaCppModelResidencyMode.Timed, idleMinutes: 5 },
  };
  await api.setModelPreference({ modelName: 'Qwen3-8B', preference });
  expect(await api.getModelPreferences()).toMatchObject({ 'Qwen3-8B': preference });
  await api.setServiceConfig({
    memoryPolicy: LlamaCppMemoryPolicy.Manual,
    memoryBudgetPercent: 65,
  });
  await expect(api.setServiceConfig({ listenHost: '0.0.0.0' })).rejects.toBeInstanceOf(
    DemoOperationUnavailable,
  );
  expect(await api.getServiceConfig()).toEqual({
    memoryPolicy: LlamaCppMemoryPolicy.Manual,
    memoryBudgetPercent: 65,
  });
});

test('deleting the last model clears preferences and permits reinstall without a mutable template', async () => {
  vi.useFakeTimers();
  const { api, catalog } = setup();
  await api.unloadModel('Qwen3-8B');
  await api.setModelPreference({ modelName: 'Qwen3-8B', preference: { ctxSize: 8192 } });
  await api.deleteModel('Qwen3-8B');
  expect(await api.listLocalModels()).toEqual([]);
  expect(await api.getModelPreferences()).toEqual({});
  expect(catalog[0].installed).toBe(false);
  const install = api.installModel({ modelId: catalog[0].repoId });
  await vi.advanceTimersByTimeAsync(800);
  expect(await install).toEqual({ success: true });
  expect(catalog[0].installed).toBe(true);
  expect(await api.listLocalModels()).toHaveLength(1);
  await api.loadModel({ model: 'Qwen3-8B' });
  expect(await api.listRunningModels()).toHaveLength(1);
});

test('cancelling an install prevents delayed completion from restoring a deleted model', async () => {
  vi.useFakeTimers();
  const { api, catalog, emit } = setup();
  await api.unloadModel('Qwen3-8B');
  await api.deleteModel('Qwen3-8B');
  const install = api.installModel({ modelId: catalog[0].repoId });
  expect(await api.cancelInstall(catalog[0].repoId)).toEqual({ success: true, cancelled: true });
  await vi.advanceTimersByTimeAsync(800);
  expect(await install).toEqual({ success: false, cancelled: true });
  expect(await api.listLocalModels()).toEqual([]);
  expect(catalog[0].installed).toBe(false);
  expect(emit).toHaveBeenLastCalledWith('llamacpp.onPullProgress', {
    name: catalog[0].repoId,
    chunk: {
      phase: DemoInstallPhase.Cancelled,
      modelId: catalog[0].repoId,
      percent: 0,
      targetPath: undefined,
    },
  });
});
