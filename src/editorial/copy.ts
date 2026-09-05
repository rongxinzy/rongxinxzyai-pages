import type { SiteLocale } from "../shared/site-types";

export const GITHUB = "https://github.com/rongxinzy/RongxinAI";
export const isEnglish = (locale: SiteLocale) => locale === "en";

export const COPY = {
  "zh-CN": {
    nav: ["工作方式", "企业服务", "使用文档"],
    download: "下载知远",
    menu: "导航菜单",
    close: "关闭菜单",
    skip: "跳到正文",
    headline: ["把工作交给知远，", "把时间留给自己。"],
    lead: "读取资料、操作工具、整理结果。",
    intro: "一个在你电脑上工作的开源智能体。",
    how: "看看它如何工作",
    local: "本地优先 · 开源",
    workflow: "从一句交代，到一份成果。",
    workflowLabel: "工作方式",
    demoLabel: "交互演示",
    sampleLabel: "任务示例",
    demoNote: "此处使用示例数据，不读取你的文件。实际任务在桌面端执行。",
    steps: [
      { title: "读取材料", body: "从你指定的文件中，提取任务所需的内容。" },
      { title: "调用工具", body: "按任务需要处理资料，敏感操作经过权限确认。" },
      { title: "留下结果", body: "文件、来源和待确认事项，留在工作区。" },
    ],
    run: "运行演示",
    replay: "重新演示",
    running: "处理中",
    ready: "等待运行",
    done: "已完成",
    approval: "确认工具操作",
    approvalBody:
      "示例任务准备在工作区生成文件。你可以允许这次操作，也可以停止。",
    allow: "允许生成",
    deny: "停止任务",
    denied: "任务已停止，未生成文件。",
    preview: "成果预览",
    waiting: "运行后，在这里查看成果。",
    downloadSample: "下载示例文件",
    boundaries: ["你的工作，", "有自己的边界。"],
    boundaryRows: [
      {
        title: "本地工作区",
        body: "会话、配置和任务元数据保存在本机。文件的访问范围由任务和授权决定。",
      },
      {
        title: "本地与云端模型",
        body: "可以运行本地 GGUF 模型，也可以接入云端模型。使用云端模型或联网工具时，相关内容会发送至对应服务。",
      },
      {
        title: "工具与操作权限",
        body: "文件、终端和浏览器操作经过权限流程。内置技能和 MCP 连接可扩展工作方法。",
      },
    ],
    downloadTitle: ["下一项工作，", "从这里开始。"],
    downloadBody: "下载知远，在你的电脑上开始。",
    source: "在 GitHub 查看源代码",
    loading: "正在读取稳定版本…",
    unavailable: "暂时无法读取稳定版本。",
    releases: "查看发布页面",
    version: "当前稳定版",
    install: "查看安装说明",
    noLinux: "当前版本未提供此安装包。",
    windowsNote:
      "Windows 离线安装包不含本地推理组件。Defender 排除项由安装向导单独征求授权。",
    signingNote: "升级清单附带签名与 SHA-256；平台厂商签名状态以发布说明为准。",
    footer: ["文档", "企业服务", "GitHub", "开源许可"],
    copyright: "© 2026 北京容芯致远",
    enterpriseTitle: ["把知远带进", "团队的工作现场。"],
    enterpriseLead: "围绕企业的数据、工具与权限，确定部署和接入范围。",
    contactAction: "讨论你的项目",
    scope: "项目方案，能力范围以项目合同为准。",
    architecture: [
      { title: "企业工作区", items: ["团队与成员", "项目与空间"] },
      { title: "模型与知识", items: ["模型接入", "共享知识"] },
      { title: "工具与权限", items: ["业务系统", "访问策略"] },
    ],
    deliveryTitle: "从实际流程开始。",
    delivery: [
      {
        title: "明确工作范围",
        body: "梳理业务目标、数据范围与参与角色，确定部署形式和接入边界。",
      },
      {
        title: "配置模型与工具",
        body: "按项目方案接入模型、知识与业务系统，配置访问策略。",
      },
      {
        title: "验证与交付",
        body: "用实际工作场景进行联调和验收，交付使用文档与培训。",
      },
    ],
    comparisonTitle: "选择适合团队的工作环境。",
    headers: ["能力维度", "开源桌面版", "企业项目方案"],
    comparison: [
      ["工作空间", "个人使用", "企业共享空间、模板与成员管理"],
      ["模型与工具", "按个人配置", "统一网关、策略、额度与连接治理"],
      ["数据与权限", "本地优先", "组织权限、审计与生命周期管理"],
      ["部署与服务", "社区自助", "独立部署、项目交付与持续运维"],
    ],
    contactTitle: "说说你的工作场景。",
    contactBody: "来信可附上组织规模、部署环境和希望接入的系统。",
    qr: ["用户社区", "官方公众号"],
  },
  en: {
    nav: ["How it works", "For teams", "Documentation"],
    download: "Download ZhiYuan",
    menu: "Navigation menu",
    close: "Close menu",
    skip: "Skip to content",
    headline: ["Give your work to ZhiYuan.", "Keep your time for yourself."],
    lead: "Read the files. Work with tools. Deliver the result.",
    intro: "An open-source AI agent that works on your computer.",
    how: "See how it works",
    local: "Local-first · Open source",
    workflow: "From a brief to a finished file.",
    workflowLabel: "How it works",
    demoLabel: "Interactive demo",
    sampleLabel: "Sample task",
    demoNote:
      "This demo uses sample data and does not read your files. Actual tasks run in the desktop app.",
    steps: [
      {
        title: "Read the material",
        body: "Extract relevant content from the files you select.",
      },
      {
        title: "Use the tools",
        body: "Process the material and request approval for sensitive actions.",
      },
      {
        title: "Keep the result",
        body: "Files, sources and open questions stay in the workspace.",
      },
    ],
    run: "Run the demo",
    replay: "Run again",
    running: "Working",
    ready: "Ready to run",
    done: "Complete",
    approval: "Approve the tool action",
    approvalBody:
      "This sample task is ready to create a file in the workspace. Allow this action or stop the task.",
    allow: "Allow creation",
    deny: "Stop task",
    denied: "Task stopped. No file was created.",
    preview: "Output preview",
    waiting: "Run the demo to see the result here.",
    downloadSample: "Download sample file",
    boundaries: ["Your work.", "Your boundaries."],
    boundaryRows: [
      {
        title: "A local workspace",
        body: "Sessions, settings and task metadata are stored on your computer. File access depends on the task and permissions.",
      },
      {
        title: "Local and cloud models",
        body: "Run GGUF models locally or connect a cloud provider. Cloud models and online tools send relevant content to the selected service.",
      },
      {
        title: "Tools and permissions",
        body: "File, terminal and browser actions follow permission controls. Extend workflows with built-in skills and MCP connections.",
      },
    ],
    downloadTitle: ["Your next task", "starts here."],
    downloadBody: "Install ZhiYuan and start on your computer.",
    source: "Explore the source on GitHub",
    loading: "Loading the stable release…",
    unavailable: "The stable release is temporarily unavailable.",
    releases: "View releases",
    version: "Current stable release",
    install: "Installation guide",
    noLinux: "No installer is available for this release.",
    windowsNote:
      "The Windows offline installer excludes local inference components. Defender exclusions require separate approval in the installer.",
    signingNote:
      "Update manifests include signatures and SHA-256 hashes. See release notes for platform code-signing status.",
    footer: ["Docs", "For teams", "GitHub", "License"],
    copyright: "© 2026 Beijing Rongxin Zhiyuan",
    enterpriseTitle: ["Bring ZhiYuan", "into your team’s work."],
    enterpriseLead:
      "Define deployment and integrations around your organization’s data, tools and permissions.",
    contactAction: "Discuss your project",
    scope:
      "Project scope and capabilities are governed by the delivery contract.",
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
    deliveryTitle: "Start with the actual workflow.",
    delivery: [
      {
        title: "Define the scope",
        body: "Map goals, data and participants. Agree on deployment and integration boundaries.",
      },
      {
        title: "Connect models and tools",
        body: "Integrate models, knowledge and business systems, with access policies defined in the project plan.",
      },
      {
        title: "Validate and deliver",
        body: "Test real workflows, verify acceptance criteria and deliver documentation and training.",
      },
    ],
    comparisonTitle: "Choose your working environment.",
    headers: ["Scope", "Open-source desktop", "Enterprise project"],
    comparison: [
      ["Workspace", "Personal use", "Shared spaces, templates and members"],
      [
        "Models & tools",
        "Personal configuration",
        "Governed gateways, policies and quotas",
      ],
      [
        "Data & permissions",
        "Local-first",
        "Organization policies, auditing and lifecycle",
      ],
      [
        "Deployment & support",
        "Community self-service",
        "Dedicated deployment, delivery and operations",
      ],
    ],
    contactTitle: "Tell us about your work.",
    contactBody:
      "Include your team size, deployment environment and the systems you want to connect.",
    qr: ["User community", "Official account"],
  },
};
export type EditorialCopy = (typeof COPY)["zh-CN"];
