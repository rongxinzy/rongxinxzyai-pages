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
macOS（Apple Silicon / Intel）、Ubuntu x64 `.deb`，并为其他 Linux 发行版提供 AppImage。
发布新版本时无需在页面中手动填写版本号、安装包 URL 或文件大小。

## 路线图数据

`/roadmap/`（英文 `/en/roadmap/`）只读 `data/roadmap/desktop.json`。追加一条进展时改这个文件，不改页面代码。页面运行时不请求 GitHub 上的 Issue 或 Pull Request。Star 数量是例外：浏览器请求 `https://api.github.com/repos/rongxinzy/RongxinAI`，失败时按钮仍打开仓库，只是不显示数字。

`milestones` 的数组顺序就是页面从上到下的顺序。每条里程碑：

| 字段 | 说明 |
|---|---|
| `id` | 锚点。`/roadmap/#release-pipeline` 指向 `id` 为 `release-pipeline` 的里程碑。小写字母、数字、连字符，文件内不重复。 |
| `title` | 中文标题。 |
| `titleEn` | 可选。英文页没有该字段时使用 `title`。 |
| `items` | 进展条目。新条目追加在数组末尾。 |

每条 `items`：

| 字段 | 说明 |
|---|---|
| `date` | `YYYY-MM-DD`。已合并的 Pull Request 用合并日期，仍开放的用开启日期。 |
| `text` | 中文一句话，写发生了什么。 |
| `textEn` | 可选。英文页没有该字段时使用 `text`。 |
| `url` | `https://github.com/rongxinzy/RongxinAI/pull/<编号>` 或 `https://github.com/rongxinzy/RongxinAI/issues/<编号>`。 |
| `done` | 已合并或已关闭为 `true`，仍开放为 `false`。进度条是 `done: true` 的条数除以该里程碑的条目总数。 |

页面按 `date` 从新到旧排列。同一天里，文件中靠后的条目排在前面。

```json
{
  "date": "2026-10-16",
  "text": "发布收成两步：打 tag 先发 beta，再单独把该版本晋升为 stable。",
  "textEn": "Publishing is being cut down to two steps: a tag ships beta, then that build is promoted to stable.",
  "url": "https://github.com/rongxinzy/RongxinAI/pull/1040",
  "done": false
}
```

`npm run build` 和 `npm run dev` 都会执行 `scripts/validate-roadmap.mjs`。缺字段、日期不合法、`url` 不是上述仓库的 Pull Request 或 Issue，构建失败。文案里出现已停用的内部产品名也会失败。
