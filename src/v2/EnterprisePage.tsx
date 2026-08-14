import type { V2Copy } from "./copy";
import type { V2Locale } from "./types";
import { ArrowIcon, MonitorIcon, ShieldIcon, SparkIcon } from "./Icons";

type EnterprisePageProps = {
  locale: V2Locale;
  copy: V2Copy;
};

function ArchitectureDiagram({ copy }: { copy: V2Copy }) {
  return (
    <div className="v2-enterprise-diagram" aria-label={copy.enterprise.architectureTitle}>
      <div className="v2-enterprise-desktop">
        <MonitorIcon />
        <span>{copy.enterprise.architectureLabels[0]}</span>
      </div>
      <div className="v2-enterprise-connector" aria-hidden="true"><i /><ArrowIcon /></div>
      <div className="v2-enterprise-services">
        <strong>{copy.enterprise.architectureLabels[1]}</strong>
        <div>
          {copy.enterprise.architectureNodes.map((node, index) => (
            <span key={node}>{index === 0 ? <ShieldIcon /> : <SparkIcon />}{node}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function V2EnterprisePage({ copy }: EnterprisePageProps) {
  return (
    <main className="v2-enterprise-page">
      <section className="v2-enterprise-hero" aria-labelledby="v2-enterprise-title">
        <div className="v2-container v2-enterprise-hero-layout">
          <div className="v2-enterprise-hero-copy">
            <h1 id="v2-enterprise-title">{copy.enterprise.heroTitle}</h1>
            <p>{copy.enterprise.heroLead}</p>
            <ul aria-label={copy.enterprise.scopeNote}>
              {copy.enterprise.traits.map(trait => <li key={trait}>{trait}</li>)}
            </ul>
            <a className="v2-button v2-button-primary" href="#contact">
              {copy.actions.contactEnterprise}<ArrowIcon />
            </a>
            <small>{copy.enterprise.scopeNote}</small>
          </div>
          <ArchitectureDiagram copy={copy} />
        </div>
      </section>

      <section className="v2-section v2-enterprise-comparison" aria-labelledby="v2-comparison-title">
        <div className="v2-container v2-comparison-layout">
          <div className="v2-section-copy">
            <span className="v2-section-number" aria-hidden="true">01</span>
            <h2 id="v2-comparison-title">{copy.enterprise.comparisonTitle}</h2>
            <p>{copy.enterprise.comparisonBody}</p>
          </div>
          <div className="v2-comparison-table-wrap">
            <table>
              <thead>
                <tr>{copy.enterprise.comparisonHeaders.map(header => <th key={header} scope="col">{header}</th>)}</tr>
              </thead>
              <tbody>
                {copy.enterprise.comparisonRows.map(row => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="v2-section v2-enterprise-architecture" aria-labelledby="v2-architecture-title">
        <div className="v2-container v2-architecture-layout">
          <div className="v2-section-copy">
            <span className="v2-section-number" aria-hidden="true">02</span>
            <h2 id="v2-architecture-title">{copy.enterprise.architectureTitle}</h2>
            <p>{copy.enterprise.architectureBody}</p>
          </div>
          <ArchitectureDiagram copy={copy} />
        </div>
      </section>

      <section className="v2-section v2-enterprise-delivery" aria-labelledby="v2-delivery-title">
        <div className="v2-container">
          <div className="v2-section-heading">
            <span className="v2-section-number" aria-hidden="true">03</span>
            <h2 id="v2-delivery-title">{copy.enterprise.deliveryTitle}</h2>
            <p>{copy.enterprise.deliveryBody}</p>
          </div>
          <ol className="v2-delivery-steps">
            {copy.enterprise.deliverySteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="v2-section v2-enterprise-contact" id="contact" aria-labelledby="v2-contact-title">
        <div className="v2-container v2-contact-layout">
          <div className="v2-section-copy">
            <span className="v2-section-number" aria-hidden="true">04</span>
            <h2 id="v2-contact-title">{copy.enterprise.contactTitle}</h2>
            <p>{copy.enterprise.contactBody}</p>
            <a className="v2-button v2-button-secondary" href="mailto:likeran@rongxinzy.com">
              {copy.enterprise.emailAction}<ArrowIcon />
            </a>
            <a className="v2-contact-email" href="mailto:likeran@rongxinzy.com">likeran@rongxinzy.com</a>
          </div>
          <div className="v2-contact-qr-list">
            <figure>
              <img src="/zhiyuan-community-qr.png" alt={copy.enterprise.communityQrAlt} loading="lazy" />
              <figcaption>{copy.enterprise.communityQrLabel}</figcaption>
            </figure>
            <figure>
              <img src="/zhiyuan-official-qr.png" alt={copy.enterprise.officialQrAlt} loading="lazy" />
              <figcaption>{copy.enterprise.officialQrLabel}</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </main>
  );
}
