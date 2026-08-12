# 贡献指南

知远智能体接受问题反馈、文档改进、测试、界面调整、Skill 和代码贡献。桌面应用的完整规则以仓库中的 [CONTRIBUTING.md](https://github.com/rongxinzy/RongxinAI/blob/main/CONTRIBUTING.md) 与 [AGENTS.md](https://github.com/rongxinzy/RongxinAI/blob/main/AGENTS.md) 为准。

## 开始之前

1. 搜索已有 [Issues](https://github.com/rongxinzy/RongxinAI/issues) 和 Pull Requests，确认问题没有被重复处理。
2. 大型功能、架构调整和破坏性变更先提交 Issue，讨论实现范围。
3. 从最新 `main` 创建内容集中的分支，例如 `fix/short-description` 或 `docs/short-description`。
4. 检查工作区，避免把缓存、构建产物、凭据和无关格式变化带入提交。

问题、截图、日志和测试夹具中都不能包含 API Key、私人文档、个人信息或其他敏感数据。

## 实现改动

每个 Pull Request 只处理一个明确问题。行为变化应在可行时增加或更新同目录测试；用户可见文字同时维护中文和英文，不在组件中硬编码。

桌面端使用 TypeScript、函数式 React 组件和 Hooks。复用 `src/shared/components/` 中已有组件，界面图标使用项目既有的 `lucide-react` 体系。涉及主进程能力时，保持 preload 和类型化 IPC 边界，不让渲染进程直接调用 Node.js 或 Electron API。

文档改动应核对实际界面和代码，不描述未发布能力。新增文章后更新 VitePress 侧边栏；图片使用可读文件名并放入对应的 `docs/assets/` 子目录。

## 运行检查

桌面应用提交前按改动范围运行：

```bash
bun run build
bun test
bun run lint
bun run format:check
bun run compile:electron
```

界面变化还要手动检查相关流程、浅色与深色主题，以及受影响的中英文状态。安装包相关改动应在目标操作系统测试；普通改动不需要每次打包。

官网与文档改动在官网仓库运行：

```bash
npm run build
```

构建通过后，用统一预览检查首页和 `/docs/` 页面。

## 提交和 Pull Request

桌面应用提交信息使用英文，并遵循 Conventional Commits：

```text
type(scope): short imperative summary
```

常用类型包括 `feat`、`fix`、`refactor`、`docs`、`test`、`ci` 和 `build`。Pull Request 中说明问题、解决方式、验证命令和人工测试结果；可见界面变化附截图或短录屏，破坏性变化说明迁移与兼容影响。

提交前最后检查文件列表和差异，确认没有合入无关内容。贡献内容按照项目的 [GNU AGPL v3](https://github.com/rongxinzy/RongxinAI/blob/main/LICENSE) 许可证发布。
