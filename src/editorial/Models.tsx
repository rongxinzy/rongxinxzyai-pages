import type { EditorialCopy } from "./copy";
import { Icon } from "./icons";
import { CardSpotlight } from "../effects/CardSpotlight";

const STATUS_META = {
  installed: { dot: "bg-emerald-500", text: "text-emerald-700" },
  fetch: { dot: "bg-accent", text: "text-accent" },
  light: { dot: "bg-sky-500", text: "text-sky-700" },
} as const;

export function Models({ copy }: { copy: EditorialCopy }) {
  return (
    <section
      className="mx-auto max-w-7xl px-6"
      id="models"
      aria-labelledby="models-title"
    >
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="font-mono text-[var(--fs-micro)] tracking-[0.18em] text-accent uppercase">
            {copy.modelsOverline}
          </span>
          <h2
            id="models-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            {copy.modelsTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            {copy.modelsLead}
          </p>
        </div>
        <div className="w-full max-w-xs shrink-0 rounded-2xl border border-hairline bg-white p-5">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[var(--fs-micro)] text-muted">
              {copy.monitorLabel}
            </span>
            <span className="tnum font-mono text-sm text-ink">
              {copy.monitorValue}
            </span>
          </div>
          <div
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist"
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
              style={{ width: "26%" }}
            />
          </div>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[var(--fs-micro)] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {copy.monitorState}
          </span>
        </div>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {copy.modelCards.map((card) => {
          const status = STATUS_META[card.status];
          return (
            <CardSpotlight key={card.chip} className="h-full">
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-mist px-2.5 py-1 font-mono text-[var(--fs-micro)] text-muted">
                    {card.chip}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[var(--fs-micro)] font-medium ${status.text}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                    />
                    {card.statusText}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {card.desc}
                </p>
                <dl className="mt-auto pt-6">
                  <div className="divide-y divide-hairline border-y border-hairline">
                    {card.specs.map((spec) => (
                      <div
                        className="flex items-baseline justify-between gap-4 py-2.5"
                        key={spec.key}
                      >
                        <dt className="text-[13px] text-muted">{spec.key}</dt>
                        <dd className="tnum text-right font-mono text-[13px] text-ink">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </div>
                </dl>
              </div>
            </CardSpotlight>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-hairline bg-mist p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <span className="font-mono text-[var(--fs-micro)] tracking-[0.18em] text-accent uppercase">
              {copy.benchLabel}
            </span>
            <h4 className="mt-3 text-lg font-semibold text-ink">
              {copy.benchTitle}
            </h4>
            <p className="mt-2 text-sm text-muted">{copy.benchNote}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3 py-1.5 text-[var(--fs-micro)] font-medium text-accent">
              <Icon name="memory" size={14} />
              {copy.benchFlag}
            </span>
          </div>
          <div>
            <div className="tnum flex items-baseline justify-between gap-4 font-mono text-[13px]">
              <span className="text-ink">{copy.benchCurrent}</span>
              <span className="text-muted">{copy.benchMax}</span>
            </div>
            <div
              className="relative mt-4 h-1.5 rounded-full bg-hairline"
              aria-hidden="true"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                style={{ width: "12.5%" }}
              />
              <div
                className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-white"
                style={{ left: "12.5%" }}
              />
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-hairline pt-4 text-[var(--fs-micro)] text-muted">
          {copy.modelsNote}
        </p>
      </div>
    </section>
  );
}
