# 开发概览

知远智能体是用 Electron、React 和 TypeScript 构建的桌面应用，源码在 [rongxinzy/RongxinAI](https://github.com/rongxinzy/RongxinAI)，采用 AGPL-3.0 许可证。

开发者文档介绍参与开发和扩展知远所需的基础信息。面向普通用户的使用说明请从[开始使用](../guide/index.md)阅读。

## 本地运行

```bash
git clone https://github.com/rongxinzy/RongxinAI.git ZhiYuanAgent
cd ZhiYuanAgent
bun install
bun run web:preview    # 浏览器预览，渲染端热更新
bun run electron:dev   # 完整桌面应用
```

环境要求和常用命令见[开发环境](./setup.md)，目录结构见[项目结构](./architecture.md)。

## 仓库内文档

- `AGENTS.md`：架构约束和实现规则，修改代码前必读。
- `CONTRIBUTING.md`：开发环境、打包和签名要求。
- `DEVOPS.md`：PR 流程和说明模板。
- `docs/architecture/`：进程边界、IPC 约定和流式链路的现行说明。
- `SKILLs/README.md`：技能目录结构和编写规范。

## 贡献本文档

本文档站由官网工程 [rongxinzy/rongxinxzyai-pages](https://github.com/rongxinzy/rongxinxzyai-pages) 在构建时从 Markdown 生成。页面源文件在该仓库的 `docs/`（英文在 `docs/en/`），新增页面后在 `src/docs/nav.ts` 的中英文侧边栏中添加入口。本地预览使用 `npm install` 和 `npm run dev`，访问 `/docs/`。
