import { defineConfig } from "vitepress";
import { fileURLToPath } from "node:url";

export default defineConfig({
  lang: "zh-CN",
  title: "知远智能体文档",
  description: "知远智能体的安装、使用与开发说明。",
  base: "/docs/",
  outDir: fileURLToPath(new URL("../../dist/docs", import.meta.url)),
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  themeConfig: {
    sidebar: [
      {
        text: "开始使用",
        items: [
          { text: "知远是什么", link: "/guide/what-is-zhiyuan" },
          { text: "快速开始", link: "/guide/quick-start" },
          { text: "创建第一个工作页面", link: "/guide/first-work-page" },
        ],
      },
      {
        text: "功能介绍",
        items: [
          {
            text: "模型配置",
            items: [
              { text: "配置云端模型", link: "/guide/model/cloud" },
              { text: "使用本地模型", link: "/guide/model/local" },
            ],
          },
          { text: "本地推理", link: "/guide/local-inference" },
          { text: "工作页面", link: "/guide/work-page" },
          { text: "创建和执行任务", link: "/guide/tasks" },
          { text: "添加文件与上下文", link: "/guide/context" },
          { text: "使用与管理技能", link: "/guide/skills" },
        ],
      },
      {
        text: "实战指南",
        items: [
          { text: "搜索与研究", link: "/capabilities/research" },
          { text: "写作、改写与翻译", link: "/capabilities/writing" },
          { text: "文档与办公文件", link: "/capabilities/documents" },
          { text: "数据分析", link: "/capabilities/data" },
          { text: "邮件与会议", link: "/capabilities/communication" },
          { text: "营销与内容", link: "/capabilities/marketing" },
          { text: "编程与技术任务", link: "/capabilities/coding" },
        ],
      },
      {
        text: "常见问题",
        items: [
          { text: "问题排查", link: "/faq/" },
          { text: "安装与更新", link: "/faq/install" },
          { text: "模型连接", link: "/faq/model" },
          { text: "技能使用", link: "/faq/skills" },
          { text: "文件处理", link: "/faq/files" },
          { text: "数据与隐私", link: "/faq/privacy" },
        ],
      },
      {
        text: "开发者",
        items: [
          { text: "开发概览", link: "/developer/" },
          { text: "开发环境", link: "/developer/setup" },
          { text: "Skill 开发", link: "/developer/skills" },
          { text: "项目结构", link: "/developer/architecture" },
          { text: "贡献指南", link: "/developer/contributing" },
        ],
      },
    ],
    footer: {
      message: "AGPL-3.0 开源协议",
      copyright: "© 2026 北京容芯致远",
    },
  },
});
