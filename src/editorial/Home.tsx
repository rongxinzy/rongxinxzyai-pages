import type { SiteSiteProps } from "../shared/site-types";
import type { EditorialCopy } from "./copy";
import { Arrow, TitleText } from "./SiteChrome";
import { Workflow } from "./Workflow";
import { Inference } from "./Inference";
import { Downloads } from "./Downloads";

export function Home({
  copy,
  locale,
  release,
  releaseStatus,
}: SiteSiteProps & { copy: EditorialCopy }) {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-composition wrap">
          <h1 id="hero-title">
            <span>{copy.headline[0]}</span>
            <span>
              {copy.headline[1]}{" "}
              <em>
                <TitleText text={copy.headlineAccent} />
              </em>
              {copy.headlineEnd}
            </span>
          </h1>
          <div className="hero-summary">
            <p>
              {copy.lead}
              <br />
              {copy.intro}
            </p>
            <div className="hero-actions">
              <a className="button" href="#download">
                {copy.download}
                <Arrow />
              </a>
              <a className="text-link" href="#workflow">
                {copy.how}
                <Arrow down />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-photograph">
          <img
            src="/editorial/work-bridge.jpg"
            width="2127"
            height="739"
            alt={
              locale === "en"
                ? "A paper bridge, documents and a metal block."
                : "折纸桥、档案文件与金属方块。"
            }
            fetchPriority="high"
          />
        </div>
        <div className="hero-colophon wrap">
          <span>
            Windows <i>/</i> macOS <i>/</i> Linux
          </span>
          <span>{copy.local}</span>
        </div>
      </section>
      <Workflow locale={locale} copy={copy} />
      <Inference locale={locale} copy={copy} />
      <section
        className="boundary-band"
        id="local-models"
        aria-labelledby="boundary-title"
      >
        <div className="wrap boundary-layout">
          <h2 id="boundary-title">
            {copy.boundaries.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <div className="boundary-rows">
            {copy.boundaryRows.map((row, index) => (
              <article key={row.title}>
                <span className="index-number">0{index + 1}</span>
                <div>
                  <h3>{row.title}</h3>
                  <p>{row.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Downloads
        locale={locale}
        copy={copy}
        release={release}
        status={releaseStatus}
      />
    </main>
  );
}
