import { DEFAULT_IM_CONFIG, DEFAULT_IM_STATUS } from '@client/types/im';
import type { IMGatewayConfig } from '@client/types/im';
import type { DemoHandler } from './bridge-boundary';
import { desktopOnly } from './boundary-notice';

const object = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

// Native setConfig accepts nested partial updates. Keep untouched defaults,
// including allowFrom arrays and per-platform instance lists, intact.
export function mergeImConfig(current: IMGatewayConfig, input: unknown): IMGatewayConfig {
  const patch = object(input);
  return Object.fromEntries(
    Object.entries(current).map(([key, value]) => [key, { ...value, ...object(patch[key]) }]),
  ) as unknown as IMGatewayConfig;
}

const platforms = {
  DingTalk: 'dingtalk',
  Feishu: 'feishu',
  Wecom: 'wecom',
  QQ: 'qq',
  Telegram: 'telegram',
  Discord: 'discord',
} as const;

export function installImMocks(
  register: (prefix: string, methods: Record<string, DemoHandler>) => void,
  defaults: Window['electron']['im'],
) {
  let config = structuredClone(DEFAULT_IM_CONFIG);
  const denied = () => ({ success: false, error: desktopOnly() });
  const methods: Record<string, DemoHandler> = {
    getConfig: () => ({ success: true, config }),
    getStatus: () => ({ success: true, status: DEFAULT_IM_STATUS }),
    setConfig: input => {
      const patch = object(input);
      if (object(patch.weixin).enabled === true) return denied();
      for (const platform of Object.values(platforms)) {
        const instances = object(patch[platform]).instances;
        if (
          Array.isArray(instances) &&
          instances.some(instance => object(instance).enabled === true)
        )
          return denied();
      }
      config = mergeImConfig(config, patch);
      return { success: true, config };
    },
    syncConfig: () => ({ success: true }),
    startGateway: denied,
    stopGateway: denied,
    weixinLoginStart: denied,
    weixinLoginPoll: denied,
    testGateway: denied,
    getLocalIp: () => '127.0.0.1',
  };
  for (const [label, platform] of Object.entries(platforms)) {
    const addName = `add${label}Instance`;
    // These functions only return generated local data; they never perform IPC.
    const addDefault = Reflect.get(defaults, addName) as DemoHandler;
    methods[addName] = async (name, workspaceId) => {
      if (config[platform].instances.length >= 5) return denied();
      const result = object(await addDefault(String(name)));
      const instance = {
        ...object(result.instance),
        instanceId: crypto.randomUUID(),
        instanceName: String(name || label),
        workspaceId: String(workspaceId || ''),
        enabled: false,
      };
      const current = config[platform];
      config = mergeImConfig(config, {
        [platform]: { instances: [...current.instances, instance] },
      });
      return { success: true, instance };
    };
    methods[`set${label}InstanceConfig`] = (id, input) => {
      const patch = object(input);
      if (patch.enabled === true) return denied();
      const instances = config[platform].instances;
      if (!instances.some(instance => instance.instanceId === id)) return denied();
      config = mergeImConfig(config, {
        [platform]: {
          instances: instances.map(instance =>
            instance.instanceId === id ? { ...instance, ...patch } : instance,
          ),
        },
      });
      return { success: true };
    };
    methods[`delete${label}Instance`] = id => {
      config = mergeImConfig(config, {
        [platform]: {
          instances: config[platform].instances.filter(instance => instance.instanceId !== id),
        },
      });
      return { success: true };
    };
  }
  register('im', methods);
}
