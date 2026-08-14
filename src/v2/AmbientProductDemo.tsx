import type { ReactNode } from "react";
import { DEMO_FIXTURES, type DemoFixture, type DemoVariant } from "./demoFixtures";
import {
  DemoComposer,
  DemoDisclosure,
  DemoFileChip,
  DemoMiniChart,
  DemoSidebar,
  DemoTaskBanner,
  DemoTopbar,
  toolIcon,
} from "./DemoPrimitives";
import {
  CheckIcon,
  ChevronDownIcon,
  FileIcon,
  GridIcon,
  MoreIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  SparkIcon,
  TerminalIcon,
} from "./Icons";
import type { V2Locale } from "./types";
import { useDemoTimeline } from "./useDemoTimeline";

export type ProductDemoVariant = DemoVariant;

type AmbientProductDemoProps = {
  locale: V2Locale;
  variant: ProductDemoVariant;
  className?: string;
};

const AMBIENT_DURATIONS = [2100, 1900, 2100, 3300] as const;

function DemoShell({
  fixture,
  variant,
  title,
  status,
  phase,
  children,
}: {
  fixture: DemoFixture;
  variant: ProductDemoVariant;
  title: string;
  status: string;
  phase: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`v2-ambient-shell v2-command-shell is-${variant}`}
      data-phase={phase}
      role="img"
      aria-label={`${fixture.aria[variant]}. ${fixture.shared.sampleDisclosure}`}
    >
      <DemoSidebar fixture={fixture} active={variant} />
      <DemoTopbar title={title} status={status} tone={phase === 3 ? "complete" : "active"} />
      {children}
      <DemoDisclosure text={fixture.shared.sampleDisclosure} />
    </div>
  );
}

function WorkspaceDemo({ fixture, phase }: { fixture: DemoFixture; phase: number }) {
  const copy = fixture.workspace;
  const completeCount = phase === 3 ? copy.steps.length : Math.min(phase + 1, copy.steps.length - 1);
  return (
    <DemoShell
      fixture={fixture}
      variant="workspace"
      title={copy.title}
      status={phase === 3 ? fixture.shared.complete : fixture.shared.running}
      phase={phase}
    >
      <div className="v2-command-main v2-workspace-main">
        <div className="v2-workspace-source-panel">
          <header><strong>{copy.sourcesTitle}</strong><span>{copy.sources.length}</span></header>
          {copy.sources.map(source => (
            <div key={source.name} className="v2-workspace-source-row">
              <span><FileIcon /></span>
              <div><b>{source.name}</b><small>{source.kind}</small></div>
              <CheckIcon />
            </div>
          ))}
          <section className="v2-workspace-process">
            <strong>{copy.toolActivity}</strong>
            {copy.steps.map((step, index) => (
              <span key={step.title} className={index < completeCount ? "is-complete" : index === completeCount ? "is-active" : ""}>
                <i>{index < completeCount || phase === 3 ? <CheckIcon /> : null}</i>
                <b>{step.title}</b>
              </span>
            ))}
          </section>
        </div>

        <section className="v2-workspace-document">
          <div className="v2-workspace-progress-strip">
            {copy.steps.map((step, index) => (
              <span key={step.title} className={index < completeCount ? "is-complete" : index === completeCount ? "is-active" : ""}>
                <i>{index < completeCount || phase === 3 ? <CheckIcon /> : index + 1}</i>
                <b>{step.title}</b>
              </span>
            ))}
          </div>
          <article className="v2-workspace-paper">
            <header>
              <div><FileIcon /><strong>{copy.documentTitle}</strong></div>
              <span>{phase === 3 ? fixture.shared.complete : copy.openItems}</span>
            </header>
            <h3>{copy.summaryTitle}</h3>
            <p>{copy.summary}</p>
            <div className="v2-workspace-document-points">
              {copy.steps.slice(0, 3).map((step, index) => (
                <span key={step.title} className={index < completeCount || phase === 3 ? "is-complete" : index === completeCount ? "is-active" : ""}>
                  <i>{index < completeCount || phase === 3 ? <CheckIcon /> : null}</i>
                  <b>{step.title}</b>
                  <small>{step.detail}</small>
                </span>
              ))}
            </div>
            <h3>{copy.progressTitle}</h3>
            <DemoMiniChart active={phase >= 1} />
            <div className="v2-workspace-open-items">
              <strong>{copy.openItems}</strong>
              <span /><span /><span />
            </div>
          </article>
          <DemoComposer
            placeholder={fixture.shared.inputPlaceholder}
            model={fixture.models.selected}
            permissions={fixture.shared.context}
          />
        </section>
      </div>

      <aside className="v2-command-inspector v2-workspace-inspector" aria-hidden="true">
        <div className="v2-command-inspector-tabs">
          <span className="is-active">{fixture.shared.context}</span>
          <span>{fixture.shared.tools}</span>
          <span>{fixture.shared.artifacts}</span>
        </div>
        <section>
          <h3>{fixture.shared.currentTask}</h3>
          <p>{copy.task}</p>
        </section>
        <section>
          <h3>{copy.toolActivity}</h3>
          <div className="v2-command-tool-list">
            {copy.toolNames.map((tool, index) => (
              <span key={tool} className={index < completeCount || phase === 3 ? "is-complete" : index === completeCount ? "is-active" : ""}>
                <i>{toolIcon(index)}</i><b>{tool}</b><em>{index < completeCount || phase === 3 ? <CheckIcon /> : null}</em>
              </span>
            ))}
          </div>
        </section>
        <section className="v2-command-inspector-artifact">
          <h3>{fixture.shared.artifacts}</h3>
          <span className={phase >= 2 ? "is-selected" : ""}>
            <FileIcon /><b>{copy.artifactTitle}</b><small>{phase === 3 ? fixture.shared.complete : fixture.shared.running}</small>
          </span>
        </section>
      </aside>
    </DemoShell>
  );
}

function ModelsDemo({ fixture, phase }: { fixture: DemoFixture; phase: number }) {
  const copy = fixture.models;
  const progress = [24, 61, 86, 100][phase];

  return (
    <DemoShell
      fixture={fixture}
      variant="models"
      title={copy.title}
      status={phase === 3 ? copy.stages[3] : copy.stages[phase]}
      phase={phase}
    >
      <div className="v2-command-main v2-models-main">
        <div className="v2-command-view-tabs"><span className="is-active">{copy.marketplace}</span><span>{copy.installed}</span></div>
        <div className="v2-command-search"><SearchIcon /><span>{copy.search}</span><b>{copy.format}</b><ChevronDownIcon /></div>
        <div className="v2-models-list">
          {copy.entries.map((entry, index) => (
            <article key={`${entry.name}-${entry.variant}`} className={index === 0 ? "is-selected" : ""}>
              <span className="v2-models-file"><PackageIcon /></span>
              <div>
                <strong>{entry.name} · {entry.variant}</strong>
                <small>{copy.format} · {entry.variant}</small>
                {index === 0 ? <div className="v2-models-inline-progress"><i style={{ width: `${progress}%` }} /></div> : null}
              </div>
              <em className={index === 0 && phase === 3 ? "is-complete" : ""}>
                {index === 0 ? (phase === 3 ? copy.stages[3] : copy.stages[phase]) : entry.state}
              </em>
            </article>
          ))}
        </div>
        <section className="v2-models-lifecycle" aria-hidden="true">
          <h3>{copy.runtimeLog}</h3>
          <div>
            {copy.stages.map((stage, index) => (
              <span key={stage} className={index < phase || phase === 3 ? "is-complete" : index === phase ? "is-active" : ""}>
                <i>{index < phase || phase === 3 ? <CheckIcon /> : index + 1}</i>
                <b>{stage}</b>
                <small>{copy.logs[index]}</small>
              </span>
            ))}
          </div>
        </section>
        <div className="v2-models-mobile-status">
          <strong>{copy.stages[phase]}</strong><span>{copy.selected} · {copy.variant}</span>
          <div><i style={{ width: `${progress}%` }} /></div>
        </div>
      </div>

      <aside className="v2-command-inspector v2-models-inspector" aria-hidden="true">
        <header className="v2-models-detail-head">
          <span><PackageIcon /></span>
          <div><strong>{copy.selected}</strong><small>{copy.format} · {copy.variant}</small></div>
          <em className={phase === 3 ? "is-complete" : ""}>{phase === 3 ? copy.agentReady : copy.stages[phase]}</em>
        </header>
        <div className="v2-models-tags"><span>{copy.format}</span><span>{copy.variant}</span><span>{copy.agentReady}</span></div>
        <div className="v2-models-pipeline">
          {copy.stages.map((stage, index) => (
            <span key={stage} className={index < phase || phase === 3 ? "is-complete" : index === phase ? "is-active" : ""}>
              <i>{index < phase || phase === 3 ? <CheckIcon /> : index + 1}</i><b>{stage}</b>
            </span>
          ))}
        </div>
        <section className="v2-models-config">
          <h3>{copy.configuration}</h3>
          <div>
            {copy.configurationRows.map(([label, value]) => <span key={label}><small>{label}</small><b>{value}</b></span>)}
            <span><small>{copy.toolCalling}</small><b>{copy.available}</b></span>
          </div>
        </section>
        <section className="v2-models-log">
          <h3>{copy.runtimeLog}</h3>
          {copy.logs.map((log, index) => (
            <span key={log} className={index <= phase ? "is-visible" : ""}><i />{log}<em>{index < phase || phase === 3 ? <CheckIcon /> : null}</em></span>
          ))}
        </section>
      </aside>
    </DemoShell>
  );
}

function SkillsDemo({ fixture, phase }: { fixture: DemoFixture; phase: number }) {
  const copy = fixture.skills;
  const checked = phase === 3 ? copy.checkRows.length : phase;

  return (
    <DemoShell
      fixture={fixture}
      variant="skills"
      title={copy.title}
      status={phase === 3 ? copy.enabled : copy.checkRows[Math.min(phase, copy.checkRows.length - 1)]}
      phase={phase}
    >
      <div className="v2-command-main v2-skills-main">
        <section className="v2-skills-library">
          <div className="v2-command-search"><SearchIcon /><span>{copy.search}</span></div>
          <header><strong>{copy.library}</strong><GridIcon /></header>
          {copy.entries.map((entry, index) => (
            <article key={entry.name} className={index === 2 ? "is-selected" : ""}>
              <span><SparkIcon /></span>
              <div><strong>{entry.name}</strong><small>{entry.detail}</small></div>
              <i className={index === 2 && phase === 3 ? "is-on" : ""} />
            </article>
          ))}
        </section>
        <section className="v2-skill-workspace">
          <header>
            <span><SparkIcon /></span>
            <div><strong>{copy.selected}</strong><small>{copy.description}</small></div>
            <em className={phase === 3 ? "is-complete" : ""}>{phase === 3 ? copy.enabled : fixture.shared.running}</em>
            <MoreIcon />
          </header>
          <nav><span className="is-active">{copy.workflow}</span><span>{copy.capabilities}</span><span>{copy.boundary}</span></nav>
          <h3>{copy.workflow}</h3>
          <div className="v2-skill-flow">
            {copy.workflowSteps.map((step, index) => (
              <span key={step} className={index <= phase ? "is-complete" : ""}>
                <i>{index <= phase ? <CheckIcon /> : index + 1}</i><b>{step}</b>
              </span>
            ))}
          </div>
          <div className="v2-skill-detail-grid">
            <section><h3>{copy.capabilities}</h3>{copy.capabilityRows.map(row => <span key={row}><CheckIcon />{row}</span>)}</section>
            <section><h3>{copy.checks}</h3>{copy.checkRows.map((row, index) => <span key={row} className={index < checked ? "is-complete" : index === checked ? "is-active" : ""}><i>{index < checked || phase === 3 ? <CheckIcon /> : null}</i>{row}</span>)}</section>
          </div>
          <section className="v2-skill-activity" aria-hidden="true">
            <h3>{copy.boundary}</h3>
            <div>
              {copy.boundaryRows.map((row, index) => (
                <span key={row} className={index < phase || phase === 3 ? "is-complete" : index === phase ? "is-active" : ""}>
                  <ShieldIcon /><b>{row}</b>
                  <em>{index < phase || phase === 3 ? <CheckIcon /> : index === phase ? fixture.shared.running : fixture.shared.pending}</em>
                </span>
              ))}
            </div>
          </section>
          <div className="v2-skill-mobile-checks">
            {copy.checkRows.map((row, index) => <span key={row} className={index < checked || phase === 3 ? "is-complete" : ""}><CheckIcon />{row}</span>)}
          </div>
        </section>
      </div>

      <aside className="v2-command-inspector v2-skills-inspector" aria-hidden="true">
        <section className="v2-skill-status-card">
          <h3>{copy.status}</h3>
          <strong><i />{phase === 3 ? copy.enabled : fixture.shared.running}</strong>
          <span><TerminalIcon />{copy.selected}</span>
        </section>
        <section>
          <h3>{copy.files}</h3>
          <div className="v2-command-inspector-list">
            {copy.fileRows.map(file => <span key={file}><FileIcon /><b>{file}</b>{phase >= 1 ? <CheckIcon /> : null}</span>)}
          </div>
        </section>
        <section>
          <h3>{copy.boundary}</h3>
          <div className="v2-skill-boundary-list">
            {copy.boundaryRows.map((row, index) => <span key={row}><ShieldIcon /><b>{row}</b><em className={index === 1 ? "is-permission" : ""}>{index === 1 ? fixture.shared.pending : <CheckIcon />}</em></span>)}
          </div>
        </section>
      </aside>
    </DemoShell>
  );
}

export function AmbientProductDemo({ locale, variant, className = "" }: AmbientProductDemoProps) {
  const fixture = DEMO_FIXTURES[locale];
  const { rootRef, phase } = useDemoTimeline({ phaseCount: 4, durations: AMBIENT_DURATIONS });
  return (
    <div ref={rootRef} className={`v2-ambient-demo ${className}`}>
      {variant === "workspace" ? <WorkspaceDemo fixture={fixture} phase={phase} /> : null}
      {variant === "models" ? <ModelsDemo fixture={fixture} phase={phase} /> : null}
      {variant === "skills" ? <SkillsDemo fixture={fixture} phase={phase} /> : null}
    </div>
  );
}
