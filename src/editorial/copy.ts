import type { SiteLocale } from "../shared/site-types";

export const GITHUB = "https://github.com/rongxinzy/RongxinAI";
export const isEnglish = (locale: SiteLocale) => locale === "en";

export const COPY = {
  "zh-CN": {
    nav: ["任务示例", "企业服务", "使用文档"],
    download: "下载知远",
    menu: "导航菜单",
    close: "关闭菜单",
    skip: "跳到正文",
    headline: ["处理文档与表格，", "编写和修改代码。"],
    lead: "知远是一款桌面 AI 智能体。",
    intro: "读取文件、操作浏览器、运行命令，生成文档和代码。",
    how: "查看任务示例",
    local: "开源 · AGPL-3.0",
    workflow: "任务示例",
    workflowLabel: "任务示例",
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
    boundaries: ["模型与权限"],
    boundaryRows: [
      {
        title: "文件与会话",
        body: "电脑保存会话和配置。文件访问需要授权。",
      },
      {
        title: "模型选择",
        body: "支持本地模型和云端模型。云端模型与联网工具接收任务内容。",
      },
      {
        title: "工具权限",
        body: "敏感操作需要确认。技能提供操作步骤，MCP 连接外部工具。",
      },
    ],
    downloadTitle: ["下载知远"],
    downloadBody: "选择操作系统对应的安装包。",
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
    enterpriseTitle: ["企业部署", "与系统接入"],
    enterpriseLead: "部署知远，接入企业模型、知识库和业务系统。",
    contactAction: "联系企业服务",
    scope: "功能、部署范围和交付内容以合同约定为准。",
    architecture: [
      { title: "成员与项目", items: ["团队与成员", "项目与空间"] },
      { title: "模型与知识库", items: ["模型接入", "共享知识"] },
      { title: "系统与权限", items: ["业务系统", "访问策略"] },
    ],
    deliveryTitle: "项目交付",
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
    headers: ["项目", "开源桌面版", "企业项目方案"],
    comparison: [
      ["工作空间", "个人使用", "项目空间、任务模板、成员管理"],
      ["模型与工具", "用户配置", "模型网关、额度、工具连接"],
      ["数据与权限", "本机存储", "成员权限、操作记录、数据管理"],
      ["部署与服务", "文档与社区", "部署、培训、运维"],
    ],
    contactTitle: "联系企业服务",
    contactBody: "提供员工人数、部署环境、接入系统和任务需求。",
    qr: ["用户社区", "官方公众号"],
  },
  en: {
    nav: ["Task examples", "For teams", "Documentation"],
    download: "Download ZhiYuan",
    menu: "Navigation menu",
    close: "Close menu",
    skip: "Skip to content",
    headline: ["Work with documents.", "Write and edit code."],
    lead: "ZhiYuan is a desktop AI agent.",
    intro:
      "It reads files, uses a browser, runs commands and creates documents and code.",
    how: "View examples",
    local: "Open source · AGPL-3.0",
    workflow: "Task examples",
    workflowLabel: "Task examples",
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
    boundaries: ["Models and permissions"],
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
    downloadBody: "Choose the installer for your operating system.",
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
    enterpriseTitle: ["Enterprise deployment", "and integrations"],
    enterpriseLead:
      "Deploy ZhiYuan and connect company models, knowledge bases and business systems.",
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
    deliveryTitle: "Project delivery",
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
    contactTitle: "Contact enterprise sales",
    contactBody:
      "Provide team size, deployment environment, systems and task requirements.",
    qr: ["User community", "Official account"],
  },
};
export type EditorialCopy = (typeof COPY)["zh-CN"];
