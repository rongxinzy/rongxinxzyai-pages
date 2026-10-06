export type DocsNavItem = {
  text: string;
  route?: string;
  items?: DocsNavItem[];
};

export type DocsNavGroup = {
  text: string;
  items: DocsNavItem[];
};

export const DOCS_NAV: DocsNavGroup[] = [
  {
    text: "开始使用",
    items: [
      { text: "知远是什么", route: "guide/what-is-zhiyuan" },
      { text: "快速开始", route: "guide/quick-start" },
      { text: "创建第一个工作页面", route: "guide/first-work-page" },
    ],
  },
  {
    text: "功能介绍",
    items: [
      {
        text: "模型配置",
        items: [
          { text: "配置云端模型", route: "guide/model/cloud" },
          { text: "使用本地模型", route: "guide/model/local" },
        ],
      },
      { text: "本地推理", route: "guide/local-inference" },
      { text: "工作页面", route: "guide/work-page" },
      { text: "创建和执行任务", route: "guide/tasks" },
      { text: "添加文件与上下文", route: "guide/context" },
      { text: "使用与管理技能", route: "guide/skills" },
    ],
  },
  {
    text: "实战指南",
    items: [
      { text: "搜索与研究", route: "capabilities/research" },
      { text: "写作、改写与翻译", route: "capabilities/writing" },
      { text: "文档与办公文件", route: "capabilities/documents" },
      { text: "数据分析", route: "capabilities/data" },
      { text: "邮件与会议", route: "capabilities/communication" },
      { text: "营销与内容", route: "capabilities/marketing" },
      { text: "编程与技术任务", route: "capabilities/coding" },
    ],
  },
  {
    text: "常见问题",
    items: [
      { text: "问题排查", route: "faq" },
      { text: "安装与更新", route: "faq/install" },
      { text: "模型连接", route: "faq/model" },
      { text: "技能使用", route: "faq/skills" },
      { text: "文件处理", route: "faq/files" },
      { text: "数据与隐私", route: "faq/privacy" },
    ],
  },
  {
    text: "开发者",
    items: [
      { text: "开发概览", route: "developer" },
      { text: "开发环境", route: "developer/setup" },
      { text: "Skill 开发", route: "developer/skills" },
      { text: "项目结构", route: "developer/architecture" },
      { text: "贡献指南", route: "developer/contributing" },
    ],
  },
];

export type DocsNavLink = { text: string; route: string };

function flatten(items: DocsNavItem[], out: DocsNavLink[]) {
  for (const item of items) {
    if (item.route) out.push({ text: item.text, route: item.route });
    if (item.items) flatten(item.items, out);
  }
}

export const DOCS_SEQUENCE: DocsNavLink[] = (() => {
  const out: DocsNavLink[] = [];
  for (const group of DOCS_NAV) flatten(group.items, out);
  return out;
})();

// 英文导航与中文版路由一一对应，只翻译显示文案。
export const DOCS_NAV_EN: DocsNavGroup[] = [
  {
    text: "Getting started",
    items: [
      { text: "What is ZhiYuan", route: "guide/what-is-zhiyuan" },
      { text: "Quick start", route: "guide/quick-start" },
      { text: "Your first work page", route: "guide/first-work-page" },
    ],
  },
  {
    text: "Features",
    items: [
      {
        text: "Model setup",
        items: [
          { text: "Cloud models", route: "guide/model/cloud" },
          { text: "Local models", route: "guide/model/local" },
        ],
      },
      { text: "Local inference", route: "guide/local-inference" },
      { text: "Work pages", route: "guide/work-page" },
      { text: "Create and run tasks", route: "guide/tasks" },
      { text: "Files and context", route: "guide/context" },
      { text: "Use and manage skills", route: "guide/skills" },
    ],
  },
  {
    text: "Guides",
    items: [
      { text: "Search and research", route: "capabilities/research" },
      { text: "Writing and translation", route: "capabilities/writing" },
      { text: "Documents and office files", route: "capabilities/documents" },
      { text: "Data analysis", route: "capabilities/data" },
      { text: "Email and meetings", route: "capabilities/communication" },
      { text: "Marketing and content", route: "capabilities/marketing" },
      { text: "Coding and technical tasks", route: "capabilities/coding" },
    ],
  },
  {
    text: "FAQ",
    items: [
      { text: "Troubleshooting", route: "faq" },
      { text: "Install and update", route: "faq/install" },
      { text: "Model connections", route: "faq/model" },
      { text: "Skills", route: "faq/skills" },
      { text: "File handling", route: "faq/files" },
      { text: "Data and privacy", route: "faq/privacy" },
    ],
  },
  {
    text: "Developers",
    items: [
      { text: "Overview", route: "developer" },
      { text: "Dev environment", route: "developer/setup" },
      { text: "Skill development", route: "developer/skills" },
      { text: "Project structure", route: "developer/architecture" },
      { text: "Contributing", route: "developer/contributing" },
    ],
  },
];

export const DOCS_SEQUENCE_EN: DocsNavLink[] = (() => {
  const out: DocsNavLink[] = [];
  for (const group of DOCS_NAV_EN) flatten(group.items, out);
  return out;
})();

export type DocsLocale = "zh" | "en";

export const docsHref = (route: string, locale: DocsLocale = "zh") =>
  `${locale === "en" ? "/en" : ""}/docs/${route ? `${route}/` : ""}`;
