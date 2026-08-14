import type { V2Locale } from "./types";

export type DemoVariant = "workspace" | "models" | "skills";

export type DemoFixture = {
  aria: Record<DemoVariant, string>;
  shared: {
    work: string;
    chat: string;
    newTask: string;
    localModels: string;
    automation: string;
    experts: string;
    search: string;
    project: string;
    conversation: string;
    settings: string;
    running: string;
    complete: string;
    pending: string;
    sampleDisclosure: string;
    context: string;
    tools: string;
    artifacts: string;
    currentTask: string;
    inputPlaceholder: string;
  };
  workspace: {
    title: string;
    task: string;
    sourcesTitle: string;
    sources: Array<{ name: string; kind: string }>;
    steps: Array<{ title: string; detail: string }>;
    documentTitle: string;
    documentMeta: string;
    summaryTitle: string;
    summary: string;
    progressTitle: string;
    openItems: string;
    toolActivity: string;
    toolNames: string[];
    artifactTitle: string;
  };
  models: {
    title: string;
    marketplace: string;
    installed: string;
    search: string;
    entries: Array<{ name: string; variant: string; state: string }>;
    selected: string;
    format: string;
    variant: string;
    agentReady: string;
    stages: string[];
    configuration: string;
    configurationRows: Array<[string, string]>;
    toolCalling: string;
    available: string;
    runtimeLog: string;
    logs: string[];
  };
  skills: {
    title: string;
    search: string;
    library: string;
    entries: Array<{ name: string; detail: string }>;
    selected: string;
    description: string;
    workflow: string;
    workflowSteps: string[];
    capabilities: string;
    capabilityRows: string[];
    checks: string;
    checkRows: string[];
    status: string;
    enabled: string;
    boundary: string;
    boundaryRows: string[];
    files: string;
    fileRows: string[];
  };
};

const ZH: DemoFixture = {
  aria: {
    workspace: "自动演示：知远读取示例材料并整理项目周报",
    models: "自动演示：知远下载、校验并加载示例 GGUF 模型",
    skills: "自动演示：知远检查并启用示例技能",
  },
  shared: {
    work: "工作",
    chat: "对话",
    newTask: "新建任务",
    localModels: "本地模型",
    automation: "自动化",
    experts: "专家",
    search: "搜索",
    project: "项目",
    conversation: "对话",
    settings: "设置",
    running: "运行中",
    complete: "已完成",
    pending: "待开始",
    sampleDisclosure: "界面演示 · 使用示例数据，不读取本机文件",
    context: "上下文",
    tools: "工具",
    artifacts: "产物",
    currentTask: "整理项目周报",
    inputPlaceholder: "分配一个任务或提问任何问题",
  },
  workspace: {
    title: "整理项目周报",
    task: "读取项目文件夹里的会议纪要和进度表，整理一份本周汇报，标出仍需确认的事项。",
    sourcesTitle: "源文件",
    sources: [
      { name: "需求评审会议纪要.md", kind: "MD" },
      { name: "项目进度表.xlsx", kind: "XLSX" },
      { name: "风险清单.md", kind: "MD" },
    ],
    steps: [
      { title: "读取 3 份材料", detail: "会议纪要、进度表与风险清单" },
      { title: "整理项目时间线", detail: "提取本周进展与待确认事项" },
      { title: "生成进展图表", detail: "把数据写入周报草稿" },
      { title: "写入本周汇报", detail: "保存到当前项目工作区" },
    ],
    documentTitle: "本周汇报.md",
    documentMeta: "Markdown · 工作区产物",
    summaryTitle: "本周摘要",
    summary: "项目材料已整理，主要进展与待确认事项已经写入周报草稿。",
    progressTitle: "进展概览",
    openItems: "仍需确认 3 项",
    toolActivity: "工具活动",
    toolNames: ["文件读取", "表格解析", "时间线整理", "图表生成"],
    artifactTitle: "本周汇报.md",
  },
  models: {
    title: "本地推理 / 模型市场",
    marketplace: "模型市场",
    installed: "我的模型",
    search: "搜索 GGUF 模型",
    entries: [
      { name: "GGUF 模型", variant: "Q4_K_M", state: "正在下载" },
      { name: "GGUF 模型", variant: "Q5_K_M", state: "可下载" },
      { name: "GGUF 模型", variant: "Q8_0", state: "已校验" },
    ],
    selected: "本地 GGUF 模型",
    format: "GGUF",
    variant: "Q4_K_M",
    agentReady: "可用于 Agent",
    stages: ["下载模型", "校验文件", "注册模型", "加载完成"],
    configuration: "运行配置",
    configurationRows: [
      ["量化变体", "Q4_K_M"],
      ["加载方式", "本地运行时"],
      ["模型状态", "已注册"],
      ["工作流接入", "可选择"],
    ],
    toolCalling: "工具调用能力",
    available: "按模型能力显示",
    runtimeLog: "运行日志",
    logs: ["准备下载任务", "校验模型文件", "注册到本地模型库", "模型已加载"],
  },
  skills: {
    title: "技能中心",
    search: "搜索技能",
    library: "技能库",
    entries: [
      { name: "网页调研", detail: "检索与整理公开信息" },
      { name: "文档整理", detail: "读取材料并提炼要点" },
      { name: "项目周报", detail: "整理进展与待确认事项" },
      { name: "浏览器操作", detail: "按步骤执行网页任务" },
    ],
    selected: "项目周报",
    description: "读取项目材料，整理进展并生成结构化周报。",
    workflow: "工作流",
    workflowSteps: ["收集信息", "整理提炼", "生成周报", "写入工作区"],
    capabilities: "技能能力",
    capabilityRows: ["读取项目数据", "文档生成与写入", "文件归档"],
    checks: "安装与校验",
    checkRows: ["检查技能文件", "检查依赖", "绑定工作区"],
    status: "运行状态",
    enabled: "已启用",
    boundary: "权限边界",
    boundaryRows: ["当前工作区范围", "敏感操作仍需确认", "联网能力按配置使用"],
    files: "技能文件",
    fileRows: ["SKILL.md", "references/", "scripts/"],
  },
};

const EN: DemoFixture = {
  aria: {
    workspace: "Automatic preview: ZhiYuan reads sample material and drafts a project update",
    models: "Automatic preview: ZhiYuan downloads, verifies, and loads a sample GGUF model",
    skills: "Automatic preview: ZhiYuan checks and enables a sample skill",
  },
  shared: {
    work: "Work",
    chat: "Chat",
    newTask: "New task",
    localModels: "Local models",
    automation: "Automation",
    experts: "Experts",
    search: "Search",
    project: "Project",
    conversation: "Conversation",
    settings: "Settings",
    running: "Running",
    complete: "Complete",
    pending: "Pending",
    sampleDisclosure: "Interface preview · Sample data only; no local files are read",
    context: "Context",
    tools: "Tools",
    artifacts: "Artifacts",
    currentTask: "Project weekly update",
    inputPlaceholder: "Assign a task or ask a question",
  },
  workspace: {
    title: "Project weekly update",
    task: "Read the meeting notes and progress sheet in the project folder, draft a weekly update, and flag the items that still need confirmation.",
    sourcesTitle: "Source files",
    sources: [
      { name: "review-notes.md", kind: "MD" },
      { name: "project-progress.xlsx", kind: "XLSX" },
      { name: "risk-list.md", kind: "MD" },
    ],
    steps: [
      { title: "Read 3 source files", detail: "Meeting notes, progress sheet, and risk list" },
      { title: "Build the timeline", detail: "Extract progress and open items" },
      { title: "Generate the chart", detail: "Add project data to the draft" },
      { title: "Write the update", detail: "Save it to the current workspace" },
    ],
    documentTitle: "weekly-update.md",
    documentMeta: "Markdown · Workspace artifact",
    summaryTitle: "Weekly summary",
    summary: "The project material is organized. Progress and open items are now in the weekly update draft.",
    progressTitle: "Progress overview",
    openItems: "3 items need confirmation",
    toolActivity: "Tool activity",
    toolNames: ["File reader", "Spreadsheet parser", "Timeline builder", "Chart generator"],
    artifactTitle: "weekly-update.md",
  },
  models: {
    title: "Local inference / Model marketplace",
    marketplace: "Model marketplace",
    installed: "My models",
    search: "Search GGUF models",
    entries: [
      { name: "GGUF model", variant: "Q4_K_M", state: "Downloading" },
      { name: "GGUF model", variant: "Q5_K_M", state: "Available" },
      { name: "GGUF model", variant: "Q8_0", state: "Verified" },
    ],
    selected: "Local GGUF model",
    format: "GGUF",
    variant: "Q4_K_M",
    agentReady: "Available to Agent",
    stages: ["Download", "Verify file", "Register model", "Loaded"],
    configuration: "Runtime configuration",
    configurationRows: [
      ["Quantization", "Q4_K_M"],
      ["Runtime", "Local runtime"],
      ["Model status", "Registered"],
      ["Workflow access", "Selectable"],
    ],
    toolCalling: "Tool calling",
    available: "Shown when supported",
    runtimeLog: "Runtime log",
    logs: ["Preparing download", "Verifying model file", "Registering local model", "Model loaded"],
  },
  skills: {
    title: "Skills",
    search: "Search skills",
    library: "Skill library",
    entries: [
      { name: "Web research", detail: "Find and organize public information" },
      { name: "Document review", detail: "Read material and extract key points" },
      { name: "Weekly update", detail: "Organize progress and open items" },
      { name: "Browser control", detail: "Carry out browser steps" },
    ],
    selected: "Weekly update",
    description: "Read project material, organize progress, and create a structured update.",
    workflow: "Workflow",
    workflowSteps: ["Collect information", "Organize findings", "Create update", "Write to workspace"],
    capabilities: "Capabilities",
    capabilityRows: ["Read project data", "Generate and write documents", "Archive files"],
    checks: "Install and verify",
    checkRows: ["Check skill files", "Check dependencies", "Bind workspace"],
    status: "Runtime status",
    enabled: "Enabled",
    boundary: "Permission boundary",
    boundaryRows: ["Current workspace scope", "Sensitive actions still require approval", "Network access follows configuration"],
    files: "Skill files",
    fileRows: ["SKILL.md", "references/", "scripts/"],
  },
};

export const DEMO_FIXTURES: Record<V2Locale, DemoFixture> = {
  "zh-CN": ZH,
  en: EN,
};
