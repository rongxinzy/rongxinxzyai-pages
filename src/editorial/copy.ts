import type { SiteLocale } from "../shared/site-types";

export const GITHUB = "https://github.com/rongxinzy/RongxinAI";
export const isEnglish = (locale: SiteLocale) => locale === "en";

type ModelCard = {
  chip: string;
  status: "installed" | "fetch" | "light";
  statusText: string;
  title: string;
  desc: string;
  specs: Array<{ key: string; value: string }>;
};

type Principle = {
  title: string;
  body: string;
  foot: string;
};

export type EditorialCopy = {
  menu: string;
  close: string;
  skip: string;
  brandSub: string;
  navWorkflow: string;
  navInference: string;
  navEnterprise: string;
  navDocs: string;
  navBlog: string;
  headerDownload: string;
  star: string;
  releaseStable: string;
  releaseFallback: string;
  heroBadgeSub: string;
  headlineTop: string;
  headlineAccent: string;
  heroLead: string;
  heroCtaPrimary: string;
  agplChip: string;
  heroCtaSecondary: string;
  platforms: string[];
  showcaseOverline: string;
  showcaseTitle: string;
  showcaseLead: string;
  showcaseAltMain: string;
  showcaseCaptions: Array<{ title: string; desc: string }>;
  showcaseShots: Array<{ label: string; alt: string }>;
  modelsOverline: string;
  modelsTitle: string;
  modelsLead: string;
  monitorLabel: string;
  monitorValue: string;
  monitorState: string;
  modelCards: ModelCard[];
  benchLabel: string;
  benchTitle: string;
  benchNote: string;
  benchCurrent: string;
  benchMax: string;
  benchFlag: string;
  modelsNote: string;
  pillarsOverline: string;
  pillarsTitle: string;
  pillarsLead: string;
  principles: Principle[];
  downloadOverline: string;
  downloadTitle: string;
  downloadLead: string;
  downloadAssurance: string;
  sizeLabel: string;
  releases: string;
  version: string;
  loading: string;
  unavailable: string;
  noLinux: string;
  windowsNoteTitle: string;
  windowsNote: string;
  windowsGuide: string;
  signingNote: string;
  ossOverline: string;
  ossTitle: string;
  ossBody: string;
  cloneCommand: string;
  copyCommand: string;
  copiedCommand: string;
  ossStar: string;
  footerBrand: string;
  footerRelease: string;
  footerPlatforms: string;
  footerColumns: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
  footerLegal: string[];
  footerBoundary: string;
  copyright: string;
  enterpriseTitle: string[];
  enterpriseLead: string;
  contactAction: string;
  scope: string;
  architectureTitle: string;
  architecture: Array<{ title: string; items: string }>;
  deliveryOverline: string;
  deliveryTitle: string;
  delivery: Array<{ title: string; body: string }>;
  comparisonOverline: string;
  comparisonTitle: string;
  comparisonHint: string;
  headers: string[];
  comparison: string[][];
  contactOverline: string;
  contactTitle: string;
  contactBody: string;
  qr: string[];
};

const DOC_BASE = "/docs/";

export const COPY: Record<SiteLocale, EditorialCopy> = {
  "zh-CN": {
    menu: "导航菜单",
    close: "关闭菜单",
    skip: "跳到正文",
    brandSub: "Workstation Studio",
    navWorkflow: "功能与工作流",
    navInference: "本地推理引擎",
    navEnterprise: "企业服务",
    navDocs: "文档",
    navBlog: "博客",
    headerDownload: "免费下载",
    star: "Star",
    releaseStable: "稳定版发布",
    releaseFallback: "知远智能体",
    heroBadgeSub: "本地大模型推理与自动化工作台",
    headlineTop: "你的电脑，",
    headlineAccent: "你的 AI 工作室。",
    heroLead:
      "知远把资料、模型与工具放进一个工作台。写报告、做表格、改代码；内置高性能推理引擎直接管理与调用 GGUF 离线权重。数据留在本机，算力直接可用。",
    heroCtaPrimary: "免费下载客户端",
    agplChip: "AGPL-3.0",
    heroCtaSecondary: "查看产品界面",
    platforms: [
      "macOS (Apple Silicon / Intel)",
      "Windows (x64)",
      "Linux (deb / AppImage)",
    ],
    showcaseOverline: "DESKTOP WORKBENCH",
    showcaseTitle: "任务、模型与工具，一个工作台。",
    showcaseLead:
      "左侧进入本地推理、自动化与专家；模型市场搜索、安装、启动 GGUF 离线模型。",
    showcaseAltMain: "知远桌面客户端的模型市场，列出可安装的离线模型",
    showcaseCaptions: [
      {
        title: "模型市场",
        desc: "搜索、安装、启动离线模型，推理服务由工作台在后台管理。",
      },
      {
        title: "专家与技能",
        desc: "预封装的最佳实践与工具，按任务调用。",
      },
      {
        title: "本机工作区",
        desc: "任务在授权文件夹中执行，输出写回同一位置。",
      },
    ],
    showcaseShots: [
      {
        label: "主界面：一个输入框分配任务",
        alt: "知远桌面客户端主界面，中间是任务输入框",
      },
      {
        label: "专家：技能按任务安装调用",
        alt: "知远桌面客户端的专家页，列出已安装技能",
      },
    ],
    modelsOverline: "MODULE 02 // NATIVE INFERENCE ENGINE",
    modelsTitle: "模型，装进电脑。",
    modelsLead:
      "搜索、安装、启动 GGUF 离线模型。知远在后台管理推理服务，你现有的电脑就是算力中心。",
    monitorLabel: "VRAM 分配状态",
    monitorValue: "8.4 GB / 32 GB",
    monitorState: "正常运行",
    modelCards: [
      {
        chip: "Qwen 2.5 8B / 14B",
        status: "installed",
        statusText: "已安装",
        title: "多任务对话与深度推理",
        desc: "通用语言任务基准模型。中文公文撰写、表格结构化抽取与长文本总结。",
        specs: [
          { key: "量化格式", value: "GGUF (Q4_K_M / Q8_0)" },
          { key: "上下文长度", value: "32,768 Tokens" },
          { key: "显存建议", value: "≥ 10 GB 统一内存" },
        ],
      },
      {
        chip: "DeepSeek Coder 7B / 33B",
        status: "fetch",
        statusText: "一键拉取",
        title: "代码分析与工程重构",
        desc: "面向软件架构与脚本审查调优，读取本地代码仓库，执行函数级导读。",
        specs: [
          { key: "量化格式", value: "GGUF (IQ4_XS 高压缩)" },
          { key: "工具调用", value: "支持 Function Calling" },
          { key: "适用引擎", value: "本地推理引擎" },
        ],
      },
      {
        chip: "Llama 3.2 3B / 8B",
        status: "light",
        statusText: "轻巧低耗",
        title: "极速轻量与边缘推理",
        desc: "资源占用低，入门级设备也可获得流式响应，适合后台辅助与快速分类。",
        specs: [
          { key: "量化格式", value: "GGUF (Q4_0 / Q8_0)" },
          { key: "推理占用", value: "视量化等级而定" },
          { key: "适用场景", value: "后台静默辅助与快速分类" },
        ],
      },
    ],
    benchLabel: "参数调优",
    benchTitle: "本地上下文窗口",
    benchNote: "支持滑块自由分配系统内存。",
    benchCurrent: "当前分配：16,384 Tokens",
    benchMax: "最大：128K",
    benchFlag: "GPU 硬件直通开启",
    modelsNote:
      "模型大小和速度取决于设备。Windows 安装包不含本地推理组件。",
    pillarsOverline: "ARCHITECTURE & INTEGRITY",
    pillarsTitle: "数据所有权，毫不妥协。",
    pillarsLead:
      "知远遵循三项架构原则，代码库、会议音频与业务底表留在自己的硬件内部。",
    principles: [
      {
        title: "文件与会话完全本地化",
        body: "历史对话、切片索引与配置文件保存在本机。只有你明确授权的文件系统路径，知远才有权限读取。",
        foot: "支持全离线运行",
      },
      {
        title: "纯离线或按需接入云端",
        body: "任务自由调度算力。绝密任务锁定全离线 GGUF 模型；日常任务可配置外部 OpenAI 兼容 API 端点。",
        foot: "API Key 本地加密存储",
      },
      {
        title: "透明的工具链沙箱权限",
        body: "代码执行、联网抓取、文件写回均展示操作参数。自动化脚本在独立沙箱中执行。",
        foot: "操作日志步步可溯",
      },
    ],
    downloadOverline: "DOWNLOAD & INSTALL",
    downloadTitle: "获取知远 Zhiyuan AI",
    downloadLead: "下载适用于你的操作系统的桌面安装包，安装后选择模型、创建任务。",
    downloadAssurance: "升级清单包含签名与 SHA-256 校验值，平台签名状态见版本说明。",
    sizeLabel: "大小",
    releases: "版本记录",
    version: "稳定版",
    loading: "读取版本信息…",
    unavailable: "版本信息读取失败。",
    noLinux: "此版本缺少安装包。",
    windowsNoteTitle: "Windows 用户注意：",
    windowsNote:
      "Windows 安装包默认不包含本地推理组件。如需离线模型支持，可在启动后通过工作台设置安装由社区维护的本地推理插件。",
    windowsGuide: "阅读 Windows 部署指南",
    signingNote: "升级清单包含签名和 SHA-256 校验值。平台签名状态见版本说明。",
    ossOverline: "OPEN SOURCE ECOSYSTEM · AGPL-3.0",
    ossTitle: "透明开源，欢迎贡献与二次开发。",
    ossBody:
      "核心工作流编排、任务界面与本地模型接入代码已开放源代码。加入开发者社区，构建自己的专有知识引擎。",
    cloneCommand: "git clone https://github.com/rongxinzy/RongxinAI.git",
    copyCommand: "复制克隆命令",
    copiedCommand: "已复制",
    ossStar: "在 GitHub 上支持我们",
    footerBrand: "面向 AI 工程师、研究者与开发者的本地 AI 工作站。轻量、高效、数据留在本机。",
    footerRelease: "稳定版",
    footerPlatforms: "macOS / Windows / Linux",
    footerColumns: [
      {
        title: "产品",
        links: [
          { label: "桌面工作台", href: "/#download" },
          { label: "产品界面", href: "/#workbench" },
          { label: "企业服务", href: "/enterprise/" },
          { label: "博客", href: "/blog/" },
          { label: "更新日志", href: `${GITHUB}/releases` },
        ],
      },
      {
        title: "技术",
        links: [
          { label: "使用文档", href: DOC_BASE },
          { label: "本地模型指南", href: `${DOC_BASE}guide/model/local` },
          { label: "开源代码", href: GITHUB },
          { label: "贡献指南", href: `${DOC_BASE}developer/contributing` },
        ],
      },
      {
        title: "支持",
        links: [
          { label: "常见问题", href: `${DOC_BASE}faq/` },
          { label: "安装说明", href: `${DOC_BASE}faq/install` },
          { label: "隐私与文件", href: `${DOC_BASE}faq/privacy` },
          { label: "问题反馈", href: `${GITHUB}/issues` },
        ],
      },
    ],
    footerLegal: ["AGPL-3.0 开源许可协议", "版本记录", "数据自主权说明"],
    footerBoundary: "/#local-models",
    copyright: "© 2026 北京容芯致远",
    enterpriseTitle: ["团队的", "AI 工作室。"],
    enterpriseLead:
      "连接团队的模型、知识库与业务系统。让 AI 参与项目，交付文档、数据和代码。",
    contactAction: "联系企业服务",
    scope: "功能、部署范围和交付内容以合同约定为准。",
    architectureTitle: "部署结构",
    architecture: [
      { title: "成员与项目", items: "团队与成员 / 项目与空间" },
      { title: "模型与知识库", items: "模型接入 / 共享知识" },
      { title: "系统与权限", items: "业务系统 / 访问策略" },
    ],
    deliveryOverline: "DELIVERY PROCESS",
    deliveryTitle: "从一个任务，开始合作。",
    delivery: [
      {
        title: "确认需求",
        body: "确定任务、数据来源、使用人员和验收标准。",
      },
      {
        title: "部署与接入",
        body: "安装服务，连接模型和业务系统，设置成员权限。",
      },
      {
        title: "测试与验收",
        body: "执行测试任务，核对结果，交付文档和培训。",
      },
    ],
    comparisonOverline: "EDITIONS & SERVICES",
    comparisonTitle: "版本与服务",
    comparisonHint: "左右滑动查看对比",
    headers: ["项目", "开源桌面版", "企业项目方案"],
    comparison: [
      ["工作空间", "个人使用", "项目空间、任务模板、成员管理"],
      ["模型与工具", "用户配置", "模型网关、额度、工具连接"],
      ["数据与权限", "本机存储", "成员权限、操作记录、数据管理"],
      ["部署与服务", "文档与社区", "部署、培训、运维"],
    ],
    contactOverline: "CONTACT",
    contactTitle: "谈谈团队的工作。",
    contactBody:
      "告诉我们要完成的任务、使用人数和接入系统。我们确定部署方案与交付范围。",
    qr: ["用户社区", "官方公众号"],
  },

  en: {
    menu: "Navigation menu",
    close: "Close menu",
    skip: "Skip to content",
    brandSub: "Workstation Studio",
    navWorkflow: "Features & workflow",
    navInference: "Local inference",
    navEnterprise: "For teams",
    navDocs: "Docs",
    navBlog: "Blog",
    headerDownload: "Download",
    star: "Star",
    releaseStable: "stable release",
    releaseFallback: "ZhiYuan Agent",
    heroBadgeSub: "Local LLM inference and automation workbench",
    headlineTop: "Your computer.",
    headlineAccent: "Your AI studio.",
    heroLead:
      "ZhiYuan brings your files, models and tools to one workbench. Write reports, build spreadsheets and edit code. A built-in inference engine manages and runs GGUF offline weights. Data stays on your machine.",
    heroCtaPrimary: "Download the desktop app",
    agplChip: "AGPL-3.0",
    heroCtaSecondary: "See the product",
    platforms: [
      "macOS (Apple Silicon / Intel)",
      "Windows (x64)",
      "Linux (deb / AppImage)",
    ],
    showcaseOverline: "DESKTOP WORKBENCH",
    showcaseTitle: "Tasks, models and tools. One workbench.",
    showcaseLead:
      "Local inference, automation and experts in the sidebar; the built-in market installs and runs GGUF offline models.",
    showcaseAltMain:
      "The ZhiYuan desktop client's model market, listing installable offline models",
    showcaseCaptions: [
      {
        title: "Model market",
        desc: "Find, install and run offline models; the workbench manages the inference service in the background.",
      },
      {
        title: "Experts & skills",
        desc: "Prepackaged practices and tools, called per task.",
      },
      {
        title: "Local workspace",
        desc: "Tasks run inside authorized folders; output is written back to the same place.",
      },
    ],
    showcaseShots: [
      {
        label: "Home: assign a task from one input box",
        alt: "ZhiYuan desktop client home with the task input box",
      },
      {
        label: "Experts: skills installed and called per task",
        alt: "ZhiYuan desktop client experts page listing installed skills",
      },
    ],
    modelsOverline: "MODULE 02 // NATIVE INFERENCE ENGINE",
    modelsTitle: "A model on your computer.",
    modelsLead:
      "Find, install and run GGUF offline models. ZhiYuan manages the inference service in the background; your computer is the compute.",
    monitorLabel: "VRAM allocation",
    monitorValue: "8.4 GB / 32 GB",
    monitorState: "Healthy",
    modelCards: [
      {
        chip: "Qwen 2.5 8B / 14B",
        status: "installed",
        statusText: "Installed",
        title: "Dialogue and deep reasoning",
        desc: "General-purpose benchmark model. Chinese documents, structured table extraction and long-text summaries.",
        specs: [
          { key: "Quantization", value: "GGUF (Q4_K_M / Q8_0)" },
          { key: "Context length", value: "32,768 tokens" },
          { key: "Memory", value: "≥ 10 GB unified memory" },
        ],
      },
      {
        chip: "DeepSeek Coder 7B / 33B",
        status: "fetch",
        statusText: "One-click install",
        title: "Code analysis and refactoring",
        desc: "Tuned for architecture and script review. Reads local repositories and produces function-level guides.",
        specs: [
          { key: "Quantization", value: "GGUF (IQ4_XS compact)" },
          { key: "Tool calling", value: "Function calling support" },
          { key: "Engine", value: "Built-in inference" },
        ],
      },
      {
        chip: "Llama 3.2 3B / 8B",
        status: "light",
        statusText: "Lightweight",
        title: "Lightweight edge inference",
        desc: "Low resource use with streaming responses on entry-level hardware. Suited to background assist and quick classification.",
        specs: [
          { key: "Quantization", value: "GGUF (Q4_0 / Q8_0)" },
          { key: "Memory use", value: "Depends on quantization" },
          { key: "Suited for", value: "Background assist and quick classification" },
        ],
      },
    ],
    benchLabel: "Tuning",
    benchTitle: "Local context window",
    benchNote: "Allocate system memory with a slider.",
    benchCurrent: "Allocated: 16,384 tokens",
    benchMax: "Maximum: 128K",
    benchFlag: "GPU pass-through enabled",
    modelsNote:
      "Model size and speed depend on your hardware. The Windows installer excludes local inference components.",
    pillarsOverline: "ARCHITECTURE & INTEGRITY",
    pillarsTitle: "Data ownership, without compromise.",
    pillarsLead:
      "Three architectural principles keep your code, meeting audio and business files inside your own hardware.",
    principles: [
      {
        title: "Files and sessions stay local",
        body: "Conversation history, chunk indexes and configuration files stay on the machine. ZhiYuan can only read file paths you explicitly authorize.",
        foot: "Runs fully offline",
      },
      {
        title: "Offline first, cloud on demand",
        body: "Route each task as needed. Classified work stays on offline GGUF models; routine work can use an external OpenAI-compatible API endpoint.",
        foot: "API keys stored encrypted locally",
      },
      {
        title: "Transparent sandbox permissions",
        body: "Code execution, web fetching and file writes show their parameters before running. Automation scripts run in an isolated sandbox.",
        foot: "Every action is logged",
      },
    ],
    downloadOverline: "DOWNLOAD & INSTALL",
    downloadTitle: "Get ZhiYuan",
    downloadLead:
      "Download the desktop installer for your operating system. Install, pick a model and start a task.",
    downloadAssurance:
      "Update manifests include signatures and SHA-256 hashes. Platform code-signing status is listed in the release notes.",
    sizeLabel: "Size",
    releases: "View releases",
    version: "Stable release",
    loading: "Loading the stable release…",
    unavailable: "Release information could not be loaded.",
    noLinux: "No installer is available for this release.",
    windowsNoteTitle: "Windows users:",
    windowsNote:
      "The Windows installer excludes local inference components. Install the community-maintained local inference plugin from the workbench settings after launch.",
    windowsGuide: "Read the Windows setup guide",
    signingNote:
      "Update manifests include signatures and SHA-256 hashes. See release notes for platform code-signing status.",
    ossOverline: "OPEN SOURCE ECOSYSTEM · AGPL-3.0",
    ossTitle: "Open source. Contributions welcome.",
    ossBody:
      "Workflow orchestration, task interfaces and local model integration are open source. Join the developer community and build your own knowledge engine.",
    cloneCommand: "git clone https://github.com/rongxinzy/RongxinAI.git",
    copyCommand: "Copy clone command",
    copiedCommand: "Copied",
    ossStar: "Star us on GitHub",
    footerBrand:
      "A local AI workstation for engineers, researchers and developers. Lightweight, fast, data stays on your machine.",
    footerRelease: "Stable",
    footerPlatforms: "macOS / Windows / Linux",
    footerColumns: [
      {
        title: "Product",
        links: [
          { label: "Desktop workbench", href: "/en/#download" },
          { label: "Product interface", href: "/en/#workbench" },
          { label: "For teams", href: "/en/enterprise/" },
          { label: "Blog", href: "/blog/" },
          { label: "Release notes", href: `${GITHUB}/releases` },
        ],
      },
      {
        title: "Technology",
        links: [
          { label: "Documentation", href: GITHUB },
          { label: "Source code", href: GITHUB },
          { label: "Contributing", href: `${GITHUB}/blob/main/docs/developer/contributing.md` },
          { label: "License", href: `${GITHUB}/blob/main/LICENSE` },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "FAQ", href: `${GITHUB}/blob/main/docs/faq/index.md` },
          { label: "Installation", href: `${GITHUB}/blob/main/docs/faq/install.md` },
          { label: "Privacy & files", href: `${GITHUB}/blob/main/docs/faq/privacy.md` },
          { label: "Issue tracker", href: `${GITHUB}/issues` },
        ],
      },
    ],
    footerLegal: ["AGPL-3.0 license", "Release notes", "Data ownership"],
    footerBoundary: "/en/#local-models",
    copyright: "© 2026 Beijing Rongxin Zhiyuan",
    enterpriseTitle: ["Your team’s", "AI studio."],
    enterpriseLead:
      "Connect your team’s models, knowledge bases and business systems. Bring AI into projects to create documents, data and code.",
    contactAction: "Contact enterprise sales",
    scope: "The contract defines features, deployment scope and deliverables.",
    architectureTitle: "Deployment structure",
    architecture: [
      { title: "Members & projects", items: "Teams & members / Projects & spaces" },
      { title: "Models & knowledge", items: "Model access / Shared knowledge" },
      { title: "Systems & policies", items: "Business systems / Access policies" },
    ],
    deliveryOverline: "DELIVERY PROCESS",
    deliveryTitle: "Start with a task.",
    delivery: [
      {
        title: "Define requirements",
        body: "Specify tasks, data sources, users and acceptance criteria.",
      },
      {
        title: "Deploy and integrate",
        body: "Install services, connect models and business systems, and set member permissions.",
      },
      {
        title: "Test and accept",
        body: "Run test tasks, check results and provide documentation and training.",
      },
    ],
    comparisonOverline: "EDITIONS & SERVICES",
    comparisonTitle: "Editions and services",
    comparisonHint: "Scroll to compare editions",
    headers: ["Scope", "Open-source desktop", "Enterprise project"],
    comparison: [
      ["Workspace", "Personal use", "Shared spaces, templates and members"],
      [
        "Models & tools",
        "Personal configuration",
        "Model gateways, quotas and tool connections",
      ],
      [
        "Data & permissions",
        "Device storage",
        "Member permissions, activity logs and data management",
      ],
      [
        "Deployment & support",
        "Documentation and community",
        "Deployment, training and operations",
      ],
    ],
    contactOverline: "CONTACT",
    contactTitle: "Let’s talk about your work.",
    contactBody:
      "Tell us about the task, your team and the systems to connect. We will define deployment and deliverables.",
    qr: ["User community", "Official account"],
  },
};
