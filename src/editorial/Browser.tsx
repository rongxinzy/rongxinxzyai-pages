import { useEffect } from "react";
import { findFragmentTarget } from "../shared/site-navigation";
import type { SiteLocale } from "../shared/site-types";
import type { EditorialCopy } from "./copy";
import { Icon } from "./icons";
import { CloudShader } from "../effects/CloudShader";
import { CardSpotlight } from "../effects/CardSpotlight";
import { cn } from "../lib/utils";

const FEATURE_ICONS = ["laptop", "shield", "swap-calls"] as const;
const PLATFORM_ICONS = {
  windows: "windows",
  macos: "apple",
  linux: "linux",
} as const;

export const EGO_LITE_URL = "https://github.com/citrolabs/ego-lite";
export const CHROMIUM_LICENSE_URL =
  "https://www.chromium.org/chromium-projects/";

const sectionPad = "mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-28 md:pb-20";

const overline =
  "font-mono text-[length:var(--fs-micro)] font-medium uppercase tracking-[0.2em] text-accent";

const sectionTitle =
  "mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl";

export function Browser({
  copy,
  locale,
}: {
  copy: EditorialCopy;
  locale: SiteLocale;
}) {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      findFragmentTarget()?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [locale]);

  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <section
        aria-labelledby="browser-title"
        className="relative flex min-h-[62vh] flex-col overflow-hidden bg-ground"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <CloudShader
            speed={0.35}
            count={4}
            className="mask-fade-b h-full w-full opacity-80"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(56%_56%_at_50%_42%,rgb(255_255_255/0.6),transparent_75%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-28 pb-16 text-center md:pb-20">
          <span className="glass-chip rounded-full border border-hairline px-4 py-1.5 font-mono text-[length:var(--fs-micro)] font-medium uppercase tracking-[0.18em] text-muted">
            {copy.browserBadge}
          </span>
          <h1
            id="browser-title"
            className="mt-8 text-[clamp(32px,5.5vw,52px)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink"
          >
            {copy.browserTitle}
          </h1>
          <p className="mt-4 max-w-[28ch] text-lg leading-8 text-muted md:text-xl">
            {copy.browserSlogan}
          </p>
          <div className="mt-8">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-hairline bg-mist px-7 py-3 text-[15px] font-semibold text-muted shadow-none"
            >
              <Icon name="download" size={16} />
              {copy.browserCta}
            </button>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-6 text-muted">
            {copy.browserHeroNote}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="browser-features-title"
        className="border-t border-hairline bg-mist"
      >
        <div className={`${sectionPad} pt-16 md:pt-20`}>
          <span className={overline}>{copy.browserFeaturesOverline}</span>
          <h2 id="browser-features-title" className={sectionTitle}>
            {copy.browserFeaturesTitle}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.browserFeatures.map((feature, index) => (
              <CardSpotlight key={feature.title} className="h-full">
                <div className="flex h-full flex-col p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ground text-accent">
                    <Icon name={FEATURE_ICONS[index]} size={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.body}
                  </p>
                </div>
              </CardSpotlight>
            ))}
          </div>
        </div>
      </section>

      <section
        id="platforms"
        aria-labelledby="browser-platforms-title"
        className="bg-ground"
      >
        <div className={sectionPad}>
          <span className={overline}>{copy.browserPlatformsOverline}</span>
          <h2 id="browser-platforms-title" className={sectionTitle}>
            {copy.browserPlatformsTitle}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {copy.browserPlatforms.map((platform) => {
              const icon = PLATFORM_ICONS[platform.id];
              const disabled = platform.id === "linux";
              return (
                <div
                  key={platform.id}
                  className={cn(
                    "flex flex-col rounded-2xl border border-hairline bg-white p-6 shadow-[0_1px_2px_rgb(9_13_22/0.04)]",
                    disabled && "opacity-55",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-ink">
                      <Icon name={icon} size={20} />
                    </span>
                    <div className="text-left">
                      <p className="font-medium text-ink">{platform.name}</p>
                      <p className="text-sm text-muted">{platform.detail}</p>
                    </div>
                  </div>
                  {disabled ? (
                    <p className="mt-6 text-sm font-medium text-muted">
                      {platform.action}
                    </p>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="mt-6 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-hairline bg-mist px-4 py-2.5 text-sm font-medium text-muted"
                    >
                      {platform.action}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="browser-setup-title"
        className="border-t border-hairline bg-mist"
      >
        <div className={`${sectionPad} max-w-3xl`}>
          <h2 id="browser-setup-title" className="text-xl font-semibold text-ink">
            {copy.browserSetupTitle}
          </h2>
          <p className="mt-3 text-base leading-8 text-muted">
            {copy.browserSetupBodyBeforeLink}
            <a
              href={EGO_LITE_URL}
              className="text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-accent"
              rel="noopener noreferrer"
              target="_blank"
            >
              {copy.browserSetupLinkLabel}
            </a>
            {copy.browserSetupBodyAfterLink}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="browser-oss-title"
        className="border-t border-hairline bg-ground"
      >
        <div className={sectionPad}>
          <span className={overline}>{copy.browserOssOverline}</span>
          <h2 id="browser-oss-title" className={sectionTitle}>
            {copy.browserOssTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            {copy.browserOssBodyBeforeEgo}
            <a
              href={EGO_LITE_URL}
              className="text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-accent"
              rel="noopener noreferrer"
              target="_blank"
            >
              ego-lite
            </a>
            {copy.browserOssBodyMid}
            <a
              href={CHROMIUM_LICENSE_URL}
              className="text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-accent"
              rel="noopener noreferrer"
              target="_blank"
            >
              Chromium
            </a>
            {copy.browserOssBodyAfter}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="browser-faq-title"
        className="border-t border-hairline bg-mist"
      >
        <div className={`${sectionPad} pb-24 md:pb-28`}>
          <h2 id="browser-faq-title" className={sectionTitle}>
            {copy.browserFaqTitle}
          </h2>
          <dl className="mt-8 max-w-3xl divide-y divide-hairline">
            {copy.browserFaq.map((item) => (
              <div key={item.q} className="py-6 first:pt-0">
                <dt className="text-base font-medium text-ink">{item.q}</dt>
                <dd className="mt-2 text-sm leading-7 text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
