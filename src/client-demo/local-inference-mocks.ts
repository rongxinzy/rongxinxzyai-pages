import type { LlamaCppApi } from '@client/types/electron/localInferenceApi';
import type { MarketplaceModel } from '@shared/marketplace';
import type {
  LlamaCppModel,
  LlamaCppModelPreferences,
  LlamaCppServiceConfig,
} from '@shared/llamacpp';
import { LlamaCppMemoryPolicy, LlamaCppModelResidencyMode } from '@shared/llamacpp';
import { DemoOperationUnavailable } from './bridge-boundary';
import { DemoInstallPhase, DemoModelState, DemoServiceState } from './constants';

type MockOptions = {
  catalog: Array<Pick<MarketplaceModel, 'repoId' | 'name' | 'filePath' | 'installed'>>;
  emit: (name: string, data: unknown) => void;
  unavailable: string;
};

// The compiler checks these results against the pinned preload contract.
// In particular, both load/unload must always return a runningModels array.
export function createLocalInferenceMocks({ catalog, emit, unavailable }: MockOptions) {
  const localModels: LlamaCppModel[] = [
    {
      name: 'Qwen3-8B',
      path: '/models/Qwen3-8B.gguf',
      size: 4_900_000_000,
      status: DemoModelState.Loaded,
      details: {
        format: 'gguf',
        parameter_size: '8B',
        quantization_level: 'Q4_K_M',
        context_length: 32768,
      },
    },
  ];
  const preferences: LlamaCppModelPreferences = {};
  let serviceConfig: LlamaCppServiceConfig = {};
  const installs = new Map<string, { cancelled: boolean }>();
  const snapshot = () => structuredClone(localModels);
  const running = () => snapshot().filter(model => model.status === DemoModelState.Loaded);
  const changed = () => emit('llamacpp.onModelBindingsChanged', undefined);
  const requireModel = (name: string) => {
    const model = localModels.find(model => model.name === name);
    if (!model) throw new DemoOperationUnavailable(unavailable);
    return model;
  };
  return {
    status: async () => ({
      status: DemoServiceState.Running,
      checkedAt: new Date().toISOString(),
      managedByApp: true,
    }),
    listLocalModels: async () => snapshot(),
    listRunningModels: async () => running(),
    modelsDir: async () => '/models',
    getModelPreferences: async () => structuredClone(preferences),
    setModelPreference: async input => {
      requireModel(input.modelName);
      // Preference fields are bounded by the native editor; no processes run.
      const value = input.preference ?? {};
      const residency = value.residency;
      if (
        residency &&
        residency.mode !== LlamaCppModelResidencyMode.Timed &&
        residency.mode !== LlamaCppModelResidencyMode.Forever
      )
        throw new DemoOperationUnavailable(unavailable);
      if (
        [value.ctxSize, value.maxTokens, value.nCpuMoe, residency?.idleMinutes].some(
          number => number !== undefined && (!Number.isFinite(number) || number < 0),
        )
      )
        throw new DemoOperationUnavailable(unavailable);
      preferences[input.modelName] = {
        ctxSize: value.ctxSize,
        maxTokens: value.maxTokens,
        nCpuMoe: value.nCpuMoe,
        ...(residency
          ? {
              residency: {
                mode: residency.mode as LlamaCppModelResidencyMode,
                idleMinutes: residency.idleMinutes,
              },
            }
          : {}),
      };
      return structuredClone(preferences);
    },
    getServiceConfig: async () => structuredClone(serviceConfig),
    setServiceConfig: async input => {
      // Only memory settings are available in the browser. Network, runtime,
      // directory and process settings cannot be enabled via a direct call.
      if (Object.keys(input).some(key => !['memoryPolicy', 'memoryBudgetPercent'].includes(key)))
        throw new DemoOperationUnavailable(unavailable);
      const policy = input.memoryPolicy;
      const budget = input.memoryBudgetPercent;
      if (
        (policy !== undefined &&
          policy !== LlamaCppMemoryPolicy.Auto &&
          policy !== LlamaCppMemoryPolicy.Manual) ||
        (budget !== undefined &&
          (typeof budget !== 'number' || !Number.isFinite(budget) || budget < 10 || budget > 90))
      )
        throw new DemoOperationUnavailable(unavailable);
      serviceConfig = {
        ...serviceConfig,
        ...(policy !== undefined ? { memoryPolicy: policy } : {}),
        ...(typeof budget === 'number' ? { memoryBudgetPercent: budget } : {}),
      };
      return structuredClone(serviceConfig);
    },
    listBackends: async () => ({ success: true, backends: [] }),
    getRuntimeCapabilities: async () => ({
      success: true,
      flags: [],
      supports: {},
      devices: [],
      deviceProbeSucceeded: false,
      backendKinds: [],
      gpuDeviceCount: 0,
    }),
    loadModel: async input => {
      const model = requireModel(input.model);
      model.status = DemoModelState.Loaded;
      changed();
      return { success: true, runningModels: running() };
    },
    cancelModelLoad: async () => ({ success: true, cancelled: false }),
    unloadModel: async name => {
      const model = requireModel(name);
      model.status = DemoModelState.Unloaded;
      changed();
      return { success: true, runningModels: running(), confirmed: true };
    },
    deleteModel: async name => {
      const model = requireModel(name);
      if (model.status === DemoModelState.Loaded) throw new DemoOperationUnavailable(unavailable);
      localModels.splice(localModels.indexOf(model), 1);
      delete preferences[name];
      for (const entry of catalog) if (entry.name === name) entry.installed = false;
      changed();
      return { success: true, deleted: true, removedModelName: name };
    },
    showModel: async name => structuredClone(requireModel(name)),
    getLatestModelLaunchLogSession: async () => null,
    readModelLaunchLogFile: async () => ({ success: true, content: '' }),
    getRuntimeInstallSnapshot: async () => ({ active: false }),
    installModel: async input => {
      const entry = catalog.find(model => model.repoId === input.modelId);
      if (!entry) throw new DemoOperationUnavailable(unavailable);
      if (installs.has(entry.repoId)) throw new DemoOperationUnavailable(unavailable);
      const pending = { cancelled: false };
      installs.set(entry.repoId, pending);
      const progress = (phase: string, percent: number, targetPath?: string) =>
        emit('llamacpp.onPullProgress', {
          name: entry.repoId,
          chunk: { phase, modelId: entry.repoId, percent, targetPath },
        });
      progress(DemoInstallPhase.Downloading, 35);
      await new Promise(resolve => setTimeout(resolve, 800));
      installs.delete(entry.repoId);
      if (pending.cancelled) {
        progress(DemoInstallPhase.Cancelled, 0);
        return { success: false, cancelled: true };
      }
      let model = localModels.find(model => model.name === entry.name);
      if (!model) {
        model = {
          name: entry.name,
          path: `/models/${entry.filePath}`,
          size: 4_900_000_000,
          status: DemoModelState.Unloaded,
        };
        localModels.push(model);
      }
      entry.installed = true;
      progress(DemoInstallPhase.Done, 100, model.path);
      changed();
      return { success: true };
    },
    cancelInstall: async id => {
      const pending = installs.get(id);
      if (pending) pending.cancelled = true;
      return { success: true, cancelled: Boolean(pending) };
    },
  } satisfies Partial<LlamaCppApi>;
}
