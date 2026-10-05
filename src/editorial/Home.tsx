import type { SiteSiteProps } from "../shared/site-types";
import type { EditorialCopy } from "./copy";
import { Icon } from "./icons";
import { Workbench } from "./Workbench";
import { Models } from "./Models";
import { Pillars } from "./Pillars";
import { Downloads } from "./Downloads";

const PLATFORM_ICONS = ["laptop", "monitor", "terminal"] as const;

export function Home({
  copy,
  locale,
  release,
  releaseStatus,
  preferredPlatform,
}: SiteSiteProps & { copy: EditorialCopy }) {
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <div className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <section className="hero-inner wrap" aria-labelledby="hero-title">
          <div className="release-badge">
            <span className="badge-dot" aria-hidden="true" />
            <span>
              {release ? `v${release.version}` : copy.releaseFallback}{" "}
              {copy.releaseStable}
            </span>
            <span className="badge-sep" aria-hidden="true">
              ·
            </span>
            <span className="badge-sub">{copy.heroBadgeSub}</span>
            <Icon name="arrow-forward" size={14} />
          </div>
          <h1 id="hero-title" className="t-display">
            {copy.headlineTop}
            <br />
            <span className="gradient">{copy.headlineAccent}</span>
          </h1>
          <p className="hero-lead t-body-lg">{copy.heroLead}</p>
          <div className="hero-actions">
            <a className="btn" href="#download">
              <Icon name="download" size={18} />
              <span>{copy.heroCtaPrimary}</span>
              <span className="chip">{copy.agplChip}</span>
            </a>
            <a className="btn-ghost" href="#workbench">
              <Icon name="play" size={18} />
              <span>{copy.heroCtaSecondary}</span>
            </a>
          </div>
          <div className="hero-platforms">
            {copy.platforms.map((platform, index) => (
              <span key={platform} className="platform-item">
                {index > 0 ? (
                  <span className="platform-sep" aria-hidden="true">
                    /
                  </span>
                ) : null}
                <Icon name={PLATFORM_ICONS[index]} size={15} />
                {platform}
              </span>
            ))}
          </div>
        </section>
      </div>
      <Workbench copy={copy} />
      <Models copy={copy} />
      <Pillars copy={copy} />
      <Downloads
        locale={locale}
        copy={copy}
        release={release}
        status={releaseStatus}
        preferredPlatform={preferredPlatform}
      />
    </main>
  );
}
