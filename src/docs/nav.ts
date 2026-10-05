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

export const docsHref = (route: string) => `/docs/${route ? `${route}/` : ""}`;
