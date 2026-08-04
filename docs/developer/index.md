# 项目开发

本网站由 Vite、React 与 VitePress 构建。主页负责产品介绍与下载，`/docs/` 为独立的文档站点。

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
