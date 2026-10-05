import type { SiteLocale } from "../shared/site-types";
import type { EditorialCopy } from "./copy";
import { Icon } from "./icons";
import { CloudShader } from "../effects/CloudShader";
import { TextGenerateEffect } from "../effects/TextGenerateEffect";
import { MovingBorderButton } from "../effects/MovingBorder";
import { CardSpotlight } from "../effects/CardSpotlight";
import { TracingBeam } from "../effects/TracingBeam";
import { BackgroundBeams } from "../effects/BackgroundBeams";

const ARCH_ICONS = ["person", "dataset", "shield"] as const;

const sectionPad = "mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-28 md:pb-20";

const overline =
  "font-mono text-[length:var(--fs-micro)] font-medium uppercase tracking-[0.2em] text-accent";

const sectionTitle =
  "mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl";

export function Enterprise({
  copy,
  locale,
}: {
  copy: EditorialCopy;
  locale: SiteLocale;
}) {
  const en = locale === "en";
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <section
        aria-labelledby="enterprise-title"
        className="relative flex min-h-[70vh] flex-col overflow-hidden bg-ground"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <CloudShader
            speed={0.5}
            count={5}
            className="mask-fade-b h-full w-full"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[72%] bg-[radial-gradient(56%_56%_at_50%_42%,rgb(255_255_255/0.65),transparent_75%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-28 pb-20 text-center">
          <span className="glass-chip rounded-full border border-hairline px-4 py-1.5 font-mono text-[length:var(--fs-micro)] font-medium uppercase tracking-[0.18em] text-muted">
            Enterprise / Teams
          </span>
          <h1
            id="enterprise-title"
            className="mt-8 text-[clamp(36px,6vw,64px)] leading-[1.08] font-semibold tracking-[-0.02em] text-ink"
          >
            <TextGenerateEffect
              words={copy.enterpriseTitle[0]}
              staggerDelay={0.05}
              className="block"
            />
            <TextGenerateEffect
              words={copy.enterpriseTitle[1]}
              staggerDelay={0.05}
              className="block"
            />
          </h1>
          <p className="mt-6 max-w-[62ch] text-base leading-8 text-muted md:text-lg">
            {copy.enterpriseLead}
          </p>
          <div className="mt-10">
            <MovingBorderButton
              as="a"
              href="#contact"
              borderRadius="9999px"
              className="border-transparent bg-accent px-7 py-3 text-[15px] font-semibold text-white"
            >
              <span className="inline-flex items-center gap-2">
                {copy.contactAction}
                <Icon name="arrow-forward" size={16} />
              </span>
            </MovingBorderButton>
          </div>
        </div>
      </section>

      <section aria-labelledby="architecture-title" className="bg-ground">
        <div className={sectionPad}>
          <h2 id="architecture-title" className={sectionTitle}>
            {copy.architectureTitle}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {copy.architecture.map((row, index) => (
              <CardSpotlight key={row.title} className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-mist text-accent">
                  <Icon name={ARCH_ICONS[index]} size={20} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-ink">
                  {row.title}
                </h3>
                <p className="mt-2 font-mono text-[length:var(--fs-micro)] leading-6 text-muted">
                  {row.items}
                </p>
              </CardSpotlight>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="delivery-title" className="bg-mist">
        <div className={sectionPad}>
          <span className={overline}>{copy.deliveryOverline}</span>
          <h2 id="delivery-title" className={sectionTitle}>
            {copy.deliveryTitle}
          </h2>
          <TracingBeam className="mt-12">
            <ol className="space-y-12 pb-4 pl-6">
              {copy.delivery.map((step, index) => (
                <li key={step.title}>
                  <span
                    className="tnum font-mono text-sm font-medium text-accent"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </TracingBeam>
        </div>
      </section>

      <section aria-labelledby="comparison-title" className="bg-ground">
        <div className={sectionPad}>
          <span className={overline}>{copy.comparisonOverline}</span>
          <h2 id="comparison-title" className={sectionTitle}>
            {copy.comparisonTitle}
          </h2>
          <p className="mt-3 text-[13px] text-muted md:hidden">
            {copy.comparisonHint}
          </p>
          <div
            className="mt-10 overflow-x-auto rounded-2xl border border-hairline bg-white"
            tabIndex={0}
            role="region"
            aria-label={copy.comparisonTitle}
          >
            <table className="tnum w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-mist">
                  {copy.headers.map((label) => (
                    <th
                      key={label}
                      scope="col"
                      className="px-5 py-3.5 text-[13px] font-medium text-muted"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.comparison.map((row) => (
                  <tr key={row[0]} className="border-t border-hairline">
                    <th
                      scope="row"
                      className="px-5 py-4 font-medium text-ink"
                    >
                      {row[0]}
                    </th>
                    <td className="px-5 py-4 text-muted">{row[1]}</td>
                    <td className="px-5 py-4 text-muted">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="bg-mist">
        <div className={sectionPad}>
          <div className="relative overflow-hidden rounded-2xl border border-hairline bg-white">
            <BackgroundBeams />
            <div className="relative grid gap-10 p-8 md:grid-cols-[1.1fr_1fr] md:p-12">
              <div>
                <span className={overline}>{copy.contactOverline}</span>
                <h2 id="contact-title" className={sectionTitle}>
                  {copy.contactTitle}
                </h2>
                <p className="mt-4 max-w-md text-base leading-7 text-muted">
                  {copy.contactBody}
                </p>
                <a
                  href="mailto:likeran@rongxinzy.com"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-sm font-medium text-accent transition-colors hover:text-accent-2"
                >
                  likeran@rongxinzy.com
                  <Icon name="arrow-forward" size={14} />
                </a>
                <p className="mt-8 max-w-md text-[13px] leading-6 text-muted">
                  {copy.scope}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  en
                    ? "/zhiyuan-community-qr.png"
                    : "/zhiyuan-community-qr.png",
                  "/zhiyuan-official-qr.png",
                ].map((src, index) => (
                  <figure
                    key={src}
                    className="flex flex-col items-center justify-center rounded-2xl border border-hairline bg-white p-5"
                  >
                    <img
                      src={src}
                      width="136"
                      height="136"
                      alt={copy.qr[index]}
                      loading="lazy"
                      className="h-auto w-full max-w-36"
                    />
                    <figcaption className="mt-3 text-[13px] text-muted">
                      {copy.qr[index]}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
