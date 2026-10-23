import { defaultConfig, CONFIG_KEYS } from '@client/config';
import { CoworkPermissionMode, CoworkSessionMode } from '@shared/cowork/constants';
import { CoworkSessionStatusValue } from '@client/types/cowork';
import type { CoworkSession } from '@client/types/cowork';
import { TodoStatus, TodoView } from '@shared/todo';
import type { Todo, TodoList, TodoStep } from '@shared/todo';
import { createGeneratedSurface } from '@client/browserMock/generated/surface';
import { createBrowserMockRuntime } from '@client/browserMock/runtime';
import { PiUiEventSequencer, PiUiEventType } from '@shared/cowork/piUiEvent';
import { CoworkRunPhase } from '@shared/cowork/runState';
import { AISphereStatus } from '@shared/aisphere';
import { AppUpdateChannelPreference } from '@shared/appUpdate/constants';
import {
  activityRuns,
  agents,
  english,
  messages,
  models,
  now,
  phrase,
  sessions,
  skills,
  todos,
  words,
  workspace,
} from './sample-data';
import { installFeatureMocks } from './feature-mocks';
import { createDemoBridge, type DemoOperation } from './bridge-boundary';
import { desktopOnly, operationFailed } from './boundary-notice';
import { installImMocks } from './im-mocks';
import { chatSamples, replyForChat } from './chat-samples';
import { createLocalInferenceMocks } from './local-inference-mocks';

type Handler = (...args: unknown[]) => unknown;
type Data = Record<string, unknown>;
const handlers: Record<string, Handler> = {};
const listeners = new Map<string, Set<(data: unknown) => void>>();
const defaults = createGeneratedSurface({
  ...createBrowserMockRuntime(),
  warnOnce: () => undefined,
});
const sequencer = new PiUiEventSequencer(() => crypto.randomUUID());
export const emit = (name: string, data: unknown) =>
  listeners.get(name)?.forEach(listener => listener(structuredClone(data)));
const ok = { success: true };
const workspaces = [workspace];
const sessionTemplate = structuredClone(sessions[0]);
const agentTemplate = structuredClone(agents[0]);
const todoTemplate = structuredClone(todos[0]);
const object = (value: unknown): Data =>
  value && typeof value === 'object' ? (value as Data) : {};
const saved = new Map<string, unknown>([
  [
    CONFIG_KEYS.APP_CONFIG,
    {
      ...defaultConfig,
      theme: 'light',
      language: english ? 'en' : 'zh',
      language_initialized: true,
      providers: {
        ...defaultConfig.providers,
        custom_0: {
          enabled: true,
          name: 'Qwen',
          apiKey: 'browser-local',
          baseUrl: 'https://demo.invalid',
          apiFormat: 'openai',
          models: [{ id: 'Qwen3-8B', name: 'Qwen3 8B' }],
        },
      },
      model: { ...defaultConfig.model, defaultModel: 'Qwen3-8B', defaultModelProvider: 'custom_0' },
    },
  ],
]);
let coworkConfig = {
  workingDirectory: workspace.path,
  systemPrompt: '',
  executionMode: 'local',
  permissionMode: CoworkPermissionMode.Ask,
  embeddingEnabled: false,
};
const register = (prefix: string, methods: Record<string, Handler>) =>
  Object.entries(methods).forEach(([name, handler]) => {
    const path = `${prefix}.${name}`;
    handlers[path] = async (...args) => {
      const result = await handler(...args);
      if (/^todo\.(create|update|delete)/.test(path)) emit('todo.onChanged', {});
      return result;
    };
  });

register('store', {
  get: key => saved.get(String(key)) ?? null,
  set: (key, value) => {
    saved.set(String(key), value);
  },
  remove: key => saved.delete(String(key)),
});
register('enterprise', { getConfig: () => null });
register('enterprise.renderer', {
  sessionGateEntrypoint: () => null,
  settingsEntrypoint: () => null,
  settingsPages: () => [],
});
register('managedProviders', {
  policy: () => ({ mode: 'open', providerKeys: [] }),
  list: () => [],
  aisphereSnapshot: () => ({ address: '', status: AISphereStatus.Unconfigured, models: [] }),
  aisphereConnect: () => {
    desktopOnly();
    return { address: '', status: AISphereStatus.Unconfigured, models: [] };
  },
  aisphereRefresh: () => {
    desktopOnly();
    return { address: '', status: AISphereStatus.Unconfigured, models: [] };
  },
});
register('system', {
  getLocale: () => (english ? 'en-US' : 'zh-CN'),
  getTimezone: () => 'Asia/Shanghai',
});
register('appInfo', {
  getVersion: () => '2026.10.23',
  isDev: () => false,
  getSystemLocale: () => (english ? 'en-US' : 'zh-CN'),
  consumePendingLocalInferenceInstall: () => null,
});
register('appUpdate', {
  getChannel: () => AppUpdateChannelPreference.Stable,
  setChannel: () => {
    desktopOnly();
    return AppUpdateChannelPreference.Stable;
  },
  getState: () => ({
    status: 'idle',
    source: null,
    info: null,
    progress: null,
    errorMessage: null,
  }),
});
register('window', { isMaximized: () => false, isFullScreen: () => false });
// This native API checks success before checking its cancellation flag.
// A cancelled file dialog is a completed request, never a completed export.
register('log', {
  exportZip: () => {
    desktopOnly();
    return { success: true, canceled: true };
  },
});
register('auth', {
  getCommunityUser: () => ({
    success: true,
    user: { id: 'local', email: 'visitor@zhiyuan.local' },
  }),
  getToken: () => null,
  getState: () => null,
});
register('agents', {
  list: () => agents,
  get: id => agents.find(agent => agent.id === id) ?? agents[0],
  getPresetExperts: () => ({ success: true, experts: [] }),
  create: input => {
    const agent = { ...agentTemplate, ...object(input), id: crypto.randomUUID(), isDefault: false };
    agents.push(agent);
    return agent;
  },
  update: (id, input) => {
    const agent = agents.find(item => item.id === id);
    if (agent) Object.assign(agent, input);
    return agent;
  },
  delete: id => {
    const index = agents.findIndex(item => item.id === id);
    if (index > 0) agents.splice(index, 1);
    return true;
  },
});
const apiConfig = {
  apiKey: 'browser-local',
  baseURL: 'https://demo.invalid',
  model: 'Qwen3-8B',
  apiType: 'openai',
};
handlers.checkApiConfig = () => ({ hasConfig: true, config: apiConfig });
handlers.getApiConfig = () => apiConfig;
handlers.getRecentCwds = () => [workspace.path];
handlers.generateSessionTitle = input => String(input).slice(0, 40);
register('theme', { updateTitleBar: () => undefined });
for (const name of ['autoLaunch', 'preventSleep']) {
  register(name, {
    get: () => ({ enabled: false }),
  });
}
register('openaiCodexOAuth', { status: () => ({ loggedIn: false }) });
installImMocks(register, defaults.im);
register('memory', {
  list: () => ({ ...ok, data: [] }),
  resolveSessionTitles: () => ({ ...ok, data: [] }),
});
register('workbenchTask', { getCurrent: () => ({ ...ok, task: null }) });
register('dialog', {
  selectDirectory: () => ({ ...ok, path: workspace.path }),
  selectFile: () => ({ ...ok, path: '/workspace/q3-sales/data/sales_q3.xlsx' }),
  selectFiles: () => ({ ...ok, paths: ['/workspace/q3-sales/data/sales_q3.xlsx'] }),
});
register('project', {
  getDefaultBaseDir: () => ({ ...ok, path: '/workspace' }),
  createDirectory: input => ({ ...ok, path: `/workspace/${object(input).name}` }),
  ensureScratchDir: () => ({ ...ok, path: workspace.path }),
  createRandomWorkspace: () => ({ ...ok, path: workspace.path }),
});
register('api', {
  onStreamData: () => undefined,
  onStreamDone: () => undefined,
  onStreamError: () => undefined,
  onStreamAbort: () => undefined,
  fetch: input =>
    /\/(chat\/completions|messages)\/?$/.test(String(object(input).url))
      ? {
          ok: true,
          status: 200,
          statusText: 'OK',
          headers: {},
          data: { choices: [{ message: { content: chatSamples(english)[0].reply } }] },
        }
      : {
          ok: false,
          status: 403,
          statusText: 'Forbidden',
          headers: {},
          data: { error: desktopOnly() },
        },
  fetchModels: () => ({ success: true, models: [{ id: 'Qwen3-8B', name: 'Qwen3 8B' }] }),
  stream: input => {
    const options = object(input);
    const requestId = String(options.requestId);
    const chunks = chatSamples(english)[0].reply.match(/.{1,36}/gs) ?? [];
    chunks.forEach((chunk, index) =>
      window.setTimeout(
        () => {
          if (cancelledStreams.has(requestId)) return;
          const data = String(options.url).includes('/messages')
            ? { type: 'content_block_delta', delta: { type: 'text_delta', text: chunk } }
            : { choices: [{ delta: { content: chunk } }] };
          emit(`api.onStreamData:${requestId}`, `data: ${JSON.stringify(data)}\n\n`);
          if (index === chunks.length - 1) emit(`api.onStreamDone:${requestId}`, undefined);
        },
        100 + index * 45,
      ),
    );
    return { ok: true, status: 200, statusText: 'OK', headers: {} };
  },
  cancelStream: id => {
    cancelledStreams.add(String(id));
    emit(`api.onStreamAbort:${id}`, undefined);
    return true;
  },
});
const cancelledStreams = new Set<string>();
register('cowork', {
  getRuntimeSnapshots: () => [],
  getRunSnapshot: id => ({
    ...ok,
    snapshot: {
      sessionId: id,
      runId: `run-${id}`,
      sequence: 1,
      phase:
        sessions.find(item => item.id === id)?.status === CoworkSessionStatusValue.Running
          ? CoworkRunPhase.Writing
          : CoworkRunPhase.Completed,
      running: sessions.find(item => item.id === id)?.status === CoworkSessionStatusValue.Running,
      startedAt: now,
      confirmedAt: Date.now(),
      lastProgressAt: Date.now(),
    },
  }),
  saveSession: input => {
    const session = input as CoworkSession;
    const index = sessions.findIndex(item => item.id === session.id);
    if (index >= 0) sessions[index] = structuredClone(session);
    else sessions.unshift(structuredClone(session));
    return { ...ok, session };
  },
  getConfig: () => ({ ...ok, config: coworkConfig }),
  setConfig: input => {
    coworkConfig = { ...coworkConfig, ...object(input) };
    return { ...ok, config: coworkConfig };
  },
  listWorkspaces: () => ({ ...ok, workspaces }),
  ensureWorkspace: input => {
    const options = object(input);
    let item = workspaces.find(group => group.path === options.path);
    if (!item) {
      item = {
        ...workspace,
        id: crypto.randomUUID(),
        path: String(options.path),
        name:
          String(options.name || options.path)
            .split('/')
            .at(-1) || workspace.name,
      };
      workspaces.push(item);
    }
    return { ...ok, workspace: item };
  },
  renameWorkspace: (id, name) => {
    const group = workspaces.find(item => item.id === id);
    if (group) group.name = String(name);
    return { ...ok, workspace: group };
  },
  deleteWorkspace: id => {
    const index = workspaces.findIndex(item => item.id === id);
    if (index >= 0) workspaces.splice(index, 1);
    return {
      ...ok,
      deletedSessionIds: sessions.filter(item => item.workspaceId === id).map(item => item.id),
    };
  },
  listSessions: input => ({
    ...ok,
    sessions: sessions.filter(
      session =>
        (!object(input).workspaceId || session.workspaceId === object(input).workspaceId) &&
        (!object(input).mode || session.mode === object(input).mode) &&
        (!Array.isArray(object(input).sources) ||
          (object(input).sources as unknown[]).includes(session.source)),
    ),
    hasMore: false,
  }),
  getSession: id => {
    const session = sessions.find(session => session.id === id);
    return session
      ? { ...ok, session }
      : { success: false, error: phrase('会话已删除。', 'This session was deleted.') };
  },
  getSessionMessages: input => {
    const options = object(input);
    const items = sessions.find(session => session.id === options.sessionId)?.messages ?? [];
    const offset = Math.max(0, Number(options.offset) || 0);
    const limit = Math.max(1, Number(options.limit) || items.length);
    return { ...ok, messages: items.slice(offset, offset + limit), offset, total: items.length };
  },
  getApiConfig: () => ({
    ...ok,
    config: {
      apiKey: 'browser-local',
      baseUrl: 'https://demo.invalid',
      model: 'Qwen3-8B',
      apiFormat: 'openai',
    },
  }),
  remoteManaged: () => ({ ...ok, remoteManaged: false }),
  getRuntimeStatus: () => ({ ready: true, status: 'ready' }),
  getSessionRuntimeStats: () => ({
    ...ok,
    stats: { contextUsage: { usedTokens: 3800, contextWindowTokens: 32768 } },
  }),
  listSessionArtifacts: () => ({ ...ok, artifacts: [] }),
  getSessionArtifacts: () => ({ ...ok, artifacts: [] }),
  listPendingMessages: () => ({ ...ok, items: [] }),
  renameSession: (id, title) => {
    const session = sessions.find(item => item.id === id);
    if (session) session.title = String(title);
    return ok;
  },
  setSessionPinned: input => {
    const session = sessions.find(item => item.id === object(input).sessionId);
    if (session) session.pinned = Boolean(object(input).pinned);
    return { ...ok, pinOrder: 0 };
  },
  deleteSession: id => {
    const index = sessions.findIndex(item => item.id === id);
    if (index >= 0) sessions.splice(index, 1);
    return ok;
  },
  startSession: input => {
    const options = object(input);
    const session = {
      ...structuredClone(sessionTemplate),
      id: crypto.randomUUID(),
      title: String(options.title || options.prompt || phrase('新任务', 'New task')).slice(0, 40),
      workspaceId: String(options.workspaceId || workspace.id),
      mode:
        options.mode === CoworkSessionMode.Chat ? CoworkSessionMode.Chat : CoworkSessionMode.Work,
      cwd: String(options.cwd || workspace.path),
      messages: [
        { ...messages[0], id: crypto.randomUUID(), content: String(options.prompt || '') },
      ],
      totalMessages: 1,
      status: CoworkSessionStatusValue.Running,
    };
    sessions.unshift(session);
    complete(session.id);
    return { ...ok, session };
  },
  continueSession: input => {
    const options = object(input);
    const session = sessions.find(item => item.id === options.sessionId);
    if (session) {
      const message = {
        ...messages[0],
        id: crypto.randomUUID(),
        content: String(options.prompt || ''),
      };
      session.messages.push(message);
      session.status = CoworkSessionStatusValue.Running;
      emit(
        'cowork.onStreamUiEvent',
        sequencer.next({ type: PiUiEventType.Message, sessionId: session.id, message }),
      );
      complete(session.id);
    }
    return { ...ok, session };
  },
  stopSession: id => {
    stoppedSessions.add(String(id));
    const session = sessions.find(item => item.id === id);
    if (session) session.status = CoworkSessionStatusValue.Completed;
    emit(
      'cowork.onStreamUiEvent',
      sequencer.next({ type: PiUiEventType.Stopped, sessionId: String(id) }),
    );
    return ok;
  },
});
const modelCatalog = {
  status: { state: 'running', version: '1.0.0', enabled: true },
  defaultModelId: 'Qwen3-8B',
  models: [
    {
      id: 'Qwen3-8B',
      owned_by: 'Qwen',
      display_name: 'Qwen3 8B',
      context_window: 32768,
      reasoning: true,
      modalities: { input: ['text'], output: ['text'] },
    },
  ],
};
register('magpie', {
  status: () => modelCatalog.status,
  catalog: () => modelCatalog,
  models: () => modelCatalog.models,
  selectDefault: () => modelCatalog,
});
const stoppedSessions = new Set<string>();
function complete(id: string) {
  window.setTimeout(() => {
    const session = sessions.find(item => item.id === id);
    if (!session || stoppedSessions.has(id)) return;
    const message = {
      ...messages[messages.length - 1],
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      content:
        session.mode === CoworkSessionMode.Chat
          ? replyForChat(session, english)
          : (session.messages.findLast(
              item => item.type === 'assistant' && !item.metadata?.isThinking,
            )?.content ?? words.report),
    };
    session.messages.push(message);
    session.status = CoworkSessionStatusValue.Completed;
    emit(
      'cowork.onStreamUiEvent',
      sequencer.next({ type: PiUiEventType.Message, sessionId: id, message }),
    );
    emit(
      'cowork.onStreamUiEvent',
      sequencer.next({ type: PiUiEventType.Completed, sessionId: id }),
    );
  }, 850);
}
register('skills', {
  getRoot: () => ({ ...ok, path: '/skills' }),
  autoRoutingPrompt: () => ({ ...ok, prompt: null }),
  fetchMarketplace: input => {
    const page = Number(object(input).pageNumber || 1);
    const limit = Number(object(input).pageSize || 8);
    return {
      ...ok,
      data: JSON.stringify({
        data: {
          value: {
            marketplace: skills.slice((page - 1) * limit, page * limit).map(skill => ({
              id: skill.id,
              name: skill.name,
              description: skill.description,
              version: '1.0.0',
              url: `/skills/${skill.id}`,
              installSource: skill.id,
              source: { from: '知远', url: `/skills/${skill.id}` },
            })),
            hasMore: page * limit < skills.length,
          },
        },
      }),
    };
  },
  fetchMarketplaceContent: id => ({
    ...ok,
    content: skills.find(skill => skill.id === id)?.prompt || words.reasoning,
  }),
  download: () => ({ ...ok, skills }),
  confirmInstall: () => ({ ...ok, skills }),
  delete: id => {
    const index = skills.findIndex(item => item.id === id && !item.isBuiltIn);
    if (index >= 0) skills.splice(index, 1);
    return { ...ok, skills };
  },
  setEnabledBatch: input => {
    const options = object(input);
    skills
      .filter(skill => Array.isArray(options.ids) && options.ids.includes(skill.id))
      .forEach(skill => {
        skill.enabled = Boolean(options.enabled);
      });
    return { ...ok, skills };
  },
  getConfig: () => ({ ...ok, config: {} }),
  setConfig: () => ok,
  list: () => ({ ...ok, skills }),
  get: id => ({ ...ok, skill: skills.find(skill => skill.id === id) }),
  setEnabled: input => {
    const skill = skills.find(item => item.id === object(input).id);
    if (skill) skill.enabled = Boolean(object(input).enabled);
    return { ...ok, skills };
  },
  setPinned: input => {
    const skill = skills.find(item => item.id === object(input).id);
    if (skill) skill.pinned = Boolean(object(input).pinned);
    return { ...ok, skills };
  },
  getLocalSkillDescriptions: () => ({ ...ok, descriptions: {} }),
  getMarketplaceSkillDescriptions: () => ({ ...ok, descriptions: {} }),
  read: () => ({ ...ok, content: words.draft }),
  getContent: () => ({ ...ok, content: words.draft }),
});
register('activity', { list: () => ({ ...ok, runs: activityRuns }) });
const inferenceMocks = createLocalInferenceMocks({
  catalog: models,
  emit,
  unavailable: words.desktopOnly,
});
// The generic bridge widens IPC arguments; each handler above is checked
// against the client's exact preload signature before this adaptation.
register('llamacpp', inferenceMocks as unknown as Record<string, Handler>);
register('marketplace', {
  cancelSearch: () => undefined,
  search: input => {
    const params = object(object(input).params);
    const query = String(params.query || '').toLowerCase();
    const filtered = models.filter(
      model =>
        model.name.toLowerCase().includes(query) &&
        (!params.task || params.task === 'all' || model.capability === params.task),
    );
    const limit = Number(params.limit || 6);
    const page = Number(params.pageNumber || 1);
    return {
      models: filtered.slice((page - 1) * limit, page * limit),
      totalCount: filtered.length,
      hasMore: page * limit < filtered.length,
      source: 'curated',
    };
  },
});
register('hardware', {
  nvidiaSmi: () => ({
    source: 'nvidia-smi',
    available: false,
    gpus: [],
    checkedAt: new Date().toISOString(),
  }),
  systemMemory: () => ({
    source: 'system',
    available: true,
    totalMemoryMiB: 32768,
    freeMemoryMiB: 24576,
    checkedAt: new Date().toISOString(),
  }),
});
const lists: TodoList[] = [];
register('todo', {
  list: input => {
    const query = object(input);
    return {
      ...ok,
      todos: todos.filter(
        todo =>
          (!query.query || todo.title.includes(String(query.query))) &&
          (!query.listId || todo.listId === query.listId) &&
          (query.view === TodoView.Completed
            ? todo.status === TodoStatus.Completed
            : todo.status !== TodoStatus.Completed) &&
          (query.view !== TodoView.Important || todo.important),
      ),
    };
  },
  listLists: () => ({ ...ok, lists }),
  create: input => {
    const todo: Todo = {
      ...todoTemplate,
      ...object(input),
      id: crypto.randomUUID(),
      status: TodoStatus.Active,
      steps: [],
      createdAt: Date.now(),
    };
    todos.push(todo);
    return { ...ok, todo };
  },
  update: input => {
    const todo = todos.find(item => item.id === object(input).todoId);
    if (todo) Object.assign(todo, input);
    return { ...ok, todo };
  },
  delete: id => {
    const index = todos.findIndex(item => item.id === id);
    if (index >= 0) todos.splice(index, 1);
    return ok;
  },
  createList: input => {
    const list = {
      id: crypto.randomUUID(),
      name: String(object(input).name),
      createdAt: now,
      updatedAt: now,
    };
    lists.push(list);
    return { ...ok, list };
  },
  updateList: input => {
    const list = lists.find(item => item.id === object(input).listId);
    if (list) Object.assign(list, input);
    return { ...ok, list };
  },
  deleteList: id => {
    const index = lists.findIndex(item => item.id === id);
    if (index >= 0) lists.splice(index, 1);
    return ok;
  },
  createStep: input => {
    const todo = todos.find(item => item.id === object(input).todoId);
    const step: TodoStep = {
      id: crypto.randomUUID(),
      todoId: String(object(input).todoId),
      title: String(object(input).title),
      completed: false,
      order: 0,
      createdAt: now,
      updatedAt: now,
    };
    todo?.steps.push(step);
    return { ...ok, step };
  },
  updateStep: input => {
    const step = todos.flatMap(todo => todo.steps).find(item => item.id === object(input).id);
    if (step) Object.assign(step, input);
    return { ...ok, step };
  },
  deleteStep: id => {
    todos.forEach(todo => {
      todo.steps = todo.steps.filter(step => step.id !== id);
    });
    return ok;
  },
});

// Only this browser-local object stands in for the preload bridge. No IPC,
// filesystem, shell commands, account requests, or model endpoints are exposed.
installFeatureMocks(register, emit);
const capabilities: Array<{ path: string; operation: DemoOperation }> = [];
const bridge = createDemoBridge({
  defaults,
  handlers,
  unsupported: desktopOnly,
  failed: operationFailed,
  subscribe: (path, args) => {
    const keyed = path.startsWith('api.onStream');
    const name = keyed ? `${path}:${args[0]}` : path;
    const candidate = args[keyed ? 1 : 0];
    if (typeof candidate !== 'function') return () => undefined;
    const listener = candidate as (data: unknown) => void;
    const subscriptions = listeners.get(name) ?? new Set();
    listeners.set(name, subscriptions);
    subscriptions.add(listener);
    return () => subscriptions.delete(listener);
  },
  called: (path, operation) =>
    window.dispatchEvent(
      new CustomEvent('zhiyuan-demo:operation', { detail: { path, operation } }),
    ),
  described: (path, operation) => capabilities.push({ path, operation }),
});
bridge.platform = 'win32';
bridge.arch = 'x64';
Object.defineProperty(window, 'electron', { value: bridge, writable: false });
window.dispatchEvent(new CustomEvent('zhiyuan-demo:capabilities', { detail: capabilities }));
