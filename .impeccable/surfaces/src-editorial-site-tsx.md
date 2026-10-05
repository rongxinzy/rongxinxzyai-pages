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

OWN-WORLD: 白色天空世界。首屏天空：云顶 #cfe4fa → 底部纯白 #ffffff，云 #ffffff，墨色文字直接压在天上。首屏以下：纯白 #ffffff 与 #f6f8fb 分区交替，低饱和 indigo→sky 极光洗色只出现在局部（卡片 hover、CTA 带）。发丝线 rgba(12,18,34,0.08)，正文墨色 #0c1222，次级 #5b6478。主色 indigo-600（#4f46e5），辅色 sky-500（#0ea5e9）。玻璃芯片用白底实色兜底（AGENTS.md 渲染密度规范不变）。Geist Variable 承担显示与正文，JetBrains Mono Variable 只用于代码、日志、数据。组件语法：CloudShader（签名元素）、TextGenerateEffect、MovingBorder 按钮、BentoGrid、BackgroundBeams（浅灰光束）、ContainerScroll、InfiniteMovingCards、CardSpotlight。

STORY: 访客在第一屏看到版本号、一句主张、下载动作；滚动后工作台演示以 3D 滚动框架出现并可直接运行；模型、原则、下载、开源依次展开，页脚收束。

FIRST VIEWPORT: 整屏天空。CloudShader 全屏铺满（skyTop #cfe4fa → skyBottom #ffffff，白云 6 朵慢速漂移），底部渐隐入纯白；顶部导航悬浮在天上（白玻璃芯片，实底兜底）。版本徽标芯片；居中大标题逐词浮现（TextGenerateEffect），墨色 #0c1222 压天空，云后文字区保证对比度 ≥4.5:1；副题一行事实；主 CTA 为 MovingBorder 光束按钮「免费下载客户端」，次 CTA 幽灵按钮指向演示；底部一排平台芯片（macOS / Windows / Linux）。首屏下缘露出工作台演示的顶部边缘。

FORM: 用户钉死的方向（Aceternity cloud-shader 白云首屏 + 白色主题），无 seed。风险：浅色 Aceternity 若只做淡渐变贴纸会退回模板页，差异靠真实产品演示、真实数据与排版纪律挣回来。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Constraints

- copy.ts 文案事实一字不改；release 拉取、平台检测、哈希路由逻辑保留。
- AGENTS.md 文案规范与渲染密度规范继续有效：1x 与 2x 屏都要验收，backdrop-filter 必须有实底兜底，密度取值走 token。
- 文档站（VitePress）主题对齐到同一白色世界。
