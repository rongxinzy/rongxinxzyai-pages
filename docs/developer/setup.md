# 开发环境

开发知远智能体需要 Git、Node.js 24（小于 25）和 Bun 1.4.x（小于 1.5）。项目使用 Bun 管理依赖并运行脚本，不要生成或提交 npm lockfile。

常用命令：

```bash
bun install
bun run web:preview    # 浏览器预览，渲染端热更新
bun run electron:dev   # 启动完整桌面应用
bun run build
bun run lint
bun run test
```

## 打包

安装包内置固定版本的 Magpie 模型网关，打包前需要先构建。构建要求项目 `resources/magpie/upstream.json` 中锁定的 Go SDK 精确版本（当前为 Go 1.26.8），以及 Git 和 tar：

```bash
bun run magpie:build --target win32-x64 --go /path/to/go
bun run magpie:verify --target win32-x64
bun run dist:win
```

`--target` 可选 `win32-x64`、`darwin-arm64`、`linux-x64` 等或 `all`。各平台的打包命令和签名要求以项目根目录的 README 与 CONTRIBUTING 为准。
