import type { EditorialCopy } from "./copy";
import { Icon } from "./icons";
import { CardSpotlight } from "../effects/CardSpotlight";

const PILLAR_ICONS = ["folder", "swap-calls", "shield"] as const;
const PILLAR_FOOT_ICONS = ["shield-check", "key", "rule"] as const;

export function Pillars({ copy }: { copy: EditorialCopy }) {
  return (
    <section
      className="mx-auto max-w-7xl px-6"
      id="local-models"
      aria-labelledby="pillars-title"
    >
      <div className="max-w-2xl">
        <span className="font-mono text-[var(--fs-micro)] tracking-[0.18em] text-accent uppercase">
          {copy.pillarsOverline}
        </span>
        <h2
          id="pillars-title"
          className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl"
        >
          {copy.pillarsTitle}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {copy.pillarsLead}
        </p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {copy.principles.map((principle, index) => (
          <CardSpotlight key={principle.title} className="h-full">
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-accent">
                  <Icon name={PILLAR_ICONS[index]} size={22} />
                </span>
                <span className="font-mono text-[var(--fs-micro)] text-muted">
                  PRINCIPLE 0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink">
                {principle.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {principle.body}
              </p>
              <div className="mt-auto pt-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-2/10 px-3 py-1.5 font-mono text-[var(--fs-micro)] text-sky-700">
                  <Icon name={PILLAR_FOOT_ICONS[index]} size={14} />
                  {principle.foot}
                </span>
              </div>
            </div>
          </CardSpotlight>
        ))}
      </div>
    </section>
  );
}
