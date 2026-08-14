import type { V2Copy } from "./copy";
import { DEMO_FIXTURES } from "./demoFixtures";
import {
  DemoComposer,
  DemoDisclosure,
  DemoFileChip,
  DemoMiniChart,
  DemoSidebar,
  DemoStepRail,
  DemoTaskBanner,
  DemoTopbar,
  getStepStates,
  heroFixtureFromCopy,
  toolIcon,
} from "./DemoPrimitives";
import {
  CheckIcon,
  CopyIcon,
  FileIcon,
  MoreIcon,
  ShieldIcon,
  TerminalIcon,
} from "./Icons";
import type { V2DemoState } from "./types";
import { useDemoTimeline } from "./useDemoTimeline";

type HeroDemoProps = {
  copy: V2Copy;
};

const HERO_DURATIONS = [2400, 2600, 2300, 3600] as const;
const HERO_STATES: V2DemoState[] = ["planning", "approval", "working", "complete"];

function PermissionCard({ copy }: Pick<HeroDemoProps, "copy">) {
  return (
    <section className="v2-command-permission" aria-label={copy.demo.permissionAnnouncement}>
      <div className="v2-command-permission-head">
        <span><TerminalIcon /></span>
        <div><strong>{copy.demo.permissionAnnouncement}</strong><small>{copy.demo.tool}</small></div>
        <em><ShieldIcon /></em>
      </div>
      <div className="v2-command-permission-code">
        <code>{copy.demo.command}</code>
        <CopyIcon />
      </div>
      <div className="v2-command-permission-actions" aria-hidden="true">
        <span>{copy.demo.deny}</span>
        <span className="is-active">{copy.demo.approve}</span>
      </div>
    </section>
  );
}

function HeroWorkPanel({ phase, copy }: { phase: number; copy: V2Copy }) {
  const fixture = DEMO_FIXTURES[copy.locale].workspace;

  if (phase === 1) return <PermissionCard copy={copy} />;

  if (phase === 2) {
    return (
      <section className="v2-command-work-panel is-working">
        <div className="v2-command-work-head">
          <span><TerminalIcon /></span>
          <div><strong>{copy.demo.working}</strong><small>{copy.demo.command}</small></div>
          <i />
        </div>
        <div className="v2-command-live-row"><span /><b>{fixture.steps[2].detail}</b><em /></div>
        <div className="v2-command-live-row"><span /><b>{fixture.steps[3].detail}</b><em /></div>
      </section>
    );
  }

  if (phase === 3) {
    return (
      <article className="v2-command-artifact-card is-complete">
        <header>
          <span><FileIcon /></span>
          <div><strong>{copy.demo.artifact}</strong><small>{copy.demo.artifactMeta}</small></div>
          <CheckIcon />
        </header>
        <div className="v2-command-artifact-body">
          <div>
            <b>{fixture.summaryTitle}</b>
            <p>{copy.demo.result}</p>
          </div>
          <DemoMiniChart />
        </div>
        <footer><span>{copy.demo.confirmationCount}</span><MoreIcon /></footer>
      </article>
    );
  }

  return (
    <section className="v2-command-work-panel is-sources">
      <div className="v2-command-work-head">
        <span><FileIcon /></span>
        <div><strong>{fixture.sourcesTitle}</strong><small>{fixture.steps[0].detail}</small></div>
        <CheckIcon />
      </div>
      <div className="v2-command-file-chips">
        {fixture.sources.map(source => <DemoFileChip key={source.name} name={source.name} />)}
      </div>
    </section>
  );
}

function HeroInspector({ phase, copy }: { phase: number; copy: V2Copy }) {
  const fixture = DEMO_FIXTURES[copy.locale];
  const visibleTools = Math.min(phase + 2, fixture.workspace.toolNames.length);

  return (
    <aside className="v2-command-inspector v2-hero-inspector" aria-hidden="true">
      <div className="v2-command-inspector-tabs">
        <span className="is-active">{fixture.shared.context}</span>
        <span>{fixture.shared.tools}</span>
        <span>{fixture.shared.artifacts}</span>
      </div>
      <section>
        <h3>{fixture.workspace.sourcesTitle}</h3>
        <div className="v2-command-inspector-list">
          {fixture.workspace.sources.map(source => (
            <span key={source.name}><FileIcon /><b>{source.name}</b><CheckIcon /></span>
          ))}
        </div>
      </section>
      <section>
        <h3>{fixture.workspace.toolActivity}</h3>
        <div className="v2-command-tool-list">
          {fixture.workspace.toolNames.map((tool, index) => {
            const complete = index < visibleTools || phase === 3;
            const active = index === visibleTools && phase < 3;
            return (
              <span key={tool} className={active ? "is-active" : complete ? "is-complete" : ""}>
                <i>{toolIcon(index)}</i><b>{tool}</b><em>{complete ? <CheckIcon /> : active ? <span /> : null}</em>
              </span>
            );
          })}
        </div>
      </section>
      <section className="v2-command-inspector-artifact">
        <h3>{fixture.shared.artifacts}</h3>
        <span className={phase === 3 ? "is-selected" : ""}>
          <FileIcon /><b>{fixture.workspace.artifactTitle}</b><small>{phase === 3 ? fixture.shared.complete : fixture.shared.pending}</small>
        </span>
      </section>
    </aside>
  );
}

export function HeroDemo({ copy }: HeroDemoProps) {
  const fixture = DEMO_FIXTURES[copy.locale];
  const heroCopy = heroFixtureFromCopy(copy);
  const { rootRef, phase } = useDemoTimeline({
    phaseCount: HERO_STATES.length,
    durations: HERO_DURATIONS,
  });
  const state = HERO_STATES[phase];
  const topStatus = state === "complete" ? copy.demo.completed : copy.demo.inProgress;

  return (
    <div
      ref={rootRef}
      className={`v2-demo-frame v2-command-shell is-${state}`}
      data-phase={phase}
      data-state={state}
      role="img"
      aria-label={`${fixture.aria.workspace}. ${fixture.shared.sampleDisclosure}`}
    >
      <DemoSidebar fixture={fixture} active="workspace" />
      <DemoTopbar
        title={copy.demo.title}
        status={topStatus}
        tone={state === "complete" ? "complete" : state === "approval" ? "permission" : "active"}
      />

      <div className="v2-command-main v2-hero-command-main">
        <DemoTaskBanner>{copy.demo.sampleTask}</DemoTaskBanner>
        <div className="v2-command-progress-label">
          <strong>{fixture.workspace.toolActivity}</strong>
          <span>{phase + 1} / {HERO_STATES.length}</span>
        </div>
        <DemoStepRail steps={fixture.workspace.steps} states={getStepStates(phase)} />
        <HeroWorkPanel phase={phase} copy={copy} />
        <DemoComposer
          placeholder={heroCopy.placeholder}
          model={heroCopy.model}
          permissions={heroCopy.permissions}
        />
      </div>

      <HeroInspector phase={phase} copy={copy} />
      <DemoDisclosure text={copy.home.demoDisclosure} />
    </div>
  );
}
