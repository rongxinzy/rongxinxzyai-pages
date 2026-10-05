import type { SiteLocale } from "../shared/site-types";
import type { EditorialCopy } from "./copy";
import { Icon } from "./icons";

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
      <section className="enterprise-hero wrap" aria-labelledby="enterprise-title">
        <div>
          <span className="overline">ENTERPRISE / TEAMS</span>
          <h1 id="enterprise-title" className="t-display">
            {copy.enterpriseTitle[0]}
            <br />
            <span className="gradient">{copy.enterpriseTitle[1]}</span>
          </h1>
          <p className="module-lead t-body-lg">{copy.enterpriseLead}</p>
          <a className="btn" href="#contact">
            {copy.contactAction}
            <Icon name="arrow-forward" size={16} />
          </a>
          <p className="scope-note">{copy.scope}</p>
        </div>
        <div className="architecture-panel" aria-label={copy.architectureTitle}>
          {copy.architecture.map((row, index) => (
            <div className="architecture-row" key={row.title}>
              <div>
                <h3>{row.title}</h3>
                <p>{row.items}</p>
              </div>
              <div className="architecture-nodes" aria-hidden="true">
                <Icon name={index === 0 ? "person" : index === 1 ? "dataset" : "shield"} size={20} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        className="wrap section-space"
        aria-labelledby="delivery-title"
      >
        <span className="overline">{copy.deliveryOverline}</span>
        <h2 id="delivery-title" className="t-headline-lg">
          {copy.deliveryTitle}
        </h2>
        <ol className="delivery-steps">
          {copy.delivery.map((step, index) => (
            <li key={step.title}>
              <span className="index-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="wrap section-space" aria-labelledby="comparison-title">
        <span className="overline">{copy.comparisonOverline}</span>
        <h2 id="comparison-title" className="t-headline-lg">
          {copy.comparisonTitle}
        </h2>
        <p className="scope-note">{copy.scope}</p>
        <p className="scope-note comparison-hint">{copy.comparisonHint}</p>
        <div
          className="comparison-scroll"
          tabIndex={0}
          role="region"
          aria-label={copy.comparisonTitle}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                {copy.headers.map((label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {copy.comparison.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="wrap" id="contact" aria-labelledby="contact-title">
        <div className="contact-panel">
          <div className="contact-layout">
            <div>
              <span className="oss-overline">
                <span className="pill-dot" />
                {copy.contactOverline}
              </span>
              <h2 id="contact-title" className="t-headline-lg">
                {copy.contactTitle}
              </h2>
              <p className="contact-body">{copy.contactBody}</p>
              <a className="contact-email" href="mailto:likeran@rongxinzy.com">
                likeran@rongxinzy.com
                <Icon name="arrow-forward" size={14} />
              </a>
            </div>
            <div className="contact-qr">
              {[
                en ? "/zhiyuan-community-qr.png" : "/zhiyuan-community-qr.png",
                "/zhiyuan-official-qr.png",
              ].map((src, index) => (
                <figure key={src}>
                  <img
                    src={src}
                    width="136"
                    height="136"
                    alt={copy.qr[index]}
                    loading="lazy"
                  />
                  <figcaption>{copy.qr[index]}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
