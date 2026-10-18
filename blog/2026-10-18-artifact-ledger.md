---
title: 对话里的制品识别：从事后解析消息到事件发生时记账
date: 2026-10-18
description: 知远过去靠反复解析消息日志来猜 Agent 产出了哪些文件，规则散在五处，补丁越打越多。记录旧架构的问题、来回修改的经过、主流产品的做法，以及改成主进程事件时记账之后的真实改动量。
tags:
  - 技术笔记
---

知远的 Agent 在对话里会产出文件：网页、文档、表格、图片。我们把这些文件叫制品，界面上显示为回答下方的卡片和右侧的预览面板。判断"这一轮产出了哪些文件"这件事，旧架构是在事后把消息日志拿出来反复解析，从里面猜。规则散在五处，持久化索引的版本号升到 8，相关的修复做了好几轮。这次改成在事件发生时记账：工具事件一到，主进程就把文件登记进一张 SQLite 表，界面只负责展示这张表。改动分三个 PR 合入：[#1131](https://github.com/rongxinzy/RongxinAI/pull/1131)、[#1132](https://github.com/rongxinzy/RongxinAI/pull/1132)、[#1134](https://github.com/rongxinzy/RongxinAI/pull/1134)。文中的行数都来自这三个 PR 的 diff 统计。

![制品识别新旧架构对比](/blog-assets/2026-10-18-artifact-ledger.svg)

## 旧架构的问题

旧做法的前提是事后解析：消息先存下来，再从消息日志里推断有哪些文件。推断规则分散在五个地方：

1. 主进程的 `coworkArtifactCollector`，加上持久化索引 `coworkArtifactIndex`；
2. 渲染进程的 `artifactParser`，配一个检测 worker 和增量索引（`artifactDetectionIndex` / `artifactDetectionService`）；
3. 编程模式自己的 `codingArtifacts`；
4. 任务交付的 `taskService`，从审批记录里按 `path`、`file_path`、`filePath` 三个字段取路径；
5. 挂卡片的 `useTurnArtifacts`，再按最终回答里提到的路径决定卡片属于哪一轮。

几个具体问题：

- **不认 edit。** 主进程和渲染进程的写入工具名单都只有 `write` / `writefile`（`write_file` 归一化后也算），都没有 `edit`。用 edit 工具改出来的文件识别不到。
- **用正则猜路径。** 渲染进程用 `FINAL_ANSWER_PATH_PATTERN` 从最终回答的文字里扫本地路径。`useTurnArtifacts` 还用反引号正则 ``/`([^`\r\n]+)`/`` 匹配回答里写到的文件名，来决定卡片挂在哪一轮。模型怎么措辞，直接影响卡片出不出现、出现在哪。
- **规则一变就要重建索引。** 持久化索引的版本号 `COWORK_ARTIFACT_INDEX_VERSION` 已经到了 8。

重构前，这套识别逻辑涉及 11 个生产文件、共 1855 行，配套 9 个测试文件、共 2030 行。

## 为什么一直修不好

按时间把相关 PR 排一下：

- [#344](https://github.com/rongxinzy/RongxinAI/pull/344)（2026-08-05）：引入结构化的 `declare_artifact` 工具，替代正则匹配。
- [#372](https://github.com/rongxinzy/RongxinAI/pull/372)（2026-08-06）：抽取预览策略共享模块时，又加入了从最终回答里扫描路径的正则。
- [#350](https://github.com/rongxinzy/RongxinAI/pull/350)：分页后历史制品会丢，改为在主进程持久化。
- [#693](https://github.com/rongxinzy/RongxinAI/pull/693)、[#695](https://github.com/rongxinzy/RongxinAI/pull/695)：给检测 worker 加增量同步和按消息建索引。
- [#828](https://github.com/rongxinzy/RongxinAI/pull/828)：只有实时声明的交付物才自动打开预览。
- [#919](https://github.com/rongxinzy/RongxinAI/pull/919)（2026-10-06）：模型常把写文件和 `declare_artifact` 放在同一批并行调用里，声明可能比写入先执行。解决办法是让 `declare_artifact` 轮询等文件出现，最多等 2.5 秒，每 50 毫秒查一次。
- [#1004](https://github.com/rongxinzy/RongxinAI/pull/1004)（2026-10-15）：为了解决进入会话时的滚动跳动，又加了一条反引号正则给卡片定位。

#344 刚用声明替掉正则，第二天 #372 又把扫描回答文字的正则加了回来。之后还遇到分页后卡片消失、打开历史会话时面板自己弹出、流式输出过程中不显示卡片这些问题，修法都没有离开"事后解析"这个前提。

根因其实很简单。Pi SDK 的 `tool_execution_start` 事件带着工具参数，写入路径就在里面；`tool_execution_end` 告诉我们工具有没有成功，edit 工具的结果里还带着 diff。适配层没有在事件到达时把这些信息存下来，后面只好从消息日志里反推。

## 主流产品怎么做

从公开文档和开源代码看：

- Claude Code 的文件改动来自 Write、Edit 等工具调用。
- OpenAI Codex CLI 用 `apply_patch` 工具改文件，界面展示的是补丁事件。
- OpenHands 把文件读写建模成 `FileWriteAction`、`FileEditAction` 等事件。
- ChatGPT Canvas 的文档由模型调用画布工具创建。

共同点是以工具事件为准，没有一家靠解析回答文字来找文件。知远自己的编程模式走的是 ACP 协议，拿到的本来就是结构化的工具调用和 diff，说明这条路在我们的项目里也走得通。

## 新架构：事件发生时记账

### 一本账（#1131）

主进程新增一张 SQLite 表 `artifact_ledger`，主键是 `(scope_id, artifact_key)`。scope 是对话的会话 id，或者编程模式的 lane id。记账时机跟着事件走：

- write / edit 成功时，按事件参数里的路径登记。
- 其他工具结束后，做一次工作区比对（防抖 400 毫秒）；回合结束时再做一次最终比对。这样能接住 bash、python 生成的 docx、pptx 这类文件。比对有上限：最多 2 万个文件、12 层目录，跳过 `.git` 和 `node_modules`。
- `declare_artifact` 只负责标注：标出是交付物还是中间文件，以及标题。

#919 的 2.5 秒轮询也去掉了。`declare_artifact` 遇到文件还不存在时，改为等记录器里同一个文件那次还没完成的写入结束，不再按固定间隔查。

每次记账都通过 IPC 频道 `artifact:upsert` 实时推给界面。打开会话时，整个会话的账本记录跟会话一起返回，不受消息分页影响。

### 界面只做投影（#1132）

渲染进程的 `artifactSlice` 只展示账本里的记录，自己不再判断哪些是制品。卡片按 `toolCallId` 挂到产生它的那次工具调用所在的轮次，工具还没返回结果，卡片就能出现。`artifactParser`、检测 worker 和索引、`useSessionArtifactDetection`、`usePersistedArtifactSeed` 都删掉了，所有路径正则和反引号正则也一起删掉。

回答里的 html、svg、mermaid 代码块不是文件，不进账本，单独处理，等消息定稿后再生成卡片。预览面板和各类预览组件没有改动。

### 任务交付和编程模式用同一本账（#1134）

- 编程 lane 的事件写库时同步记账，并带上 lane 当前任务的运行 id。编程页通过 `artifact:list` 读取 lane 的历史记录，删掉了渲染进程里那套编程模式专用的收集和合并逻辑。
- 任务交付不再从审批记录里抽路径，改为读取账本里本次运行的文件；对话里的任务会等回合结束的比对完成后再收集。
- `declare_artifact` 的提示词改为：写过的文件会自动记录，只需要用它标出最终交付物（或中间文件）和标题。

有一处行为变化：编程页以前每写一个 html 或 md 文件就自动弹出预览面板，现在和对话页一致，只有声明为交付物的文件才会自动打开。卡片仍然显示在对应的工具调用旁边。

## 改动量

| PR | 内容 | 总计 | 生产代码 | 测试 |
| --- | --- | --- | --- | --- |
| [#1131](https://github.com/rongxinzy/RongxinAI/pull/1131) | 主进程账本 | +2775 / −1015 | +1493 / −532 | +1282 / −483 |
| [#1132](https://github.com/rongxinzy/RongxinAI/pull/1132) | 界面只做投影 | +1008 / −3255 | +336 / −1362 | +672 / −1893 |
| [#1134](https://github.com/rongxinzy/RongxinAI/pull/1134) | 任务交付和编程模式接入 | +379 / −497 | +174 / −338 | +205 / −159 |
| 合计 | | +4162 / −4767（净 −605） | +2003 / −2232（净 −229） | +2159 / −2535（净 −376） |

调查阶段我们估计能净减两千多行，实际只净减了 605 行。主要原因是 #1131 新写的账本、记录器、工作区比对和对应测试，比预想的多。代码量没减多少，但文件制品的识别规则从五处收成了一处。

## 教训

**信息在事件发生时最完整。** 写入路径、成败、diff，事件里都有。当时不存，之后就只能从日志里反推；推断规则会越补越多，旧架构的 11 个文件基本就是这样一点点长出来的。

**同一条规则只能写一份。** 规则散在五处，每修一处，别处就可能和它对不上。现在文件制品只由主进程的账本识别，界面里只剩回答中代码块的处理。以后文件卡片再出问题，查账本就够了。
