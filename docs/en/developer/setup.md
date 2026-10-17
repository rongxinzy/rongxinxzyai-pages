# Development Environment

Developing the ZhiYuan agent requires Git, Node.js 24 (below 25), and Bun 1.4.x (below 1.5). The project uses Bun to manage dependencies and run scripts; do not create or commit an npm lockfile.

Common commands:

```bash
bun install
bun run web:preview    # browser preview with renderer hot reload
bun run electron:dev   # full desktop app
bun run build
bun run lint
bun run test
```

## Packaging

Installers bundle the pinned Magpie model gateway, which must be built before packaging. The build needs the exact Go SDK version pinned in the project's `resources/magpie/upstream.json` (currently Go 1.26.8), plus Git and tar:

```bash
bun run magpie:build --target win32-x64 --go /path/to/go
bun run magpie:verify --target win32-x64
bun run dist:win
```

`--target` accepts `win32-x64`, `darwin-arm64`, `linux-x64`, and the other supported targets, or `all`. For per-platform packaging commands and signing requirements, see README and CONTRIBUTING in the project root.
