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

下载区通过 `/api/release` 动态读取签名稳定版清单，目前展示 Windows x64、
macOS Apple Silicon、Ubuntu x64 `.deb`，并为其他 Linux 发行版提供 AppImage。
发布新版本时无需在页面中手动填写版本号、安装包 URL 或文件大小。
