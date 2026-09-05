import type { SiteLocale } from "../shared/site-types";
import type { EditorialCopy } from "./copy";
import { GITHUB } from "./copy";
import { Arrow } from "./SiteChrome";

export function Inference({
  copy,
  locale,
}: {
  copy: EditorialCopy;
  locale: SiteLocale;
}) {
  return (
    <section
      className="inference wrap section-space"
      id="inference"
      aria-labelledby="inference-title"
    >
      <div className="inference-layout">
        <div className="inference-story">
          <p className="inference-label">
            {copy.inferenceLabel} <span>/ 02</span>
          </p>
          <h2 id="inference-title">
            {copy.inferenceTitle.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="section-lead">
            {copy.inferenceLead.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <a
            className="text-link"
            href={
              locale === "en"
                ? `${GITHUB}#local-inference-and-model-marketplace`
                : "/docs/guide/model/local"
            }
          >
            {copy.inferenceGuide}
            <Arrow />
          </a>
        </div>
        <figure className="inference-product">
          <a
            href="/product/zhiyuan-model-market.png"
            target="_blank"
            rel="noreferrer"
            aria-label={copy.inferenceImage}
          >
            <img
              src="/product/zhiyuan-model-market.png"
              width="3840"
              height="2400"
              loading="lazy"
              alt={copy.inferenceCaption}
            />
          </a>
          <figcaption>{copy.inferenceCaption}</figcaption>
        </figure>
      </div>
      <div className="inference-benefits">
        {copy.inferenceSteps.map((step) => (
          <article key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
      <p className="inference-note">{copy.inferenceNote}</p>
    </section>
  );
}
