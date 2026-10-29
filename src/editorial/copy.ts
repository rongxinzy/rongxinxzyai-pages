import type { SiteLocale } from "../shared/site-types";
// Demo-only copy. Product content and labels come from the existing client exports.
const demoZh = {
  title: '交互演示', sample: '示例数据 · 连接账号、启动机器人及访问本机资源需桌面客户端',
  desktopOnly: '当前体验仅使用示例数据。连接账号、启动机器人和访问本机资源请使用桌面客户端。',
  operationFailed: '操作未完成，请重置工作台后重试。',
  start: '开始体验', hint: '点击侧栏、搜索模型，或发送一条任务。',
  reset: '重置演示', expand: '全屏体验', collapse: '退出全屏',
  loading: '正在加载工作台…', error: '演示加载失败，请重试。', retry: '重新加载',
  slowLoading: '加载较慢，仍在等待。', runtimeIssue: '部分操作未完成，可继续使用或重置演示。',
  scenes: '选择演示场景', mobile: '左右滑动查看工作台，通过侧栏切换页面。',
  draft: '根据 sales_q3.xlsx 和 7 月以来的周报写第三季度销售分析报告，指出主要问题并给出建议，输出 Word 文档。',
  reasoning: '读取季度销售表和周报，对比分区域营收、毛利率与预算执行情况，整理报告与建议。',
  tools: ['data/sales_q3.xlsx', 'weekly-reports/', 'python analyze_q3.py --by region --compare 2025Q3', 'output/Q3-sales-report.docx'],
  report: '第三季度销售分析报告\n\n营收：4,826 万元，同比增长 9.8%。\n毛利率：31.2%，环比下降 1.4 个百分点。\n\n主要问题\n1. 华北渠道库存积压。\n2. 9 月集中促销影响毛利。\n3. 新客占比下滑。\n\n建议\n按区域跟进库存与预算执行，调整促销节奏，并持续追踪新客转化。',
};
type DemoCopy = { [Key in keyof typeof demoZh]: (typeof demoZh)[Key] extends string[] ? string[] : string };
const demoEn: DemoCopy = {
  title: 'Live demo', sample: 'Sample data · Accounts, bots and local resources require the desktop app',
  desktopOnly: 'This preview uses sample data. Use the desktop app to connect accounts, start bots, or access local resources.',
  operationFailed: 'The operation could not finish. Reset the demo and try again.',
  start: 'Explore the workspace', hint: 'Use the sidebar, search models, or send a task.',
  reset: 'Reset demo', expand: 'Enter fullscreen', collapse: 'Exit fullscreen',
  loading: 'Loading the workspace…', error: 'The demo could not load. Please retry.', retry: 'Retry',
  slowLoading: 'Loading is taking longer. Still waiting.', runtimeIssue: 'An operation could not finish. Continue or reset the demo.',
  scenes: 'Choose a demo scene', mobile: 'Swipe horizontally to explore and use the sidebar to switch pages.',
  draft: 'Write a Q3 sales analysis from sales_q3.xlsx and weekly reports since July. Identify problems, recommend actions, and produce a Word document.',
  reasoning: 'Read the sales workbook and weekly reports, compare regional revenue, margins, and budget execution, then prepare the report.',
  tools: demoZh.tools,
  report: 'Q3 Sales Analysis\n\nRevenue: CNY 48.26 million, up 9.8% year over year.\nGross margin: 31.2%, down 1.4 percentage points quarter over quarter.\n\nKey issues\n1. Excess inventory in North China.\n2. September promotions reduced margins.\n3. A declining share of new customers.\n\nRecommendations\nTrack inventory and budgets by region, adjust promotion timing, and monitor new customer conversion.',
};

export function demoCopy(locale: SiteLocale): DemoCopy { return locale === 'en' ? demoEn : demoZh; }

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
  navBrowser: string;
  browserBadge: string;
  browserTitle: string;
  browserSlogan: string;
  browserCta: string;
  browserHeroNote: string;
  browserFeaturesOverline: string;
  browserFeaturesTitle: string;
  browserFeatures: Array<{ title: string; body: string }>;
  browserPlatformsOverline: string;
  browserPlatformsTitle: string;
  browserPlatforms: Array<{
    id: "windows" | "macos" | "linux";
    name: string;
    detail: string;
    action: string;
  }>;
  browserSetupTitle: string;
  browserSetupBodyBeforeLink: string;
  browserSetupLinkLabel: string;
  browserSetupBodyAfterLink: string;
  browserOssOverline: string;
  browserOssTitle: string;
  browserOssBodyBeforeEgo: string;
  browserOssBodyMid: string;
  browserOssBodyAfter: string;
  browserFaqTitle: string;
  browserFaq: Array<{ q: string; a: string }>;
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
  enterpriseVisionOverline: string;
  enterpriseVisionTitle: string;
  enterpriseVisionBody: string;
  enterpriseAudienceTitle: string;
  enterpriseAudienceBody: string;
  enterpriseCapabilitiesOverline: string;
  enterpriseCapabilitiesLead: string;
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
    navBrowser: "浏览器",
    browserBadge: "LOCAL BROWSER",
    browserTitle: "知远浏览器",
    browserSlogan: "人与 AI 共用的本机浏览器",
    browserCta: "即将开放下载",
    browserHeroNote:
      "知远浏览器是知远的本机浏览器能力，与知远桌面端配套使用，不取代桌面端。",
    browserFeaturesOverline: "CAPABILITIES",
    browserFeaturesTitle: "本机浏览器，为人与 agent 共用而设计",
    browserFeatures: [
      {
        title: "共用本机 Chromium",
        body: "人与 AI agent 在同一套本机浏览器环境中操作页面，任务上下文留在你的电脑上。",
      },
      {
        title: "Space 隔离",
        body: "按 Space 划分浏览上下文，减少不同任务之间的 Cookie、会话与标签页互相干扰。",
      },
      {
        title: "与知远配套",
        body: "作为知远桌面端的本机浏览器能力接入工作流，与桌面应用协同，而非单独替代桌面端。",
      },
    ],
    browserPlatformsOverline: "PLATFORMS",
    browserPlatformsTitle: "首发平台",
    browserPlatforms: [
      {
        id: "windows",
        name: "Windows",
        detail: "x64",
        action: "即将开放下载",
      },
      {
        id: "macos",
        name: "macOS",
        detail: "Apple Silicon / Intel",
        action: "即将开放下载",
      },
      {
        id: "linux",
        name: "Linux",
        detail: "桌面发行版",
        action: "即将推出",
      },
    ],
    browserSetupTitle: "使用前准备",
    browserSetupBodyBeforeLink: "知远浏览器需配合官方 ",
    browserSetupLinkLabel: "ego lite",
    browserSetupBodyAfterLink:
      " 运行。请从上游仓库获取并安装官方版本，再与知远桌面端一起使用。",
    browserOssOverline: "OPEN SOURCE",
    browserOssTitle: "开源与致谢",
    browserOssBodyBeforeEgo:
      "知远浏览器本体不是本仓库的开源产品。能力基于上游 ",
    browserOssBodyMid: " 与 ",
    browserOssBodyAfter:
      " 等项目构建；相关许可与源码请参见各项目说明。",
    browserFaqTitle: "常见问题",
    browserFaq: [
      {
        q: "与知远桌面端是什么关系？",
        a: "知远浏览器提供本机浏览能力，与知远桌面端配套。桌面端仍是主要工作台，浏览器不取代桌面应用。",
      },
      {
        q: "浏览器本身开源吗？",
        a: "浏览器安装包不是本 GitHub 仓库发布的内容。上游 ego-lite 与 Chromium 各自遵循其开源许可；本页仅说明依赖关系。",
      },
      {
        q: "支持哪些系统？",
        a: "首发面向 Windows 与 macOS。Linux 版本规划中，页面状态更新后会在此列出。",
      },
    ],
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
      "左侧栏集中切换会话、本地模型与技能。在模型库检索并下载 GGUF 权重，即可启动本地推理服务。通用设置可开启桌面伙伴，七种官方形象可选。",
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
      {
        title: "桌面伙伴",
        desc: "可选的桌面角色只读展示任务状态，默认关闭。七种官方形象可在通用设置切换，含原有小远与六款新角色。",
        alt: "通用设置中的桌面伙伴与官方形象选择",
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
      "推理速度受芯片架构、内存带宽与量化精度影响。Windows 轻量版不含本地推理，CPU 版与 CUDA 版内置。",
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
    windowsNoteTitle: "Windows 版本说明：",
    windowsNote:
      "Windows 提供三个版本：轻量版不含本地推理，体积最小；CPU 版内置 CPU 与 Vulkan 推理；CUDA 版适用于配备 RTX 40 系列显卡的电脑（显卡不可用时回退到 CPU）。如需在本机运行 GGUF 模型，请选择 CPU 版或 CUDA 版。三个版本均可离线安装。",
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
    enterpriseTitle: ["AI Native", "经营底座"],
    enterpriseLead:
      "知远企业版面向企业提供 AI Native 经营底座：用数字员工与人机协作，重塑组织怎么做决策、怎么落地、怎么持续运转。",
    enterpriseStatus:
      "愿景按场景分阶段建设。当前以 Web 对话与管理端交付，支持私有化部署；可用能力、验收标准与生产范围在项目评估中确认。",
    enterpriseVisionOverline: "AI NATIVE",
    enterpriseVisionTitle: "AI Native 企业经营与组织协作",
    enterpriseVisionBody:
      "下一阶段的企业管理，不是把旧流程贴一层 AI 皮肤，而是以 AI 为默认生产力与协作单元：岗位有数字员工、个人有搭档、关键决策在权限与治理框架内发生。知远企业版要做的，是让企业用 AI Native 的方式重新组织经营——从试点岗位走向可复制的经营模式，而不是一次性的 demo。能被编制、能被问责、能被规模化的 AI，才会改变公司怎么打仗。",
    enterpriseAudienceTitle: "为谁而做",
    enterpriseAudienceBody:
      "正在把 AI Native 协作纳入经营与运作、且需要权限与合规边界的团队。常见起点是销售、运营、客服等岗位的封闭试点，而非全员即时上线。",
    enterpriseCapabilitiesOverline: "ON THE BASE",
    enterpriseCapabilitiesLead:
      "在 AI Native 底座上，你得到岗位劳动力、个人助手，以及让 AI 进入真实经营而不失控的治理机制。",
    enterpriseBenefitsTitle: "能力路径",
    enterpriseBenefits: [
      {
        title: "数字员工",
        body: "岗位编制里的 AI 劳动力：按职责配置，使用企业身份、职责边界与权限，向授权范围内的请求者交付专业执行。",
      },
      {
        title: "个人搭档",
        body: "个人侧助手，固定归属账号，承接长期目标与工作连续性。与岗位数字员工分开管理，不共用岗位编制与权限。",
      },
      {
        title: "审批与治理",
        body: "权限边界、模型与工具授权，以及对话内审批与写回：关键动作在治理框架内发生，外发与写入未批准不执行。",
      },
    ],
    enterpriseDocsAction: "阅读企业版产品说明",
    enterpriseDocsHref: "/docs/guide/what-is-zhiyuan",
    contactAction: "讨论企业试点",
    scope: "功能状态、部署方式、数据范围与验收标准在项目评估中确认，交付内容以合同约定为准。",
    architectureTitle: "边界与原则",
    architectureLead:
      "AI Native 运作不等于取消人工决策。岗位员工与个人搭档分轨；能力开放、模型与工具调用及对外写入，均以企业策略与审批为准。",
    architecture: [
      { title: "岗位员工 ≠ 个人搭档", items: "数字员工按岗位或服务范围配属 / 个人搭档固定属于一个账号 / 二者身份与权限不混用" },
      { title: "治理先于执行", items: "权限与审批定义可执行范围 / 对话内可完成审批与结果回写 / 未批准不执行对外写入" },
      { title: "权限与留痕", items: "企业身份决定可见数据与可调用工具 / 受管工具检查请求者数据范围 / 操作事件供运行与合规排查" },
    ],
    deliveryOverline: "LANDING",
    deliveryTitle: "怎么落地",
    delivery: [
      {
        title: "私有化或内网演示",
        body: "在隔离环境演示 Web 对话与管理端，确认部署条件、网络与数据边界。",
      },
      {
        title: "岗位试点",
        body: "选定岗位、典型任务与参与人数，约定验收标准，并列出试点内可用能力与待开发项。",
      },
      {
        title: "纳入现有协作",
        body: "将人机协作与治理接入现有交接、审批与管理习惯，完成试点验收后再评估人员与场景扩展。",
      },
    ],
    comparisonOverline: "OPEN DESKTOP & ENTERPRISE",
    comparisonTitle: "开源桌面与企业版",
    comparisonHint: "左右滑动查看对比",
    headers: ["维度", "开源桌面版", "知远企业版"],
    comparison: [
      ["定位", "个人在本机使用开源工作台", "AI Native 经营底座与企业人机协作"],
      ["主界面", "本机桌面应用", "Web 对话与管理端（支持私有化部署）"],
      ["身份与权限", "用户自行配置模型与工具", "企业身份、岗位权限、模型授权与受管工具数据范围"],
      ["起步方式", "下载安装，参考文档使用", "需求评估、岗位试点与分阶段交付"],
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
    brandSub: "Desktop AI companion",
    navWorkflow: "Features",
    navInference: "Local models",
    navEnterprise: "For teams",
    navRoadmap: "Roadmap",
    navDocs: "Docs",
    navBlog: "Blog",
    navBrowser: "Browser",
    browserBadge: "LOCAL BROWSER",
    browserTitle: "Seriya Browser",
    browserSlogan: "A local browser for you and AI agents",
    browserCta: "Download coming soon",
    browserHeroNote:
      "Seriya Browser is the local browser capability for Seriya. It ships alongside the desktop app and does not replace it.",
    browserFeaturesOverline: "CAPABILITIES",
    browserFeaturesTitle: "Built for people and agents on one machine",
    browserFeatures: [
      {
        title: "Shared local Chromium",
        body: "You and AI agents operate in the same on-device browser environment. Task context stays on your computer.",
      },
      {
        title: "Space isolation",
        body: "Spaces separate browsing context so cookies, sessions, and tabs from different tasks interfere less.",
      },
      {
        title: "Works with Seriya desktop",
        body: "Connects to the Seriya desktop app as its local browser capability—companion software, not a replacement.",
      },
    ],
    browserPlatformsOverline: "PLATFORMS",
    browserPlatformsTitle: "First release platforms",
    browserPlatforms: [
      {
        id: "windows",
        name: "Windows",
        detail: "x64",
        action: "Download coming soon",
      },
      {
        id: "macos",
        name: "macOS",
        detail: "Apple silicon / Intel",
        action: "Download coming soon",
      },
      {
        id: "linux",
        name: "Linux",
        detail: "Desktop distributions",
        action: "Coming later",
      },
    ],
    browserSetupTitle: "Before you start",
    browserSetupBodyBeforeLink: "Seriya Browser requires the official ",
    browserSetupLinkLabel: "ego lite",
    browserSetupBodyAfterLink:
      " runtime. Install it from the upstream repository, then use it together with the Seriya desktop app.",
    browserOssOverline: "OPEN SOURCE",
    browserOssTitle: "Licenses and acknowledgments",
    browserOssBodyBeforeEgo:
      "Seriya Browser is not an open-source product of this repository. It is built on ",
    browserOssBodyMid: " and ",
    browserOssBodyAfter:
      ". See each project for license terms and source code.",
    browserFaqTitle: "FAQ",
    browserFaq: [
      {
        q: "How does this relate to the desktop app?",
        a: "Seriya Browser adds local browsing alongside the desktop app. The desktop app remains the primary workspace.",
      },
      {
        q: "Is the browser open source here?",
        a: "Installers are not published from this GitHub repo. ego-lite and Chromium follow their own licenses; this page describes dependencies only.",
      },
      {
        q: "Which systems are supported?",
        a: "Windows and macOS are first. Linux is planned; this page will update when a build is available.",
      },
    ],
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
    releaseFallback: "Seriya",
    heroBadgeSub: "Local models, task automation, optional desktop companions",
    headlineTop: "Your desktop,",
    headlineAccent: "with an intelligent companion.",
    heroLead:
      "Write reports, organize spreadsheets and edit code in one window. Seriya includes llama.cpp for running open models locally. Local inference does not send inputs to cloud models, while online tools process data through the services you configure.",
    heroCtaPrimary: "Download for free",
    agplChip: "AGPL-3.0",
    heroCtaSecondary: "Product tour",
    platforms: [
      "macOS · Apple Silicon / Intel",
      "Windows · x64",
      "Linux · deb / AppImage",
    ],
    showcaseOverline: "LOCAL-FIRST DESKTOP",
    showcaseTitle: "From task breakdown to file delivery in one workspace.",
    showcaseLead:
      "Switch between sessions, local models and skills from the sidebar. Search and download GGUF weights in the model library to start the local inference service. Seven scarf companions live under General settings; the snowy owl is the lead mark.",
    showcaseCards: [
      {
        title: "Task chat",
        desc: "Provide a goal and reference files. Seriya breaks the task into steps and calls tools in sequence, keeping every action, argument and output in the thread.",
        alt: "Task chat view showing multi-step task execution",
      },
      {
        title: "Model library",
        desc: "Search, download and load GGUF models from the UI. Seriya manages the inference server in the background without terminal setup.",
        alt: "Model library listing downloadable local models",
      },
      {
        title: "Experts & skills",
        desc: "Package recurring workflows such as weekly reports, data cleanup and code review into reusable skills and invoke them per task.",
        alt: "Experts and skills view listing installable skill modules",
      },
      {
        title: "Local workspace",
        desc: "Seriya reads and writes only within directories you authorize, saving generated files directly back to the local folder.",
        alt: "Main desktop window and task input area",
      },
      {
        title: "Desktop companion",
        desc: "An optional on-desktop character reflects task state read-only and stays off by default. General settings offer seven scarf companions, led by the snowy owl.",
        alt: "General settings for the desktop companion and appearance picker",
      },
    ],
    modelsOverline: "LOCAL INFERENCE · POWERED BY LLAMA.CPP",
    modelsTitle: "Run open models on your machine.",
    modelsLead:
      "Seriya embeds llama.cpp to handle model downloads, loading and server lifecycle. Supported model sizes depend on your system memory and GPU VRAM.",
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
      "Inference speed depends on chip architecture, memory bandwidth and quantization. The Windows lite edition has no local inference; the CPU and CUDA editions bundle it.",
    pillarsOverline: "PRIVACY & CONTROL",
    pillarsTitle: "Control over files, models and execution.",
    pillarsLead:
      "When working with source code, meeting notes and business sheets, you define which directories Seriya can access, choose local or cloud models per task, and review tool parameters before execution.",
    principles: [
      {
        title: "Data stored on device",
        body: "Session history, document indexes and settings are stored on your computer. Seriya only accesses directories you explicitly authorize.",
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
    downloadTitle: "Download Seriya",
    downloadLead:
      "Select an installer for your operating system. Configure a local or cloud model after installation to start a task.",
    downloadAssurance: "Certum & Apple code-signed · SHA-256 verified",
    sizeLabel: "Size",
    releases: "Release notes",
    version: "Stable",
    loading: "Loading release info…",
    unavailable: "Unable to load release info. Refresh the page or download from GitHub Releases.",
    noLinux: "No installer for this platform in the current release.",
    windowsNoteTitle: "Windows editions: ",
    windowsNote:
      "Windows comes in three editions: Lite is the smallest and has no local inference; CPU bundles CPU and Vulkan inference; CUDA is for PCs with an RTX 40-series GPU (with a CPU fallback). To run GGUF models locally, pick CPU or CUDA. All three install offline.",
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
      "Seriya is an open-source, local-first desktop AI companion with built-in llama.cpp inference for local file processing and multi-step tasks.",
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
    enterpriseBadge: "SERIYA ENTERPRISE",
    enterpriseTitle: ["AI Native", "operating foundation"],
    enterpriseLead:
      "Seriya Enterprise is an AI Native operating foundation for organizations: digital employees and human–AI collaboration reshape how decisions are made, work is executed and operations keep running.",
    enterpriseStatus:
      "The vision rolls out by scenario. Today: web chat and admin, with private deployment supported. Capabilities, acceptance criteria and production scope are confirmed per project.",
    enterpriseVisionOverline: "AI NATIVE",
    enterpriseVisionTitle: "AI-native enterprise operations and collaboration",
    enterpriseVisionBody:
      "The next stage of management is not a thin AI layer on old processes. AI becomes the default unit of production and collaboration: roles staffed with digital employees, individuals supported by companions, critical decisions inside permission and governance boundaries. Seriya Enterprise reorganizes how the business runs in an AI-native way—from pilot roles toward repeatable operating patterns, not one-off demos. AI that can be staffed, held accountable and scaled is what changes how a company competes.",
    enterpriseAudienceTitle: "Who it is for",
    enterpriseAudienceBody:
      "Teams bringing AI-native collaboration into how they operate, with clear permission and compliance boundaries. Typical starts are bounded pilots in sales, operations or support—not organization-wide rollout on day one.",
    enterpriseCapabilitiesOverline: "ON THE BASE",
    enterpriseCapabilitiesLead:
      "On the AI Native foundation you get role workforce, personal assistants, and governance that keeps AI inside real operations without losing control.",
    enterpriseBenefitsTitle: "Capability path",
    enterpriseBenefits: [
      {
        title: "Digital employees",
        body: "AI labor in the role structure: configured by remit with enterprise identity, duty boundaries and permissions; specialist execution for authorized requesters.",
      },
      {
        title: "Personal companion",
        body: "Individual-side assistant bound to one account for long-running goals and continuity. Separate from role-based digital employees—no shared role staffing or permissions.",
      },
      {
        title: "Approval and governance",
        body: "Permission boundaries, model and tool authorization, in-conversation approval and write-back: critical actions stay inside the governance frame; outbound writes do not run without approval.",
      },
    ],
    enterpriseDocsAction: "Read the enterprise product overview",
    enterpriseDocsHref: "/en/docs/guide/what-is-seriya",
    contactAction: "Discuss a pilot",
    scope: "Feature availability, deployment, data scope and acceptance criteria are confirmed during evaluation. The contract defines deliverables.",
    architectureTitle: "Boundaries",
    architectureLead:
      "AI-native operations do not remove human decision-making. Role employees and personal companions stay on separate tracks; capability exposure, models, tools and outbound writes follow enterprise policy and approval.",
    architecture: [
      { title: "Role employee ≠ personal companion", items: "Digital employees by role or service scope / Companions tied to one account / Identities and permissions stay separate" },
      { title: "Governance before execution", items: "Permissions and approval define what may run / Approvals and outcomes can complete in conversation / No outbound write until approved" },
      { title: "Permissions and records", items: "Enterprise identity sets data and tool access / Managed tools check requester scope / Events support operations and compliance review" },
    ],
    deliveryOverline: "LANDING",
    deliveryTitle: "How to land",
    delivery: [
      {
        title: "Private or intranet demo",
        body: "Demonstrate web chat and admin in an isolated environment. Confirm deployment requirements, networking and data boundaries.",
      },
      {
        title: "Role pilot",
        body: "Pick roles, representative tasks and participants. Agree acceptance criteria and list capabilities in scope versus follow-on work.",
      },
      {
        title: "Fit existing collaboration",
        body: "Connect human–AI workflows and governance to current handoffs, approval and management habits. Expand users and scenarios after pilot acceptance.",
      },
    ],
    comparisonOverline: "OPEN DESKTOP & ENTERPRISE",
    comparisonTitle: "Open desktop and enterprise",
    comparisonHint: "Scroll to compare",
    headers: ["Dimension", "Open-source desktop", "Seriya Enterprise"],
    comparison: [
      ["Focus", "Individual use of the open desktop companion on a local machine", "AI Native operating foundation and governed human–AI operations"],
      ["Primary UI", "Local desktop app", "Web chat and admin (private deployment supported)"],
      ["Identity & access", "User-configured models and tools", "Enterprise identity, role permissions, model authorization and managed-tool data scope"],
      ["Getting started", "Download and follow the documentation", "Evaluation, role pilot and phased delivery"],
    ],
    contactOverline: "CONTACT",
    contactTitle: "Define your first pilot",
    contactBody:
      "Tell us the department, typical tasks, expected number of users and systems involved. We will assess available capabilities, deployment requirements and delivery scope.",
    qr: ["User community", "Official account"],
  },
};
