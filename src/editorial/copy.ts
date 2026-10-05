import type { SiteLocale } from "../shared/site-types";

export const GITHUB = "https://github.com/rongxinzy/RongxinAI";
export const isEnglish = (locale: SiteLocale) => locale === "en";

type ScenarioDoc = {
  label: string;
  summary: string;
  table?: {
    headers: string[];
    rows: string[][];
    tones?: Array<"green" | "primary">;
  };
  items: Array<{ title: string; meta: string }>;
  filename: string;
  content: string;
};

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
  workbenchPath: string;
  enginePill: string;
  sideTitle: string;
  sideStateIdle: string;
  sideStateRunning: string;
  sideStateDone: string;
  flowSteps: Array<{ title: string; desc: string; badge: string }>;
  logTitle: string;
  logPid: string;
  logLines: string[];
  docOverline: string;
  copyMarkdown: string;
  exportReport: string;
  summaryLabel: string;
  actionTitle: string;
  composerHint: string;
  run: string;
  running: string;
  replay: string;
  ready: string;
  done: string;
  approval: string;
  approvalBody: string;
  allow: string;
  deny: string;
  denied: string;
  waiting: string;
  downloadSample: string;
  demoNote: string;
  scenarios: ScenarioDoc[];
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
    heroCtaSecondary: "探索工作台交互演示",
    platforms: [
      "macOS (Apple Silicon / Intel)",
      "Windows (x64)",
      "Linux (deb / AppImage)",
    ],
    workbenchPath: "/Project_Zhiyuan_Q3/Market_Strategy.zy",
    enginePill: "Local Inference · 42.8 t/s",
    sideTitle: "执行工作流流水线",
    sideStateIdle: "STATE: 00/03 IDLE",
    sideStateRunning: "STATE: RUNNING",
    sideStateDone: "STATE: 03/03 DONE",
    flowSteps: [
      {
        title: "读取材料",
        desc: "挂载本地目录授权，语义切片与向量索引。",
        badge: "2 份文件",
      },
      {
        title: "调用工具链",
        desc: "本地沙箱解析财务公式，浏览器插件抓取行情基准。",
        badge: "PASS 100%",
      },
      {
        title: "生成交付作品",
        desc: "生成带财务校验的执行备忘录与责任追踪清单。",
        badge: "已导出",
      },
    ],
    logTitle: "LOCAL_RUNNER_LOG",
    logPid: "PID: 88412",
    logLines: [
      "> inference: Qwen2.5-14B-Instruct-Q4_K_M.gguf",
      "> prompt_tokens: 3,412 | completion: 618 (0.84s)",
    ],
    docOverline: "ZHIYUAN WORKBENCH OUTPUT",
    copyMarkdown: "复制 Markdown",
    exportReport: "导出报告",
    summaryLabel: "AI 核心提炼与决议",
    actionTitle: "下阶段行动项 (Action Items)",
    composerHint: "追问细节，或输入「/」调取本地工具集…",
    run: "执行",
    running: "处理中",
    replay: "重播演示",
    ready: "等待运行",
    done: "完成",
    approval: "文件生成请求",
    approvalBody: "生成输出文件需要确认。",
    allow: "允许生成",
    deny: "停止任务",
    denied: "文件生成取消。",
    waiting: "运行演示后，输出文件在这里生成。",
    downloadSample: "下载示例文件",
    demoNote: "网页演示使用样例文件。桌面应用处理用户文件。",
    scenarios: [
      {
        label: "会议纪要与决议",
        summary:
          "本次管理层确认向全栈私有化推理架构迁移。Q3 预算缩减云 API 支出 68%，全面采用本地统一算力集群进行代码审查与合同分析。",
        table: {
          headers: [
            "项目条目",
            "此前云端月均开销",
            "知远本地化后预估",
            "算力延迟 (P95)",
            "状态",
          ],
          rows: [
            ["代码生成与安全扫描", "¥ 38,400 / 月", "¥ 1,200 (电费)", "18 ms", "已切入"],
            ["研报与合同深度解析", "¥ 52,000 / 月", "¥ 0 (端侧无上限)", "45 ms", "配置完成"],
          ],
          tones: ["green", "primary"],
        },
        items: [
          { title: "工程部：部署 GGUF 14B Coder", meta: "指派给：架构组 · 截止本周五" },
          { title: "法务合规：审查端侧模型授权", meta: "指派给：审计室 · 隔离网闸运行" },
        ],
        filename: "项目摘要.md",
        content:
          "# 项目摘要\n\n> 知远官网演示 · 以下为示例数据\n\n## 本周进展\n需求范围：登录页、费用表导出。\n\n## 下一步\n测试登录流程和 CSV 导出，记录错误。\n\n## 待确认\n待确认：测试日期、参与人员。\n\n## 来源\n- 示例会议纪要.md\n- 示例项目进度表.csv",
      },
      {
        label: "费用汇总与审计",
        summary:
          "完成三季度费用归集，核对分类与缺失金额。餐饮类目存在原始记录缺项，已列入待确认清单，不计入本次合计。",
        table: {
          headers: ["项目条目", "此前云端月均", "本地化后预估", "状态"],
          rows: [
            ["代码生成与安全扫描", "¥ 38,400 / 月", "¥ 1,200 (电费)", "已切入"],
            ["研报与合同深度解析", "¥ 52,000 / 月", "¥ 0 (端侧无上限)", "配置完成"],
          ],
        },
        items: [
          { title: "财务：补齐餐饮原始凭证", meta: "指派给：财务室 · 本周内" },
          { title: "审计：复核云端支出下降口径", meta: "指派给：审计室 · 季度报告引用" },
        ],
        filename: "费用汇总.csv",
        content:
          "类别,金额,备注\n办公用品,320,示例数据\n交通,180,示例数据\n餐饮,待确认,原始记录缺少金额\n",
      },
      {
        label: "代码导读与重构",
        summary:
          "梳理示例仓库的模块关系与调用链，入口至组件分层清晰。测试尚未执行，导读结论以源码静态分析为准。",
        items: [
          { title: "工程部：补全入口单元测试", meta: "指派给：架构组 · 下周前" },
          { title: "文档：同步导读至团队知识库", meta: "指派给：项目组 · 随版本发布" },
        ],
        filename: "代码导读.md",
        content:
          "# 代码导读\n\n> 知远官网演示 · 虚构示例项目\n\n## 入口\nsrc/main.tsx 挂载应用。\n\n## 模块关系\nApp 组合页面，components 存放界面组件。\n\n## 阅读顺序\n1. main.tsx\n2. App.tsx\n3. components/\n\n测试状态：未执行。",
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
          { label: "工作台演示", href: "/#workbench" },
          { label: "企业服务", href: "/enterprise/" },
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
    heroCtaSecondary: "Explore the workbench demo",
    platforms: [
      "macOS (Apple Silicon / Intel)",
      "Windows (x64)",
      "Linux (deb / AppImage)",
    ],
    workbenchPath: "/Project_Zhiyuan_Q3/Market_Strategy.zy",
    enginePill: "Local Inference · 42.8 t/s",
    sideTitle: "Execution pipeline",
    sideStateIdle: "STATE: 00/03 IDLE",
    sideStateRunning: "STATE: RUNNING",
    sideStateDone: "STATE: 03/03 DONE",
    flowSteps: [
      {
        title: "Read the material",
        desc: "Mount authorized local directories. Semantic chunking and vector indexing.",
        badge: "2 files",
      },
      {
        title: "Invoke the tool chain",
        desc: "A local sandbox parses formulas; a browser plugin fetches benchmarks.",
        badge: "PASS 100%",
      },
      {
        title: "Deliver the output",
        desc: "Generate an execution memo with financial checks and an owner list.",
        badge: "Exported",
      },
    ],
    logTitle: "LOCAL_RUNNER_LOG",
    logPid: "PID: 88412",
    logLines: [
      "> inference: Qwen2.5-14B-Instruct-Q4_K_M.gguf",
      "> prompt_tokens: 3,412 | completion: 618 (0.84s)",
    ],
    docOverline: "ZHIYUAN WORKBENCH OUTPUT",
    copyMarkdown: "Copy Markdown",
    exportReport: "Export report",
    summaryLabel: "AI summary and decisions",
    actionTitle: "Action items",
    composerHint: "Follow up, or type “/” to call local tools…",
    run: "Run",
    running: "Working",
    replay: "Run again",
    ready: "Ready to run",
    done: "Complete",
    approval: "File creation request",
    approvalBody: "File creation requires approval.",
    allow: "Allow creation",
    deny: "Stop task",
    denied: "File creation cancelled.",
    waiting: "Run the demo and the output file appears here.",
    downloadSample: "Download sample file",
    demoNote:
      "The web demo uses sample files. The desktop app processes user files.",
    scenarios: [
      {
        label: "Meeting notes & decisions",
        summary:
          "Management confirmed the migration to a fully private inference architecture. The Q3 budget cuts cloud API spending by 68%; code review and contract analysis move to the local compute cluster.",
        table: {
          headers: [
            "Line item",
            "Previous cloud monthly",
            "Local estimate",
            "Latency (P95)",
            "Status",
          ],
          rows: [
            ["Code generation & security scan", "$5,400 / mo", "$170 (electricity)", "18 ms", "Switched"],
            ["Research & contract analysis", "$7,300 / mo", "$0 (no local cap)", "45 ms", "Configured"],
          ],
          tones: ["green", "primary"],
        },
        items: [
          {
            title: "Engineering: deploy the GGUF 14B Coder",
            meta: "Assigned to: Architecture · due Friday",
          },
          {
            title: "Legal: review on-device model licensing",
            meta: "Assigned to: Audit · air-gapped environment",
          },
        ],
        filename: "project-summary.md",
        content:
          "# Project summary\n\n> ZhiYuan website demo — sample data\n\n## Progress\nScope: login page and expense export.\n\n## Next steps\nTest login and CSV export. Record errors.\n\n## Open questions\nTo confirm: test dates and participants.\n\n## Sources\n- sample-meeting-notes.md\n- sample-progress.csv",
      },
      {
        label: "Expense summary & audit",
        summary:
          "Q3 expenses grouped and cross-checked. The meals category has entries with missing amounts; they are listed for confirmation and excluded from the total.",
        table: {
          headers: ["Line item", "Previous cloud monthly", "Local estimate", "Status"],
          rows: [
            ["Code generation & security scan", "$5,400 / mo", "$170 (electricity)", "Switched"],
            ["Research & contract analysis", "$7,300 / mo", "$0 (no local cap)", "Configured"],
          ],
        },
        items: [
          {
            title: "Finance: complete meal receipts",
            meta: "Assigned to: Finance · this week",
          },
          {
            title: "Audit: verify the cloud spend reduction",
            meta: "Assigned to: Audit · quoted in the quarterly report",
          },
        ],
        filename: "expenses.csv",
        content:
          "Category,Amount,Note\nOffice supplies,320,Sample data\nTravel,180,Sample data\nMeals,Unconfirmed,Missing amount in source\n",
      },
      {
        label: "Code guide & refactoring",
        summary:
          "Module relationships and call chains mapped for the sample repository. Tests have not run; the guide reflects static source analysis.",
        items: [
          {
            title: "Engineering: add unit tests for the entry point",
            meta: "Assigned to: Architecture · next week",
          },
          {
            title: "Docs: publish the guide to the team knowledge base",
            meta: "Assigned to: Project team · with the release",
          },
        ],
        filename: "code-guide.md",
        content:
          "# Code guide\n\n> ZhiYuan website demo — fictional project\n\n## Entry point\nsrc/main.tsx mounts the application.\n\n## Modules\nApp composes pages; components contains UI components.\n\n## Reading order\n1. main.tsx\n2. App.tsx\n3. components/\n\nTest status: not executed.",
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
          { label: "Workbench demo", href: "/en/#workbench" },
          { label: "For teams", href: "/en/enterprise/" },
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
