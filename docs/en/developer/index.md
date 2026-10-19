# Development Overview

The ZhiYuan agent is a desktop application built with Electron, React, and TypeScript. The source code is at [rongxinzy/RongxinAI](https://github.com/rongxinzy/RongxinAI) under the AGPL-3.0 license.

The developer documentation covers the basics needed to develop and extend ZhiYuan. For user-facing usage instructions, start from [Getting Started](../guide/index.md).

## Running Locally

```bash
git clone https://github.com/rongxinzy/RongxinAI.git ZhiYuanAgent
cd ZhiYuanAgent
bun install
bun run web:preview    # browser preview with renderer hot reload
bun run electron:dev   # full desktop app
```

See [Development Environment](./setup.md) for environment requirements and common commands, and [Project Structure](./architecture.md) for the directory layout.

## Documentation in the Repository

- `AGENTS.md`: architecture constraints and implementation rules; required reading before changing code.
- `CONTRIBUTING.md`: development environment, packaging, and signing requirements.
- `DEVOPS.md`: PR process and description templates.
- `docs/architecture/`: current descriptions of process boundaries, IPC conventions, and the streaming pipeline.
- `SKILLs/README.md`: Skill directory structure and authoring conventions.

## Contributing to This Documentation

This documentation site is generated from Markdown at build time by the website project [rongxinzy/rongxinxzyai-pages](https://github.com/rongxinzy/rongxinxzyai-pages). Page sources live in that repository's `docs/` (English in `docs/en/`); after adding a page, register it in the Chinese and English sidebars in `src/docs/nav.ts`. To preview locally, use `npm install` and `npm run dev`, then visit `/docs/`.
