# 项目结构

知远智能体由渲染进程、preload 和主进程三部分组成。渲染进程只负责界面和编排；主进程持有 SQLite、Pi 执行内核、本地推理进程和 IPC 处理。

| 路径 | 职责 |
| --- | --- |
| `src/main/` | 主进程：窗口与生命周期、会话执行、存储、技能与 MCP、消息渠道、本地推理。入口 `src/main/main.ts` 只负责编排，启动顺序和 IPC 注册在 `src/main/appBootstrap/` |
| `src/main/libs/agentEngine/` | Pi 执行内核，工作、对话、消息渠道和定时任务共用同一套执行路径 |
| `src/main/libs/llamacppManager/` 等 | llama.cpp 服务、后端和模型的生命周期 |
| `src/main/artifactLedger/` | 制品台账：根据工具执行事件和每轮工作区变化记录任务产出的文件 |
| `src/main/sqliteStore.ts` | 应用数据库 `zhiyuan.sqlite`，用 `user_version` 做版本化迁移 |
| `src/main/preload.ts`、`src/main/preload/` | 通过 `contextBridge` 暴露受控 IPC，按领域拆分 |
| `src/shared/ipc/` | IPC 契约：每个通道用 zod 定义参数和返回值，主进程注册时校验入参，渲染端类型从契约派生 |
| `src/renderer/` | React 界面与渲染端服务 |
| `SKILLs/`、`MCPs/` | 内置技能与内置 MCP 集成 |

更完整的说明见仓库 `docs/architecture/`：`overview.zh-CN.md` 介绍进程边界、目录和代码门禁，`streaming.md` 介绍对话流式链路。

## 企业版的技术边界

以上目录说明对应开源桌面应用。企业版由个人搭档（Persona Agent）、部门数字员工与企业级治理共同组成，运行环境和交付方式需单独评估。

个人搭档采用 Pi Durable 技术方向，部门数字员工基于 DeerFlow 承担专业任务。技术选型不代表持续工作、多搭档环境与完整协作能力已经完成交付验收。AEP 指 Agent Enterprise Protocol，用于身份、授权与协作契约，不是整个平台的名称。

产品角色、个人工作环境与分阶段交付边界见[企业版说明](../guide/what-is-zhiyuan.md#企业版persona-agent-与企业级治理)。
