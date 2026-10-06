import { useMemo, useRef, useState, type CSSProperties } from "react";
import {
  cubicBezier,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "../lib/utils";
import type { SiteLocale } from "../shared/site-types";
import type { EditorialCopy } from "./copy";

const EASE = cubicBezier(0.22, 1, 0.36, 1);

const MAIN_SIZES = "(min-width: 1024px) 976px, calc(100vw - 48px)";
const GRID_SIZES =
  "(min-width: 1280px) 604px, (min-width: 768px) calc(50vw - 36px), calc(100vw - 48px)";

function srcSet(name: string, widths: number[]) {
  return widths.map((w) => `/product/${name}-${w}.webp ${w}w`).join(", ");
}

// 英文页使用英文界面截图（-en 后缀），其余与中文版同规格。
function shots(locale: SiteLocale) {
  const en = locale === "en" ? "-en" : "";
  return {
    main: {
      srcSet: srcSet(`zhiyuan-model-market${en}`, [976, 1464, 1952, 2440]),
      fallback: `/product/zhiyuan-model-market${en}-1464.webp`,
      width: 1464,
      height: 915,
    },
    secondary: locale === "en"
      ? [
          {
            srcSet: srcSet("zhiyuan-workspace-en", [640, 1184, 1776, 2440]),
            fallback: "/product/zhiyuan-workspace-en-1184.webp",
            width: 1184,
            height: 740,
          },
          {
            srcSet: srcSet("zhiyuan-skills-en", [640, 1184, 1776, 2440]),
            fallback: "/product/zhiyuan-skills-en-1184.webp",
            width: 1184,
            height: 740,
          },
        ]
      : [
          {
            srcSet: srcSet("zhiyuan-workspace", [640, 1184, 1352]),
            fallback: "/product/zhiyuan-workspace-1184.webp",
            width: 1184,
            height: 786,
          },
          {
            srcSet: srcSet("zhiyuan-skills", [640, 1184, 1776, 2440]),
            fallback: "/product/zhiyuan-skills-1184.webp",
            width: 1184,
            height: 740,
          },
        ],
  };
}

const CARD_CLASS =
  "showcase-card overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_20px_60px_rgb(12_18_34/0.10)] will-change-transform";

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
  const assets = shots(locale);

  // 支持 animation-timeline 时由 CSS 滚动时间线在合成器线程驱动（见 site.css），
  // useScroll 只作为 Firefox 等尚不支持浏览器的 JS 回退。
  const native = useMemo(
    () =>
      typeof CSS !== "undefined" && CSS.supports("animation-timeline: scroll()"),
    [],
  );

  // 倾斜→转正在行程前 38% 内以指数缓出完成，之后停留；
  // 说明文字在停留段依次浮现。阴影保持静态，逐帧插值 box-shadow 会触发整帧重绘。
  const rotateX = useTransform(scrollYProgress, [0, 0.38], [16, 0], {
    ease: EASE,
  });
  const scale = useTransform(scrollYProgress, [0, 0.38], [0.94, 1], {
    ease: EASE,
  });
  const translateY = useTransform(scrollYProgress, [0, 0.38], [32, 0], {
    ease: EASE,
  });

  return (
    <section
      id="workbench"
      aria-labelledby="workbench-title"
      className="relative bg-ground"
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

      <div ref={track} className="showcase-track relative h-[190vh] md:h-[220vh]">
        <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-8 px-6 md:gap-10">
          <div className="w-full max-w-5xl" style={{ perspective: "1200px" }}>
            <motion.div
              style={
                native || reduce ? undefined : { rotateX, scale, y: translateY }
              }
              className={CARD_CLASS}
            >
              <img
                src={assets.main.fallback}
                srcSet={assets.main.srcSet}
                sizes={MAIN_SIZES}
                alt={copy.showcaseAltMain}
                width={assets.main.width}
                height={assets.main.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </motion.div>
          </div>
          <ol className="grid w-full max-w-5xl gap-5 sm:grid-cols-3 md:gap-6">
            {copy.showcaseCaptions.map((caption, index) => (
              <Caption
                key={caption.title}
                native={native}
                progress={scrollYProgress}
                index={index}
                reduce={reduce ?? false}
                title={caption.title}
                desc={caption.desc}
              />
            ))}
          </ol>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-2 md:pb-32">
        {assets.secondary.map((shot, index) => (
          <motion.figure
            key={shot.fallback}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="overflow-hidden rounded-xl border border-hairline bg-white">
              <img
                src={shot.fallback}
                srcSet={shot.srcSet}
                sizes={GRID_SIZES}
                alt={copy.showcaseShots[index].alt}
                width={shot.width}
                height={shot.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-[13px] text-muted">
              {copy.showcaseShots[index].label}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function Caption({
  native,
  progress,
  index,
  reduce,
  title,
  desc,
}: {
  native: boolean;
  progress: MotionValue<number>;
  index: number;
  reduce: boolean;
  title: string;
  desc: string;
}) {
  // JS 回退路径不用 useTransform：motion 会把纯 opacity/transform 的派生值加速成
  // WAAPI scroll-timeline 动画，其进度口径与 useScroll 的 JS 计算不一致，文字会提前出现。
  const [shown, setShown] = useState(false);
  useMotionValueEvent(progress, "change", (value) => {
    setShown(value >= 0.5 + index * 0.1);
  });

  if (native) {
    return (
      <li
        className="showcase-caption text-left"
        style={{ "--at": `${0.5 + index * 0.1}` } as CSSProperties}
      >
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-[13px] leading-6 text-muted">{desc}</p>
      </li>
    );
  }

  return (
    <li
      className={cn(
        "text-left transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
        shown || reduce ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-[13px] leading-6 text-muted">{desc}</p>
    </li>
  );
}
