import type { SiteLocale } from "../shared/site-types";
import type { EditorialCopy } from "./copy";
import { Arrow, TitleLines } from "./SiteChrome";

export function Enterprise({
  copy,
  locale,
}: {
  copy: EditorialCopy;
  locale: SiteLocale;
}) {
  return (
    <main id="main" tabIndex={-1} className="enterprise-page">
      <section
        className="enterprise-hero wrap"
        aria-labelledby="enterprise-title"
      >
        <div>
          <h1 id="enterprise-title">
            <TitleLines lines={copy.enterpriseTitle} spaced={locale === "en"} />
          </h1>
          <p className="section-lead">{copy.enterpriseLead}</p>
          <a className="button" href="#contact">
            {copy.contactAction}
            <Arrow />
          </a>
          <p className="scope-note">{copy.scope}</p>
        </div>
        <div className="architecture">
          {copy.architecture.map((row, index) => (
            <div className="architecture-row" key={row.title}>
              <div>
                <h3>{row.title}</h3>
                <p>{row.items.join(" / ")}</p>
              </div>
              <div className="architecture-nodes" aria-hidden="true">
                {["○", "◇", "⊞"].map((symbol, node) => (
                  <span key={node}>
                    {index === 0 ? "○" : index === 1 ? "◇" : symbol}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        className="enterprise-delivery wrap section-space"
        aria-labelledby="delivery-title"
      >
        <h2 id="delivery-title">{copy.deliveryTitle}</h2>
        <ol>
          {copy.delivery.map((step, index) => (
            <li key={step.title}>
              <span className="index-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="comparison wrap" aria-labelledby="comparison-title">
        <h2 id="comparison-title">{copy.comparisonTitle}</h2>
        <p className="scope-note">{copy.scope}</p>
        <p className="comparison-hint">{copy.comparisonHint}</p>
        <div
          className="comparison-scroll"
          tabIndex={0}
          role="region"
          aria-label={copy.comparisonTitle}
        >
          <table>
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
      <section
        className="contact-band"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="wrap contact-layout">
          <div>
            <h2 id="contact-title">{copy.contactTitle}</h2>
            <p>{copy.contactBody}</p>
            <a className="contact-email" href="mailto:likeran@rongxinzy.com">
              likeran@rongxinzy.com
              <Arrow />
            </a>
          </div>
          <div className="contact-qr">
            {["/zhiyuan-community-qr.png", "/zhiyuan-official-qr.png"].map(
              (src, index) => (
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
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
