---
version: 1
slug: "src-editorial-site-tsx"
primary_target: "src/editorial/Site.tsx"
related_targets: ["src/editorial/Home.tsx","src/editorial/Enterprise.tsx"]
---

# Surface brief — marketing site (src/editorial/Site.tsx, routes / /en/ /enterprise/ /en/enterprise/)

Mode: Persuade. Visitor: AI 工程师 / 研究者 / 开发者，白天在办公室评估一个本地 AI 工作站。Success: 首屏内明白这是什么、为什么重要，并点击下载。

## Direction contract

THESIS: 云海之上的工作台。首屏是一片实时渲染的天空：WebGL 云层 shader（Aceternity cloud-shader，零依赖原生 WebGL）铺满首屏，白云缓缓漂移，产品主张压在天空之上。用户明确喜欢这片白云并要求复用。滚动离开首屏后落入干净白场，Aceternity 组件语法以浅色翻译呈现；云朵背景在企业页首屏与结尾 CTA 带复现。拒绝的分类默认：深色 glow 落地页（AI 生成站重灾区），也拒绝只有 headline + 卡片行的模板页。

OWN-WORLD: 白色天空世界。首屏天空：云顶 #cfe4fa → 底部纯白 #ffffff，云 #ffffff，墨色文字直接压在天上。首屏以下：纯白 #ffffff 与 #f6f8fb 分区交替，低饱和 indigo→sky 极光洗色只出现在局部（卡片 hover、CTA 带）。发丝线 rgba(12,18,34,0.08)，正文墨色 #0c1222，次级 #5b6478。主色 indigo-600（#4f46e5），辅色 sky-500（#0ea5e9）。玻璃芯片用白底实色兜底（AGENTS.md 渲染密度规范不变）。Geist Variable 承担显示与正文，JetBrains Mono Variable 只用于代码、日志、数据。组件语法：CloudShader（签名元素）、TextGenerateEffect、MovingBorder 按钮、BentoGrid、BackgroundBeams（浅灰光束）、Showcase（真实客户端交互演示）、InfiniteMovingCards、CardSpotlight。

STORY: 访客在第一屏看到版本号、一句主张、下载动作；滚动后第二屏进入 Helio 式交互演示窗口，直接操作真实客户端界面的对话、模型市场、专家与技能、任务工作台四个场景，并保留原图集示例数据；模型、原则、下载、开源依次展开，页脚收束。变更范围仅限 Showcase，官网其他区块与视觉世界沿用既有设计。

FIRST VIEWPORT: 整屏天空。CloudShader 全屏铺满（skyTop #cfe4fa → skyBottom #ffffff，白云 6 朵慢速漂移），底部渐隐入纯白；顶部导航悬浮在天上（白玻璃芯片，实底兜底）。版本徽标芯片；居中大标题逐词浮现（TextGenerateEffect），墨色 #0c1222 压天空，云后文字区保证对比度 ≥4.5:1；副题一行事实；主 CTA 为 MovingBorder 光束按钮「免费下载客户端」，次 CTA 幽灵按钮指向产品界面；底部一排平台芯片（macOS / Windows / Linux）。

FORM: 用户钉死的方向（Aceternity cloud-shader 白云首屏 + 白色主题），无 seed。风险：浅色 Aceternity 若只做淡渐变贴纸会退回模板页，差异靠真实产品演示、真实数据与排版纪律挣回来。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Showcase implementation

- `src/editorial/Showcase.tsx` 在窗口进入视口时挂载同源 `/client-demo/index.html?locale=zh-CN|en` iframe，自动播放客户端粒子动画，随后显示原生会话骨架与示例会话；窗口外壳沿用官网 token，仅提供重置与加载失败重试，不显示开始、全屏按钮或外层场景标签页。桌面端下方说明排为一行，移动端自然换行。
- `src/client-demo/main.tsx` 挂载 `client-source.json` 锁定提交的干净客户端 React App 与 store，并加载客户端主题 CSS、共享组件和动效。更新来源前先 fetch 远端；构建拒绝提交不匹配或源码有本地改动的目录。`mock-bridge.ts` 与 `feature-mocks.ts` 替换 `window.electron`，不挂载静态导出 DOM，也不使用官网组件重画客户端。
- 客户端侧栏可进入工作与对话、本地推理、编程、待办、自动化、活动、专家、技能及设置。模型搜索与模拟安装、示例任务回复、技能、待办、自动化和编程等操作由内存数据与模拟事件支持；未实现的读取返回类型化空数据，桌面写操作明确返回未成功或已取消，并通过客户端 Toast 提示。不能据此宣称全部桌面能力已在浏览器实现。示例标记放在 iframe 外，操作结果不追加“（演示）”；不连接模型、账户或本地文件系统。
- `scripts/build-client-demo.mjs` 从原 `public/product` HTML 提取模型和技能事实到 `src/client-demo/gallery.json`，其余示例由 `sample-data.ts` 组织。产物位于 `public/client-demo/`，`source.json` 记录客户端 revision 与相关源码是否含本地改动。普通 `npm run build` 使用已生成产物；`npm run demo:build` 重新生成，`demo:check` 与 `lint` 同样需要已安装依赖的客户端仓库，可用 `ZHIYUAN_CLIENT_SOURCE` 指定来源。
- `src/editorial/copy.ts` 管理官网中英文演示文案；客户端内部沿用自身 i18n。`src/live-demo/constants.ts` 定义场景与通信协议，收发双方校验来源窗口和 origin。单一 iframe 保留内存状态，重置重新加载；手机保留可读的 1280×800 客户端画布并在窗口内横向滚动。CSP 限制外部连接，演示页面设为 noindex。官网其余区块与设计 token 保持既有体系。

## Constraints

- copy.ts 文案事实一字不改；release 拉取、平台检测、哈希路由逻辑保留。
- AGENTS.md 文案规范与渲染密度规范继续有效：1x 与 2x 屏都要验收，backdrop-filter 必须有实底兜底，密度取值走 token。
- 文档站（VitePress）主题对齐到同一白色世界。
