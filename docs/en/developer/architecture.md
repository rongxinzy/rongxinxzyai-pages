# Project Structure

The ZhiYuan agent consists of a desktop application, agent execution capabilities, local inference, Skill management, MCP configuration, and result preview.

When developing, focus on:

- `src/main/`: the desktop main process and local capabilities. The entry `src/main/main.ts` only orchestrates; IPC registration, runtime setup, window creation and startup sequencing live in `src/main/appBootstrap/`.
- `src/main/magpie/`: management and model service for the Magpie model gateway. Magpie is a bundled binary built from a pinned upstream commit and wired in by `src/main/appBootstrap/magpieRuntime.ts`; model configuration for conversations (Pi) and coding agents (ACP) goes through it.
- `src/main/preload.ts` and `src/main/preload/`: controlled IPC exposed through `contextBridge`, split by domain (sessions, skills and MCP, local inference, messaging channels, and so on).
- `src/renderer/types/electron.d.ts` and `src/renderer/types/electron/`: the IPC types visible to the renderer, split by the same domains.
- `src/renderer/`: the interface and user interactions.
- `SKILLs/`: reusable Skill definitions.
- `resources/magpie/`: Magpie's upstream pin and build notes.

## Enterprise architecture boundary

The directories above describe the open-source desktop application. The enterprise product combines personal companions (Persona Agent), departmental digital employees and enterprise governance. Its runtime and delivery model are assessed separately.

Pi Durable is the technical direction for personal companions; departmental digital employees use DeerFlow for specialized tasks. These choices do not mean ongoing work, multi-companion environments and full collaboration have completed delivery acceptance. AEP means Agent Enterprise Protocol, covering identity, authorization and collaboration contracts. It is not the name of the whole platform.

See the [enterprise overview](../guide/what-is-zhiyuan.md#enterprise-persona-agent-and-enterprise-governance) for product roles, Personal Workspace and phased delivery boundaries.
