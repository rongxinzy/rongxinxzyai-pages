# 开发环境

开发知远智能体需要 Git、Node.js 24（小于 25）和 Bun 1.4.x（小于 1.5）。项目使用 Bun 管理依赖并运行脚本，不要生成或提交 npm lockfile。原生依赖没有预编译包时，还需要 Python 和 C/C++ 构建工具。

常用命令：

```bash
bun install
bun run web:preview    # 浏览器预览，渲染端热更新
bun run electron:dev   # 启动完整桌面应用
bun run build          # 类型检查与生产构建
bun run lint           # 代码检查、主题一致性与样式审计
bun run knip           # 未使用的导出与依赖
bun run test
bun run format:check
```

浏览器预览用类型化的模拟数据代替 Electron 的 preload 接口，适合调整界面和交互。涉及真实 IPC、窗口行为或系统能力时，用 `bun run electron:dev` 验证。

需要本地推理时，可以单独下载当前主机的 llama.cpp 运行时：

```bash
bun run llamacpp:runtime:download
```

## 打包

安装包按版本区分，由环境变量 `ZHIYUAN_UPDATE_VARIANT` 选择内置的本地推理运行时：

| 版本 | 平台 | 内置本地推理 |
| --- | --- | --- |
| `lite` | Windows x64 | 无 |
| `cpu` | Windows x64、Linux x64、macOS arm64 与 x64 | Windows 和 Linux 为 llama.cpp CPU + Vulkan，macOS 为 Metal |
| `cuda` | Windows x64、Linux x64 | 面向 RTX 40 系列的 CUDA 12.4 构建，附带 CPU 回退 |

常用打包命令：

```bash
bun run dist:win        # Windows 轻量版，未签名
bun run dist:win:cpu
bun run dist:win:cuda
bun run dist:linux:cpu
bun run dist:mac:arm64
```

安装包内置模型网关，打包前需要用锁定版本的 Go SDK 构建。完整的打包前置条件、签名要求和发版流程见仓库的 `CONTRIBUTING.md` 与 `RELEASING.md`。
