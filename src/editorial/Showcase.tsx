import { useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { SiteLocale } from "../shared/site-types";
import type { EditorialCopy } from "./copy";

const CARD_SIZES = "(min-width: 1024px) 896px, calc(100vw - 48px)";

function srcSet(name: string, widths: number[]) {
  return widths.map((w) => `/product/${name}-${w}.webp ${w}w`).join(", ");
}

type Shot = {
  srcSet: string;
  fallback: string;
  width: number;
  height: number;
};

// 英文页使用英文界面截图（-en 后缀），其余与中文版同规格。
// 牌序：任务对话 → 模型市场 → 专家与技能 → 本机工作区，与 showcaseCards 一一对应。
function shots(locale: SiteLocale): Shot[] {
  const en = locale === "en" ? "-en" : "";
  const card = (name: string, widths: number[], width: number, height: number) => ({
    srcSet: srcSet(name, widths),
    fallback: `/product/${name}-${widths[1]}.webp`,
    width,
    height,
  });
  return [
    card(`zhiyuan-conversation${en}`, [976, 1464, 1952, 2440], 1464, 915),
    card(`zhiyuan-model-market${en}`, [976, 1464, 1952, 2440], 1464, 915),
    card(`zhiyuan-skills${en}`, [640, 1184, 1776, 2440], 1184, 740),
    locale === "en"
      ? card("zhiyuan-workspace-en", [640, 1184, 1776, 2440], 1184, 740)
      : card("zhiyuan-workspace", [640, 1184, 1352], 1184, 786),
  ];
}

// 滚动进度 → 牌堆进度 ff：ff = k 时第 k 张牌转正展示。停点之间用
// smoothstep 过渡，反向滚动严格倒放。site.css 的关键帧按同一张表烘焙，
// 两处必须同步修改。
const FF_STOPS: ReadonlyArray<readonly [number, number]> = [
  [0, -0.35],
  [0.08, -0.35],
  [0.2, 0],
  [0.3, 0],
  [0.42, 1],
  [0.5, 1],
  [0.62, 2],
  [0.7, 2],
  [0.82, 3],
  [1, 3],
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function ffAt(p: number) {
  for (let i = 0; i < FF_STOPS.length - 1; i++) {
    const [p0, v0] = FF_STOPS[i];
    const [p1, v1] = FF_STOPS[i + 1];
    if (p <= p1) {
      const t = clamp((p - p0) / (p1 - p0), 0, 1);
      return v0 + (v1 - v0) * (t * t * (3 - 2 * t));
    }
  }
  return FF_STOPS[FF_STOPS.length - 1][1];
}

// 牌的相对位置 q = 牌序 - ff：0 转正展示；q > 0 在牌堆中等待（向右下
// 扇形错位，绕底部轴心旋转）；q < 0 已展示完，上抬淡出。姿态全是 q 的纯函数。
function cardTransform(index: number, ff: number) {
  const q = index - ff;
  const c = clamp(q, 0, 3);
  const t = clamp(-q, 0, 1);
  const x = 4.8 * c + 7 * t;
  const y = 2.8 * c - 62 * t;
  const rotate = 3.8 * c - 8 * t;
  const scale = 1 - 0.05 * c - 0.05 * t;
  return `translate(${x.toFixed(2)}%, ${y.toFixed(2)}%) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
}

function cardOpacity(index: number, ff: number) {
  const q = index - ff;
  const c = clamp(q, 0, 3);
  const t = clamp(-q, 0, 1);
  // 退场透明度在 t = 0.5（转场前半段）处归零，与 site.css 的 -o 关键帧一致。
  return clamp(
    Math.min(1 - 0.2 * Math.max(0, c - 1.4), 1 - t / 0.5),
    0,
    1,
  );
}

// 说明文字只在对应牌转正前后出现，进从下方、出向上方。
function captionState(index: number, ff: number) {
  const d = ff - index;
  // 出：ff 越过 k 即开始，转场前 1/3 内完成；入：转场后 2/3 内浮入。
  const out = clamp(d / 0.36, 0, 1);
  const inn = clamp(-d / 0.35, 0, 1);
  const opacity = d >= 0 ? 1 - out : 1 - inn;
  const y = d >= 0 ? -14 * out : 10 * inn;
  return { opacity, transform: `translateY(${y.toFixed(2)}px)` };
}

function dotState(index: number, ff: number) {
  const on = 1 - clamp((Math.abs(ff - index) - 0.5) / 0.15, 0, 1);
  return {
    opacity: 0.3 + 0.7 * on,
    transform: `scale(${(0.75 + 0.25 * on).toFixed(3)})`,
  };
}

export function Showcase({
  copy,
  locale,
}: {
  copy: EditorialCopy;
  locale: SiteLocale;
}) {
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const assets = useMemo(() => shots(locale), [locale]);

  // 支持 animation-timeline 时由 CSS 滚动时间线在合成器线程驱动（见 site.css），
  // useScroll 只作为 Firefox 等尚不支持浏览器的 JS 回退。
  const native = useMemo(
    () =>
      typeof CSS !== "undefined" && CSS.supports("animation-timeline: scroll()"),
    [],
  );

  const cards = copy.showcaseCards;

  return (
    <section
      id="workbench"
      aria-labelledby="workbench-title"
      className="relative overflow-x-clip bg-ground"
    >
      <div className="mx-auto max-w-7xl px-6 pt-24 text-center md:pt-32">
        <span className="font-mono text-[length:var(--fs-micro)] font-medium uppercase tracking-[0.2em] text-accent">
          {copy.showcaseOverline}
        </span>
        <h2
          id="workbench-title"
          className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl"
        >
          {copy.showcaseTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
          {copy.showcaseLead}
        </p>
      </div>

      {reduce ? (
        <div className="mx-auto grid max-w-5xl gap-x-6 gap-y-10 px-6 pb-24 pt-14 sm:grid-cols-2 md:pb-32">
          {assets.map((shot, index) => (
            <figure key={shot.fallback}>
              <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_20px_60px_rgb(12_18_34/0.10)]">
                <img
                  src={shot.fallback}
                  srcSet={shot.srcSet}
                  sizes={CARD_SIZES}
                  alt={cards[index].alt}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3">
                <h3 className="text-sm font-semibold text-ink">
                  {cards[index].title}
                </h3>
                <p className="mt-1 text-[13px] leading-6 text-muted">
                  {cards[index].desc}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div ref={track} className="deck-track relative mt-8 h-[380vh] md:mt-12">
          <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-5 px-6 md:gap-7">
            <div className="pointer-events-none relative aspect-[8/5] h-[min(56svh,calc((100vw-3rem)*0.625))]">
              {assets.map((shot, index) => (
                <DeckCard
                  key={shot.fallback}
                  native={native}
                  progress={scrollYProgress}
                  index={index}
                  shot={shot}
                  alt={cards[index].alt}
                />
              ))}
            </div>
            <div className="relative h-24 w-full max-w-xl text-center md:h-20">
              {cards.map((caption, index) => (
                <DeckCaption
                  key={caption.title}
                  native={native}
                  progress={scrollYProgress}
                  index={index}
                  title={caption.title}
                  desc={caption.desc}
                />
              ))}
            </div>
            <div className="flex items-center gap-2" aria-hidden="true">
              {cards.map((caption, index) => (
                <DeckDot
                  key={caption.title}
                  native={native}
                  progress={scrollYProgress}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function DeckCard({
  native,
  progress,
  index,
  shot,
  alt,
}: {
  native: boolean;
  progress: MotionValue<number>;
  index: number;
  shot: Shot;
  alt: string;
}) {
  // 派生值直接算自 scrollYProgress，不做级联：motion 会把级联的纯
  // opacity/transform 派生值加速成进度口径不一致的 WAAPI 滚动动画。
  const transform = useTransform(progress, (p) => cardTransform(index, ffAt(p)));
  const opacity = useTransform(progress, (p) => cardOpacity(index, ffAt(p)));
  return (
    <motion.div
      className={`deck-card deck-card-${index} absolute inset-0 overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_24px_70px_rgb(12_18_34/0.12)]`}
      style={
        native
          ? { zIndex: 40 - index }
          : { zIndex: 40 - index, transform, opacity }
      }
    >
      <img
        src={shot.fallback}
        srcSet={shot.srcSet}
        sizes={CARD_SIZES}
        alt={alt}
        width={shot.width}
        height={shot.height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    </motion.div>
  );
}

function DeckCaption({
  native,
  progress,
  index,
  title,
  desc,
}: {
  native: boolean;
  progress: MotionValue<number>;
  index: number;
  title: string;
  desc: string;
}) {
  const opacity = useTransform(
    progress,
    (p) => captionState(index, ffAt(p)).opacity,
  );
  const transform = useTransform(
    progress,
    (p) => captionState(index, ffAt(p)).transform,
  );
  return (
    <motion.div
      className={`deck-caption-${index} absolute inset-x-0 top-0`}
      style={native ? undefined : { opacity, transform }}
    >
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-[13px] leading-6 text-muted">{desc}</p>
    </motion.div>
  );
}

function DeckDot({
  native,
  progress,
  index,
}: {
  native: boolean;
  progress: MotionValue<number>;
  index: number;
}) {
  const opacity = useTransform(progress, (p) => dotState(index, ffAt(p)).opacity);
  const transform = useTransform(
    progress,
    (p) => dotState(index, ffAt(p)).transform,
  );
  return (
    <motion.span
      className={`deck-dot-${index} size-1.5 rounded-full bg-accent`}
      style={native ? undefined : { opacity, transform }}
    />
  );
}
