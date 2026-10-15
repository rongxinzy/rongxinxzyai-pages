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
    navDocs: "文档",
    navBlog: "博客",
    headerDownload: "免费下载",
    star: "Star",
    releaseStable: "稳定版",
    releaseFallback: "知远",
    heroBadgeSub: "本地模型 + 自动化，一个桌面工作台",
    headlineTop: "你的电脑，",
    headlineAccent: "就是 AI 工作台。",
    heroLead:
      "在一个窗口中撰写报告、整理表格和修改代码。知远内置 llama.cpp，可在本机运行开源模型。本地推理无需将输入发送至云端模型。联网工具按所选服务处理数据。",
    heroCtaPrimary: "免费下载",
    agplChip: "AGPL-3.0",
    heroCtaSecondary: "看看界面",
    platforms: [
      "macOS (Apple Silicon / Intel)",
      "Windows (x64)",
      "Linux (deb / AppImage)",
    ],
    showcaseOverline: "DESKTOP WORKBENCH",
    showcaseTitle: "从提需求到拿到文件，都在一个窗口里。",
    showcaseLead:
      "在左侧栏切换任务、模型和技能。去模型库搜一下、点一下，GGUF 模型就在本机跑起来了。",
    showcaseCards: [
      {
        title: "任务对话",
        desc: "把需求说清楚，知远会拆成几步依次执行。每一步做了什么、产出了什么，都记在对话里。",
        alt: "任务对话界面，刚完成一轮问答",
      },
      {
        title: "模型库",
        desc: "搜索、下载、启动 GGUF 模型。推理服务由知远在后台启停，不用开终端。",
        alt: "模型库，列出可下载的模型",
      },
      {
        title: "专家与技能",
        desc: "把周报、数据清洗、代码审查这类常用流程打包成技能，遇到对应的任务直接调用。",
        alt: "专家页，列出可安装的技能",
      },
      {
        title: "本机工作区",
        desc: "知远只在你授权的文件夹里读写，生成的文件直接存回原目录。",
        alt: "主界面，中间是任务输入框",
      },
    ],
    modelsOverline: "LOCAL INFERENCE · POWERED BY LLAMA.CPP",
    modelsTitle: "模型就跑在你的电脑上。",
    modelsLead:
      "知远内置 llama.cpp。你选好模型，下载、加载、启停服务都交给知远。能跑多大的模型，看你的内存和显卡。",
    monitorLabel: "显存占用",
    monitorValue: "8.4 GB / 32 GB",
    monitorState: "运行中",
    modelCards: [
      {
        chip: "Qwen2.5 7B / 14B",
        status: "installed",
        statusText: "已安装",
        title: "中文写作与长文总结",
        desc: "中文能力扎实的通用模型，适合写公文、从表格里提取字段、总结长文档。",
        specs: [
          { key: "量化", value: "GGUF Q4_K_M / Q8_0" },
          { key: "上下文", value: "32K tokens" },
          { key: "内存", value: "显存或统一内存 ≥ 10 GB（14B · Q4）" },
        ],
      },
      {
        chip: "Qwen2.5-Coder 7B / 32B",
        status: "fetch",
        statusText: "可下载",
        title: "读代码、改代码",
        desc: "能读取本地仓库，逐个函数讲解代码，帮你审查脚本、规划重构。",
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
        title: "轻量、响应快",
        desc: "占用资源少，普通笔记本也能流畅输出，适合在后台做分类、打标签这类轻活。",
        specs: [
          { key: "量化", value: "GGUF Q4_0 / Q8_0" },
          { key: "内存", value: "约 2–4 GB" },
          { key: "场景", value: "后台分类、快速问答" },
        ],
      },
    ],
    benchLabel: "参数设置",
    benchTitle: "上下文长度",
    benchNote: "拖动滑块调整上下文长度。上下文越长，占用内存越多。",
    benchCurrent: "当前：16,384 tokens",
    benchMax: "上限：128K（视模型而定）",
    benchFlag: "GPU 加速已开启",
    modelsNote:
      "实际速度和能跑的模型大小取决于你的硬件。Windows 版默认不带本地推理，详见下载说明。",
    pillarsOverline: "PRIVACY & CONTROL",
    pillarsTitle: "你的数据，你说了算。",
    pillarsLead:
      "源代码、会议录音、业务报表，有些东西不该随便上传。知远在设计上坚持三件事。",
    principles: [
      {
        title: "数据存在本机",
        body: "对话记录、文档索引和配置都保存在你的电脑上。知远只能读取你明确授权的文件夹。",
        foot: "可完全断网使用（macOS / Linux）",
      },
      {
        title: "本地还是云端，按任务选",
        body: "敏感资料交给本地模型，断网也能处理；日常任务可以接入任意 OpenAI 兼容的 API。",
        foot: "API Key 加密保存在本机",
      },
      {
        title: "每一步都看得见",
        body: "运行代码、联网抓取、写入文件之前，会先列出具体参数。自动化脚本在沙箱里运行。",
        foot: "完整操作日志，可以逐条回查",
      },
    ],
    downloadOverline: "DOWNLOAD",
    downloadTitle: "下载知远",
    downloadLead: "选择你的系统，安装后挑一个模型，就能开始第一个任务。",
    downloadAssurance:
      "更新清单附带签名和 SHA-256 校验值，各平台的代码签名情况见版本说明。",
    sizeLabel: "大小",
    releases: "版本记录",
    version: "稳定版",
    loading: "正在获取版本信息…",
    unavailable: "暂时获取不到版本信息。请刷新重试，或者前往 GitHub 下载。",
    noLinux: "这个版本暂未提供该平台的安装包。",
    windowsNoteTitle: "Windows 用户请注意：",
    windowsNote:
      "Windows 安装包默认不带本地推理组件。想运行本地模型的话，安装后打开「设置」，装上社区维护的本地推理插件即可。",
    windowsGuide: "查看 Windows 安装指南",
    signingNote:
      "更新清单附带签名和 SHA-256 校验值，各平台的代码签名情况见版本说明。",
    ossOverline: "OPEN SOURCE · AGPL-3.0",
    ossTitle: "代码开源，欢迎一起改。",
    ossBody:
      "工作流编排、任务界面和本地模型接入的代码都放在 GitHub 上，以 AGPL-3.0 协议发布。欢迎提 Issue、交 PR，也可以 fork 一份做你自己的版本。",
    cloneCommand: "git clone https://github.com/rongxinzy/RongxinAI.git",
    copyCommand: "复制命令",
    copiedCommand: "已复制",
    copyFailedCommand: "复制失败，请手动复制命令。",
    ossStar: "在 GitHub 上点 Star",
    footerBrand:
      "知远是一款开源的桌面 AI 工作台。内置 llama.cpp，模型和数据都可以留在你自己的电脑上。",
    footerRelease: "稳定版",
    footerPlatforms: "macOS / Windows / Linux",
    footerColumns: [
      {
        title: "产品",
        links: [
          { label: "下载", href: "/#download" },
          { label: "产品界面", href: "/#workbench" },
          { label: "企业服务", href: "/enterprise/" },
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
    navDocs: "Docs",
    navBlog: "Blog",
    headerDownload: "Download",
    star: "Star",
    releaseStable: "stable",
    releaseFallback: "ZhiYuan",
    heroBadgeSub: "Local models and automation in one desktop app",
    headlineTop: "Your computer,",
    headlineAccent: "now an AI workbench.",
    heroLead:
      "Write reports, organize spreadsheets and edit code in one window. ZhiYuan includes llama.cpp for running open models locally. Local inference does not send inputs to a cloud model. Online tools process data through the services you choose.",
    heroCtaPrimary: "Download for free",
    agplChip: "AGPL-3.0",
    heroCtaSecondary: "Take a look",
    platforms: [
      "macOS (Apple Silicon / Intel)",
      "Windows (x64)",
      "Linux (deb / AppImage)",
    ],
    showcaseOverline: "DESKTOP WORKBENCH",
    showcaseTitle: "From request to finished file, in one window.",
    showcaseLead:
      "Switch between tasks, models and skills from the sidebar. Search the model library, click install, and a GGUF model is running on your machine.",
    showcaseCards: [
      {
        title: "Task chat",
        desc: "Describe what you need. ZhiYuan splits it into steps and works through them, and every action and result stays in the thread.",
        alt: "Task chat view with a completed exchange",
      },
      {
        title: "Model library",
        desc: "Search, download and launch GGUF models. ZhiYuan starts and stops the inference server for you. No terminal needed.",
        alt: "Model library listing downloadable models",
      },
      {
        title: "Experts & skills",
        desc: "Common workflows like weekly reports, data cleanup and code review, packaged as skills you can call when the task comes up.",
        alt: "Experts page listing installable skills",
      },
      {
        title: "Local workspace",
        desc: "ZhiYuan only reads and writes inside folders you allow, and saves its output right there.",
        alt: "Main window with the task input box",
      },
    ],
    modelsOverline: "LOCAL INFERENCE · POWERED BY LLAMA.CPP",
    modelsTitle: "Models that run on your machine.",
    modelsLead:
      "llama.cpp is built in. Pick a model and ZhiYuan handles the download, loading and server lifecycle. How big a model you can run depends on your memory and GPU.",
    monitorLabel: "VRAM in use",
    monitorValue: "8.4 GB / 32 GB",
    monitorState: "Running",
    modelCards: [
      {
        chip: "Qwen2.5 7B / 14B",
        status: "installed",
        statusText: "Installed",
        title: "Writing and long documents",
        desc: "A strong all-rounder, especially in Chinese. Good for drafting documents, pulling fields out of tables and summarizing long files.",
        specs: [
          { key: "Quant", value: "GGUF Q4_K_M / Q8_0" },
          { key: "Context", value: "32K tokens" },
          { key: "Memory", value: "≥ 10 GB VRAM or unified (14B, Q4)" },
        ],
      },
      {
        chip: "Qwen2.5-Coder 7B / 32B",
        status: "fetch",
        statusText: "Available",
        title: "Reading and refactoring code",
        desc: "Reads your local repo, walks through it function by function, and helps you review scripts and plan refactors.",
        specs: [
          { key: "Quant", value: "GGUF IQ4_XS" },
          { key: "Tool calling", value: "Yes" },
          { key: "Engine", value: "llama.cpp" },
        ],
      },
      {
        chip: "Llama 3.2 1B / 3B",
        status: "fetch",
        statusText: "Available",
        title: "Small and fast",
        desc: "Light enough to stream smoothly on an ordinary laptop. Good for background jobs like classification and tagging.",
        specs: [
          { key: "Quant", value: "GGUF Q4_0 / Q8_0" },
          { key: "Memory", value: "~2–4 GB" },
          { key: "Best for", value: "Background classification, quick answers" },
        ],
      },
    ],
    benchLabel: "Settings",
    benchTitle: "Context length",
    benchNote: "Drag to set the context length. Longer contexts use more memory.",
    benchCurrent: "Current: 16,384 tokens",
    benchMax: "Max: 128K (model-dependent)",
    benchFlag: "GPU offload on",
    modelsNote:
      "Speed and model size depend on your hardware. The Windows build doesn't include local inference by default; see the download notes.",
    pillarsOverline: "PRIVACY & CONTROL",
    pillarsTitle: "Your data, your call.",
    pillarsLead:
      "Source code, meeting recordings, business spreadsheets: some files shouldn't leave your machine. ZhiYuan is built around three rules.",
    principles: [
      {
        title: "Everything stays local",
        body: "Chat history, document indexes and settings live on your computer. ZhiYuan can only read folders you've explicitly allowed.",
        foot: "Works fully offline (macOS / Linux)",
      },
      {
        title: "Local or cloud, per task",
        body: "Keep sensitive work on a local model, even offline. For everyday tasks, plug in any OpenAI-compatible API.",
        foot: "API keys are encrypted on disk",
      },
      {
        title: "Nothing happens out of sight",
        body: "Before running code, fetching a page or writing a file, ZhiYuan shows exactly what it's about to do. Automation scripts run in a sandbox.",
        foot: "A full action log you can audit",
      },
    ],
    downloadOverline: "DOWNLOAD",
    downloadTitle: "Download ZhiYuan",
    downloadLead:
      "Pick your platform, install, choose a model and start your first task.",
    downloadAssurance:
      "Update manifests include signatures and SHA-256 checksums. See the release notes for code-signing status on each platform.",
    sizeLabel: "Size",
    releases: "Release notes",
    version: "Stable",
    loading: "Loading release info…",
    unavailable: "Couldn't load release info. Refresh, or download from GitHub.",
    noLinux: "No installer for this platform in this release.",
    windowsNoteTitle: "Note for Windows users: ",
    windowsNote:
      "The Windows installer doesn't include local inference. To run local models, open Settings after installing and add the community-maintained inference plugin.",
    windowsGuide: "Windows setup guide",
    signingNote:
      "Update manifests include signatures and SHA-256 checksums. See the release notes for code-signing status on each platform.",
    ossOverline: "OPEN SOURCE · AGPL-3.0",
    ossTitle: "Open source. Come build with us.",
    ossBody:
      "The workflow engine, task UI and local model integration are on GitHub under AGPL-3.0. File an issue, send a pull request, or fork it and make it your own.",
    cloneCommand: "git clone https://github.com/rongxinzy/RongxinAI.git",
    copyCommand: "Copy",
    copiedCommand: "Copied",
    copyFailedCommand: "Copy failed. Select and copy the command manually.",
    ossStar: "Star on GitHub",
    footerBrand:
      "ZhiYuan is an open-source desktop AI workbench. With llama.cpp built in, your models and data can stay on your own computer.",
    footerRelease: "Stable",
    footerPlatforms: "macOS / Windows / Linux",
    footerColumns: [
      {
        title: "Product",
        links: [
          { label: "Download", href: "/en/#download" },
          { label: "Product tour", href: "/en/#workbench" },
          { label: "For teams", href: "/en/enterprise/" },
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
