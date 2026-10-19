# Project Structure

The ZhiYuan agent consists of a renderer process, a preload script, and a main process. The renderer process only handles the interface and orchestration; the main process owns SQLite, the Pi execution kernel, the local inference process, and IPC handling.

| Path | Responsibility |
| --- | --- |
| `src/main/` | Main process: windows and lifecycle, session execution, storage, Skills and MCP, messaging channels, local inference. The entry `src/main/main.ts` only orchestrates; startup sequencing and IPC registration live in `src/main/appBootstrap/` |
| `src/main/libs/agentEngine/` | The Pi execution kernel. Work, conversations, messaging channels, and scheduled tasks share the same execution path |
| `src/main/libs/llamacppManager/` etc. | Lifecycle of the llama.cpp service, backends, and models |
| `src/main/artifactLedger/` | Artifact ledger: records files produced by tasks from tool execution events and per-turn workspace changes |
| `src/main/sqliteStore.ts` | The application database `zhiyuan.sqlite`, with versioned migrations using `user_version` |
| `src/main/preload.ts`, `src/main/preload/` | Controlled IPC exposed through `contextBridge`, split by domain |
| `src/shared/ipc/` | IPC contracts: each channel defines its parameters and return values with zod. The main process validates inputs when registering, and renderer types are derived from the contracts |
| `src/renderer/` | The React interface and renderer-side services |
| `SKILLs/`, `MCPs/` | Built-in Skills and built-in MCP integrations |

See `docs/architecture/` in the repository for a more complete description: `overview.zh-CN.md` covers process boundaries, directories, and code gates; `streaming.md` covers the conversation streaming pipeline.

## Enterprise architecture boundary

The directories above describe the open-source desktop application. The enterprise product combines personal companions (Persona Agent), departmental digital employees and enterprise governance. Its runtime and delivery model are assessed separately.

Pi Durable is the technical direction for personal companions; departmental digital employees use DeerFlow for specialized tasks. These choices do not mean ongoing work, multi-companion environments and full collaboration have completed delivery acceptance. AEP means Agent Enterprise Protocol, covering identity, authorization and collaboration contracts. It is not the name of the whole platform.

See the [enterprise overview](../guide/what-is-zhiyuan.md#enterprise-persona-agent-and-enterprise-governance) for product roles, Personal Workspace and phased delivery boundaries.
