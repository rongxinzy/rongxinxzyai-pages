import { useEffect, useState } from "react";
import type { EditorialCopy } from "../editorial/copy";
import { GITHUB } from "../editorial/copy";
import { cn } from "../lib/utils";
import { findFragmentTarget } from "../shared/site-navigation";
import type { SiteLocale } from "../shared/site-types";
import roadmapData from "../../data/roadmap/desktop.json";
import type { RoadmapFile, RoadmapItem, RoadmapMilestone } from "./types";

const roadmap = roadmapData as RoadmapFile;
const STAR_ENDPOINT = "https://api.github.com/repos/rongxinzy/RongxinAI";

function localized(locale: SiteLocale, zh: string, en?: string) {
  return locale === "en" && en ? en : zh;
}

function referenceNumber(url: string) {
  const match = /\/(?:pull|issues)\/(\d+)$/.exec(url);
  return match ? match[1] : "";
}

function formatDate(iso: string, locale: SiteLocale) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match || locale !== "en") return iso;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function visibleItems(items: RoadmapItem[]) {
  return items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      if (a.item.date === b.item.date) return b.index - a.index;
      return a.item.date < b.item.date ? 1 : -1;
    })
    .map(({ item }) => item);
}

function milestoneStatus(done: number, total: number, copy: EditorialCopy) {
  if (total > 0 && done === total) return copy.roadmapDone;
  if (done === 0) return copy.roadmapPlanned;
  return copy.roadmapActive;
}

function GitHubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.11-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function GitHubStarButton({ locale, copy }: { locale: SiteLocale; copy: EditorialCopy }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6000);

    async function loadStars() {
      try {
        const response = await fetch(STAR_ENDPOINT, {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload: unknown = await response.json();
        if (
          typeof payload === "object" &&
          payload !== null &&
          "stargazers_count" in payload &&
          typeof payload.stargazers_count === "number" &&
          Number.isFinite(payload.stargazers_count) &&
          payload.stargazers_count >= 0
        ) {
          setCount(payload.stargazers_count);
        }
      } catch {
        // The button still opens the repository when the count cannot be loaded.
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void loadStars();
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const label =
    count === null
      ? copy.roadmapStarAria
      : copy.roadmapStarCountAria.replace("{count}", count.toLocaleString(locale));

  return (
    <a className="roadmap-star inline-flex shrink-0 items-stretch overflow-hidden rounded-full text-sm font-medium shadow-[0_1px_2px_rgb(9_13_22/0.2),0_8px_24px_rgb(9_13_22/0.12)] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0" href={GITHUB} aria-label={label}>
      <span className="inline-flex items-center gap-2 px-4 py-2.5">
        <GitHubMark />
        {copy.roadmapStar}
      </span>
      {count !== null ? (
        <span className="roadmap-star-count tnum inline-flex items-center px-3.5">
          {count.toLocaleString(locale)}
        </span>
      ) : null}
    </a>
  );
}

function Milestone({
  milestone,
  locale,
  copy,
}: {
  milestone: RoadmapMilestone;
  locale: SiteLocale;
  copy: EditorialCopy;
}) {
  const items = visibleItems(milestone.items);
  const done = items.filter((item) => item.done).length;
  const total = items.length;
  const progress = total === 0 ? 0 : done / total;
  const title = localized(locale, milestone.title, milestone.titleEn);
  const status = milestoneStatus(done, total, copy);

  return (
    <article id={milestone.id} className="scroll-mt-24 rounded-2xl border border-hairline bg-ground px-5 py-6 md:px-8 md:py-8">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">{title}</h2>
          <p className="text-[13px] text-muted">{status}</p>
        </div>
        <div>
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <p className="text-[13px] text-muted">{copy.roadmapProgress}</p>
            <p className="tnum text-sm text-ink">
              {done}
              <span className="text-muted"> / {total}</span>
            </p>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-ink/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={done}
            aria-label={`${title} ${done} / ${total}`}
          >
            <div
              className="roadmap-progress-fill h-full w-full rounded-full bg-accent-2 motion-reduce:transition-none"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>
      </header>
      <ol className="mt-6">
        {items.map((item) => {
          const number = referenceNumber(item.url);
          const text = localized(locale, item.text, item.textEn);
          return (
            <li key={`${item.url}-${item.date}`} className="roadmap-entry relative grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3 pb-6 last:pb-0">
              <span className="relative flex justify-center" aria-hidden="true">
                <span className="roadmap-rail absolute -bottom-6 top-2 left-1/2 w-0.5 -translate-x-1/2 bg-ink/40" />
                <span
                  className={cn(
                    "relative z-10 mt-1.5 size-2.5 rounded-full border-2 border-ink",
                    item.done ? "bg-ink" : "bg-ground",
                  )}
                />
              </span>
              <a
                className="group min-w-0 rounded-lg outline-offset-4"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <time className="tnum text-[13px] text-muted" dateTime={item.date}>
                    {formatDate(item.date, locale)}
                  </time>
                  {item.done ? null : (
                    <span className="rounded-full border border-hairline px-2 py-0.5 text-[13px] leading-5 text-muted">
                      {copy.roadmapActive}
                    </span>
                  )}
                  {number ? (
                    <span className="font-mono text-[13px] text-muted group-hover:text-ink">#{number}</span>
                  ) : null}
                </span>
                <span className="mt-1 block text-sm leading-6 text-ink group-hover:underline md:text-base md:leading-7">
                  {text}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </article>
  );
}

export function RoadmapPage({ locale, copy }: { locale: SiteLocale; copy: EditorialCopy }) {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      findFragmentTarget()?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [locale]);

  return (
    <main id="main" className="site-main bg-ground" tabIndex={-1}>
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-28 md:px-6 md:pt-32">
        <header>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[length:var(--fs-micro)] font-medium uppercase tracking-[0.18em] text-muted">
                {copy.roadmapBadge}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">
                {copy.roadmapTitle}
              </h1>
            </div>
            <GitHubStarButton locale={locale} copy={copy} />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{copy.roadmapLead}</p>
        </header>
        <div className="mt-12 flex flex-col gap-5">
          {roadmap.milestones.map((milestone) => (
            <Milestone key={milestone.id} milestone={milestone} locale={locale} copy={copy} />
          ))}
        </div>
      </div>
    </main>
  );
}
