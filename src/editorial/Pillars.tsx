import type { EditorialCopy } from "./copy";
import { Icon } from "./icons";

const PILLAR_ICONS = ["folder", "swap-calls", "shield"] as const;
const PILLAR_TONES = ["primary", "secondary", "tertiary"] as const;
const PILLAR_FOOT_ICONS = ["shield-check", "key", "rule"] as const;

export function Pillars({ copy }: { copy: EditorialCopy }) {
  return (
    <section
      className="wrap section-space"
      id="local-models"
      aria-labelledby="pillars-title"
    >
      <div className="pillars-head">
        <span className="overline overline-secondary">
          {copy.pillarsOverline}
        </span>
        <h2 id="pillars-title" className="t-headline-lg">
          {copy.pillarsTitle}
        </h2>
        <p className="module-lead t-body-lg">{copy.pillarsLead}</p>
      </div>
      <div className="pillar-grid">
        {copy.principles.map((principle, index) => (
          <article className="pillar-card" key={principle.title}>
            <div>
              <div className={`pillar-icon tone-${PILLAR_TONES[index]}`}>
                <Icon name={PILLAR_ICONS[index]} size={24} />
              </div>
              <span className="pillar-index">
                PRINCIPLE 0{index + 1}
              </span>
              <h3 className="t-headline-md">{principle.title}</h3>
              <p className="pillar-body">{principle.body}</p>
            </div>
            <span className={`pillar-foot tone-${PILLAR_TONES[index]}`}>
              <Icon name={PILLAR_FOOT_ICONS[index]} size={16} />
              {principle.foot}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
