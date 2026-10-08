import { useEffect, useState } from "react";
import type { SiteSiteProps } from "../shared/site-types";
import type { EditorialCopy } from "./copy";
import { GITHUB } from "./copy";
import { Icon } from "./icons";
import { Showcase } from "./Showcase";
import { Models } from "./Models";
import { Pillars } from "./Pillars";
import { Downloads } from "./Downloads";
import { CloudShader } from "../effects/CloudShader";
import { TextGenerateEffect } from "../effects/TextGenerateEffect";
import { MovingBorderButton } from "../effects/MovingBorder";
import { BackgroundBeams } from "../effects/BackgroundBeams";

const PLATFORM_ICONS = ["laptop", "monitor", "terminal"] as const;

const sectionPad = "mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-32 md:pb-20";

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
        className="relative flex min-h-svh flex-col overflow-hidden bg-ground"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <CloudShader
            speed={0.6}
            count={6}
            className="mask-fade-b h-full w-full"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[72%] bg-[radial-gradient(58%_58%_at_50%_36%,rgb(255_255_255/0.6),transparent_75%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-1 flex-col items-center px-6 pt-[24vh] text-center md:pt-[26vh]">
          <div className="glass-chip inline-flex items-center gap-2.5 rounded-full border border-hairline px-4 py-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-ink">
              {releaseStatus === "ready" && release
                ? `v${release.version} ${copy.releaseStable}`
                : copy.releaseFallback}
            </span>
          </div>
          <p className="mt-3 text-[13px] text-muted">{copy.heroBadgeSub}</p>
          <h1
            id="hero-title"
            className="mt-8 text-[clamp(40px,7vw,76px)] leading-[1.06] font-semibold tracking-[-0.02em] text-ink"
          >
            <TextGenerateEffect
              words={copy.headlineTop}
              staggerDelay={0.05}
              className="block"
            />
            <TextGenerateEffect
              words={copy.headlineAccent}
              staggerDelay={0.05}
              className="block"
            />
          </h1>
          <p className="mt-6 max-w-[62ch] text-base leading-8 text-muted md:text-lg">
            {copy.heroLead}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MovingBorderButton
              as="a"
              href="#download"
              borderRadius="9999px"
              className="border-transparent bg-accent px-7 py-3 text-[15px] font-semibold text-white"
            >
              <span className="inline-flex items-center gap-2">
                <Icon name="download" size={16} />
                {copy.heroCtaPrimary}
              </span>
            </MovingBorderButton>
            <a
              href="#workbench"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-7 py-3 text-[15px] font-medium text-ink transition-colors hover:border-ink/25"
            >
              <Icon name="play" size={16} />
              {copy.heroCtaSecondary}
            </a>
          </div>
        </div>
        <div className="relative z-10 flex justify-center px-6 pt-16 pb-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="glass-chip tnum rounded-full border border-hairline px-3 py-1.5 font-mono text-[length:var(--fs-micro)] font-medium uppercase tracking-[0.12em] text-muted">
              {copy.agplChip}
            </span>
            {copy.platforms.map((platform, index) => (
              <span
                key={platform}
                className="glass-chip tnum inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-[length:var(--fs-micro)] font-medium text-muted"
              >
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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const onCopy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(copy.cloneCommand).catch(() => {});
    }
    setCopied(true);
  };

  return (
    <section
      aria-labelledby="oss-title"
      className="relative overflow-hidden bg-ground"
    >
      <BackgroundBeams />
      <div className="relative mx-auto max-w-3xl px-6 pt-28 pb-20 text-center md:pt-36 md:pb-24">
        <span className="font-mono text-[length:var(--fs-micro)] font-medium uppercase tracking-[0.2em] text-accent">
          {copy.ossOverline}
        </span>
        <h2
          id="oss-title"
          className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl"
        >
          {copy.ossTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
          {copy.ossBody}
        </p>
        <div className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-2xl bg-ink p-2 pl-5">
          <code className="min-w-0 flex-1 truncate text-left font-mono text-sm text-white/90">
            {copy.cloneCommand}
          </code>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/20"
          >
            <Icon name={copied ? "check" : "copy"} size={14} />
            {copied ? copy.copiedCommand : copy.copyCommand}
          </button>
        </div>
        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:border-accent/50"
        >
          <Icon name="star" size={15} />
          {copy.ossStar}
        </a>
      </div>
    </section>
  );
}
