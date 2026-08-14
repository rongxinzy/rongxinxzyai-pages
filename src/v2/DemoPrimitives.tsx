import type { ReactNode } from "react";
import type { V2Copy } from "./copy";
import type { DemoFixture, DemoVariant } from "./demoFixtures";
import {
  ChartIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  FileIcon,
  FolderIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  ShieldIcon,
  SparkIcon,
  TerminalIcon,
  WindowIcon,
} from "./Icons";

type StepState = "complete" | "active" | "pending";

export function DemoSidebar({
  fixture,
  active,
}: {
  fixture: DemoFixture;
  active: DemoVariant;
}) {
  const { shared } = fixture;
  const nav = [
    { id: "workspace", label: shared.newTask, icon: <SparkIcon /> },
    { id: "models", label: shared.localModels, icon: <SettingsIcon /> },
    { id: "automation", label: shared.automation, icon: <ClockIcon /> },
    { id: "skills", label: shared.experts, icon: <SparkIcon /> },
    { id: "search", label: shared.search, icon: <SearchIcon /> },
  ] as const;

  return (
    <aside className="v2-command-sidebar" aria-hidden="true">
      <div className="v2-command-brand">
        <img src="/zhiyuan-logo.svg" alt="" />
        <WindowIcon />
      </div>
      <div className="v2-command-mode">
        <span className="is-selected">{shared.work}</span>
        <span>{shared.chat}</span>
      </div>
      <nav className="v2-command-nav">
        {nav.map(item => (
          <span
            key={item.id}
            className={
              (active === "workspace" && item.id === "workspace") || item.id === active
                ? "is-selected"
                : ""
            }
          >
            {item.icon}{item.label}
          </span>
        ))}
      </nav>
      <p className="v2-command-label">{shared.project}</p>
      <span className="v2-command-project"><FolderIcon />project</span>
      <p className="v2-command-label">{shared.conversation}</p>
      <span className="v2-command-task is-selected">{shared.currentTask}</span>
      <span className="v2-command-settings"><SettingsIcon />{shared.settings}</span>
    </aside>
  );
}

export function DemoTopbar({
  title,
  status,
  tone = "active",
}: {
  title: string;
  status: string;
  tone?: "active" | "complete" | "permission";
}) {
  return (
    <header className="v2-command-topbar">
      <WindowIcon className="v2-command-mobile-window" />
      <strong>{title}</strong>
      <span className={`v2-command-status is-${tone}`}><i />{status}</span>
      <span className="v2-command-window-controls" aria-hidden="true"><i /><b /><em>×</em></span>
    </header>
  );
}

export function DemoDisclosure({ text }: { text: string }) {
  return (
    <div className="v2-command-disclosure">
      <ShieldIcon />
      <span>{text}</span>
    </div>
  );
}

export function DemoComposer({
  placeholder,
  model,
  permissions,
}: {
  placeholder: string;
  model: string;
  permissions: string;
}) {
  return (
    <div className="v2-command-composer">
      <span className="v2-command-composer-placeholder">{placeholder}</span>
      <div>
        <span><PlusIcon />{permissions}<ChevronDownIcon /></span>
        <span className="v2-command-composer-model">{model}<ChevronDownIcon /></span>
        <span className="v2-command-send"><SendIcon /></span>
      </div>
    </div>
  );
}

export function DemoTaskBanner({ children }: { children: ReactNode }) {
  return <div className="v2-command-task-banner"><FileIcon />{children}</div>;
}

export function DemoStepRail({
  steps,
  states,
}: {
  steps: Array<{ title: string; detail?: string }>;
  states: StepState[];
}) {
  return (
    <ol className="v2-command-step-rail">
      {steps.map((step, index) => {
        const state = states[index] ?? "pending";
        return (
          <li key={step.title} className={`is-${state}`}>
            <span className="v2-command-step-node">
              {state === "complete" ? <CheckIcon /> : state === "active" ? <i /> : index + 1}
            </span>
            <div><strong>{step.title}</strong>{step.detail ? <small>{step.detail}</small> : null}</div>
            <em>{state === "complete" ? <CheckIcon /> : null}</em>
          </li>
        );
      })}
    </ol>
  );
}

export function DemoFileChip({ name, done = true }: { name: string; done?: boolean }) {
  return (
    <span className="v2-command-file-chip">
      <FileIcon />
      <b>{name}</b>
      {done ? <CheckIcon /> : null}
    </span>
  );
}

export function DemoMiniChart({ active = true }: { active?: boolean }) {
  return (
    <div className={`v2-command-chart ${active ? "is-active" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 260 84" preserveAspectRatio="none">
        <path className="grid" d="M0 16h260M0 42h260M0 68h260" />
        <path className="area" d="M2 70 42 59 80 62 120 43 160 49 202 25 258 17V84H2Z" />
        <path className="line" d="m2 70 40-11 38 3 40-19 40 6 42-24 56-8" />
      </svg>
      <span><ChartIcon /></span>
    </div>
  );
}

export function getStepStates(phase: number, count = 4): StepState[] {
  return Array.from({ length: count }, (_, index) => {
    if (phase >= count - 1) return "complete";
    if (index < phase + 1) return "complete";
    if (index === phase + 1) return "active";
    return "pending";
  });
}

export function toolIcon(index: number) {
  if (index === 0) return <FileIcon />;
  if (index === 1) return <TerminalIcon />;
  if (index === 2) return <ClockIcon />;
  return <ChartIcon />;
}

export function heroFixtureFromCopy(copy: V2Copy) {
  return {
    model: copy.demo.model,
    permissions: copy.demo.permissions,
    deny: copy.demo.deny,
    approve: copy.demo.approve,
    command: copy.demo.command,
    placeholder: copy.demo.placeholder,
  };
}
