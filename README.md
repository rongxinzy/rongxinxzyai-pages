# 知远智能体官网

知远智能体（ZhiYuan Agent）的官方产品与下载站点。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 部署

```bash
npm run deploy
```

部署目标为 Cloudflare Pages 项目 `rongxzyai-pages`，生产域名为
`www.rongxzyai.com`。

推送到 `main` 会由 GitHub Actions 自动执行构建，并通过仓库 Secret
`CF_API` 部署到生产环境。手动运行 Actions 中的 **Deploy website to
Cloudflare Pages** 也会部署当前 `main`。

当前下载区对应稳定版本 `2026.7.28-build.4`。发布新版本后，应同步更新
`src/App.tsx` 中的版本号、安装包 URL、文件大小与平台说明。
