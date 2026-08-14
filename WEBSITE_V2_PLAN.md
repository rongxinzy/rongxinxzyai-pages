# 知远官网 V2 规划

状态：设计规格稿，等待视觉概念确认

范围：中文官网重构、英文营销官网、Interactive Hero Demo。

本文件定义页面结构、双语文案、Hero Demo、视觉系统、路由与上线门槛，不包含实现代码。公开文案最终发布前，必须回到当前桌面端代码、README、发布清单和企业版实际交付范围逐项核对。视觉概念经确认后才进入编码。

## 一、目标与边界

### 目标

访客在首屏完成一次短体验：看到知远如何接收一项工作、读取材料、调用工具、等待确认并交付结果。页面随后用事实解释本地模型、技能、连接器、自动化和下载方式。

中文和英文使用同一套信息架构与产品事实，但分别编辑，不做逐句机器翻译。

### 公开表述边界

- 可以说：知远支持 GGUF 模型管理，并可将本地推理接入 Agent 工作流。
- 可以说：模型的核心计算可以发生在用户设备上。
- 必须说明：模型下载、云端模型、网页搜索、在线 MCP、邮件和消息投递等能力可能需要网络。
- 不可以说：全部功能永久离线、一定更快、所有数据绝不离开设备、支持某个未验证的硬件或 CUDA 能力。
- 企业版页面必须区分已交付能力、产品方案和未来规划。
- Hero Demo 是使用示例数据的界面演示，不得让访客误以为网站正在访问其文件或真实执行任务。

## 二、页面与路由

| 路径 | 中文页面 | English page | 页面职责 |
| --- | --- | --- | --- |
| `/` | 首页 | — | 首屏 Demo、工作方式、主要能力、下载入口 |
| `/en/` | — | Home | 英文营销首页，结构与中文首页一致 |
| `/enterprise/` | 企业版 | — | 企业部署、治理和交付边界 |
| `/en/enterprise/` | — | Enterprise | 英文企业版页面 |
| `/docs/` | 文档 | — | 现有中文 VitePress 文档 |

一期英文官网包含首页、企业版、下载、发布与信任说明。文档翻译单独排期。英文导航使用 `Documentation ↗`，链接到英文 GitHub README，并以外链图标明确离站；不把中文 `/docs/` 标成英文文档。

### 静态输出与 SEO 决策

四个营销路径必须在构建期生成独立 HTML，而不是只在浏览器中根据 `location.pathname` 替换文字：

- `dist/index.html`
- `dist/en/index.html`
- `dist/enterprise/index.html`
- `dist/en/enterprise/index.html`

每个 HTML 都包含对应语言的首屏内容、`<html lang>`、title、description、canonical、双向 `hreflang`、Open Graph、Twitter Card 和 JSON-LD。React 只负责 hydration 和交互，不负责首次生成 SEO 文案。Cloudflare Pages 直接访问四个路径时都应返回 `200` 和正确的初始 HTML。

不根据浏览器语言强制跳转。语言切换由用户触发，并跳到当前页面的对应语言路径。

### 旧链接迁移

保留现有首页锚点，例如 `#download`、`#product` 和 `#workflow`。旧页面状态迁移规则如下：

| 旧链接 | 新链接 |
| --- | --- |
| `/#enterprise` | `/enterprise/` |
| `/#enterprise-contact` | `/enterprise/#contact` |
| `/#docs` | `/docs/` |

迁移使用一次性 `location.replace` 或等价重定向，避免浏览历史里留下无效中间页。

### 导航骨架

| 中文 | English |
| --- | --- |
| 产品 | Product |
| 工作方式 | How it works |
| 本地模型 | Local models |
| 企业版 | Enterprise |
| 文档 | Documentation ↗ |
| 下载 | Download |
| 中文 / EN | 中文 / EN |

主按钮：`下载知远` / `Download ZhiYuan`

次按钮：`查看源码` / `View source`

## 三、首页结构

### 1. Hero

职责：让访客马上看到一项工作正在发生，并在首屏明确“开源、本地优先、桌面 Agent”三个产品事实。

- 标题：短句，说明“给任务—看到过程—得到结果”。
- 正文：说明产品定位、文件、工具、工作区和权限确认。
- 主按钮：触发一次 Interactive Demo。
- 次按钮：下载当前稳定版；源码使用相邻文本链接。
- 主视觉：Interactive Hero Demo。
- Demo 下方披露：使用示例数据，不上传访客文件。

### 2. 工作方式

用一条横向或纵向流程说明：明确目标 → 读取所需材料 → 调用工具 → 请求确认 → 交付结果。

每一步只配一个真实动作，不加入虚构的准确率、速度或完成率。

### 3. 本地模型

说明 GGUF 模型管理、模型市场和可调参数。参数可包括上下文长度、GPU offload、线程、批大小、主 GPU、内存映射和 keep-alive；页面不把这些参数包装成性能保证。

### 4. 技能与连接

说明内置技能、自定义技能和 MCP 连接。例子使用网页搜索、文档处理、代码、浏览器或企业系统，但只保留当前版本已有或明确可配置的能力。

### 5. 自动化与触达

说明定时任务、持续运行和结果送达。明确结果可以留在桌面应用，也可以通过已配置的消息或邮件连接送达。

### 6. 真实产品界面

继续使用当前版本的工作台、模型市场和技能中心截图，但将静态截图从 Hero 移到这里，作为产品证据，而不是首屏的主要动作。

### 7. 开源与信任

说明源码、权限流程、发布工作流、签名与升级清单。法律、安全和安装限制单独陈述，不用营销语气稀释。

### 8. 下载

动态读取 `/api/release`。保留 Windows、macOS Apple Silicon、Ubuntu/Linux 和 AppImage 的真实可用状态；不可用时显示明确状态，不显示伪造的版本号或链接。

### 9. 企业版入口

首页只做清晰入口；完整的企业身份、权限、部署、治理和交付说明放在企业版页面。

## 四、双语文案骨架

以下文案是视觉稿和实现使用的第一版 copy lock。中英文上线前仍需分别做人工编辑和产品事实审核；未经确认不得在实现阶段临时增加首屏文案。

### 共享导航、状态与页脚

| 内容键 | 中文初稿 | English draft | 编辑备注 |
| --- | --- | --- | --- |
| `shared.nav.product` | 产品 | Product | 首页产品证据区 |
| `shared.nav.workflow` | 工作方式 | How it works | 首页锚点 |
| `shared.nav.localModels` | 本地模型 | Local models | 首页锚点 |
| `shared.nav.enterprise` | 企业版 | Enterprise | 路径页面 |
| `shared.nav.docs` | 文档 | Documentation ↗ | 英文版链接英文 README |
| `shared.nav.download` | 下载 | Download | 首页锚点 |
| `shared.locale.zh` | 中文 | 中文 | 语言名不翻译 |
| `shared.locale.en` | EN | EN | 语言名不翻译 |
| `shared.release.loading` | 正在读取当前稳定版本… | Loading the current stable release… | `aria-live=polite` |
| `shared.release.unavailable` | 当前稳定版本暂时不可用。 | The current stable release is temporarily unavailable. | 不要求反复刷新 |
| `shared.download.windows` | 下载 Windows | Download for Windows | x64 |
| `shared.download.macos` | 下载 macOS | Download for macOS | Apple Silicon |
| `shared.download.linux` | 下载 Ubuntu 版 | Download for Ubuntu | 仅在 artifact 存在时出现 |
| `shared.download.appImage` | 下载 AppImage | Download AppImage | 仅在 artifact 存在时出现 |
| `shared.download.linuxUnavailable` | 当前稳定版没有 Linux 安装包。 | No Linux installer is included in the current stable release. | 与 API 可选字段一致 |
| `shared.footer.source` | 源代码 | Source code | GitHub |
| `shared.footer.license` | AGPL-3.0 开源 | Open source under AGPL-3.0 | 许可证链接 |
| `shared.footer.copyright` | © 2026 北京容芯致远 | © 2026 Beijing Rongxin Zhiyuan | 公司英文名发布前复核 |

### 中文与英文首页

| 内容键 | 中文初稿 | English draft | 编辑备注 |
| --- | --- | --- | --- |
| `home.hero.title` | 把一项工作交给知远。 | Give ZhiYuan a task. | 先讲动作，避免“下一代 AI” |
| `home.hero.lead` | 知远是一款开源、本地优先的桌面 Agent。它会读取材料、调用工具，并把结果留在工作区。敏感操作由你确认。 | ZhiYuan is an open-source, local-first desktop agent. It works through your files and tools, returns the result to your workspace, and pauses before sensitive actions. | 首屏保留产品差异 |
| `home.hero.demoLabel` | 交互演示 · 使用示例数据 | Interactive demo · Sample data only | 明确 Demo 边界 |
| `home.hero.demoAction` | 体验一次 | Try the demo | 主要 Demo 操作 |
| `home.hero.download` | 下载知远 | Download ZhiYuan | 动态版本信息另行显示 |
| `home.hero.source` | 查看源码 | View source | 指向 GitHub |
| `home.workflow.title` | 从目标到交付，中间每一步都看得见。 | From goal to deliverable, each step stays visible. | 解释过程可见 |
| `home.workflow.body` | 知远会先明确任务，再读取所需材料、调用工具；需要确认时会停下来。 | ZhiYuan clarifies the task, reads the required material, and calls the right tools. It pauses when your approval is needed. | 只写当前工作流 |
| `home.local.title` | 在自己的电脑上运行 GGUF 模型。 | Run GGUF models on your own device. | 直接陈述能力 |
| `home.local.body` | 知远可以管理 GGUF 模型，并把本地推理接入 Agent 工作流。模型下载和联网功能仍可能需要网络。 | ZhiYuan can manage GGUF models and use local inference in agent workflows. Model downloads and online features may still require a network. | 本地与联网边界必须保留 |
| `home.skills.title` | 把常用方法变成可复用技能。 | Turn repeatable methods into skills. | 避免“赋能” |
| `home.skills.body` | 使用内置技能，连接 MCP 服务，也可以添加自己的技能。 | Use built-in skills, connect MCP services, and add your own. | 与当前技能中心一致 |
| `home.automation.title` | 任务可以按时开始，结果按你的方式送达。 | Schedule work and choose where results go. | 不承诺无人值守的所有场景 |
| `home.automation.body` | 定时任务可以在桌面上运行，结果可留在应用或通过已配置的消息、邮件连接送达。 | Scheduled tasks can run on the desktop. Results can stay in the app or be delivered through configured messaging and email connections. | 连接能力受配置和网络影响 |
| `home.product.title` | 这就是知远现在的界面。 | This is ZhiYuan as it is today. | 真实截图证据 |
| `home.product.body` | 工作台、模型市场和技能中心都来自当前版本。 | The workbench, model marketplace, and skills center are part of the current desktop app. | 不把概念稿当产品图 |
| `home.trust.title` | 源码、发布与权限都可以检查。 | Inspect the source, releases, and permissions. | 事实型标题 |
| `home.trust.body` | 知远以开源方式发布。敏感操作经过权限流程，安装包和升级清单由公开发布流程生成。 | ZhiYuan is released in the open. Sensitive actions go through an approval flow; installers and update manifests are produced by a public release workflow. | 签名状态需跟随真实发布状态 |
| `home.download.title` | 把知远装进你的电脑。 | Install ZhiYuan on your computer. | 直接、具体 |
| `home.download.body` | Windows 和 macOS 安装包随稳定版发布；Linux 构建可用时会显示在这里。版本信息来自稳定发布清单。 | Windows and macOS installers follow the stable release. Linux builds appear here when they are available. Version information comes from the stable release manifest. | 不无条件承诺 Linux |
| `home.download.windowsNote` | Windows 离线安装包不含本地推理组件。Defender 排除项由安装向导单独征求授权。 | The Windows offline installer does not include local-inference components. The installer asks separately before adding any Defender exclusion. | 安全说明不可删 |
| `home.trust.signingTitle` | 发布与签名 | Releases and signing | 不把申请状态写成已完成 |
| `home.trust.signingBody` | 公开发布由项目仓库中的 GitHub Actions 构建。升级清单附带签名与 SHA-256。 | Public releases are built by GitHub Actions in the project repository. Update manifests include a signature and SHA-256 hashes. | 平台厂商签名状态单列 |

### 企业版页面

企业能力上线前逐项标记 `已交付`、`项目方案` 或 `规划`。以下文案默认描述产品与交付方案，不自动构成已上线承诺。

| 内容键 | 中文初稿 | English draft | 编辑备注 |
| --- | --- | --- | --- |
| `enterprise.hero.title` | 让 Agent 进入受控的企业工作环境。 | Bring agent workflows into a governed work environment. | 企业主张 |
| `enterprise.hero.lead` | 桌面端承接员工工作，企业服务统一管理身份、模型、知识、工具和数据范围。 | The desktop app is where employees work. Enterprise services govern identity, models, knowledge, tools, and data boundaries. | 不写“稳定运行”绝对承诺 |
| `enterprise.hero.traitDeployment` | 独立部署 | Dedicated deployment | 以项目合同为准 |
| `enterprise.hero.traitGovernance` | 统一治理 | Central governance | 方案能力 |
| `enterprise.hero.traitDelivery` | 项目交付 | Project delivery | 不写持续交付 |
| `enterprise.hero.cta` | 联系企业团队 | Contact enterprise team | `mailto:` |
| `enterprise.comparison.title` | 开源版负责个人工作，企业版增加组织边界。 | The open-source edition supports individual work. Enterprise adds organizational boundaries. | 避免对仗式口号 |
| `enterprise.comparison.body` | 身份、权限、模型、连接和运维由企业策略统一管理。 | Identity, permissions, models, connections, and operations follow enterprise policy. | 方案描述 |
| `enterprise.comparison.dimension` | 能力维度 | Area | 表头 |
| `enterprise.comparison.openSource` | 开源版 | Open source | 表头 |
| `enterprise.comparison.enterprise` | 企业版 | Enterprise | 表头 |
| `enterprise.comparison.workspace` | 工作空间 | Workspace | 行名 |
| `enterprise.comparison.workspaceOpen` | 个人使用 | Individual use | 开源版 |
| `enterprise.comparison.workspaceEnterprise` | 企业共享空间、模板与成员管理 | Shared workspaces, templates, and member management | 企业方案 |
| `enterprise.comparison.models` | 模型与工具 | Models and tools | 行名 |
| `enterprise.comparison.modelsOpen` | 按个人配置 | Configured by each user | 开源版 |
| `enterprise.comparison.modelsEnterprise` | 统一网关、策略、额度与连接治理 | Central gateways, policies, quotas, and connection governance | 企业方案 |
| `enterprise.comparison.data` | 数据与权限 | Data and access | 行名 |
| `enterprise.comparison.dataOpen` | 本地优先 | Local-first | 开源版 |
| `enterprise.comparison.dataEnterprise` | 组织权限、审计与生命周期管理 | Organizational access, audit, and lifecycle management | 企业方案 |
| `enterprise.comparison.delivery` | 部署与服务 | Deployment and service | 行名 |
| `enterprise.comparison.deliveryOpen` | 社区自助 | Community-supported | 开源版 |
| `enterprise.comparison.deliveryEnterprise` | 独立部署、项目交付与持续运维 | Dedicated deployment, project delivery, and ongoing operations | 以合同为准 |
| `enterprise.architecture.title` | 桌面工作入口，企业服务统一治理。 | Desktop work, governed by enterprise services. | 避免中英混排 Server |
| `enterprise.architecture.body` | 桌面端连接本地资料和工作过程；企业服务连接身份、共享知识、模型和业务系统。 | The desktop app connects local material and day-to-day work. Enterprise services connect identity, shared knowledge, models, and business systems. | 架构边界 |
| `enterprise.delivery.title` | 从需求到验收，每一步都有明确交付物。 | Clear deliverables from discovery through acceptance. | 项目制交付 |
| `enterprise.delivery.discovery` | 需求与方案 | Discovery and design | 步骤 1 |
| `enterprise.delivery.setup` | 部署与初始化 | Deployment and setup | 步骤 2 |
| `enterprise.delivery.integration` | 联调与培训 | Integration and training | 步骤 3 |
| `enterprise.delivery.acceptance` | 试运行与验收 | Pilot and acceptance | 步骤 4 |
| `enterprise.contact.title` | 讨论企业部署与项目合作。 | Discuss enterprise deployment and project delivery. | 联系区 |
| `enterprise.contact.body` | 说明组织规模、部署环境和希望接入的系统，我们会据此准备方案。 | Tell us about your organization, deployment environment, and required system connections so we can prepare the right scope. | 不写欢迎套话 |
| `enterprise.contact.email` | likeran@rongxinzy.com | likeran@rongxinzy.com | 不本地化 |
| `enterprise.contact.communityQrAlt` | 知远智能体交流群二维码 | QR code for the ZhiYuan community group | 图片替代文本 |
| `enterprise.contact.officialQrAlt` | 知远公众号二维码 | QR code for the official ZhiYuan account | 图片替代文本 |

### 文案审核清单

- 删除“真正、无缝、一站式、轻松、赋能、下一代、革命性”等无事实增量的词。
- 每个能力段落至少包含一个动作或默认行为。
- 本地推理段落同时写能力和网络边界。
- 所有企业能力标注“已上线 / 方案 / 规划”中的一种。
- 中英文分别检查语气，不保留中文句式的直译痕迹。
- CTA 统一使用动作，不使用“立即探索”“开启未来”等空泛表达。

## 五、Hero Demo 分镜

### Demo 场景

示例任务：

> 读取项目文件夹里的会议纪要和进度表，整理一份本周汇报，标出仍需确认的事项。

英文版本：

> Read the meeting notes and progress sheet in the project folder, draft a weekly update, and flag the items that still need confirmation.

示例数据包括三份只读文件、一份进度表和一个待生成的周报文件。所有数据随前端打包，不读取访客本机文件。

### 状态分镜

| 状态 | 时间 | 画面 | 用户动作 | 中文界面文案 | English UI copy |
| --- | ---: | --- | --- | --- | --- |
| `idle` | 0–2s | 真实工作台骨架：左侧工作区、中央输入框、模型选择和发送按钮。 | 点击“体验一次”或直接点示例任务。 | `交互演示 · 使用示例数据` / `体验一次` | `Interactive demo · Sample data only` / `Try the demo` |
| `typing` | 2–5s | 输入框逐字出现示例任务；发送按钮变为可用状态。 | 无；动画可暂停。 | `读取项目文件夹里的会议纪要和进度表…` | `Read the meeting notes and progress sheet…` |
| `planning` | 5–8s | 用户消息进入会话轨道；执行过程以当前产品的折叠过程条和纵向工具链呈现，不增加横向 Dashboard 步骤器。 | 无。 | `读取 3 份材料`、`整理时间线`、`生成周报草稿` | `Read 3 files`, `Build a timeline`, `Draft the weekly update` |
| `approval` | 8–12s | 权限卡固定在输入框上方，保留会话上下文；桌面端复用当前 inline permission 的“工具行 → 命令块 → 底部动作”结构。`需要权限确认` 作为状态播报，不在卡片里重复造一层标题栏。 | 点击“允许”。 | `shell` / `python scripts/build_weekly_chart.py` / `拒绝` / `允许` | `shell` / `python scripts/build_weekly_chart.py` / `Deny` / `Approve` |
| `working` | 12–15s | 权限卡收起；同一纵向工具链继续，当前动作显示轻量进行中状态。 | 无。 | `正在生成图表`、`已加入周报` | `Generating chart`, `Added to the update` |
| `complete` | 15–20s | 工具链折叠为完成摘要；会话出现最终答复和交付物卡片，可按当前产品方式打开右侧产物区。 | 点击“重新演示”或查看交付物。 | `周报草稿已完成` / `仍需确认 3 项` / `重新演示` | `Weekly update ready` / `3 items still need confirmation` / `Replay` |

### Demo 交互规则

- 使用有限状态机：`idle → typing → planning → approval → working → complete`。
- 首次进入页面不自动提交任务；可以轻量播放输入动画，但必须由用户触发 Demo。
- `approval` 是唯一强制停顿点，形成可理解的产品瞬间。拒绝只拒绝当前工具请求，不写成“停止任务”。
- `Replay` 清空状态并恢复 `idle`，不刷新整个页面。
- 只向 `aria-live=polite` 宣布 `planning`、`approval` 和 `complete` 三个里程碑，不逐字朗读输入动画。
- 支持键盘触发和焦点可见。启用减弱动画时，点击“体验一次”后直接进入 `approval`；批准后直接进入 `complete`，不播放逐字输入和定时过渡。
- Demo 文案全部来自双语内容对象，不在组件中硬编码中文。
- 不展示真实 API 请求、虚构的模型耗时、伪造的搜索结果或不可验证的性能数字。

### 视觉与实现约束

- 以当前桌面端代码和 `zhiyuan-workspace.png` 为共同基准；截图用于确认整体观感，代码用于确认真实尺寸、层级和状态。
- UI 控件使用代码实现；真实产品截图只作为下游证据区使用。
- Demo 使用本地静态数据，不增加模型 API、文件上传或第三方脚本依赖。
- 桌面端显示完整工作台；移动端显示任务轨迹和权限卡片，避免缩放后不可读。
- Demo 旁边提供“查看真实产品界面”锚点，避免模拟界面与当前产品截图之间产生误解。

### 当前产品 UI 基准

本轮已核对桌面端 `DESIGN.md`、主题 tokens、侧栏、工作台首页、会话详情、输入框、工具链和权限组件。官网不复制整个 Electron 界面，但 Hero Demo 必须复用同一组视觉语法。

| 维度 | 当前桌面端事实 | 官网 Demo 采用方式 |
| --- | --- | --- |
| 应用骨架 | 左侧栏默认 `244px`，可在 `220–420px` 调整；顶部栏 `48px` | Hero 窗口内保持约 `20%–24%` 的侧栏比例和明确的 48px 级顶部关系；小尺寸允许等比收紧，不改成通用 SaaS 导航 |
| 表面 | 主画布白色；侧栏与次级表面约为 `#F5F5F4`；分隔线约为 `#E7E5E4` | 产品窗口内部使用中性白、暖灰和 1px 线，不使用官网蓝色给普通面板着色 |
| 文字 | 主文字约 `rgb(60,63,67)`；次文字约 `rgb(128,125,119)` | Demo 内主文案用冷灰黑，不用官网 H1 的纯黑；状态与说明降低一档 |
| 字号与字重 | 默认 `14px`；辅助 `12px`；页面标题 `18px`；展示上限 `22px`；字重只用 `400/500/600` | Demo 控件保持 `12–14px`，标题最高 `16–18px`；品牌字标外不使用粗黑字 |
| 圆角 | 控件 `8px`、面板 `10px`、弹层 `14px`；主输入框例外为 `24px` 级大圆角 | 权限卡和工具块遵守该层级；只让主输入框使用明显更大的圆角 |
| 控件密度 | 默认按钮约 `32px` 高，大号约 `36px`；图标通常 `16px` | 桌面 Demo 延续紧凑密度；官网外层 CTA 可为 `44–48px`，不把大按钮尺寸带进产品窗口 |
| 阴影与边框 | 先用 1px 边框分层；只有弹层、悬浮物和主输入框明显浮起 | 产品窗口和权限卡避免重阴影；Hero 外框可加一档展示性阴影，但不改变内部层级 |
| 动效 | 微交互 `100–200ms`，视图过渡 `150–250ms`，语义图标 `400–600ms`；一屏只保留一个循环状态 | Demo 的状态停留可为叙事延时，但单个控件变化仍在 `250ms` 内；进行中只亮一个位置 |
| 会话结构 | 任务标题在顶部栏；内容走纵向 conversation rail；输入框固定在底部；权限卡固定在输入框上方 | Demo 不使用横向 KPI、四段仪表盘或漂浮卡片；始终让会话和输入框成为主线 |
| 权限结构 | 当前会话内使用 inline permission：工具名、命令块、拒绝/允许；完整 modal 才显示标题与说明 | Hero 采用 inline 版本；无障碍状态播报保留“需要权限确认 / Permission Required” |

对齐时以以下文件为准：

- `RongxinAI/DESIGN.md`
- `RongxinAI/src/renderer/theme/css/themes.css`
- `RongxinAI/src/renderer/components/Sidebar.tsx`
- `RongxinAI/src/renderer/components/cowork/CoworkView.tsx`
- `RongxinAI/src/renderer/components/cowork/CoworkSessionDetail.tsx`
- `RongxinAI/src/renderer/components/cowork/components/TurnBlock.tsx`
- `RongxinAI/src/renderer/components/cowork/CoworkPermissionModal.tsx`
- `RongxinAI/src/shared/components/ui/button.tsx`

### 官网与产品的一致性边界

- 官网外层可以使用更大的标题、更宽的留白和品牌蓝 CTA；嵌入的产品窗口切回桌面端的中性色系统。蓝色只留给品牌标识、官网动作和极少量焦点，不在 Demo 内充当普通进度色。
- 保持真实的侧栏、顶部栏、会话轨道、过程摘要、底部输入框和权限卡层级；允许减少侧栏入口、压缩示例消息和省略系统窗口按钮。
- Demo 的“规划过程”通过纵向工具链表达，不能为了讲故事增加当前产品没有的横向四步 Dashboard。
- 交付物采用当前产品的会话卡片和右侧 artifact panel 关系；Hero 空间不足时先展示卡片摘要，点击后再展开，不固定摆一块通用报表面板。
- 移动端是官网专用的响应式重排，不伪装成已有移动客户端；保留产品 token、会话顺序和权限语义即可。

## 六、视觉方向与设计系统

### 设计主张

关键词：`真实工作台`、`编辑感`、`克制的蓝色`、`可检查的过程`。

页面使用真白背景、深色文字和知远蓝作为官网层的唯一主强调色。嵌入产品窗口采用桌面端的中性灰黑，不把官网强调色灌进产品 UI。视觉重心来自产品界面和排版，不使用大面积彩色渐变、霓虹光晕、装饰性胶囊、虚构数据或默认 Bento 卡片阵列。

### 首屏构图

- 桌面参考尺寸：1280×720。
- Header 高 72px，左侧保留 Logo 和“产品 / 工作方式 / 本地模型 / 企业版 / 文档”，右侧放语言切换、GitHub 和一个紧凑下载按钮。
- Hero 使用 5:7 左右分栏。左侧是 H1、三行以内正文和两个 CTA；右侧是 720px 左右宽度的交互工作台。
- Demo 默认显示 `idle`，但侧栏、顶部任务栏、会话轨道和底部输入框必须在 720px 高度内可识别；触发后停在 `approval`。
- 首屏底部露出下一节的流程标题或第一条步骤，建立继续向下的节奏。
- 不在 H1 上方增加 eyebrow、badge 或 pill。Demo 内部的“交互演示 · 使用示例数据”属于产品说明，放在窗口底部说明区，不作为 Hero 装饰标签。

### 页面节奏

- 工作方式：开放式横向时间线，不包进大卡片。
- 本地模型：左侧真实模型市场截图，右侧参数与联网边界；使用一条蓝色竖向规则连接标题和说明。
- 技能与连接：使用两列列表或工具轨道，不使用十二宫格图标墙。
- 自动化：深浅交替的开放区带，展示时间、任务和送达路径。
- 真实产品界面：保留当前三个截图的 tab 切换，用统一媒体框架承载。
- 开源与信任：使用发布流程、权限和许可证三条横向证据，不展示无法实时维护的数字。
- 下载：一个主下载区带，平台条目根据 `/api/release` 动态出现；Windows 和 macOS 固定，Linux 条目条件渲染。
- 企业入口：首页使用一条克制的文本 CTA，不复制企业版架构图。

### 设计 tokens 初稿

| Token | 值 | 用途 |
| --- | --- | --- |
| `color.paper` | `#FFFFFF` | 全站主背景，保持真白 |
| `color.ink` | `#121724` | 官网标题和主文字 |
| `color.muted` | `#667085` | 正文和说明 |
| `color.line` | `#E4E7EC` | 分隔线和产品框架 |
| `color.blue` | `#397BFF` | 官网主 CTA、链接和品牌标识 |
| `color.blueDeep` | `#2563EB` | 官网 hover 和 focus |
| `color.green` | `#20A464` | 完成状态 |
| `color.warning` | `#B54708` | 权限注意提示 |
| `app.canvas` | `#FFFFFF` | Demo 主画布 |
| `app.surfaceRaised` | `#F5F5F4` | Demo 侧栏、次级表面和 hover |
| `app.text` | `rgb(60,63,67)` | Demo 主文字和主动作 |
| `app.textMuted` | `rgb(128,125,119)` | Demo 说明和次状态 |
| `app.line` | `#E7E5E4` | Demo 1px 边框和分隔 |
| `radius.control` | `8px` | Demo 按钮、输入控件和导航项 |
| `radius.panel` | `10px` | Demo 卡片和面板 |
| `radius.dialog` | `14px` | 权限卡和大型弹层 |
| `radius.prompt` | `24px` | 仅 Demo 主输入框 |
| `shadow.frame` | `0 12px 36px rgba(18,23,36,.10)` | 官网 Hero 对产品窗口的展示性阴影 |
| `container` | `1180px` | 桌面内容宽度 |

内容字体使用 Inter、系统无衬线、PingFang SC 和 Microsoft YaHei 回退。H1 桌面 64–72px、移动端 40–46px；正文桌面 18px、移动端 16px；Demo 控件文字 12–14px，不继承营销正文尺寸。

### 图标与组件

- 继续使用产品和官网现有线性图标语言，1.8px 左右描边，圆角端点。
- GitHub 和平台品牌图标可使用实心轮廓；同一组内不得混用不同光学重量。
- 组件家族限制为：导航、主次按钮、产品窗口、流程行、媒体框、权限卡片、平台下载行和页脚链接。
- 不新增统计卡片、评价轮播、定价卡、品牌 Logo 墙和装饰性状态胶囊。

### 移动端

- 参考尺寸：390×844。
- Header 只保留 Logo、语言切换和菜单按钮；下载 CTA 留在 Hero，完整导航进入可访问的菜单。
- H1、正文和 CTA 在前，Demo 紧随其后；首屏至少露出 Demo 的输入区或权限卡片。
- Demo 去掉左侧完整侧栏，只保留当前任务名、纵向过程摘要、底部输入区、权限卡片和交付物摘要。
- 移动端权限按钮为官网触控适配，点击高度至少 `44px`；这不代表桌面产品控件尺寸被放大。
- 完成状态不在右侧打开独立面板，改为任务流内的交付物摘要。

### 视觉概念审批门

编码前必须生成并确认以下独立、可读的视觉概念，不能用一张压缩长图替代：

1. 桌面 Hero：`approval` 状态，1280×720。
2. Hero 完成态：`complete` 状态细节。
3. 首页中段：工作方式、本地模型、技能与自动化的连续节奏。
4. 首页下段：真实产品、开源与信任、下载和企业入口。
5. 移动端 Hero：`approval` 状态，390×844。
6. 企业版：Hero、对比、架构、交付和联系区的完整节奏。

每张概念确认后记录：允许出现的文案、尺寸、容器、字体关系、颜色、图标、媒体处理、动效和移动端变化。概念确认前不建立生产组件。

### 本轮视觉概念记录

以下文件为设计确认材料，不是待切图素材；正式实现仍用 HTML/CSS/React 和仓库内真实产品截图。早期带蓝色横向 Dashboard 步骤器的 Hero、完成态和移动端初稿已废弃，不得作为实现依据。

| 概念 | 文件 | 当前结论 |
| --- | --- | --- |
| 桌面 Hero · `approval` | `/Users/krli/.codex/generated_images/019ffed2-f28c-7490-94da-ef7f053b3976/exec-fa6cce66-3f42-4cd7-9acb-ca786ac0fd0e.png` | 推荐基准，已按当前前端的侧栏、会话轨道、输入框和 inline permission 校准；待用户确认 |
| 桌面 Hero · `complete` | `/Users/krli/.codex/generated_images/019ffed2-f28c-7490-94da-ef7f053b3976/exec-878cdea9-98c5-4d7e-b33a-08616b2197ce.png` | 推荐基准；完成摘要和产物卡留在会话轨道，待用户确认 |
| 首页中段 | `/Users/krli/.codex/generated_images/019ffed2-f28c-7490-94da-ef7f053b3976/exec-cb99cf0d-b2eb-4cf3-95a2-748ddfd63d5d.png` | 页面节奏参考；实现时产品区域必须换回仓库内真实截图或按当前 token 重建 |
| 首页下段 | `/Users/krli/.codex/generated_images/019ffed2-f28c-7490-94da-ef7f053b3976/exec-600892fe-bd0c-4816-adbe-1945b39d908f.png` | 页面节奏参考；版本、下载状态和签名信息必须来自真实接口与发布清单 |
| 移动端 Hero · `approval` | `/Users/krli/.codex/generated_images/019ffed2-f28c-7490-94da-ef7f053b3976/exec-cd361a83-bf4a-4b87-a06e-ddb451ace4ad.png` | 推荐基准；明确是官网响应式 Demo，不宣称已有移动客户端，待用户确认 |
| 企业版完整页 | `/Users/krli/.codex/generated_images/019ffed2-f28c-7490-94da-ef7f053b3976/exec-ef62b9d6-7a0b-4af1-a0f6-a7ef45194b21.png` | 信息架构与节奏参考；所有企业能力继续标为项目方案，二维码换真实资产 |

## 七、技术落地顺序

1. 从干净的 `origin/main` 建立官网 V2 分支，保留现有 Pages 项目和生产域名。
2. 完成产品事实表、双语 copy lock 和企业能力状态标记。
3. 生成六组视觉概念，确认完整页面节奏、关键状态和移动端。
4. 从已确认概念提取 tokens、组件家族、图标和 above-the-fold copy inventory。
5. 建立 `content/zh-CN`、`content/en` 和共享页面组件，迁移现有下载 API、企业版和文档入口。
6. 建立四个构建期静态页面及 SEO 元数据，并实现旧 Hash 迁移。
7. 实现 Hero Demo 状态机、键盘交互、移动端变体和减弱动画。
8. 按页面逐段对照概念实现，每完成一个区段就做浏览器截图比对。
9. 通过 Cloudflare Pages 预览分支做视觉、双语、路径和下载验收，确认后合并 `main`。

## 八、上线验收

- 1280×720 首屏同时出现标题、CTA 和 Demo 的可识别工作状态。
- Demo 在 15–20 秒内完成，核心流程最多需要一次关键点击。
- 390px 宽度无横向溢出，权限卡片和完成状态可读。
- 中文和英文没有漏翻、错配或中文硬编码。
- 四个营销路径直接访问均返回 `200`，初始 HTML 的 `lang`、title、description、canonical、`hreflang`、OG 和 JSON-LD 正确。
- 旧 `#enterprise`、`#enterprise-contact` 和 `#docs` 链接进入对应新页面。
- `/api/release` 和真实下载链接保持可用；不可用平台显示真实状态。
- 公开文案不越过本地推理、联网功能、企业版和发布签名的事实边界。
- Hero 权限卡片与当前桌面端的 inline 结构、按钮语义、工具名称和工具参数一致；状态标题通过可访问播报提供，不在卡片里重复造 UI。
- 已确认概念与浏览器截图在首屏构图、文字、字体、颜色、间距、图标、媒体框和状态上无未解释偏差。
- 构建、TypeScript、链接、键盘、减弱动画、控制台错误和生产页面 smoke 均通过。
