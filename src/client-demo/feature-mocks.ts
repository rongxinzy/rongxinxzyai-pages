import {
  CodingAgentDriverKind,
  CodingAgentProfileId,
  CodingAgentProfileStatus,
  CodingLaneStatus,
  CodingMissionStatus,
  type CodingRoomSnapshot,
  type CodingWorkspaceSummary,
  type CodingAgentProfile,
} from '@shared/codingAgent';
import {
  ScheduleKind,
  SessionTarget,
  WakeMode,
  PayloadKind,
  DeliveryMode,
  TaskStatus,
} from '@client/../scheduledTask/constants';
import type { ScheduledTask, ScheduledTaskRunWithName } from '@client/../scheduledTask/types';
import {
  now,
  phrase,
  words,
  workspace,
  sessions,
  skills,
  agents,
  sessionSamples,
} from './sample-data';
import { codingTurnEvents } from './coding-events';
import { desktopOnly } from './boundary-notice';

type Handler = (...args: unknown[]) => unknown;
type Register = (prefix: string, methods: Record<string, Handler>) => void;
const object = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
const ok = { success: true };
export function installFeatureMocks(
  register: Register,
  emit: (name: string, value: unknown) => void,
) {
  const taskState = {
    nextRunAtMs: now + 86400000,
    lastRunAtMs: now - 3600000,
    lastStatus: TaskStatus.Success,
    lastError: null,
    lastDurationMs: 60000,
    runningAtMs: null,
    consecutiveErrors: 0,
  };
  const tasks: ScheduledTask[] = [
    {
      id: 'weekly-sales',
      name: phrase('每周销售简报', 'Weekly sales brief'),
      description: words.reasoning,
      enabled: true,
      schedule: { kind: ScheduleKind.Cron, expr: '0 9 * * 1', tz: 'Asia/Shanghai' },
      sessionTarget: SessionTarget.Isolated,
      wakeMode: WakeMode.Now,
      payload: { kind: PayloadKind.AgentTurn, message: words.draft, model: 'custom_0/Qwen3-8B' },
      delivery: { mode: DeliveryMode.None },
      workspaceId: workspace.id,
      sessionKey: null,
      state: { ...taskState },
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    },
  ];
  const runs: ScheduledTaskRunWithName[] = [
    {
      id: 'weekly-run',
      taskId: tasks[0].id,
      taskName: tasks[0].name,
      sessionId: sessions[0].id,
      sessionKey: null,
      status: TaskStatus.Success,
      startedAt: new Date(now - 3600000).toISOString(),
      finishedAt: new Date(now - 3540000).toISOString(),
      durationMs: 60000,
      error: null,
    },
  ];
  const taskTemplate = structuredClone(tasks[0]);
  const runTemplate = structuredClone(runs[0]);
  const agentTemplate = structuredClone(agents[0]);
  register('scheduledTasks', {
    list: () => ({ ...ok, tasks }),
    listChannels: () => ({ ...ok, channels: [] }),
    listConversations: () => ({ ...ok, conversations: [] }),
    listDeliveries: () => ({ ...ok, deliveries: [] }),
    listRuns: () => ({ ...ok, runs }),
    listAllRuns: () => ({ ...ok, runs }),
    getRuns: () => ({ ...ok, runs }),
    create: input => {
      const task = {
        ...structuredClone(taskTemplate),
        ...object(input),
        id: crypto.randomUUID(),
        state: { ...taskState },
      };
      tasks.push(task);
      return { ...ok, task };
    },
    update: (id, input) => {
      const task = tasks.find(item => item.id === id);
      if (task) Object.assign(task, input);
      return { ...ok, task };
    },
    toggle: (id, enabled) => {
      const task = tasks.find(item => item.id === id);
      if (task) task.enabled = Boolean(enabled);
      return { ...ok, task };
    },
    delete: id => {
      const index = tasks.findIndex(item => item.id === id);
      if (index >= 0) tasks.splice(index, 1);
      return ok;
    },
    preflight: () => ({ ...ok, hasChannel: false }),
    runManually: async id => {
      const task = tasks.find(item => item.id === id);
      if (!task) return { success: false };
      task.state.runningAtMs = Date.now();
      emit('scheduledTasks.onStatusUpdate', { taskId: task.id, state: task.state });
      await new Promise(resolve => window.setTimeout(resolve, 800));
      task.state = { ...taskState, runningAtMs: null, lastRunAtMs: Date.now() };
      emit('scheduledTasks.onStatusUpdate', { taskId: task.id, state: task.state });
      runs.unshift({
        ...runTemplate,
        id: crypto.randomUUID(),
        taskId: task.id,
        taskName: task.name,
      });
      return ok;
    },
    getChannelOptions: () => ({ ...ok, channels: [] }),
    getConversations: () => ({ ...ok, conversations: [] }),
  });
  const profile: CodingAgentProfile = {
    id: CodingAgentProfileId.Builtin,
    name: '知远',
    description: words.reasoning,
    driverKind: CodingAgentDriverKind.Builtin,
    status: CodingAgentProfileStatus.Ready,
    capabilities: {
      supportsLoadSession: true,
      supportsResumeSession: true,
      supportsPlans: true,
      supportsPermissions: true,
      supportsFilesystem: true,
      supportsTerminal: true,
      supportsConfigOptions: true,
      supportsUsage: true,
      supportsElicitation: false,
    },
    authMethods: [],
    command: null,
    args: [],
    environment: {},
    isBuiltin: true,
  };
  const codingRoot = '/workspace/q3-sales';
  const codingSamples = sessionSamples.map((sample, index) => ({
    ...sample,
    missionId: `q3-code-mission-${index}`,
    laneId: `q3-code-lane-${index}`,
  }));
  const snapshot: CodingRoomSnapshot = {
    room: {
      id: 'coding-room',
      name: workspace.name,
      workspaceRoot: codingRoot,
      defaultProfileId: profile.id,
      activeMissionId: codingSamples[0].missionId,
      activeLaneId: codingSamples[0].laneId,
    },
    profiles: [profile],
    missions: codingSamples.map(sample => ({
      id: sample.missionId,
      roomId: 'coding-room',
      title: sample.codeTitle,
      goal: sample.codePrompt,
      gitBaseline: null,
      status: CodingMissionStatus.Completed,
      createdAt: now,
      updatedAt: now,
    })),
    lanes: codingSamples.map(sample => ({
      id: sample.laneId,
      missionId: sample.missionId,
      profileId: profile.id,
      modelOverride: null,
      sourceRoot: codingRoot,
      executionRoot: codingRoot,
      configOptions: [],
      availableCommands: [],
      localSessionId: `coding-session-${sample.laneId}`,
      remoteSessionId: null,
      status: CodingLaneStatus.Completed,
      draft: '',
      scrollPosition: 0,
      pendingRecoveryPrompt: null,
      pendingRecoveryContext: null,
    })),
    assignments: [],
    elicitations: [],
    events: codingSamples.flatMap((sample, index) =>
      codingTurnEvents(sample, sample.laneId, index * 5 + 1),
    ),
  };
  const codingWorkspaces: CodingWorkspaceSummary[] = [
    {
      id: 'q3-code',
      name: workspace.name,
      primaryRoot: codingRoot,
      defaultProfileId: profile.id,
      sources: [{ id: 'source', workspaceId: 'q3-code', path: codingRoot, isPrimary: true }],
      activeSessionId: codingSamples[0].laneId,
      sessions: codingSamples.map(sample => ({
        id: sample.laneId,
        workspaceId: 'q3-code',
        missionId: sample.missionId,
        parentSessionId: null,
        title: sample.codeTitle,
        profileId: profile.id,
        sourceRoot: codingRoot,
        status: CodingLaneStatus.Completed,
        createdAt: now,
        updatedAt: now,
      })),
    },
  ];
  const workspaceTemplate = structuredClone(codingWorkspaces[0]);
  const codingResult = () => ({ ...ok, snapshot });
  function startCoding(input: unknown) {
    const options = object(input);
    const group =
      codingWorkspaces.find(item => item.id === options.workspaceId) ?? codingWorkspaces[0];
    if (!group)
      return { success: false, error: phrase('请先创建项目。', 'Create a project first.') };
    const lane = {
      ...structuredClone(snapshot.lanes[0]),
      id: crypto.randomUUID(),
      localSessionId: crypto.randomUUID(),
      draft: '',
    };
    snapshot.lanes.push(lane);
    snapshot.room.activeLaneId = lane.id;
    group.activeSessionId = lane.id;
    group.sessions.push({
      ...workspaceTemplate.sessions[0],
      id: lane.id,
      title: String(options.prompt || options.title || phrase('新会话', 'New session')).slice(
        0,
        40,
      ),
    });
    if (options.prompt)
      snapshot.events.push(
        ...codingTurnEvents(
          codingSamples[0],
          lane.id,
          snapshot.events.length + 1,
          String(options.prompt),
        ),
      );
    emit('codingAgent.onChanged', snapshot);
    return codingResult();
  }
  register('codingAgent', {
    createSession: startCoding,
    startSession: startCoding,
    getProfileConfigOptions: () => ({ ...ok, configOptions: snapshot.lanes[0].configOptions }),
    listPendingMessages: () => ({ ...ok, items: [] }),
    listWorkspaces: () => ({ ...ok, workspaces: codingWorkspaces }),
    listProfiles: () => ({ ...ok, profiles: snapshot.profiles }),
    bootstrap: codingResult,
    selectLane: input => {
      const lane = snapshot.lanes.find(item => item.id === object(input).laneId);
      if (lane) {
        snapshot.room.activeLaneId = lane.id;
        snapshot.room.activeMissionId = lane.missionId;
        const group = codingWorkspaces.find(item =>
          item.sessions.some(session => session.id === lane.id),
        );
        if (group) group.activeSessionId = lane.id;
      }
      return codingResult();
    },
    saveLaneView: input => {
      const lane = snapshot.lanes.find(item => item.id === object(input).laneId);
      if (lane) Object.assign(lane, object(input));
      return codingResult();
    },
    discoverAgents: codingResult,
    probeAgent: codingResult,
    trustProfile: codingResult,
    prepareLane: () => {
      snapshot.lanes[0].configOptions = [
        {
          id: 'mode',
          name: phrase('模式', 'Mode'),
          type: 'select',
          currentValue: 'code',
          options: [{ value: 'code', name: phrase('编程', 'Code') }],
        },
      ];
      return codingResult();
    },
    setLaneModelOverride: input => {
      snapshot.lanes[0].modelOverride = String(object(input).modelOverride);
      return codingResult();
    },
    prompt: input => {
      const options = object(input);
      const message = String(options.prompt || options.text || '');
      const laneId = String(options.laneId || snapshot.room.activeLaneId || snapshot.lanes[0].id);
      const sample = codingSamples.find(item => item.laneId === laneId) ?? codingSamples[0];
      snapshot.events.push(
        ...codingTurnEvents(sample, laneId, snapshot.events.length + 1, message),
      );
      emit('codingAgent.onChanged', snapshot);
      return codingResult();
    },
    previewLaneChanges: () => ({
      ...ok,
      preview: { laneId: snapshot.room.activeLaneId, diff: '' },
    }),
    gitStatus: () => ({
      ...ok,
      status: {
        isRepository: true,
        targetRoot: codingRoot,
        repositoryRoot: codingRoot,
        branch: 'main',
        head: 'q3-analysis',
        detached: false,
        upstream: null,
        ahead: 0,
        behind: 0,
        additions: 0,
        deletions: 0,
        files: [],
        isIsolated: false,
        isBusy: false,
        canMutate: false,
      },
    }),
    createWorkspace: input => {
      const next = {
        ...structuredClone(workspaceTemplate),
        ...object(input),
        id: crypto.randomUUID(),
        sessions: [],
        activeSessionId: null,
      };
      codingWorkspaces.push(next);
      return { ...ok, workspaces: codingWorkspaces };
    },
    updateWorkspace: input => {
      const group = codingWorkspaces.find(item => item.id === object(input).workspaceId);
      if (group) Object.assign(group, object(input));
      return { ...ok, workspaces: codingWorkspaces };
    },
    deleteWorkspace: id => {
      const index = codingWorkspaces.findIndex(item => item.id === id);
      if (index >= 0) codingWorkspaces.splice(index, 1);
      return { ...ok, workspaces: codingWorkspaces };
    },
    deleteSession: input => {
      codingWorkspaces.forEach(group => {
        group.sessions = group.sessions.filter(item => item.id !== object(input).laneId);
      });
      return { ...ok, workspaces: codingWorkspaces };
    },
    setLaneConfigOption: input => {
      const option = snapshot.lanes
        .flatMap(lane => lane.configOptions)
        .find(item => item.id === object(input).configId);
      if (option) option.currentValue = String(object(input).value);
      return codingResult();
    },
    cancel: codingResult,
  });
  register('agents', {
    getPresetExperts: () => ({
      ...ok,
      experts: [
        {
          name: 'sales-analyst',
          displayName: { zh: '销售分析师', en: 'Sales analyst' },
          profession: { zh: '经营分析', en: 'Business analysis' },
          displayDescription: { zh: words.reasoning, en: words.reasoning },
          categoryId: 'analysis',
          tags: [],
          quickPrompts: [{ zh: words.draft, en: words.draft }],
          workflow: words.tools,
          path: '/experts/sales-analyst',
        },
      ],
    }),
    importExpertPackage: () => {
      const agent = {
        ...agentTemplate,
        id: 'sales-analyst',
        name: phrase('销售分析师', 'Sales analyst'),
        presetId: 'sales-analyst',
        isDefault: false,
        source: 'preset' as const,
      };
      if (!agents.some(item => item.id === agent.id)) agents.push(agent);
      return { ...ok, agentIds: [agent.id], agents: [agent] };
    },
  });
  const servers = [
    {
      id: 'sales-files',
      name: phrase('销售资料', 'Sales documents'),
      description: words.reasoning,
      transportType: 'stdio',
      command: 'filesystem',
      args: ['/workspace/q3-sales'],
      env: {},
      enabled: true,
      isBuiltIn: false,
    },
  ];
  const serverTemplate = structuredClone(servers[0]);
  register('mcp', {
    list: () => ({ ...ok, servers }),
    fetchMarketplace: () => ({ ...ok, servers: [], categories: [] }),
    setEnabled: input => {
      const server = servers.find(item => item.id === object(input).id);
      if (server) server.enabled = Boolean(object(input).enabled);
      return { ...ok, servers };
    },
    testConnection: () => ({ success: false, error: desktopOnly(), tools: [] }),
    refreshBridge: () => ok,
    getFeishuCliStatus: () => ({ installed: false, authenticated: false }),
    create: input => {
      servers.push({
        ...structuredClone(serverTemplate),
        ...object(input),
        id: crypto.randomUUID(),
      });
      return { ...ok, servers };
    },
    update: (id, input) => {
      const server = servers.find(item => item.id === id);
      if (server) Object.assign(server, input);
      return { ...ok, servers };
    },
    delete: id => {
      const index = servers.findIndex(item => item.id === id);
      if (index >= 0) servers.splice(index, 1);
      return { ...ok, servers };
    },
  });
  register('quickActions', { list: () => ({ ...ok, actions: [] }) });
  register('skills', { getMarketplace: () => ({ ...ok, skills, hasMore: false }) });
}
