import { useCallback, useEffect, useState } from "react";
import type { V2Copy } from "./copy";
import type { V2DemoState } from "./types";
import {
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  CopyIcon,
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

type HeroDemoProps = {
  copy: V2Copy;
  onStateChange?: (state: V2DemoState) => void;
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function stateProgress(state: V2DemoState) {
  switch (state) {
    case "idle":
    case "typing":
      return 0;
    case "planning":
      return 2;
    case "approval":
      return 2;
    case "working":
      return 3;
    case "complete":
      return 4;
  }
}

function DemoSidebar({ copy }: Pick<HeroDemoProps, "copy">) {
  const labels = copy.demo.sidebar;
  return (
    <aside className="v2-demo-sidebar" aria-hidden="true">
      <div className="v2-demo-brand">
        <img src="/zhiyuan-logo.svg" alt="" />
        <WindowIcon />
      </div>
      <div className="v2-demo-mode">
        <span className="is-selected">{labels.work}</span>
        <span>{labels.chat}</span>
      </div>
      <div className="v2-demo-nav-list">
        <span><SparkIcon />{labels.newTask}</span>
        <span><SettingsIcon />{labels.local}</span>
        <span><ClockIcon />{labels.automation}</span>
        <span><SparkIcon />{labels.experts}</span>
        <span className="v2-demo-nav-gap"><SearchIcon />{labels.search}</span>
      </div>
      <p className="v2-demo-sidebar-label">{labels.project}</p>
      <span className="v2-demo-project"><FolderIcon />project</span>
      <p className="v2-demo-sidebar-label">{labels.conversation}</p>
      <span className="v2-demo-conversation is-selected">{copy.demo.title}</span>
      <span className="v2-demo-settings"><SettingsIcon />{labels.settings}</span>
    </aside>
  );
}

function PermissionCard({ copy }: Pick<HeroDemoProps, "copy">) {
  return (
    <section className="v2-permission-card" aria-label={copy.demo.permissionAnnouncement}>
      <div className="v2-permission-tool"><span><TerminalIcon /></span>{copy.demo.tool}</div>
      <div className="v2-permission-command">
        <code>{copy.demo.command}</code>
        <CopyIcon />
      </div>
      <div className="v2-permission-actions">
        <span className="v2-demo-button v2-demo-button-ghost">
          {copy.demo.deny}
        </span>
        <span className="v2-demo-button v2-demo-button-dark is-preview-active">
          {copy.demo.approve}
        </span>
      </div>
    </section>
  );
}

export function HeroDemo({ copy, onStateChange }: HeroDemoProps) {
  const [state, setState] = useState<V2DemoState>("idle");
  const [typedLength, setTypedLength] = useState(0);
  const reducedMotion = useReducedMotion();
  const progress = stateProgress(state);

  const transition = useCallback((next: V2DemoState) => {
    setState(next);
    onStateChange?.(next);
  }, [onStateChange]);

  const start = useCallback(() => {
    setTypedLength(0);
    transition(reducedMotion ? "complete" : "typing");
  }, [reducedMotion, transition]);

  const replay = useCallback(() => {
    setTypedLength(0);
    transition("idle");
  }, [transition]);

  useEffect(() => {
    if (state !== "idle") return;
    const timer = window.setTimeout(start, 700);
    return () => window.clearTimeout(timer);
  }, [start, state]);

  useEffect(() => {
    if (state !== "typing") return;
    if (typedLength >= copy.demo.sampleTask.length) {
      const timer = window.setTimeout(() => transition("planning"), 360);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(
      () => setTypedLength(length => Math.min(length + 1, copy.demo.sampleTask.length)),
      24,
    );
    return () => window.clearTimeout(timer);
  }, [copy.demo.sampleTask.length, state, transition, typedLength]);

  useEffect(() => {
    if (state !== "planning") return;
    const timer = window.setTimeout(() => transition("approval"), 2200);
    return () => window.clearTimeout(timer);
  }, [state, transition]);

  useEffect(() => {
    if (state !== "approval") return;
    const timer = window.setTimeout(() => transition("working"), 1600);
    return () => window.clearTimeout(timer);
  }, [state, transition]);

  useEffect(() => {
    if (state !== "working") return;
    const timer = window.setTimeout(() => transition("complete"), 1900);
    return () => window.clearTimeout(timer);
  }, [state, transition]);

  useEffect(() => {
    if (state !== "complete" || reducedMotion) return;
    const timer = window.setTimeout(replay, 3600);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, replay, state]);

  const announcement =
    state === "planning"
      ? copy.demo.milestones.planning
      : state === "approval"
        ? copy.demo.milestones.approval
        : state === "complete"
          ? copy.demo.milestones.complete
          : "";

  const topStatus =
    state === "idle" || state === "typing"
      ? copy.demo.waiting
      : state === "complete"
        ? copy.demo.completed
        : copy.demo.inProgress;

  return (
    <div className={`v2-demo-frame is-${state}`} data-state={state}>
      <p className="v2-sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
      <DemoSidebar copy={copy} />
      <div className="v2-demo-main">
        <header className="v2-demo-topbar">
          <WindowIcon />
          <strong>{copy.demo.title}</strong>
          <span className={state === "complete" ? "is-complete" : ""}>
            {state === "complete" ? <i /> : null}{topStatus}
          </span>
          <span className="v2-demo-window-controls" aria-hidden="true"><i /><b /><em>×</em></span>
        </header>

        <div className="v2-demo-conversation-rail">
          {state === "idle" ? (
            <div className="v2-demo-empty">
              <img src="/zhiyuan-logo.svg" alt="" />
              <p>{copy.demo.sampleTask}</p>
            </div>
          ) : null}

          {state !== "idle" ? (
            <div className="v2-demo-user-message">
              {state === "typing" ? copy.demo.sampleTask.slice(0, typedLength) : copy.demo.sampleTask}
              {state === "typing" ? <span className="v2-demo-caret" aria-hidden="true" /> : null}
            </div>
          ) : null}

          {progress >= 2 || state === "planning" ? (
            <div className="v2-demo-assistant">
              <p>{copy.demo.assistantIntro}</p>
              <ol className="v2-demo-tool-chain">
                {copy.demo.steps.map((step, index) => {
                  const completed = index < progress - 1 || state === "approval" || state === "complete";
                  const current = (state === "planning" && index === 2) || (state === "working" && index === 2);
                  return (
                    <li key={step} className={completed ? "is-complete" : current ? "is-current" : ""}>
                      <span>{completed ? <CheckIcon /> : current ? <i /> : null}</span>
                      {index === 2 && state === "working" ? copy.demo.working : step}
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : null}

          {state === "approval" ? <PermissionCard copy={copy} /> : null}

          {state === "working" ? <p className="v2-demo-working-note"><span />{copy.demo.added}</p> : null}

          {state === "complete" ? (
            <div className="v2-demo-result">
              <p>{copy.demo.result}</p>
                <article className="v2-demo-artifact">
                  <div className="v2-demo-artifact-title">
                    <FileIcon />
                    <div><strong>{copy.demo.artifact}</strong><span>{copy.demo.artifactMeta}</span></div>
                  </div>
                  <div className="v2-demo-chart" aria-hidden="true">
                    <svg viewBox="0 0 170 72">
                      <path className="grid" d="M0 12h170M0 36h170M0 60h170" />
                      <path className="line" d="m4 58 28-18 25 7 25-24 27 17 27-30 30 8" />
                    </svg>
                    <span>{copy.demo.confirmationCount}</span>
                  </div>
                </article>
            </div>
          ) : null}
        </div>

        <div className="v2-demo-input-wrap">
          <div className="v2-demo-input">
            <span>{state === "typing" ? copy.demo.sampleTask.slice(0, typedLength) : copy.demo.placeholder}</span>
            <div>
              <span><PlusIcon />{copy.demo.permissions}<ChevronDownIcon /></span>
              <span className="v2-demo-model">{copy.demo.model}<ChevronDownIcon /></span>
              <span className="v2-demo-send" aria-hidden="true"><SendIcon /></span>
            </div>
          </div>
        </div>
      </div>
      <div className="v2-demo-disclosure">
        <ShieldIcon />
        <span>{copy.home.demoDisclosure}</span>
      </div>
    </div>
  );
}
