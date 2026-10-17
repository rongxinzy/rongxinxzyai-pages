import type { SiteLocale } from "../shared/site-types";

export const GITHUB = "https://github.com/rongxinzy/RongxinAI";
export const isEnglish = (locale: SiteLocale) => locale === "en";

type ModelCard = {
  chip: string;
  status: "installed" | "fetch";
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
  navRoadmap: string;
  navDocs: string;
  navBlog: string;
  roadmapBadge: string;
  roadmapTitle: string;
  roadmapLead: string;
  roadmapDone: string;
  roadmapActive: string;
  roadmapPlanned: string;
  roadmapProgress: string;
  roadmapStar: string;
  roadmapStarAria: string;
  roadmapStarCountAria: string;
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
  showcaseCards: Array<{ title: string; desc: string; alt: string }>;
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
  copyFailedCommand: string;
  ossStar: string;
  footerBrand: string;
  footerRelease: string;
  footerPlatforms: string;
  footerColumns: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
  footerLegal: string[];
  footerBoundary: string;
  copyright: string;
  enterpriseBadge: string;
  enterpriseTitle: string[];
  enterpriseStatus: string;
  enterpriseBenefitsTitle: string;
  enterpriseBenefits: Array<{ title: string; body: string }>;
  enterpriseDocsAction: string;
  enterpriseDocsHref: string;
  architectureLead: string;
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
    brandSub: "AI 工作台",
    navWorkflow: "功能",
    navInference: "本地模型",
    navEnterprise: "企业服务",
    navRoadmap: "路线图",
    navDocs: "文档",
    navBlog: "博客",
    roadmapBadge: "DESKTOP · OPEN SOURCE",
    roadmapTitle: "桌面版路线图",
    roadmapLead: "开源桌面应用的里程碑。每条进展对应一个 Pull Request 或 Issue。",
    roadmapDone: "已完成",
    roadmapActive: "进行中",
    roadmapPlanned: "计划中",
    roadmapProgress: "已完成条目",
    roadmapStar: "在 GitHub 上 Star",
    roadmapStarAria: "在 GitHub 上给 RongxinAI 加 Star",
    roadmapStarCountAria: "在 GitHub 上给 RongxinAI 加 Star，当前 {count} 个",
    headerDownload: "免费下载",
    star: "Star",
    releaseStable: "稳定版",
    releaseFallback: "知远",
    heroBadgeSub: "本地模型与任务自动化的桌面工作台",
    headlineTop: "你的电脑，",
    headlineAccent: "就是 AI 工作台。",
    heroLead:
      "在一个窗口中撰写报告、整理表格和修改代码。知远内置 llama.cpp，在本机运行开源模型。本地推理不向云端发送输入，联网工具按所选服务处理数据。",
    heroCtaPrimary: "免费下载",
    agplChip: "AGPL-3.0",
    heroCtaSecondary: "查看界面",
    platforms: [
      "macOS · Apple Silicon / Intel",
      "Windows · x64",
      "Linux · deb / AppImage",
    ],
    showcaseOverline: "DESKTOP WORKBENCH",
    showcaseTitle: "在一个工作区完成拆解、执行与交付。",
    showcaseLead:
      "左侧栏集中切换会话、本地模型与技能。在模型库检索并下载 GGUF 权重，即可启动本地推理服务。",
    showcaseCards: [
      {
        title: "任务对话",
        desc: "输入任务目标与参考资料，知远拆解步骤并依次调用工具。执行过程、调用参数与产出文件保留在同一会话中。",
        alt: "任务对话界面，展示多步骤任务执行记录",
      },
      {
        title: "模型库",
        desc: "在界面内搜索、下载并加载 GGUF 模型。知远在后台管理推理服务启停，无需命令行配置。",
        alt: "模型库界面，列出可下载的本地模型",
      },
      {
        title: "专家与技能",
        desc: "将周报撰写、数据清洗、代码审查等固定流程封装为技能，在对应任务中按需调用。",
        alt: "专家与技能页面，列出可安装的技能模块",
      },
      {
        title: "本机工作区",
        desc: "知远仅在授权目录内读写文件，生成的结果直接写回本地文件夹。",
        alt: "工作台主界面与任务输入区",
      },
    ],
    modelsOverline: "LOCAL INFERENCE · POWERED BY LLAMA.CPP",
    modelsTitle: "在本机运行开源模型。",
    modelsLead:
      "知远内置 llama.cpp 推理引擎，负责模型下载、加载与服务启停。可运行的参数规模取决于本机内存与显存容量。",
    monitorLabel: "显存占用",
    monitorValue: "8.4 GB / 32 GB",
    monitorState: "运行中",
    modelCards: [
      {
        chip: "Qwen2.5 7B / 14B",
        status: "installed",
        statusText: "已安装",
        title: "中文写作与长文档处理",
        desc: "通用中英文生成模型，适用于公文起草、表格字段提取和长文档摘要。",
        specs: [
          { key: "量化", value: "GGUF Q4_K_M / Q8_0" },
          { key: "上下文", value: "32K tokens" },
          { key: "显存 / 内存", value: "14B Q4 需 ≥ 10 GB" },
        ],
      },
      {
        chip: "Qwen2.5-Coder 7B / 32B",
        status: "fetch",
        statusText: "可下载",
        title: "代码分析与重构",
        desc: "读取本地代码仓库，解析函数逻辑、审查脚本并生成重构方案。",
        specs: [
          { key: "量化", value: "GGUF IQ4_XS" },
          { key: "工具调用", value: "支持" },
          { key: "引擎", value: "llama.cpp" },
        ],
      },
      {
        chip: "Llama 3.2 1B / 3B",
        status: "fetch",
        statusText: "可下载",
        title: "低资源占用与批处理",
        desc: "内存占用低，可在核显笔记本上运行，适用于文本分类、标签提取与快速问答。",
        specs: [
          { key: "量化", value: "GGUF Q4_0 / Q8_0" },
          { key: "显存 / 内存", value: "约 2–4 GB" },
          { key: "场景", value: "文本分类、快速问答" },
        ],
      },
    ],
    benchLabel: "参数设置",
    benchTitle: "上下文长度",
    benchNote: "按任务调节上下文窗口。窗口越大，显存与内存占用越高。",
    benchCurrent: "当前：16,384 tokens",
    benchMax: "模型上限：最高 128K",
    benchFlag: "GPU 加速已开启",
    modelsNote:
      "推理速度受芯片架构、内存带宽与量化精度影响。Windows 安装包需在设置中另装本地推理插件。",
    pillarsOverline: "PRIVACY & CONTROL",
    pillarsTitle: "数据位置与执行边界可控。",
    pillarsLead:
      "处理源代码、会议记录和业务表格时，你可以限定文件读写目录、按任务切换本地或云端模型，并在操作执行前核对参数。",
    principles: [
      {
        title: "数据保存在本机",
        body: "会话记录、文档索引与配置保存在本地设备。知远仅读写你明确授权的文件夹。",
        foot: "macOS 与 Linux 支持离线运行",
      },
      {
        title: "按任务选择本地或云端",
        body: "敏感资料交由本机模型处理。需要更大参数量时，可接入兼容 OpenAI 接口的云端服务。",
        foot: "API 密钥加密存储于本机",
      },
      {
        title: "调用参数可见，操作留痕",
        body: "运行代码、抓取网页或写入文件前，界面会列出具体参数。自动化脚本在沙箱环境中执行。",
        foot: "完整操作日志可逐条回查",
      },
    ],
    downloadOverline: "DOWNLOAD",
    downloadTitle: "下载知远",
    downloadLead: "按操作系统选择安装包。安装后配置本地或云端模型即可开始任务。",
    downloadAssurance: "Certum 与 Apple 代码签名 · SHA-256 校验",
    sizeLabel: "大小",
    releases: "版本记录",
    version: "稳定版",
    loading: "正在获取版本信息…",
    unavailable: "未能获取版本信息。请刷新页面，或前往 GitHub Releases 下载。",
    noLinux: "当前版本未提供该平台安装包。",
    windowsNoteTitle: "Windows 本地推理说明：",
    windowsNote:
      "首页提供的 Windows 安装包是轻量版，不含本地推理。如需在本机运行 GGUF 模型，请在版本记录中选择 CPU 版，它内置 CPU 与 Vulkan 本地推理，同样离线安装。",
    windowsGuide: "查看 Windows 安装指南",
    signingNote:
      "Windows 安装包经 Certum 代码签名，macOS 签名版本通过 Apple 公证。更新清单附带签名与 SHA-256 校验值。",
    ossOverline: "OPEN SOURCE · AGPL-3.0",
    ossTitle: "核心代码开源，可检视、可构建。",
    ossBody:
      "工作流编排、任务界面与本地模型管理的代码托管于 GitHub，采用 AGPL-3.0 协议发布。你可以克隆仓库自行构建，或通过 Issue 与 Pull Request 参与开发。",
    cloneCommand: "git clone https://github.com/rongxinzy/RongxinAI.git",
    copyCommand: "复制命令",
    copiedCommand: "已复制",
    copyFailedCommand: "复制失败，请手动复制命令。",
    ossStar: "在 GitHub 上 Star",
    footerBrand:
      "知远是开源的桌面 AI 工作台，内置 llama.cpp 本地推理，支持本机文件处理与多步骤任务执行。",
    footerRelease: "稳定版",
    footerPlatforms: "macOS / Windows / Linux",
    footerColumns: [
      {
        title: "产品",
        links: [
          { label: "下载", href: "/#download" },
          { label: "产品界面", href: "/#workbench" },
          { label: "企业服务", href: "/enterprise/" },
          { label: "路线图", href: "/roadmap/" },
          { label: "博客", href: "/blog/" },
          { label: "版本记录", href: `${GITHUB}/releases` },
        ],
      },
      {
        title: "技术",
        links: [
          { label: "使用文档", href: DOC_BASE },
          { label: "本地模型指南", href: `${DOC_BASE}guide/model/local` },
          { label: "源代码", href: GITHUB },
          { label: "贡献指南", href: `${DOC_BASE}developer/contributing` },
          { label: "开源协议", href: `${GITHUB}/blob/main/LICENSE` },
        ],
      },
      {
        title: "支持",
        links: [
          { label: "常见问题", href: `${DOC_BASE}faq/` },
          { label: "安装说明", href: `${DOC_BASE}faq/install` },
          { label: "隐私说明", href: `${DOC_BASE}faq/privacy` },
          { label: "问题反馈", href: `${GITHUB}/issues` },
        ],
      },
    ],
    footerLegal: ["AGPL-3.0 开源协议", "版本记录", "隐私说明"],
    footerBoundary: `${DOC_BASE}faq/privacy`,
    copyright: "© 2026 北京容芯致远科技有限公司",
    enterpriseBadge: "ZHIYUAN ENTERPRISE",
    enterpriseTitle: ["Persona Agent", "+ 企业级治理"],
    enterpriseLead:
      "个人搭档围绕员工的日常工作持续协作，部门数字员工承担专业任务。企业级治理管理身份、模型授权与受管工具的数据范围，让协作进入业务流程。",
    enterpriseStatus:
      "企业版按业务场景分阶段交付。持续工作、多搭档共享环境及跨员工协作的功能与验收范围，在项目评估中逐项确认。",
    enterpriseBenefitsTitle: "从个人工作，连接部门协作",
    enterpriseBenefits: [
      {
        title: "延续工作上下文",
        body: "个人搭档（Persona Agent）面向固定用户，围绕目标、资料和待办持续协作，减少重复交代背景。",
      },
      {
        title: "调用部门专业能力",
        body: "部门数字员工按职责处理专业任务，将结果交付给请求者，支持员工直接交办与搭档协作。",
      },
      {
        title: "管理协作边界",
        body: "企业管理身份与模型授权，受管业务工具检查请求者的数据范围，操作事件为运行排查提供依据。",
      },
    ],
    enterpriseDocsAction: "阅读企业产品说明",
    enterpriseDocsHref: "/docs/guide/what-is-zhiyuan#企业版persona-agent-与企业级治理",
    contactAction: "讨论企业试点",
    scope: "功能状态、部署方式、数据范围与验收标准在项目评估中确认，交付内容以合同约定为准。",
    architectureTitle: "个人搭档、部门能力与企业治理",
    architectureLead:
      "个人搭档承接用户目标，部门数字员工提供专业服务，治理层定义访问与运行边界。多搭档方案按用户设置个人工作环境（Personal Workspace），共享该用户的文件与浏览器登录状态，不同用户的环境相互隔离。",
    architecture: [
      { title: "个人搭档 · Persona Agent", items: "固定用户 / 持续工作上下文 / 个人工作环境" },
      { title: "部门数字员工", items: "部门职责 / 专业工具与流程 / 任务结果交付" },
      { title: "企业级治理", items: "企业身份 / 模型授权 / 受管工具数据范围" },
    ],
    deliveryOverline: "PILOT & DELIVERY",
    deliveryTitle: "用具体任务验证协作价值",
    delivery: [
      {
        title: "选择试点任务",
        body: "确认使用人员、日常任务与部门协作需求，约定效率、响应速度和结果质量的验收标准。",
      },
      {
        title: "配置运行环境",
        body: "根据试点范围确认模型、业务系统、数据访问与资源配置，明确可用能力和待开发项。",
      },
      {
        title: "验证与扩展",
        body: "以实际任务检查结果和运行记录，完成验收后再确定人员、场景与服务范围的扩展。",
      },
    ],
    comparisonOverline: "DESKTOP & ENTERPRISE",
    comparisonTitle: "个人桌面与企业方案",
    comparisonHint: "左右滑动查看对比",
    headers: ["范围", "开源桌面版", "企业方案"],
    comparison: [
      ["服务对象", "个人在本机完成任务", "员工个人搭档与部门专业服务"],
      ["工作环境", "用户授权的本机文件与工具", "按用户划分工作环境，接入企业系统"],
      ["模型与管理", "用户配置模型和工具", "管理企业身份、模型授权与工具访问范围"],
      ["获取方式", "下载安装，参考文档使用", "需求评估、试点与分阶段交付"],
    ],
    contactOverline: "CONTACT",
    contactTitle: "确定第一个试点场景",
    contactBody:
      "请提供使用部门、典型任务、预计人数与需接入的系统。我们据此评估现有能力、部署条件与交付范围。",
    qr: ["用户社区", "官方公众号"],
  },

  en: {
    menu: "Navigation menu",
    close: "Close menu",
    skip: "Skip to content",
    brandSub: "AI Workbench",
    navWorkflow: "Features",
    navInference: "Local models",
    navEnterprise: "For teams",
    navRoadmap: "Roadmap",
    navDocs: "Docs",
    navBlog: "Blog",
    roadmapBadge: "DESKTOP · OPEN SOURCE",
    roadmapTitle: "Desktop roadmap",
    roadmapLead: "Milestones for the open-source desktop app. Each entry links to its pull request or issue.",
    roadmapDone: "Done",
    roadmapActive: "In progress",
    roadmapPlanned: "Planned",
    roadmapProgress: "Items done",
    roadmapStar: "Star on GitHub",
    roadmapStarAria: "Star RongxinAI on GitHub",
    roadmapStarCountAria: "Star RongxinAI on GitHub, {count} stars",
    headerDownload: "Download",
    star: "Star",
    releaseStable: "stable",
    releaseFallback: "ZhiYuan",
    heroBadgeSub: "Desktop workbench for local models and task automation",
    headlineTop: "Your computer,",
    headlineAccent: "now an AI workbench.",
    heroLead:
      "Write reports, organize spreadsheets and edit code in one window. ZhiYuan includes llama.cpp for running open models on your machine. Local inference does not send inputs to cloud models, while online tools process data through the services you configure.",
    heroCtaPrimary: "Download for free",
    agplChip: "AGPL-3.0",
    heroCtaSecondary: "Product tour",
    platforms: [
      "macOS · Apple Silicon / Intel",
      "Windows · x64",
      "Linux · deb / AppImage",
    ],
    showcaseOverline: "DESKTOP WORKBENCH",
    showcaseTitle: "From task breakdown to file delivery in one workspace.",
    showcaseLead:
      "Switch between sessions, local models and skills from the sidebar. Search and download GGUF weights in the model library to start the local inference service.",
    showcaseCards: [
      {
        title: "Task chat",
        desc: "Provide a goal and reference files. ZhiYuan breaks the task into steps and calls tools in sequence, keeping every action, argument and output in the thread.",
        alt: "Task chat view showing multi-step task execution",
      },
      {
        title: "Model library",
        desc: "Search, download and load GGUF models from the UI. ZhiYuan manages the inference server in the background without terminal setup.",
        alt: "Model library listing downloadable local models",
      },
      {
        title: "Experts & skills",
        desc: "Package recurring workflows such as weekly reports, data cleanup and code review into reusable skills and invoke them per task.",
        alt: "Experts and skills view listing installable skill modules",
      },
      {
        title: "Local workspace",
        desc: "ZhiYuan reads and writes only within directories you authorize, saving generated files directly back to the local folder.",
        alt: "Main workbench window and task input area",
      },
    ],
    modelsOverline: "LOCAL INFERENCE · POWERED BY LLAMA.CPP",
    modelsTitle: "Run open models on your machine.",
    modelsLead:
      "ZhiYuan embeds llama.cpp to handle model downloads, loading and server lifecycle. Supported model sizes depend on your system memory and GPU VRAM.",
    monitorLabel: "VRAM in use",
    monitorValue: "8.4 GB / 32 GB",
    monitorState: "Running",
    modelCards: [
      {
        chip: "Qwen2.5 7B / 14B",
        status: "installed",
        statusText: "Installed",
        title: "Writing and long documents",
        desc: "General-purpose bilingual model for drafting documents, extracting table fields and summarizing long files.",
        specs: [
          { key: "Quant", value: "GGUF Q4_K_M / Q8_0" },
          { key: "Context", value: "32K tokens" },
          { key: "Memory", value: "≥ 10 GB for 14B Q4" },
        ],
      },
      {
        chip: "Qwen2.5-Coder 7B / 32B",
        status: "fetch",
        statusText: "Available",
        title: "Code analysis and refactoring",
        desc: "Reads local repositories, explains function logic, reviews scripts and prepares refactoring plans.",
        specs: [
          { key: "Quant", value: "GGUF IQ4_XS" },
          { key: "Tool calling", value: "Supported" },
          { key: "Engine", value: "llama.cpp" },
        ],
      },
      {
        chip: "Llama 3.2 1B / 3B",
        status: "fetch",
        statusText: "Available",
        title: "Low memory and batch tasks",
        desc: "Low memory footprint suited to integrated-GPU laptops for text classification, tagging and quick Q&A.",
        specs: [
          { key: "Quant", value: "GGUF Q4_0 / Q8_0" },
          { key: "Memory", value: "~2–4 GB" },
          { key: "Use cases", value: "Classification, quick Q&A" },
        ],
      },
    ],
    benchLabel: "Settings",
    benchTitle: "Context length",
    benchNote: "Adjust the context window per task. Larger windows require more memory.",
    benchCurrent: "Current: 16,384 tokens",
    benchMax: "Model max: up to 128K",
    benchFlag: "GPU offload enabled",
    modelsNote:
      "Inference speed depends on chip architecture, memory bandwidth and quantization. The Windows installer requires the local inference plugin from Settings.",
    pillarsOverline: "PRIVACY & CONTROL",
    pillarsTitle: "Control over files, models and execution.",
    pillarsLead:
      "When working with source code, meeting notes and business sheets, you define which directories ZhiYuan can access, choose local or cloud models per task, and review tool parameters before execution.",
    principles: [
      {
        title: "Data stored on device",
        body: "Session history, document indexes and settings are stored on your computer. ZhiYuan only accesses directories you explicitly authorize.",
        foot: "Offline mode on macOS and Linux",
      },
      {
        title: "Local or cloud per task",
        body: "Process sensitive materials with a local model. Connect any OpenAI-compatible API when a task requires larger cloud models.",
        foot: "API keys encrypted on disk",
      },
      {
        title: "Visible parameters and audit log",
        body: "Before running code, fetching web pages or writing files, the UI lists the exact parameters. Automation scripts execute in a sandbox.",
        foot: "Full operation log for inspection",
      },
    ],
    downloadOverline: "DOWNLOAD",
    downloadTitle: "Download ZhiYuan",
    downloadLead:
      "Select an installer for your operating system. Configure a local or cloud model after installation to start a task.",
    downloadAssurance: "Certum & Apple code-signed · SHA-256 verified",
    sizeLabel: "Size",
    releases: "Release notes",
    version: "Stable",
    loading: "Loading release info…",
    unavailable: "Unable to load release info. Refresh the page or download from GitHub Releases.",
    noLinux: "No installer for this platform in the current release.",
    windowsNoteTitle: "Windows local inference: ",
    windowsNote:
      "The Windows installer offered here is the lite edition, without local inference. To run GGUF models locally, pick the CPU edition under “Release notes”; it bundles CPU and Vulkan local inference and also installs offline.",
    windowsGuide: "Windows setup guide",
    signingNote:
      "Windows installers are Certum code-signed, and signed macOS builds are notarized by Apple. Update manifests include signatures and SHA-256 checksums.",
    ossOverline: "OPEN SOURCE · AGPL-3.0",
    ossTitle: "Core source code open for inspection and builds.",
    ossBody:
      "Workflow orchestration, the task UI and local model management are hosted on GitHub under AGPL-3.0. Clone the repository to build from source, or contribute via issues and pull requests.",
    cloneCommand: "git clone https://github.com/rongxinzy/RongxinAI.git",
    copyCommand: "Copy",
    copiedCommand: "Copied",
    copyFailedCommand: "Copy failed. Select and copy the command manually.",
    ossStar: "Star on GitHub",
    footerBrand:
      "ZhiYuan is an open-source desktop AI workbench with built-in llama.cpp inference for local file processing and multi-step tasks.",
    footerRelease: "Stable",
    footerPlatforms: "macOS / Windows / Linux",
    footerColumns: [
      {
        title: "Product",
        links: [
          { label: "Download", href: "/en/#download" },
          { label: "Product tour", href: "/en/#workbench" },
          { label: "For teams", href: "/en/enterprise/" },
          { label: "Roadmap", href: "/en/roadmap/" },
          { label: "Blog", href: "/blog/" },
          { label: "Release notes", href: `${GITHUB}/releases` },
        ],
      },
      {
        title: "Technology",
        links: [
          { label: "Docs", href: "/en/docs/" },
          { label: "Local model guide", href: "/en/docs/guide/model/local" },
          { label: "Source code", href: GITHUB },
          { label: "Contributing", href: "/en/docs/developer/contributing" },
          { label: "License", href: `${GITHUB}/blob/main/LICENSE` },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "FAQ", href: "/en/docs/faq/" },
          { label: "Installation", href: "/en/docs/faq/install" },
          { label: "Privacy", href: "/en/docs/faq/privacy" },
          { label: "Issue tracker", href: `${GITHUB}/issues` },
        ],
      },
    ],
    footerLegal: ["AGPL-3.0 License", "Release notes", "Privacy"],
    footerBoundary: "/en/docs/faq/privacy",
    copyright: "© 2026 Beijing Rongxin Zhiyuan Technology Co., Ltd.",
    enterpriseBadge: "ZHIYUAN ENTERPRISE",
    enterpriseTitle: ["Persona Agent", "+ Enterprise governance"],
    enterpriseLead:
      "Personal companions work with employees across their daily tasks. Departmental digital employees handle specialized work. Enterprise governance manages identity, model authorization and data scope for managed tools.",
    enterpriseStatus:
      "Enterprise delivery is phased by use case. Ongoing work, shared environments for multiple companions and collaboration across employees are evaluated individually, with feature scope and acceptance criteria defined for each project.",
    enterpriseBenefitsTitle: "From individual work to department collaboration",
    enterpriseBenefits: [
      {
        title: "Carry work context forward",
        body: "A personal companion, or Persona Agent, serves a specific user across goals, materials and follow-ups, reducing the need to repeat background information.",
      },
      {
        title: "Draw on department expertise",
        body: "Departmental digital employees handle specialized tasks and deliver results to the requester, supporting direct employee requests and companion collaboration.",
      },
      {
        title: "Set working boundaries",
        body: "The organization manages identity and model authorization. Managed business tools check the requester’s data scope, while event records support operational troubleshooting.",
      },
    ],
    enterpriseDocsAction: "Read the enterprise overview",
    enterpriseDocsHref: "/en/docs/guide/what-is-zhiyuan#enterprise-persona-agent-and-enterprise-governance",
    contactAction: "Discuss a pilot",
    scope: "Feature availability, deployment, data scope and acceptance criteria are confirmed during evaluation. The contract defines deliverables.",
    architectureTitle: "Personal companions, department expertise and governance",
    architectureLead:
      "Personal companions work toward user goals; departmental digital employees provide specialist services; governance defines access and operating boundaries. The multi-companion design uses a Personal Workspace per user, with shared files and browser sign-in state for that user's companions and isolation between users.",
    architecture: [
      { title: "Personal companion · Persona Agent", items: "Dedicated user / Ongoing work context / Personal Workspace" },
      { title: "Departmental digital employee", items: "Defined remit / Specialized tools and workflows / Task deliverables" },
      { title: "Enterprise governance", items: "Enterprise identity / Model authorization / Managed-tool data scope" },
    ],
    deliveryOverline: "PILOT & DELIVERY",
    deliveryTitle: "Evaluate collaboration through real work",
    delivery: [
      {
        title: "Choose pilot tasks",
        body: "Identify users, daily tasks and department handoffs. Agree on acceptance criteria for efficiency, response time and result quality.",
      },
      {
        title: "Configure the environment",
        body: "Define models, business systems, data access and resources. Identify available capabilities and development work within the pilot scope.",
      },
      {
        title: "Validate and expand",
        body: "Review task results and execution records. Agree on additional users, use cases and services after acceptance.",
      },
    ],
    comparisonOverline: "DESKTOP & ENTERPRISE",
    comparisonTitle: "Personal desktop and enterprise",
    comparisonHint: "Scroll to compare",
    headers: ["Scope", "Open-source desktop", "Enterprise"],
    comparison: [
      ["Users", "Individuals working on their own computer", "Employee companions and departmental digital employees"],
      ["Environment", "Authorized local files and tools", "Per-user workspaces and business integrations"],
      ["Models & management", "User-configured models and tools", "Enterprise identity, model authorization and tool access scope"],
      ["Getting started", "Download and follow the documentation", "Evaluation, pilot and phased delivery"],
    ],
    contactOverline: "CONTACT",
    contactTitle: "Define your first pilot",
    contactBody:
      "Tell us the department, typical tasks, expected number of users and systems involved. We will assess available capabilities, deployment requirements and delivery scope.",
    qr: ["User community", "Official account"],
  },
};
