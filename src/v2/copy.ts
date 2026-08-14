import type { V2Locale, V2Platform } from "./types";

const GITHUB_URL = "https://github.com/rongxinzy/RongxinAI";

export type V2Copy = {
  localeName: string;
  languageSwitch: string;
  navigation: {
    aria: string;
    menu: string;
    close: string;
    product: string;
    workflow: string;
    localModels: string;
    enterprise: string;
    docs: string;
    download: string;
    github: string;
  };
  actions: {
    tryDemo: string;
    download: string;
    source: string;
    replay: string;
    viewProduct: string;
    learnEnterprise: string;
    contactEnterprise: string;
  };
  home: {
    heroTitle: string;
    heroLead: string;
    demoDisclosure: string;
    workflowTitle: string;
    workflowBody: string;
    workflowSteps: Array<{ title: string; body: string }>;
    localTitle: string;
    localBody: string;
    localFacts: string[];
    skillsTitle: string;
    skillsBody: string;
    skillRows: Array<{ title: string; body: string }>;
    automationTitle: string;
    automationBody: string;
    automationSchedule: string;
    automationTask: string;
    automationDestinations: string[];
    productTitle: string;
    productBody: string;
    productTabs: Array<{ id: "workspace" | "models" | "skills"; label: string; alt: string }>;
    trustTitle: string;
    trustBody: string;
    trustRows: Array<{ title: string; body: string; href: string }>;
    downloadTitle: string;
    downloadBody: string;
    windowsNote: string;
    signingNote: string;
    enterpriseTitle: string;
    enterpriseBody: string;
  };
  demo: {
    title: string;
    waiting: string;
    inProgress: string;
    completed: string;
    sampleTask: string;
    assistantIntro: string;
    steps: [string, string, string];
    permissionAnnouncement: string;
    tool: string;
    command: string;
    deny: string;
    approve: string;
    working: string;
    added: string;
    result: string;
    confirmationCount: string;
    artifact: string;
    artifactMeta: string;
    openArtifact: string;
    denialResult: string;
    model: string;
    placeholder: string;
    permissions: string;
    milestones: {
      planning: string;
      approval: string;
      complete: string;
      denied: string;
    };
    sidebar: {
      work: string;
      chat: string;
      newTask: string;
      local: string;
      automation: string;
      experts: string;
      search: string;
      project: string;
      conversation: string;
      settings: string;
    };
  };
  release: {
    loading: string;
    unavailable: string;
    linuxUnavailable: string;
    versionLabel: string;
    platformLabels: Record<V2Platform, string>;
    platformDetails: Record<V2Platform, string>;
    downloadLabels: Record<V2Platform, string>;
  };
  enterprise: {
    heroTitle: string;
    heroLead: string;
    traits: string[];
    scopeNote: string;
    comparisonTitle: string;
    comparisonBody: string;
    comparisonHeaders: [string, string, string];
    comparisonRows: Array<[string, string, string]>;
    architectureTitle: string;
    architectureBody: string;
    architectureNodes: string[];
    architectureLabels: [string, string];
    deliveryTitle: string;
    deliveryBody: string;
    deliverySteps: Array<{ title: string; body: string }>;
    contactTitle: string;
    contactBody: string;
    emailAction: string;
    communityQrAlt: string;
    officialQrAlt: string;
    communityQrLabel: string;
    officialQrLabel: string;
  };
  footer: {
    source: string;
    docs: string;
    enterprise: string;
    license: string;
    copyright: string;
  };
};

const ZH_COPY: V2Copy = {
  localeName: "中文",
  languageSwitch: "EN",
  navigation: {
    aria: "主导航",
    menu: "打开菜单",
    close: "关闭菜单",
    product: "产品",
    workflow: "工作方式",
    localModels: "本地模型",
    enterprise: "企业版",
    docs: "文档 ↗",
    download: "下载",
    github: "GitHub",
  },
  actions: {
    tryDemo: "体验一次",
    download: "下载知远",
    source: "查看源码",
    replay: "重新演示",
    viewProduct: "查看真实产品界面",
    learnEnterprise: "了解企业版",
    contactEnterprise: "联系企业团队",
  },
  home: {
    heroTitle: "把一项工作交给知远。",
    heroLead:
      "知远是一款开源、本地优先的桌面 Agent。它会读取材料、调用工具，并把结果留在工作区。敏感操作由你确认。",
    demoDisclosure: "界面演示 · 使用示例数据，不读取本机文件",
    workflowTitle: "从目标到交付，中间每一步都看得见。",
    workflowBody: "知远会先明确任务，再读取所需材料、调用工具；需要确认时会停下来。",
    workflowSteps: [
      { title: "明确任务", body: "确认目标、材料和交付物" },
      { title: "读取材料", body: "访问任务所需的文件" },
      { title: "调用工具", body: "按过程执行具体动作" },
      { title: "请求确认", body: "敏感操作由你决定" },
      { title: "交付结果", body: "文件和待确认事项留在工作区" },
    ],
    localTitle: "在自己的电脑上运行 GGUF 模型。",
    localBody:
      "知远可以管理 GGUF 模型，并把本地推理接入 Agent 工作流。模型下载和联网功能仍可能需要网络。",
    localFacts: ["模型市场", "参数配置", "本地推理"],
    skillsTitle: "把常用方法变成可复用技能。",
    skillsBody: "使用内置技能，连接 MCP 服务，也可以添加自己的技能。",
    skillRows: [
      { title: "内置技能", body: "网页搜索、文档处理、代码与浏览器等工作方法" },
      { title: "自定义技能", body: "把团队或个人的方法整理成可重复使用的步骤" },
      { title: "MCP 连接", body: "连接已配置的工具和业务系统" },
    ],
    automationTitle: "任务可以按时开始，结果按你的方式送达。",
    automationBody:
      "定时任务可以在桌面上运行，结果可留在应用或通过已配置的消息、邮件连接送达。",
    automationSchedule: "每周一 09:00",
    automationTask: "整理项目周报",
    automationDestinations: ["知远工作区", "消息连接", "邮件连接"],
    productTitle: "这就是知远现在的界面。",
    productBody: "工作台、模型市场和技能中心都来自当前版本。",
    productTabs: [
      { id: "workspace", label: "工作台", alt: "知远当前版本工作台界面" },
      { id: "models", label: "模型市场", alt: "知远当前版本模型市场界面" },
      { id: "skills", label: "技能中心", alt: "知远当前版本技能中心界面" },
    ],
    trustTitle: "源码、发布与权限都可以检查。",
    trustBody:
      "知远以开源方式发布。敏感操作经过权限流程，安装包和升级清单由公开发布流程生成。",
    trustRows: [
      { title: "源代码", body: "AGPL-3.0 · GitHub", href: GITHUB_URL },
      { title: "权限流程", body: "敏感操作需要确认", href: `${GITHUB_URL}/tree/main/src` },
      {
        title: "发布清单",
        body: "签名 · SHA-256",
        href: `${GITHUB_URL}/blob/main/.github/workflows/online-update-release.yml`,
      },
    ],
    downloadTitle: "把知远装进你的电脑。",
    downloadBody:
      "Windows 和 macOS 安装包随稳定版发布；Linux 构建可用时会显示在这里。版本信息来自稳定发布清单。",
    windowsNote:
      "Windows 离线安装包不含本地推理组件。Defender 排除项由安装向导单独征求授权。",
    signingNote: "升级清单附带签名与 SHA-256；平台厂商签名状态以发布说明为准。",
    enterpriseTitle: "需要统一管理身份、模型和连接？",
    enterpriseBody: "了解独立部署、组织权限和项目交付方案。",
  },
  demo: {
    title: "整理项目周报",
    waiting: "等待任务",
    inProgress: "执行中",
    completed: "已完成",
    sampleTask: "读取项目文件夹里的会议纪要和进度表，整理一份本周汇报，标出仍需确认的事项。",
    assistantIntro: "我来整理项目周报，先读取相关材料。",
    steps: ["已读取 3 份材料", "已整理时间线", "准备生成图表"],
    permissionAnnouncement: "需要权限确认",
    tool: "shell",
    command: "python scripts/build_weekly_chart.py",
    deny: "拒绝",
    approve: "允许",
    working: "正在生成图表",
    added: "已加入周报",
    result: "周报草稿已完成，已整理主要进展，并标出 3 项仍需确认的内容。",
    confirmationCount: "仍需确认 3 项",
    artifact: "本周汇报.md",
    artifactMeta: "Markdown · 12 KB",
    openArtifact: "打开产物",
    denialResult: "工具请求已拒绝。任务和已读取的材料仍保留在当前工作区。",
    model: "DeepSeek V4 Pro",
    placeholder: "分配一个任务或提问任何问题",
    permissions: "请求权限",
    milestones: {
      planning: "正在整理材料和执行步骤。",
      approval: "需要权限确认。",
      complete: "周报草稿已完成。",
      denied: "工具请求已拒绝。",
    },
    sidebar: {
      work: "工作",
      chat: "对话",
      newTask: "新建任务",
      local: "本地推理",
      automation: "自动化",
      experts: "专家",
      search: "搜索",
      project: "项目",
      conversation: "对话",
      settings: "设置",
    },
  },
  release: {
    loading: "正在读取当前稳定版本…",
    unavailable: "当前稳定版本暂时不可用。",
    linuxUnavailable: "当前稳定版没有 Linux 安装包。",
    versionLabel: "当前稳定版",
    platformLabels: {
      windows: "Windows x64",
      macos: "macOS Apple Silicon",
      linux: "Ubuntu x64",
      linuxAppImage: "Linux AppImage",
    },
    platformDetails: {
      windows: "离线安装包",
      macos: "Apple 芯片",
      linux: ".deb 安装包",
      linuxAppImage: "便携构建",
    },
    downloadLabels: {
      windows: "下载 Windows",
      macos: "下载 macOS",
      linux: "下载 Ubuntu 版",
      linuxAppImage: "下载 AppImage",
    },
  },
  enterprise: {
    heroTitle: "让 Agent 进入受控的企业工作环境。",
    heroLead: "桌面端承接员工工作，企业服务统一管理身份、模型、知识、工具和数据范围。",
    traits: ["独立部署", "统一治理", "项目交付"],
    scopeNote: "项目方案，能力范围以项目合同为准",
    comparisonTitle: "开源版负责个人工作，企业版增加组织边界。",
    comparisonBody: "身份、权限、模型、连接和运维由企业策略统一管理。",
    comparisonHeaders: ["能力维度", "开源版", "企业版 · 项目方案"],
    comparisonRows: [
      ["工作空间", "个人使用", "企业共享空间、模板与成员管理"],
      ["模型与工具", "按个人配置", "统一网关、策略、额度与连接治理"],
      ["数据与权限", "本地优先", "组织权限、审计与生命周期管理"],
      ["部署与服务", "社区自助", "独立部署、项目交付与持续运维"],
    ],
    architectureTitle: "桌面工作入口，企业服务统一治理。",
    architectureBody:
      "桌面端连接本地资料和工作过程；企业服务连接身份、共享知识、模型和业务系统。",
    architectureNodes: ["身份服务", "共享知识", "模型网关", "业务系统"],
    architectureLabels: ["员工与桌面端", "企业服务"],
    deliveryTitle: "从需求到验收，每一步都有明确交付物。",
    deliveryBody: "具体阶段和交付物以项目约定为准。",
    deliverySteps: [
      { title: "需求与方案", body: "范围与架构" },
      { title: "部署与初始化", body: "环境与配置" },
      { title: "联调与培训", body: "连接与使用手册" },
      { title: "试运行与验收", body: "验收记录" },
    ],
    contactTitle: "讨论企业部署与项目合作。",
    contactBody: "说明组织规模、部署环境和希望接入的系统，我们会据此准备方案。",
    emailAction: "发送邮件",
    communityQrAlt: "知远智能体交流群二维码",
    officialQrAlt: "知远公众号二维码",
    communityQrLabel: "知远智能体交流群",
    officialQrLabel: "知远公众号",
  },
  footer: {
    source: "源代码",
    docs: "文档 ↗",
    enterprise: "企业版",
    license: "AGPL-3.0 开源",
    copyright: "© 2026 北京容芯致远",
  },
};

const EN_COPY: V2Copy = {
  localeName: "EN",
  languageSwitch: "中文",
  navigation: {
    aria: "Main navigation",
    menu: "Open menu",
    close: "Close menu",
    product: "Product",
    workflow: "How it works",
    localModels: "Local models",
    enterprise: "Enterprise",
    docs: "Documentation ↗",
    download: "Download",
    github: "GitHub",
  },
  actions: {
    tryDemo: "Try the demo",
    download: "Download ZhiYuan",
    source: "View source",
    replay: "Replay",
    viewProduct: "View the real product interface",
    learnEnterprise: "Explore Enterprise",
    contactEnterprise: "Contact enterprise team",
  },
  home: {
    heroTitle: "Give ZhiYuan a task.",
    heroLead:
      "ZhiYuan is an open-source, local-first desktop agent. It works through your files and tools, returns the result to your workspace, and pauses before sensitive actions.",
    demoDisclosure: "Interface preview · Sample data only; no local files are read",
    workflowTitle: "From goal to deliverable, each step stays visible.",
    workflowBody:
      "ZhiYuan clarifies the task, reads the required material, and calls the right tools. It pauses when your approval is needed.",
    workflowSteps: [
      { title: "Clarify the task", body: "Confirm the goal, inputs, and deliverable" },
      { title: "Read material", body: "Access the files required for the task" },
      { title: "Call tools", body: "Carry out specific actions in sequence" },
      { title: "Request approval", body: "You decide before sensitive actions" },
      { title: "Deliver results", body: "Files and open items remain in the workspace" },
    ],
    localTitle: "Run GGUF models on your own device.",
    localBody:
      "ZhiYuan can manage GGUF models and use local inference in agent workflows. Model downloads and online features may still require a network.",
    localFacts: ["Model marketplace", "Runtime settings", "Local inference"],
    skillsTitle: "Turn repeatable methods into skills.",
    skillsBody: "Use built-in skills, connect MCP services, and add your own.",
    skillRows: [
      { title: "Built-in skills", body: "Workflows for web research, documents, code, and browser tasks" },
      { title: "Custom skills", body: "Package team or personal methods into repeatable steps" },
      { title: "MCP connections", body: "Connect configured tools and business systems" },
    ],
    automationTitle: "Schedule work and choose where results go.",
    automationBody:
      "Scheduled tasks can run on the desktop. Results can stay in the app or be delivered through configured messaging and email connections.",
    automationSchedule: "Monday · 09:00",
    automationTask: "Draft the project update",
    automationDestinations: ["ZhiYuan workspace", "Messaging connection", "Email connection"],
    productTitle: "This is ZhiYuan as it is today.",
    productBody: "The workbench, model marketplace, and skills center are part of the current desktop app.",
    productTabs: [
      { id: "workspace", label: "Workbench", alt: "Current ZhiYuan workbench interface" },
      { id: "models", label: "Model marketplace", alt: "Current ZhiYuan model marketplace interface" },
      { id: "skills", label: "Skills center", alt: "Current ZhiYuan skills center interface" },
    ],
    trustTitle: "Inspect the source, releases, and permissions.",
    trustBody:
      "ZhiYuan is released in the open. Sensitive actions go through an approval flow; installers and update manifests are produced by a public release workflow.",
    trustRows: [
      { title: "Source code", body: "AGPL-3.0 · GitHub", href: GITHUB_URL },
      { title: "Approval flow", body: "Sensitive actions require approval", href: `${GITHUB_URL}/tree/main/src` },
      {
        title: "Release manifests",
        body: "Signature · SHA-256",
        href: `${GITHUB_URL}/blob/main/.github/workflows/online-update-release.yml`,
      },
    ],
    downloadTitle: "Install ZhiYuan on your computer.",
    downloadBody:
      "Windows and macOS installers follow the stable release. Linux builds appear here when they are available. Version information comes from the stable release manifest.",
    windowsNote:
      "The Windows offline installer does not include local-inference components. The installer asks separately before adding any Defender exclusion.",
    signingNote:
      "Update manifests include a signature and SHA-256 hashes. Platform vendor-signing status is stated in each release.",
    enterpriseTitle: "Need one policy for identity, models, and connections?",
    enterpriseBody: "Review dedicated deployment, organizational access, and project delivery.",
  },
  demo: {
    title: "Project weekly update",
    waiting: "Waiting for a task",
    inProgress: "In progress",
    completed: "Complete",
    sampleTask:
      "Read the meeting notes and progress sheet in the project folder, draft a weekly update, and flag the items that still need confirmation.",
    assistantIntro: "I’ll draft the project update. First, I’ll read the relevant material.",
    steps: ["Read 3 files", "Built the timeline", "Ready to generate the chart"],
    permissionAnnouncement: "Permission Required",
    tool: "shell",
    command: "python scripts/build_weekly_chart.py",
    deny: "Deny",
    approve: "Approve",
    working: "Generating chart",
    added: "Added to the update",
    result: "The weekly update is ready with the main progress and 3 items that still need confirmation.",
    confirmationCount: "3 items still need confirmation",
    artifact: "weekly-update.md",
    artifactMeta: "Markdown · 12 KB",
    openArtifact: "Open artifact",
    denialResult: "The tool request was denied. The task and material already read remain in this workspace.",
    model: "DeepSeek V4 Pro",
    placeholder: "Assign a task or ask a question",
    permissions: "Ask permission",
    milestones: {
      planning: "Organizing the material and task steps.",
      approval: "Permission is required.",
      complete: "The weekly update is ready.",
      denied: "The tool request was denied.",
    },
    sidebar: {
      work: "Work",
      chat: "Chat",
      newTask: "New task",
      local: "Local inference",
      automation: "Automation",
      experts: "Experts",
      search: "Search",
      project: "Project",
      conversation: "Conversation",
      settings: "Settings",
    },
  },
  release: {
    loading: "Loading the current stable release…",
    unavailable: "The current stable release is temporarily unavailable.",
    linuxUnavailable: "No Linux installer is included in the current stable release.",
    versionLabel: "Current stable release",
    platformLabels: {
      windows: "Windows x64",
      macos: "macOS Apple Silicon",
      linux: "Ubuntu x64",
      linuxAppImage: "Linux AppImage",
    },
    platformDetails: {
      windows: "Offline installer",
      macos: "Apple silicon",
      linux: ".deb installer",
      linuxAppImage: "Portable build",
    },
    downloadLabels: {
      windows: "Download for Windows",
      macos: "Download for macOS",
      linux: "Download for Ubuntu",
      linuxAppImage: "Download AppImage",
    },
  },
  enterprise: {
    heroTitle: "Bring agent workflows into a governed work environment.",
    heroLead:
      "The desktop app is where employees work. Enterprise services govern identity, models, knowledge, tools, and data boundaries.",
    traits: ["Dedicated deployment", "Central governance", "Project delivery"],
    scopeNote: "Project scope; capabilities are governed by the delivery contract",
    comparisonTitle: "The open-source edition supports individual work. Enterprise adds organizational boundaries.",
    comparisonBody: "Identity, permissions, models, connections, and operations follow enterprise policy.",
    comparisonHeaders: ["Area", "Open source", "Enterprise · Project scope"],
    comparisonRows: [
      ["Workspace", "Individual use", "Shared workspaces, templates, and member management"],
      ["Models and tools", "Configured by each user", "Central gateways, policies, quotas, and connection governance"],
      ["Data and access", "Local-first", "Organizational access, audit, and lifecycle management"],
      ["Deployment and service", "Community-supported", "Dedicated deployment, project delivery, and ongoing operations"],
    ],
    architectureTitle: "Desktop work, governed by enterprise services.",
    architectureBody:
      "The desktop app connects local material and day-to-day work. Enterprise services connect identity, shared knowledge, models, and business systems.",
    architectureNodes: ["Identity", "Shared knowledge", "Model gateway", "Business systems"],
    architectureLabels: ["Employee and desktop app", "Enterprise services"],
    deliveryTitle: "Clear deliverables from discovery through acceptance.",
    deliveryBody: "The exact phases and deliverables follow the project agreement.",
    deliverySteps: [
      { title: "Discovery and design", body: "Scope and architecture" },
      { title: "Deployment and setup", body: "Environment and configuration" },
      { title: "Integration and training", body: "Connections and operating guide" },
      { title: "Pilot and acceptance", body: "Acceptance record" },
    ],
    contactTitle: "Discuss enterprise deployment and project delivery.",
    contactBody:
      "Tell us about your organization, deployment environment, and required system connections so we can prepare the right scope.",
    emailAction: "Send email",
    communityQrAlt: "QR code for the ZhiYuan community group",
    officialQrAlt: "QR code for the official ZhiYuan account",
    communityQrLabel: "ZhiYuan community group",
    officialQrLabel: "Official ZhiYuan account",
  },
  footer: {
    source: "Source code",
    docs: "Documentation ↗",
    enterprise: "Enterprise",
    license: "Open source under AGPL-3.0",
    copyright: "© 2026 Beijing Rongxin Zhiyuan",
  },
};

export const V2_COPY: Record<V2Locale, V2Copy> = {
  "zh-CN": ZH_COPY,
  en: EN_COPY,
};

export { GITHUB_URL };
