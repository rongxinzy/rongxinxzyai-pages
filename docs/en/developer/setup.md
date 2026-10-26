# Development Environment

Developing the Seriya requires Git, Node.js 24 (below 25), and Bun 1.4.x (below 1.5). The project uses Bun to manage dependencies and run scripts; do not create or commit an npm lockfile. If a native dependency has no prebuilt package, you also need Python and C/C++ build tools.

Common commands:

```bash
bun install
bun run web:preview    # browser preview with renderer hot reload
bun run electron:dev   # full desktop app
bun run build          # type checking and production build
bun run lint           # linting, theme consistency, and style audits
bun run knip           # unused exports and dependencies
bun run test
bun run format:check
```

The browser preview replaces the Electron preload interface with typed mock data, which suits interface and interaction work. When real IPC, window behavior, or system capabilities are involved, verify with `bun run electron:dev`.

When you need local inference, you can download the llama.cpp runtime for the current host separately:

```bash
bun run llamacpp:runtime:download
```

## Packaging

Installers are built per edition. The environment variable `ZHIYUAN_UPDATE_VARIANT` selects the bundled local inference runtime:

| Edition | Platforms | Bundled local inference |
| --- | --- | --- |
| `lite` | Windows x64 | None |
| `cpu` | Windows x64, Linux x64, macOS arm64 and x64 | llama.cpp CPU + Vulkan on Windows and Linux, Metal on macOS |
| `cuda` | Windows x64, Linux x64 | CUDA 12.4 build targeting RTX 40-series GPUs, with CPU fallback |

Common packaging commands:

```bash
bun run dist:win        # Windows lite edition, unsigned
bun run dist:win:cpu
bun run dist:win:cuda
bun run dist:linux:cpu
bun run dist:mac:arm64
```

The installers bundle the model gateway, which must be built with the pinned Go SDK version before packaging. For the full packaging prerequisites, signing requirements, and release process, see the repository's `CONTRIBUTING.md` and `RELEASING.md`.
