import { useState } from "react";
import type { V2Copy } from "./copy";
import { GITHUB_URL } from "./copy";
import type { V2Locale, V2Release, V2ReleaseStatus, V2Platform } from "./types";
import { HeroDemo } from "./HeroDemo";
import { AmbientProductDemo, type ProductDemoVariant } from "./AmbientProductDemo";
import { V2DownloadSection, V2HeroDownload } from "./DownloadSection";
import {
  ArrowIcon,
  ArrowUpRightIcon,
  CheckIcon,
  ClockIcon,
  CodeIcon,
  FileIcon,
  FolderIcon,
  GithubIcon,
  MonitorIcon,
  ShieldIcon,
  SparkIcon,
  TerminalIcon,
} from "./Icons";

type HomePageProps = {
  locale: V2Locale;
  copy: V2Copy;
  release: V2Release | null;
  releaseStatus: V2ReleaseStatus;
  preferredPlatform?: Exclude<V2Platform, "linuxAppImage">;
};

function WorkflowSection({ copy }: { copy: V2Copy }) {
  return (
    <section className="v2-section v2-workflow" id="workflow" aria-labelledby="v2-workflow-title">
      <div className="v2-container">
        <div className="v2-section-heading">
          <span className="v2-section-number" aria-hidden="true">01</span>
          <h2 id="v2-workflow-title">{copy.home.workflowTitle}</h2>
          <p>{copy.home.workflowBody}</p>
        </div>
        <ol className="v2-workflow-rail">
          {copy.home.workflowSteps.map((step, index) => (
            <li key={step.title} className={index === 3 ? "is-approval" : ""}>
              <span className="v2-workflow-marker">
                {index === 3 ? <ShieldIcon /> : index === 4 ? <CheckIcon /> : index + 1}
              </span>
              <div><strong>{step.title}</strong><p>{step.body}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function LocalModelsSection({ locale, copy }: { locale: V2Locale; copy: V2Copy }) {
  return (
    <section className="v2-section v2-local-models" id="local-models" aria-labelledby="v2-local-title">
      <div className="v2-container v2-local-layout">
        <AmbientProductDemo locale={locale} variant="models" className="v2-local-image" />
        <div className="v2-local-copy">
          <span className="v2-section-number" aria-hidden="true">02</span>
          <h2 id="v2-local-title">{copy.home.localTitle}</h2>
          <p>{copy.home.localBody}</p>
          <ul>
            {copy.home.localFacts.map((fact, index) => (
              <li key={fact}>{index === 0 ? <FileIcon /> : index === 1 ? <TerminalIcon /> : <MonitorIcon />}{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ copy }: { copy: V2Copy }) {
  return (
    <section className="v2-section v2-skills" aria-labelledby="v2-skills-title">
      <div className="v2-container v2-skills-layout">
        <div className="v2-section-copy">
          <span className="v2-section-number" aria-hidden="true">03</span>
          <h2 id="v2-skills-title">{copy.home.skillsTitle}</h2>
          <p>{copy.home.skillsBody}</p>
        </div>
        <div className="v2-skill-list">
          {copy.home.skillRows.map((skill, index) => (
            <article key={skill.title}>
              <span>{index === 0 ? <SparkIcon /> : index === 1 ? <CodeIcon /> : <ArrowIcon />}</span>
              <div><h3>{skill.title}</h3><p>{skill.body}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AutomationSection({ copy }: { copy: V2Copy }) {
  return (
    <section className="v2-section v2-automation" aria-labelledby="v2-automation-title">
      <div className="v2-container v2-automation-layout">
        <div className="v2-section-copy">
          <span className="v2-section-number" aria-hidden="true">04</span>
          <h2 id="v2-automation-title">{copy.home.automationTitle}</h2>
          <p>{copy.home.automationBody}</p>
        </div>
        <div className="v2-automation-flow">
          <div className="v2-schedule-row">
            <ClockIcon />
            <span>{copy.home.automationSchedule}</span>
            <strong>{copy.home.automationTask}</strong>
            <i aria-hidden="true" />
          </div>
          <div className="v2-delivery-line" aria-hidden="true" />
          <div className="v2-delivery-list">
            {copy.home.automationDestinations.map((destination, index) => (
              <span key={destination}>{index === 0 ? <FolderIcon /> : index === 1 ? <SparkIcon /> : <FileIcon />}{destination}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductSection({ locale, copy }: { locale: V2Locale; copy: V2Copy }) {
  const [activeTab, setActiveTab] = useState<(typeof copy.home.productTabs)[number]["id"]>("workspace");
  const active = copy.home.productTabs.find(tab => tab.id === activeTab) ?? copy.home.productTabs[0];

  return (
    <section className="v2-section v2-product" id="product" aria-labelledby="v2-product-title">
      <div className="v2-container">
        <div className="v2-section-heading">
          <span className="v2-section-number" aria-hidden="true">05</span>
          <h2 id="v2-product-title">{copy.home.productTitle}</h2>
          <p>{copy.home.productBody}</p>
        </div>
        <div className="v2-product-tabs" role="tablist" aria-label={copy.home.productTitle}>
          {copy.home.productTabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`v2-product-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls="v2-product-panel"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          className="v2-product-gallery"
          id="v2-product-panel"
          role="tabpanel"
          aria-labelledby={`v2-product-tab-${active.id}`}
        >
          <AmbientProductDemo key={active.id} locale={locale} variant={active.id as ProductDemoVariant} />
        </div>
      </div>
    </section>
  );
}

function TrustSection({ copy }: { copy: V2Copy }) {
  return (
    <section className="v2-section v2-trust" aria-labelledby="v2-trust-title">
      <div className="v2-container">
        <div className="v2-section-heading">
          <span className="v2-section-number" aria-hidden="true">06</span>
          <h2 id="v2-trust-title">{copy.home.trustTitle}</h2>
          <p>{copy.home.trustBody}</p>
        </div>
        <div className="v2-trust-rows">
          {copy.home.trustRows.map((row, index) => (
            <a key={row.title} href={row.href} target="_blank" rel="noreferrer">
              <span>{index === 0 ? <GithubIcon /> : index === 1 ? <ShieldIcon /> : <CheckIcon />}</span>
              <div><strong>{row.title}</strong><p>{row.body}</p></div>
              <ArrowUpRightIcon />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function V2HomePage({ locale, copy, release, releaseStatus, preferredPlatform }: HomePageProps) {
  const enterpriseHref = locale === "en" ? "/en/enterprise/" : "/enterprise/";

  return (
    <main>
      <section className="v2-hero" aria-labelledby="v2-hero-title">
        <div className="v2-container v2-hero-layout">
          <div className="v2-hero-copy">
            <h1 id="v2-hero-title">{copy.home.heroTitle}</h1>
            <p>{copy.home.heroLead}</p>
            <div className="v2-hero-actions">
              <V2HeroDownload
                copy={copy}
                release={release}
                releaseStatus={releaseStatus}
                preferredPlatform={preferredPlatform}
              />
            </div>
            <a className="v2-source-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
              {copy.actions.source}<ArrowUpRightIcon />
            </a>
          </div>
          <div className="v2-hero-demo">
            <HeroDemo copy={copy} />
          </div>
        </div>
      </section>

      <WorkflowSection copy={copy} />
      <LocalModelsSection locale={locale} copy={copy} />
      <SkillsSection copy={copy} />
      <AutomationSection copy={copy} />
      <ProductSection locale={locale} copy={copy} />
      <TrustSection copy={copy} />
      <V2DownloadSection copy={copy} release={release} releaseStatus={releaseStatus} preferredPlatform={preferredPlatform} />

      <section className="v2-enterprise-cta">
        <div className="v2-container v2-enterprise-cta-inner">
          <div>
            <span className="v2-section-number" aria-hidden="true">08</span>
            <h2>{copy.home.enterpriseTitle}</h2>
            <p>{copy.home.enterpriseBody}</p>
          </div>
          <a className="v2-text-action" href={enterpriseHref}>{copy.actions.learnEnterprise}<ArrowIcon /></a>
        </div>
      </section>
    </main>
  );
}
