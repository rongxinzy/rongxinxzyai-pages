# 开发概览

知远智能体是 Electron 与 React 构建的桌面应用，`/docs/` 是官网中的 VitePress 文档站点。

开发者文档只介绍参与开发和扩展知远所需的基础信息。面向普通用户的使用说明请从[开始使用](../guide/index.md)阅读。

## 本地开发

```bash
npm install
npm run dev
```

文档可单独启动：

```bash
npm run docs:dev
```

## 构建

```bash
npm run build
```

该命令会先构建主站，再构建文档，并将文档输出到 `dist/docs`；部署主站时会一并发布。

## 贡献文档

文档内容位于 `docs/`。新增页面后，在 `.vitepress/config.ts` 的侧边栏中添加入口即可。
