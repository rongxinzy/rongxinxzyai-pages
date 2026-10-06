import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "motion/react";
import type { SiteLocale } from "../shared/site-types";
import type { EditorialCopy } from "./copy";

gsap.registerPlugin(ScrollTrigger);

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

// 轨道停点：滚动进度（时间轴单位 0–100）→ 牌堆进度 ff。
// ff = k 时第 k 张牌转正展示；ff 起始于 -0.35，首张牌以轻微扇形姿态入场。
// 停驻段刻意压短（6 单位）：钉住期间画面静止的滚动太长会读成卡顿。
const STOPS = [0, 4, 20, 26, 42, 48, 64, 70, 86, 92, 100];
const FF = [-0.35, -0.35, 0, 0, 1, 1, 2, 2, 3, 3, 3];

// 透明度停点在每段转场的中点（ff = k + 0.5）处插入：退场牌在转场前半段
// 内完全淡出，避免半透明残影盖住下一张。
const O_STOPS = [0, 4, 20, 26, 34, 42, 48, 56, 64, 70, 78, 86, 100];
const O_FF = [-0.35, -0.35, 0, 0, 0.5, 1, 1, 1.5, 2, 2, 2.5, 3, 3];

// 转场段（ff 发生变化的区间），供说明文字与进度点定位。
const SEGMENTS = [
  [4, 20],
  [26, 42],
  [48, 64],
  [70, 86],
] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

// 牌的相对位置 q = 牌序 - ff：0 转正展示；q > 0 在牌堆中等待（向右下
// 扇形错位，绕底部轴心旋转）；q < 0 已展示完，上抬淡出。姿态全是 q 的纯函数。
function cardPose(index: number, ff: number) {
  const q = index - ff;
  const c = clamp(q, 0, 3);
  const t = clamp(-q, 0, 1);
  return {
    xPercent: 4.8 * c + 7 * t,
    yPercent: 2.8 * c - 62 * t,
    rotation: 3.8 * c - 8 * t,
    scale: 1 - 0.05 * c - 0.05 * t,
  };
}

function cardOpacity(index: number, ff: number) {
  const q = index - ff;
  const c = clamp(q, 0, 3);
  const t = clamp(-q, 0, 1);
  return clamp(Math.min(1 - 0.2 * Math.max(0, c - 1.4), 1 - t / 0.5), 0, 1);
}

export function Showcase({
  copy,
  locale,
}: {
  copy: EditorialCopy;
  locale: SiteLocale;
}) {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const assets = useMemo(() => shots(locale), [locale]);
  const cards = copy.showcaseCards;

  useLayoutEffect(() => {
    if (reduce) return;
    // Lenis 把滚轮的阶梯式输入插值成连续滚动，scrub 动画才能拿到平滑进度；
    // 由 gsap.ticker 驱动并与 ScrollTrigger 同步。scrub 只留 0.3 追帧，
    // 避免与 Lenis 的惯性叠加成双重迟滞。
    const lenis = new Lenis({ lerp: 0.11 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".deck-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      gsap.utils.toArray<HTMLElement>(".deck-card").forEach((el, i) => {
        gsap.set(el, cardPose(i, FF[0]));
        tl.to(
          el,
          {
            keyframes: STOPS.slice(1).map((p, k) => ({
              ...cardPose(i, FF[k + 1]),
              duration: p - STOPS[k],
              ease: FF[k + 1] === FF[k] ? "none" : "power2.inOut",
            })),
          },
          0,
        );
        tl.to(
          el,
          {
            keyframes: O_STOPS.slice(1).map((p, k) => ({
              opacity: cardOpacity(i, O_FF[k + 1]),
              duration: p - O_STOPS[k],
              ease: "none",
            })),
          },
          0,
        );
      });

      const captions = gsap.utils.toArray<HTMLElement>(".deck-caption");
      captions.forEach((el, i) => {
        gsap.set(el, i === 0 ? { autoAlpha: 1, y: 0 } : { autoAlpha: 0, y: 10 });
        // 入：对应牌转正的转场段后 2/5 内浮入；出：下一段转场的前 1/3 内离场。
        if (i > 0) {
          const [start] = SEGMENTS[i];
          tl.fromTo(
            el,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 6.4, ease: "power2.out" },
            start + 9.6,
          );
        }
        if (i < SEGMENTS.length - 1) {
          tl.to(
            el,
            { autoAlpha: 0, y: -14, duration: 5.3, ease: "power2.in" },
            SEGMENTS[i + 1][0],
          );
        }
      });

      const dots = gsap.utils.toArray<HTMLElement>(".deck-dot");
      dots.forEach((el, i) => {
        gsap.set(el, i === 0 ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.75 });
        // 激活态在对应转场段中点切换，与 |ff - i| < 0.5 的口径一致。
        if (i > 0) {
          tl.to(
            el,
            { opacity: 1, scale: 1, duration: 2.4, ease: "power1.out" },
            (SEGMENTS[i][0] + SEGMENTS[i][1]) / 2 - 1.2,
          );
        }
        if (i < SEGMENTS.length - 1) {
          tl.to(
            el,
            { opacity: 0.3, scale: 0.75, duration: 2.4, ease: "power1.in" },
            (SEGMENTS[i + 1][0] + SEGMENTS[i + 1][1]) / 2 - 1.2,
          );
        }
      });
    }, section);
    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduce, locale]);

  return (
    <section
      ref={section}
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
        <div className="deck-track relative mt-8 h-[330vh] md:mt-12">
          <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-5 px-6 md:gap-7">
            <div className="pointer-events-none relative aspect-[8/5] h-[min(56svh,calc((100vw-3rem)*0.625))]">
              {assets.map((shot, index) => (
                <div
                  key={shot.fallback}
                  className="deck-card absolute inset-0 overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_24px_70px_rgb(12_18_34/0.12)]"
                  style={{ zIndex: 40 - index }}
                >
                  <img
                    src={shot.fallback}
                    srcSet={shot.srcSet}
                    sizes={CARD_SIZES}
                    alt={cards[index].alt}
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
            <div className="relative h-24 w-full max-w-xl text-center md:h-20">
              {cards.map((caption) => (
                <div
                  key={caption.title}
                  className="deck-caption absolute inset-x-0 top-0"
                >
                  <h3 className="text-base font-semibold text-ink">
                    {caption.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-6 text-muted">
                    {caption.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2" aria-hidden="true">
              {cards.map((caption) => (
                <span
                  key={caption.title}
                  className="deck-dot size-1.5 rounded-full bg-accent"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
