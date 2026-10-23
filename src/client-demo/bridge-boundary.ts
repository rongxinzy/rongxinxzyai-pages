export type DemoHandler = (...args: unknown[]) => unknown;
type BridgeObject = Record<string, unknown>;

export class DemoOperationUnavailable extends Error {}

export const DemoOperation = {
  Mock: 'mock',
  Read: 'read',
  Blocked: 'blocked',
  Event: 'event',
  Lifecycle: 'lifecycle',
} as const;
export type DemoOperation = (typeof DemoOperation)[keyof typeof DemoOperation];

// Only generated, browser-local getters may supply defaults. Unimplemented
// mutations never inherit the generated preview's optimistic success values.
const readMethod =
  /^(get[A-Z]|list[A-Z]?|is[A-Z]|has[A-Z]|read[A-Z]|fetch[A-Z]|search|check[A-Z]|resolve[A-Z]|preview[A-Z])/;
const readNames = new Set([
  'status',
  'catalog',
  'models',
  'agents',
  'bootstrap',
  'policy',
  'snapshot',
  'modelsDir',
  'nvidiaSmi',
  'systemMemory',
  'providers',
  'diagnostics',
  'preferences',
  'routingGroups',
  'usageSummary',
  'usageRequests',
  'usageQuotas',
  'usageBudget',
  'aisphereSnapshot',
  'loadEventPage',
  'loadIcon',
  'usesBundledLlamaCppRuntime',
  'countRuns',
  'remoteManaged',
  'autoRoutingPrompt',
  'preflight',
  'get',
]);
const lifecyclePaths = new Set([
  'networkStatus.send',
  'theme.updateTitleBar',
  'runtimeNotices.markPresented',
  'log.fromRenderer',
]);
const desktopReadPaths = new Set([
  'appUpdate.checkNow',
  'permissions.checkCalendar',
  'dialog.readFileAsDataUrl',
  'dialog.checkArtifactFile',
  'codingAgent.readWorkspaceFile',
  'shell.resolveLocalPath',
]);
const accountTransitions = new Set([
  'auth.communityLogin',
  'auth.communityLogout',
  'enterprise.session.login',
  'enterprise.session.logout',
]);

export function classifyDemoOperation(path: string, implemented: boolean): DemoOperation {
  if (/^on[A-Z]/.test(path.split('.').at(-1) ?? '')) return DemoOperation.Event;
  if (accountTransitions.has(path)) return DemoOperation.Blocked;
  if (implemented) return DemoOperation.Mock;
  if (lifecyclePaths.has(path)) return DemoOperation.Lifecycle;
  if (desktopReadPaths.has(path)) return DemoOperation.Blocked;
  const name = path.split('.').at(-1) ?? '';
  return readMethod.test(name) || readNames.has(name) ? DemoOperation.Read : DemoOperation.Blocked;
}

export function failedDemoResult(value: unknown, error: string): unknown {
  if (typeof value === 'boolean') return false;
  if (typeof value === 'string') return '';
  if (Array.isArray(value)) return [];
  // Preserve raw settings/status shapes for consumers that do not use a result
  // envelope, while ensuring envelope consumers cannot advance on success.
  return {
    ...(value && typeof value === 'object' ? value : {}),
    success: false,
    ok: false,
    cancelled: true,
    error,
  };
}

export function createDemoBridge(options: {
  defaults: object;
  handlers: Record<string, DemoHandler>;
  subscribe: (path: string, args: unknown[]) => () => void;
  unsupported: (path: string) => string;
  failed: (path: string, error: unknown) => string;
  called?: (path: string, operation: DemoOperation) => void;
  described?: (path: string, operation: DemoOperation) => void;
}): BridgeObject {
  const bridge: BridgeObject = {};
  const methods = new Map<string, DemoHandler>();
  function visit(value: object, prefix = '') {
    for (const [name, child] of Object.entries(value)) {
      const path = prefix ? `${prefix}.${name}` : name;
      if (typeof child === 'function') methods.set(path, child as DemoHandler);
      else if (child && typeof child === 'object') visit(child, path);
      else assign(path, child);
    }
  }
  function assign(path: string, value: unknown) {
    const parts = path.split('.');
    let parent = bridge;
    for (const name of parts.slice(0, -1)) {
      parent[name] ??= {};
      parent = parent[name] as BridgeObject;
    }
    parent[parts.at(-1)!] = value;
  }
  visit(options.defaults);
  for (const path of Object.keys(options.handlers)) {
    if (!methods.has(path)) methods.set(path, () => undefined);
  }
  for (const [path, fallback] of methods) {
    const handler = options.handlers[path];
    const operation = classifyDemoOperation(path, Boolean(handler));
    options.described?.(path, operation);
    assign(path, (...args: unknown[]) => {
      options.called?.(path, operation);
      if (operation === DemoOperation.Event) return options.subscribe(path, args);
      if (operation === DemoOperation.Lifecycle) return undefined;
      return Promise.resolve().then(async () => {
        try {
          if (operation === DemoOperation.Blocked) {
            const message = options.unsupported(path);
            return failedDemoResult(await fallback(...args), message);
          }
          return structuredClone(await (handler ?? fallback)(...args));
        } catch (error) {
          // Guard the IPC replacement itself; never suppress renderer crashes
          // or arbitrary global rejections to keep a broken App looking healthy.
          const message =
            error instanceof DemoOperationUnavailable
              ? options.unsupported(path)
              : options.failed(path, error);
          // Preserve the declared response shape even when a custom handler
          // fails. Renderer consumers may use arrays before checking success.
          let value: unknown;
          try {
            value = await fallback(...args);
          } catch {
            /* No usable default. */
          }
          return failedDemoResult(value, message);
        }
      });
    });
  }
  return bridge;
}
