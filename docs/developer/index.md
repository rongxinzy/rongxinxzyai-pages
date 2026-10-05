# 开发概览

知远智能体是 Electron 与 React 构建的桌面应用，`/docs/` 是官网的文档站点，由官网工程在构建期从 Markdown 生成。

开发者文档只介绍参与开发和扩展知远所需的基础信息。面向普通用户的使用说明请从[开始使用](../guide/index.md)阅读。

## 本地开发

```bash
npm install
npm run dev
```

文档随主站一起启动，访问 `/docs/` 即可。

## 构建

```bash
npm run build
```

该命令会先构建主站，再生成文档页面，并将文档输出到 `dist/docs`；部署主站时会一并发布。

## 贡献文档

文档内容位于 `docs/`。新增页面后，在 `src/docs/nav.ts` 的侧边栏配置中添加入口即可。
