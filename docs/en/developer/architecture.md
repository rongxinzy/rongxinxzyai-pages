# Project Structure

The ZhiYuan agent consists of a desktop application, agent execution capabilities, local inference, Skill management, MCP configuration, and result preview.

When developing, focus on:

- `src/main/`: the desktop main process and local capabilities.
- `src/renderer/`: the interface and user interactions.
- `SKILLs/`: reusable Skill definitions.
- `docs/`: the documentation site.

## Enterprise architecture boundary

The directories above describe the open-source desktop application. The enterprise product combines personal companions (Persona Agent), departmental digital employees and enterprise governance. Its runtime and delivery model are assessed separately.

Pi Durable is the technical direction for personal companions; departmental digital employees use DeerFlow for specialized tasks. These choices do not mean ongoing work, multi-companion environments and full collaboration have completed delivery acceptance. AEP means Agent Enterprise Protocol, covering identity, authorization and collaboration contracts. It is not the name of the whole platform.

See the [enterprise overview](../guide/what-is-zhiyuan.md#enterprise-persona-agent-and-enterprise-governance) for product roles, Personal Workspace and phased delivery boundaries.
