import type { EditorialCopy } from "./copy";
import { Icon } from "./icons";

const STATUS_META = {
  installed: { icon: null as string | null, className: "is-installed" },
  fetch: { icon: "cloud-download" as string | null, className: "is-fetch" },
  light: { icon: "check" as string | null, className: "is-light" },
};

export function Models({ copy }: { copy: EditorialCopy }) {
  return (
    <section className="wrap section-space" id="models" aria-labelledby="models-title">
      <div className="module-head">
        <div>
          <span className="overline">{copy.modelsOverline}</span>
          <h2 id="models-title" className="t-headline-lg">
            {copy.modelsTitle}
          </h2>
          <p className="module-lead t-body-lg">{copy.modelsLead}</p>
        </div>
        <div className="module-monitor">
          <div>
            <span className="monitor-label">{copy.monitorLabel}</span>
            <span className="monitor-value">{copy.monitorValue}</span>
          </div>
          <span className="monitor-track" aria-hidden="true">
            <span style={{ width: "28%" }} />
          </span>
          <span className="monitor-state">{copy.monitorState}</span>
        </div>
      </div>
      <div className="model-grid">
        {copy.modelCards.map((card) => {
          const status = STATUS_META[card.status];
          return (
            <article className="model-card" key={card.chip}>
              <div>
                <div className="model-card-head">
                  <span className="chip chip-solid t-code-sm">{card.chip}</span>
                  <span className={`model-status ${status.className}`}>
                    {status.icon ? (
                      <Icon name={status.icon} size={14} />
                    ) : (
                      <span className="pill-dot" />
                    )}
                    {card.statusText}
                  </span>
                </div>
                <h3 className="t-headline-md">{card.title}</h3>
                <p className="model-desc">{card.desc}</p>
              </div>
              <dl className="model-specs">
                {card.specs.map((spec) => (
                  <div className="spec-row" key={spec.key}>
                    <dt>{spec.key}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          );
        })}
      </div>
      <div className="bench">
        <div className="bench-grid">
          <div>
            <span className="bench-label">{copy.benchLabel}</span>
            <h4>{copy.benchTitle}</h4>
            <p className="bench-note">{copy.benchNote}</p>
          </div>
          <div>
            <div className="bench-slider-head">
              <span>{copy.benchCurrent}</span>
              <span className="bench-max">{copy.benchMax}</span>
            </div>
            <div className="bench-track" aria-hidden="true">
              <span />
            </div>
          </div>
          <span className="bench-flag">
            <Icon name="memory" size={16} />
            {copy.benchFlag}
          </span>
        </div>
      </div>
      <p className="inference-note">{copy.modelsNote}</p>
    </section>
  );
}
