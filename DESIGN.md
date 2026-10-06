# DESIGN.md — 知远官网视觉体系

方向：云海之上的工作台。白色主题 + Aceternity 组件语法的浅色翻译。用户钉死，见 `.impeccable/surfaces/src-editorial-site-tsx.md` 方向契约。

## 签名元素

CloudShader（`src/effects/CloudShader.tsx`）：零依赖原生 WebGL 云层 shader，铺满首页与企业页首屏。白云慢速漂移，底部渐隐入纯白。DPR ≤2，渲染缓冲上限 1920×1080（低频内容放大不可辨）；滚出视口或切后台即暂停，prefers-reduced-motion 只画一帧静态。

## Token（`src/editorial/site.css` `@theme`）

| Token | 值 | 用途 |
|---|---|---|
| ground | `#ffffff` | 主地面 |
| mist | `#f6f8fb` | 分区交替 |
| ink | `#0c1222` | 正文墨色 |
| muted | `#5b6478` | 次级文字（白底 ≥4.5:1） |
| accent | `#4f46e5` | 主行动、强调 |
| accent-2 | `#0ea5e9` | 辅助强调（不作白底正文色） |
| hairline | `rgb(12 18 34 / 0.08)` | 唯一边线，1x 屏升至 0.14 |

字体：Geist Variable（显示+正文）、JetBrains Mono Variable（仅代码/日志/数据）。小于 13px 的字号一律 `var(--fs-micro)`（11px，1x 屏 12px）。

## 组件语法（`src/effects/`）

TextGenerateEffect（首屏大标题逐词浮现）、MovingBorderButton（主 CTA 边框光束）、Showcase（第二屏产品截图手牌翻页，GSAP ScrollTrigger + Lenis）、CardSpotlight（模型/原则卡 hover 光斑）、TracingBeam（企业页交付流程）、BackgroundBeams（OSS/联系区衬底）、InfiniteMovingCards、AuroraBackground、BentoGrid。

## 规则

- 一次海拔：hairline 边或柔和阴影（`0 20px 60px rgb(12 18 34 / 0.10)`）二选一，不叠加。卡片圆角 12–16px，pill 只用于小控件。
- 玻璃芯片用 `.glass-chip`（白底 0.72 + blur 12px，`@supports` 实底兜底）。
- 数字用 `.tnum`。不用文字渐变、不用 emoji 当图标（`src/editorial/icons.tsx` 1.5 stroke SVG）。
- 深色元素只出现在开源区的 ink 命令条。
- 区块容器统一 `mx-auto max-w-7xl px-6`，纵向节奏由 Home 的 sectionPad 单点控制。
- 文案唯一来源 `src/editorial/copy.ts`；AGENTS.md 文案与渲染密度规范适用全站。
