---
title: 更快、更新、更轻：知远智能体这一周的三项升级
date: 2026-10-22
description: 安装包从 472.5 MB 降到 350.7 MB，升级安装从约 115 秒缩短到 50 秒，主线程卡顿从 1 秒压到 1 毫秒以内，Electron 也跨了 4 个大版本。
tags:
  - 版本动态
---

> 安装包从 472.5 MB 降到 350.7 MB，升级安装从约 115 秒缩短到 50 秒，主线程卡顿从 1 秒压到 1 毫秒以内，Electron 也跨了 4 个大版本。

过去一周（10 月 15 日至 22 日），[知远智能体 / RongxinAI](https://github.com/rongxinzy/RongxinAI) 合并了一百多个 PR。大部分是看不见的重构，但有三件事你装上新版就能感觉到：**界面更跟手，依赖更新，安装包更小**。下面按这三块讲，每个数字都来自对应 PR 里的实测数据，链接附在后面。

---

## 一、性能升级：主线程不再被卡住

桌面应用卡顿，多半是因为有耗时的活挤在主线程上跑。这一周我们按"主进程 / Worker 边界"的规则做了一轮清理，把这些重活一件件挪了出去。

**技能安全扫描进了 Worker**（[#1234](https://github.com/rongxinzy/RongxinAI/pull/1234)）
安装或升级技能时会跑一遍安全扫描。以前这一步在主线程同步执行，扫一个约 500 个文件、24 MB 的技能，主线程最长被卡 **1046.78 ms**，这期间所有界面交互都没有响应。现在扫描放进了有上限的 Worker 池，结果完全一样，主线程最大延迟降到 **0.45 ms**。

**数据库备份不再冻结窗口**（[#1235](https://github.com/rongxinzy/RongxinAI/pull/1235)）
SQLite 备份校验和 SHA-256 哈希也搬进了 Worker。用一个 98 MB 的数据库实测，主线程最大延迟从 **129.64 ms** 降到 **0.41 ms**。

**Office 文件校验快了 20 倍**（[#1238](https://github.com/rongxinzy/RongxinAI/pull/1238)）
校验 docx/xlsx/pptx 时，现在只读 zip 的中央目录和少量 XML 头部，不再把整个文件解压一遍。测试用的是一个有 40 张工作表、解压后约 80 MB 的 xlsx：耗时从 **423 ms** 降到 **21 ms**，内存增量从 **+100 MB** 降到 **+2 MB**。

**流式输出更省**（[#1158](https://github.com/rongxinzy/RongxinAI/pull/1158)、[#1188](https://github.com/rongxinzy/RongxinAI/pull/1188)、[#1282](https://github.com/rongxinzy/RongxinAI/pull/1282)）
AI 一边生成一边写库，以前是每 250 ms 写一次，现在改成内容每增长 32 KiB 才落一次盘。模拟一次 20 万字符的长回复：写入次数从 102 次降到 **8 次（−92%）**，写入量从 10.22 MB 降到 **0.89 MB（−91%）**，主线程同步写库的总耗时从 29.0 ms 降到 **2.8 ms（−90%）**。渲染端去掉了一层多余的批处理，文字刷新改为跟着屏幕帧（rAF）走。编程模式也换成了只解析已闭合部分的流式 Markdown 组件，不再每次收到新内容都把全文重新解析一遍。

**告别同步子进程**（[#1165](https://github.com/rongxinzy/RongxinAI/pull/1165)、[#1240](https://github.com/rongxinzy/RongxinAI/pull/1240)、[#1241](https://github.com/rongxinzy/RongxinAI/pull/1241)）
技能依赖的 npm install（超时上限 120 秒）、PATH 和注册表探测、Git Bash 检测，以前都是同步执行，最坏的时候整个窗口会卡住十几秒。现在这些全部改成了异步。按 PR 里的估算，会话启动这条链路上以前每次可能被同步阻塞 5–15 秒。

**应用内更新更稳**（[#1293](https://github.com/rongxinzy/RongxinAI/pull/1293)）
以前可能出现下载还没完成就提示"可以升级"、点了升级要等好几秒才退出的情况。现在要等文件校验通过才提示升级，退出前的清理改成并行，最多 5 秒。更新状态也改成按需订阅，界面上只有相关的几个组件会重新渲染。

## 二、依赖升级：底座换新

- **Electron 40.10.6 → 44.9.3**（[#1294](https://github.com/rongxinzy/RongxinAI/pull/1294)）：40 已经停止维护（EOL），44 是当前的 Active LTS，内置 Chromium 152 和 Node 24.22。better-sqlite3 同步升到 **13.0.3**，改用 Node-API 绑定。
- **Pi 智能体运行时 1.0.1 → 1.3.0 → 1.4.0**（[#1058](https://github.com/rongxinzy/RongxinAI/pull/1058)、[#1296](https://github.com/rongxinzy/RongxinAI/pull/1296)）：带来了上游的一批改进，包括网关报错时自动重试、tool 参数是坏 JSON 时不再悄悄只执行一半、恢复会话时保留已激活的工具、换模型时丢弃旧模型的 thinking 内容。我们自己的两个补丁（识别 llama.cpp 上下文溢出、处理空消息内容防崩溃）也都迁移到了新版本。
- **安全与常规补丁**（[#1295](https://github.com/rongxinzy/RongxinAI/pull/1295)）：MCP SDK 1.27.1 → 1.32.1，React 19.2.7 → 19.3.1，DOMPurify 3.3.1 → 3.4.17（XSS 防护），undici 8.9.0 → 8.12.3，tar 7.5.11 → 7.5.22，Vite 8.1.5 → 8.3.5。
- **做减法**（[#1052](https://github.com/rongxinzy/RongxinAI/pull/1052)、[#1163](https://github.com/rongxinzy/RongxinAI/pull/1163)）：删掉了 **28 个**没有任何代码引用的直接依赖。shiki、esbuild、mermaid 以前各装了两三份，现在都只留一份。`bun.lock` 缩小了 20%，`node_modules` 少了 74.2 MiB。`uuid` 也换成了系统自带的 `crypto.randomUUID`。

## 三、安装包精简：小了 120 MB，装得也更快

这一块变化最明显。

**技能 Python 运行时从 1.1 GB 瘦到 241 MB**（[#1300](https://github.com/rongxinzy/RongxinAI/pull/1300)）
以前安装包会把所有技能的 Python 依赖合进同一个环境。其中一个需要手动开启的 CAD 预设，单独就占了 865 MB，相当于安装包体积的 39%。现在离线包只带 Excel、PDF 这类核心技能的依赖，CAD、统计这些大块头改为用的时候再装，会先征得你同意。Windows 11 同机实测：

| 指标 | 改前 | 改后 |
| --- | ---: | ---: |
| 安装包 | 472.5 MB | **350.7 MB**（已包含新增的 79.6 MB DOCX 运行时） |
| 升级安装 | 114–116 s | **50.3 s** |
| 全新安装 | 43.5 s | **37.8 s** |
| skill-python 层 | 1,165 MB / 27,744 个文件 | **241 MB / 9,710 个文件** |
| skill-python 展开 | 69.2 s | **17.1 s** |

顺便修了一个老问题：旧版本的运行时以前在升级后回收不掉。在一台实际安装的机器上，`runtimes` 目录清理后从 **3.4 GB 降到 841 MB**。这个 PR 还加了本地 OCR，扫描版 PDF 也能直接读了；Word 功能现在自带运行时，不用再另外安装 .NET SDK。

**安装包里不再夹带多余文件**（[#1051](https://github.com/rongxinzy/RongxinAI/pull/1051)）
打包时会检查安装包里有没有混进 token 文件、source map 和多余的语言包，发现就直接报错。渲染层的重复代码块也清掉了：JS 文件从 1179 个降到 824 个，4 KiB 以上的重复 chunk 从 179 组降到 0 组。Linux 包里的 `app.asar` 从 90.7 MB 降到 76.7 MB。MCP 的两个图标从 PNG 换成 webp，体积从约 1.1 MB 和 0.9 MB 降到几 KB。

**安装选项更简单**（[#1176](https://github.com/rongxinzy/RongxinAI/pull/1176)）
安装器里那个"安装本地推理组件"的开关已经没有实际作用了，这次删掉了。cpu 和 cuda 版本本来就内置了 llama.cpp 运行时（[#1117](https://github.com/rongxinzy/RongxinAI/pull/1117)）。

## 其他改进

- 设置页精简：模型设置合并为 3 个标签页，常规设置的用词也更好懂了（[#1297](https://github.com/rongxinzy/RongxinAI/pull/1297)、[#1298](https://github.com/rongxinzy/RongxinAI/pull/1298)）
- 配置模型服务商时，能自动发现可用模型并填好（[#1292](https://github.com/rongxinzy/RongxinAI/pull/1292)）
- 新的 Quiet Studio 界面设计和专家头像（[#1291](https://github.com/rongxinzy/RongxinAI/pull/1291)、[#1299](https://github.com/rongxinzy/RongxinAI/pull/1299)）
- 新增桌面伙伴"小远"（[#1170](https://github.com/rongxinzy/RongxinAI/pull/1170)）
- 安装进度条不再倒退，安装窗口能适配笔记本屏幕（[#1301](https://github.com/rongxinzy/RongxinAI/pull/1301)、[#1302](https://github.com/rongxinzy/RongxinAI/pull/1302)）

## 下载与升级

在 [GitHub Releases](https://github.com/rongxinzy/RongxinAI/releases) 下载，提供 Windows（lite / cpu / cuda）、macOS（Apple Silicon / Intel）和 Linux（AppImage / deb）安装包。已经装了的用户可以直接在应用内升级。

> 说明：本文提到的部分改动（Electron 44、Pi 1.4.0、安装包瘦身等）是在 10 月 22 日合并的，会出现在下一个版本里。

## 给我们一颗 ⭐

如果你喜欢一个开源、本地优先、能在微信、飞书、钉钉里直接派活的桌面 AI 智能体，欢迎到 **[github.com/rongxinzy/RongxinAI](https://github.com/rongxinzy/RongxinAI)** 点个 Star，这是对我们最直接的支持。也欢迎提 issue，或者从 [good first issue](https://github.com/rongxinzy/RongxinAI/labels/good%20first%20issue) 开始参与贡献。
