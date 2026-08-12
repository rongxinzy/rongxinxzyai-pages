# 开发环境

桌面应用和官网使用不同的依赖管理方式。下面的命令分别在对应仓库根目录执行，不要混用锁文件。

## 桌面应用

### 环境要求

- Git。
- Node.js `>=24 <25`。
- Bun `>=1.3`。

Windows 发布构建还需要 PortableGit。原生依赖没有可用预编译文件时，可能需要 Python 和受支持的 C/C++ 编译工具链。只进行普通界面开发时，不必先制作安装包。

### 获取和启动项目

```bash
git clone https://github.com/rongxinzy/RongxinAI.git
cd RongxinAI
bun install
bun run electron:dev
```

首次安装会准备依赖，所需时间取决于网络和本机环境。项目使用 `bun.lock`；依赖变化时提交该锁文件，不要创建 npm 锁文件。

修改前先确认应用可以启动。开发命令会启动前端开发服务和 Electron 窗口，前端修改可以热更新；主进程相关修改通常需要重新启动应用。

### 常用检查

```bash
bun run build
bun test
bun run lint
bun run format:check
bun run compile:electron
```

优先运行与改动直接相关的检查，再在提交前运行完整检查。界面改动还应在应用中手动检查受影响流程，以及相关的浅色、深色和中英文状态。

平台安装包使用 `bun run dist:mac`、`bun run dist:win` 或 `bun run dist:linux` 构建。打包依赖当前系统和额外运行时，小型代码改动通常不需要生成安装包。

## 官网与文档

官网仓库使用 npm：

```bash
git clone https://github.com/rongxinzy/rongxinxzyai-pages.git
cd rongxinxzyai-pages
npm install
```

只开发官网时运行：

```bash
npm run dev
```

只编辑文档时可以运行 `npm run docs:dev`。需要同时检查官网和 `/docs/` 路径时，先完整构建，再从仓库根目录启动统一预览：

```bash
npm run build
npm run preview
```

完整构建会生成官网，并把 VitePress 文档输出到 `dist/docs`。提交前至少确认改动页面可以打开，站内链接、图片和窄窗口布局正常。
