# 贡献指南

欢迎通过问题反馈、文档改进、Skill 编写或代码贡献参与知远智能体。

## 反馈问题

在 [GitHub Issues](https://github.com/rongxinzy/RongxinAI/issues) 使用问题模板提交，附上系统、版本、复现步骤和日志。日志可以在应用的「设置 → 关于 → 导出日志」中导出。不要在 issue、日志或截图中包含 API Key、凭证和个人数据。

## 提交代码

- 修改代码前阅读仓库的 `AGENTS.md`；涉及界面时同时遵守 `DESIGN.md`。
- 一个 PR 只解决一个问题。标题使用 `type(scope): summary` 格式，例如 `fix(chat): keep scroll position after streaming`。
- PR 说明写清改了什么、为什么改、实际做了哪些验证及结果。
- 提交前运行 `bun run build`、`bun run lint`、`bun run test` 和 `bun run format:check`。
- 单个源文件不超过 1000 行；CI 会检查未使用的导出和依赖（Knip）。
- 界面改动先在浏览器预览中检查浅色和深色主题、中英文两种语言，并在 PR 中附截图。

CI 必需检查为 `ci-gate`，通过后合并。完整流程见仓库的 `DEVOPS.md` 和 `CONTRIBUTING.md`。
