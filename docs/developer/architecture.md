# 项目结构

知远智能体包含桌面应用、Agent 执行能力、本地推理、Skill 管理、MCP 配置和成果预览等部分。

开发时可以重点关注：

- `src/main/`：桌面主进程和本地能力。
- `src/renderer/`：界面和用户交互。
- `SKILLs/`：可复用的 Skill 定义。
- `docs/`：官网文档站点。

## 企业版的技术边界

以上目录说明对应开源桌面应用。企业版由个人搭档（Persona Agent）、部门数字员工与企业级治理共同组成，运行环境和交付方式需单独评估。

个人搭档采用 Pi Durable 技术方向，部门数字员工基于 DeerFlow 承担专业任务。技术选型不代表持续工作、多搭档环境与完整协作能力已经完成交付验收。AEP 指 Agent Enterprise Protocol，用于身份、授权与协作契约，不是整个平台的名称。

产品角色、个人工作环境与分阶段交付边界见[企业版说明](../guide/what-is-zhiyuan.md#企业版persona-agent-与企业级治理)。
