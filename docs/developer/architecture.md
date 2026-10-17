# 项目结构

知远智能体包含桌面应用、Agent 执行能力、本地推理、Skill 管理、MCP 配置和成果预览等部分。

开发时可以重点关注：

- `src/main/`：桌面主进程和本地能力。入口 `src/main/main.ts` 只负责编排，IPC 注册、运行时准备、窗口创建和启动顺序都在 `src/main/appBootstrap/` 中。
- `src/main/magpie/`：Magpie 模型网关的管理与模型服务。Magpie 是从固定上游提交构建的随包二进制，由 `src/main/appBootstrap/magpieRuntime.ts` 启动接入；对话（Pi）和编码代理（ACP）的模型配置都经由它。
- `src/main/preload.ts` 与 `src/main/preload/`：通过 `contextBridge` 暴露的受控 IPC，按领域拆分（会话、技能与 MCP、本地推理、消息渠道等）。
- `src/renderer/types/electron.d.ts` 与 `src/renderer/types/electron/`：渲染端可见的 IPC 类型，按同样的领域拆分。
- `src/renderer/`：界面和用户交互。
- `SKILLs/`：可复用的 Skill 定义。
- `resources/magpie/`：Magpie 的上游锁定信息与构建说明。

## 企业版的技术边界

以上目录说明对应开源桌面应用。企业版由个人搭档（Persona Agent）、部门数字员工与企业级治理共同组成，运行环境和交付方式需单独评估。

个人搭档采用 Pi Durable 技术方向，部门数字员工基于 DeerFlow 承担专业任务。技术选型不代表持续工作、多搭档环境与完整协作能力已经完成交付验收。AEP 指 Agent Enterprise Protocol，用于身份、授权与协作契约，不是整个平台的名称。

产品角色、个人工作环境与分阶段交付边界见[企业版说明](../guide/what-is-zhiyuan.md#企业版persona-agent-与企业级治理)。
