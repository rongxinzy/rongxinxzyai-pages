# 开发概览

知远智能体的开源项目分为桌面应用和官网两个仓库。准备改动前，先确认问题属于哪一部分。

## 两个仓库

### 桌面应用

[rongxinzy/RongxinAI](https://github.com/rongxinzy/RongxinAI) 包含 Electron 桌面应用、React 界面、任务执行、本地推理、Skill、MCP 和自动化等功能。产品功能、应用设置、安装包和内置 Skill 的改动在这个仓库完成。

开发桌面应用前，先阅读仓库中的 [CONTRIBUTING.md](https://github.com/rongxinzy/RongxinAI/blob/main/CONTRIBUTING.md) 和 [AGENTS.md](https://github.com/rongxinzy/RongxinAI/blob/main/AGENTS.md)，再按照[开发环境](./setup.md)准备本地项目。

### 官网与文档

[rongxinzy/rongxinxzyai-pages](https://github.com/rongxinzy/rongxinxzyai-pages) 包含 React 官网和当前 VitePress 文档站。官网源文件位于 `src/`，文档位于 `docs/`，部署产物统一写入 `dist/`。

修改文档时，新增页面还需要在 `docs/.vitepress/config.ts` 中添加侧边栏入口。图片放入 `docs/assets/` 下与文章对应的目录，并在 Markdown 中使用相对路径，确保源码预览和站点构建都能显示。

## 从哪里开始

- 准备桌面端开发环境：阅读[开发环境](./setup.md)。
- 了解主进程、界面和 IPC 边界：阅读[项目结构](./architecture.md)。
- 编写或维护 Skill：阅读[Skill 开发](./skills.md)。
- 准备分支、检查和 Pull Request：阅读[贡献指南](./contributing.md)。

面向使用者的安装和操作说明从[知远是什么](../guide/what-is-zhiyuan.md)开始。公开文档应描述用户可以确认的产品行为，不把内部组件名、尚未发布的功能或无法验证的效果写成产品能力。
