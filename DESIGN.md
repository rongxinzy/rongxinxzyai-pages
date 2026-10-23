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

TextGenerateEffect（首屏大标题逐词浮现）、MovingBorderButton（主 CTA 边框光束）、Showcase（第二屏客户端交互演示）、CardSpotlight（模型/原则卡 hover 光斑）、TracingBeam（企业页交付流程）、BackgroundBeams（OSS/联系区衬底）、InfiniteMovingCards、AuroraBackground、BentoGrid。

### 客户端交互演示

- 官网外壳继续使用本站 token；iframe 内运行真实客户端 App、共享组件、主题 CSS 和动效，通过浏览器 mock bridge 替换 Electron preload。禁止重新描画客户端或给静态 DOM 补点击脚本。
- 演示使用一个 iframe，功能切换使用客户端侧栏，不增加外层场景标签页。滚动到演示窗口时自动启动客户端粒子动画，随后显示会话骨架与示例会话；不再显示开始或全屏按钮。重置恢复初始数据，加载失败可重试。
- 演示有明确的示例数据标记。安装与任务回复在浏览器内模拟，不连接模型、账户或本地文件系统。
- 案例缩略图复用客户端 WebP 与懒加载，缺失资源在构建时拦截。运行期操作失败只在外壳显示非阻断提示；启动超时保留加载并提供重试，整屏失败仅用于启动或 React 根渲染失败。
- 网页预览不提供退出登录、系统窗口控制、本地运行环境、网络访问、模型目录、开机启动、休眠、系统代理、数据库备份或桌宠设置入口。其余控件沿用客户端组件；系统操作与真实连接返回受控拒绝，不能伪造成功。模型启停、删除、重装与参数保存只改变内存数据，必须保持客户端返回结构和列表状态完整。
- 手机不压缩客户端文字，窗口内部横向滚动。窗口下方说明在桌面端使用整行可用宽度，移动端自然换行。减少动态效果时仍提供全部交互。
- 外壳文案集中在 `src/editorial/copy.ts`，客户端内部沿用客户端 i18n。原图集数据由构建脚本提取；操作结果使用正常产品文案，示例标记只放在 iframe 外。

## 规则

- 一次海拔：hairline 边或柔和阴影（`0 20px 60px rgb(12 18 34 / 0.10)`）二选一，不叠加。卡片圆角 12–16px，pill 只用于小控件。
- 玻璃芯片用 `.glass-chip`（白底 0.72 + blur 12px，`@supports` 实底兜底）。
- 数字用 `.tnum`。不用文字渐变、不用 emoji 当图标（`src/editorial/icons.tsx` 1.5 stroke SVG）。
- 深色元素只出现在开源区的 ink 命令条。
- 区块容器统一 `mx-auto max-w-7xl px-6`，纵向节奏由 Home 的 sectionPad 单点控制。
- 文案唯一来源 `src/editorial/copy.ts`；AGENTS.md 文案与渲染密度规范适用全站。
