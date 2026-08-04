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
    sidebar: {
      "/guide/": [
        {
          text: "使用指南",
          items: [
            { text: "开始使用", link: "/guide/" },
          ],
        },
      ],
      "/developer/": [
        {
          text: "开发者",
          items: [
            { text: "项目开发", link: "/developer/" },
          ],
        },
      ],
    },
    footer: {
      message: "AGPL-3.0 开源协议",
      copyright: "© 2026 北京容芯致远",
    },
  },
});
