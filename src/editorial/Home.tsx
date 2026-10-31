import { useEffect, useRef, useState } from "react";
import type { SiteSiteProps } from "../shared/site-types";
import type { EditorialCopy } from "./copy";
import { GITHUB } from "./copy";
import { Icon } from "./icons";
import { Showcase } from "./Showcase";
import { Models } from "./Models";
import { Pillars } from "./Pillars";
import { Downloads } from "./Downloads";

const PLATFORM_ICONS = ["laptop", "monitor", "terminal"] as const;

const sectionPad = "pt-24 pb-16 md:pt-28 md:pb-20";

const chipClass =
  "chip-quiet tnum inline-flex h-8 items-center gap-1.5 rounded-full border border-hairline px-3 text-[length:var(--fs-micro)] font-medium text-muted";

export function Home({
  copy,
  locale,
  release,
  releaseStatus,
  preferredPlatform,
}: SiteSiteProps & { copy: EditorialCopy }) {
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <section
        aria-labelledby="hero-title"
        className="border-b border-hairline bg-ground"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-28 pb-16 text-center md:pt-32 md:pb-20">
          <div className={`${chipClass} gap-2 px-4 text-sm text-ink`}>
            <span
              className="size-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="font-medium">
              {releaseStatus === "ready" && release
                ? `v${release.version} ${copy.releaseStable}`
                : copy.releaseFallback}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-5 text-muted">
            {copy.heroBadgeSub}
          </p>
          <h1 id="hero-title" className="mt-6 text-ink md:mt-8">
            <span
              className={`hero-editorial-lead block ${
                locale === "en"
                  ? "text-[clamp(28px,4.4vw,50px)] leading-[1.16] italic tracking-[0.01em]"
                  : "pl-[0.42em] text-[clamp(28px,4.2vw,48px)] leading-[1.22]"
              }`}
            >
              {copy.headlineTop}
            </span>
            <span
              className={`hero-accent-line hero-accent-static mt-2 block text-[clamp(40px,7vw,76px)] leading-[1.06] md:mt-3 ${
                locale === "en" ? "" : "pl-[0.36em]"
              }`}
            >
              {copy.headlineAccent}
            </span>
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-7 text-muted md:mt-6 md:text-[17px] md:leading-8">
            {copy.heroLead}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10">
            <a
              href="#download"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-black"
            >
              <Icon name="download" size={16} />
              {copy.heroCtaPrimary}
            </a>
            <a
              href="#workbench"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-ground px-6 py-2.5 text-[15px] font-medium text-ink transition-colors hover:border-ink/20 hover:bg-mist"
            >
              <Icon name="play" size={16} />
              {copy.heroCtaSecondary}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-12">
            <span className={chipClass}>{copy.agplChip}</span>
            {copy.platforms.map((platform, index) => (
              <span key={platform} className={chipClass}>
                <Icon name={PLATFORM_ICONS[index]} size={14} />
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Showcase copy={copy} locale={locale} />

      <div className="bg-mist">
        <div className={sectionPad}>
          <Models copy={copy} />
        </div>
      </div>

      <div className="bg-ground">
        <div className={sectionPad}>
          <Pillars copy={copy} />
        </div>
      </div>

      <div className="bg-mist">
        <div className={sectionPad}>
          <Downloads
            locale={locale}
            copy={copy}
            release={release}
            status={releaseStatus}
            preferredPlatform={preferredPlatform}
          />
        </div>
      </div>

      <OssSection copy={copy} />
    </main>
  );
}

function OssSection({ copy }: { copy: EditorialCopy }) {
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copying" | "copied" | "error"
  >("idle");
  const command = useRef<HTMLElement>(null);
  const copied = copyStatus === "copied";

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopyStatus("idle"), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const onCopy = async () => {
    setCopyStatus("copying");
    try {
      await navigator.clipboard.writeText(copy.cloneCommand);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
      if (command.current) {
        command.current.focus();
        const range = document.createRange();
        range.selectNodeContents(command.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  return (
    <section
      aria-labelledby="oss-title"
      className="border-t border-hairline bg-ground"
    >
      <div className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center md:pt-28 md:pb-20">
        <p className="text-[length:var(--fs-micro)] font-medium text-muted">
          {copy.ossOverline}
        </p>
        <h2
          id="oss-title"
          className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl"
        >
          {copy.ossTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
          {copy.ossBody}
        </p>
        <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-xl bg-ink p-2 pl-4 md:mt-10 md:pl-5">
          <code
            ref={command}
            tabIndex={-1}
            className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap py-2 text-left font-mono text-sm text-white/90 selection:bg-white selection:text-ink focus-visible:outline-white"
          >
            {copy.cloneCommand}
          </code>
          <button
            type="button"
            onClick={onCopy}
            disabled={copyStatus === "copying"}
            aria-busy={copyStatus === "copying"}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/16"
          >
            <Icon name={copied ? "check" : "copy"} size={14} />
            {copied ? copy.copiedCommand : copy.copyCommand}
          </button>
        </div>
        <p
          role="status"
          className="mx-auto mt-3 min-h-5 max-w-xl text-sm text-muted"
        >
          {copyStatus === "error"
            ? copy.copyFailedCommand
            : copied
              ? copy.copiedCommand
              : ""}
        </p>
        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-ground px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/20 hover:bg-mist"
        >
          <Icon name="star" size={15} />
          {copy.ossStar}
        </a>
      </div>
    </section>
  );
}
