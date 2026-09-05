import type { SiteLocale } from "../shared/site-types";

export const GITHUB = "https://github.com/rongxinzy/RongxinAI";
export const isEnglish = (locale: SiteLocale) => locale === "en";

export const COPY = {
  "zh-CN": {
    nav: ["作品与任务", "企业服务", "使用文档"],
    inferenceNav: "本地推理",
    inferenceLabel: "内置推理引擎",
    inferenceTitle: ["模型，", "装进电脑。"],
    inferenceLead: [
      "搜索、安装、启动 GGUF 模型。",
      "知远管理推理服务，电脑提供算力。",
    ],
    inferenceGuide: "查看本地模型指南",
    inferenceCaption: "知远桌面端 · 模型市场",
    inferenceImage: "查看模型市场原图",
    inferenceSteps: [
      { title: "选模型", body: "搜索模型，查看规格，下载到电脑。" },
      { title: "用算力", body: "调整上下文、GPU 分配和线程数。" },
      { title: "做任务", body: "接入支持工具调用的模型，处理文件与代码。" },
    ],
    inferenceNote: "模型大小和速度取决于设备。Windows 安装包不含本地推理组件。",

    download: "下载知远",
    menu: "导航菜单",
    close: "关闭菜单",
    skip: "跳到正文",
    headline: ["你的电脑，", "你的"],
    headlineAccent: "AI 工作室",
    headlineEnd: "。",
    lead: "知远，把资料、模型与工具放进一个工作台。",
    intro: "写报告、做表格、改代码，从任务到文件。",
    how: "查看任务示例",
    local: "开源 · AGPL-3.0",
    workflow: "从任务，到作品。",
    workflowIntro: "会议纪要、费用汇总、代码导读。查看任务过程，下载结果文件。",
    workflowLabel: "作品与任务",
    demoLabel: "操作演示",
    sampleLabel: "任务示例",
    demoNote: "网页演示使用样例文件。桌面应用处理用户文件。",
    steps: [
      { title: "读取材料", body: "选择文件，输入任务。" },
      { title: "调用工具", body: "读取内容，调用文件、浏览器或代码工具。" },
      { title: "生成文件", body: "查看输出文件，检查来源和待确认项。" },
    ],
    run: "运行演示",
    replay: "重播演示",
    running: "处理中",
    ready: "等待运行",
    done: "完成",
    approval: "文件生成请求",
    approvalBody: "生成输出文件需要确认。",
    allow: "允许生成",
    deny: "停止任务",
    denied: "文件生成取消。",
    preview: "文件预览",
    waiting: "等待生成文件。",
    downloadSample: "下载示例文件",
    boundaries: ["你的模型，", "你的选择。"],
    boundaryRows: [
      {
        title: "文件与会话",
        body: "会话和配置保存在电脑。选择工作目录，授权文件访问。",
      },
      {
        title: "模型选择",
        body: "选择本地模型，或接入云端模型。云端模型与联网工具接收任务内容。",
      },
      {
        title: "工具权限",
        body: "查看操作请求，决定是否执行。技能提供操作步骤，MCP 连接外部工具。",
      },
    ],
    downloadTitle: ["下载知远"],
    downloadBody: "安装桌面端，选择模型，创建任务。",
    source: "查看源代码",
    loading: "读取版本信息…",
    unavailable: "版本信息读取失败。",
    releases: "版本记录",
    version: "稳定版",
    install: "查看安装说明",
    noLinux: "此版本缺少安装包。",
    windowsNote:
      "Windows 安装包不含本地推理组件。设置 Defender 排除项需要用户授权。",
    signingNote: "升级清单包含签名和 SHA-256 校验值。平台签名状态见版本说明。",
    footer: ["文档", "企业服务", "GitHub", "开源许可"],
    copyright: "© 2026 北京容芯致远",
    enterpriseTitle: ["团队的", "AI 工作室。"],
    enterpriseLead:
      "连接团队的模型、知识库与业务系统。让 AI 参与项目，交付文档、数据和代码。",
    contactAction: "联系企业服务",
    scope: "功能、部署范围和交付内容以合同约定为准。",
    architecture: [
      { title: "成员与项目", items: ["团队与成员", "项目与空间"] },
      { title: "模型与知识库", items: ["模型接入", "共享知识"] },
      { title: "系统与权限", items: ["业务系统", "访问策略"] },
    ],
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
    comparisonTitle: "版本与服务",
    comparisonHint: "左右滑动查看对比",
    headers: ["项目", "开源桌面版", "企业项目方案"],
    comparison: [
      ["工作空间", "个人使用", "项目空间、任务模板、成员管理"],
      ["模型与工具", "用户配置", "模型网关、额度、工具连接"],
      ["数据与权限", "本机存储", "成员权限、操作记录、数据管理"],
      ["部署与服务", "文档与社区", "部署、培训、运维"],
    ],
    contactTitle: "谈谈团队的工作。",
    contactBody:
      "告诉我们要完成的任务、使用人数和接入系统。我们确定部署方案与交付范围。",
    qr: ["用户社区", "官方公众号"],
  },
  en: {
    nav: ["Work & tasks", "For teams", "Documentation"],
    inferenceNav: "Local models",
    inferenceLabel: "Built-in inference engine",
    inferenceTitle: ["A model", "on your computer."],
    inferenceLead: [
      "Find, install and run GGUF models.",
      "ZhiYuan manages inference. Your computer provides the compute.",
    ],
    inferenceGuide: "Local model guide",
    inferenceCaption: "ZhiYuan desktop · Model marketplace · Chinese UI",
    inferenceImage: "View the model marketplace image",
    inferenceSteps: [
      {
        title: "Choose a model",
        body: "Search models, review specifications and download to your computer.",
      },
      {
        title: "Use your hardware",
        body: "Set context size, GPU allocation and thread count.",
      },
      {
        title: "Put it to work",
        body: "Connect a model with tool support to work on files and code.",
      },
    ],
    inferenceNote:
      "Model size and speed depend on your hardware. The Windows installer excludes local inference components.",

    download: "Download ZhiYuan",
    menu: "Navigation menu",
    close: "Close menu",
    skip: "Skip to content",
    headline: ["Your computer.", "Your"],
    headlineAccent: "AI studio",
    headlineEnd: ".",
    lead: "ZhiYuan brings your files, models and tools to one workbench.",
    intro:
      "Write reports, build spreadsheets and edit code. Turn tasks into files.",
    how: "View examples",
    local: "Open source · AGPL-3.0",
    workflow: "From task to finished work.",
    workflowIntro:
      "Meeting notes, expense summaries and code guides. Follow the task and download the result.",
    workflowLabel: "Work & tasks",
    demoLabel: "Interactive demo",
    sampleLabel: "Sample task",
    demoNote:
      "The web demo uses sample files. The desktop app processes user files.",
    steps: [
      {
        title: "Read the material",
        body: "Select files and enter a task.",
      },
      {
        title: "Use the tools",
        body: "Read content and use file, browser or code tools.",
      },
      {
        title: "Create files",
        body: "Review output files, sources and open questions.",
      },
    ],
    run: "Run the demo",
    replay: "Run again",
    running: "Working",
    ready: "Ready to run",
    done: "Complete",
    approval: "File creation request",
    approvalBody: "File creation requires approval.",
    allow: "Allow creation",
    deny: "Stop task",
    denied: "File creation cancelled.",
    preview: "File preview",
    waiting: "Waiting for a file.",
    downloadSample: "Download sample file",
    boundaries: ["Your models.", "Your choice."],
    boundaryRows: [
      {
        title: "Files and sessions",
        body: "Your computer stores sessions and settings. File access requires permission.",
      },
      {
        title: "Model selection",
        body: "Use local models or cloud models. Cloud models and online tools receive task content.",
      },
      {
        title: "Tool permissions",
        body: "Sensitive actions require approval. Skills define procedures. MCP connects external tools.",
      },
    ],
    downloadTitle: ["Download ZhiYuan"],
    downloadBody: "Install the app, choose a model and start a task.",
    source: "View source code",
    loading: "Loading the stable release…",
    unavailable: "Release information could not be loaded.",
    releases: "View releases",
    version: "Stable release",
    install: "Installation guide",
    noLinux: "No installer is available for this release.",
    windowsNote:
      "The Windows installer excludes local inference components. Defender exclusions require user approval.",
    signingNote:
      "Update manifests include signatures and SHA-256 hashes. See release notes for platform code-signing status.",
    footer: ["Docs", "For teams", "GitHub", "License"],
    copyright: "© 2026 Beijing Rongxin Zhiyuan",
    enterpriseTitle: ["Your team’s", "AI studio."],
    enterpriseLead:
      "Connect your team’s models, knowledge bases and business systems. Bring AI into projects to create documents, data and code.",
    contactAction: "Contact enterprise sales",
    scope: "The contract defines features, deployment scope and deliverables.",
    architecture: [
      {
        title: "Team workspace",
        items: ["Teams & members", "Projects & spaces"],
      },
      {
        title: "Models & knowledge",
        items: ["Model access", "Shared knowledge"],
      },
      {
        title: "Tools & permissions",
        items: ["Business systems", "Access policies"],
      },
    ],
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
    contactTitle: "Let’s talk about your work.",
    contactBody:
      "Tell us about the task, your team and the systems to connect. We will define deployment and deliverables.",
    qr: ["User community", "Official account"],
  },
};
export type EditorialCopy = (typeof COPY)["zh-CN"];
