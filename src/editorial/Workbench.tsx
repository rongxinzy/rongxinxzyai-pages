import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { EditorialCopy } from "./copy";
import { Icon } from "./icons";

const TAB_ICONS = ["description", "table", "code-blocks"] as const;

type Stage =
  | "idle"
  | "reading"
  | "approval"
  | "writing"
  | "complete"
  | "stopped";

export function Workbench({ copy }: { copy: EditorialCopy }) {
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState<Stage>("complete");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const runButton = useRef<HTMLButtonElement>(null);
  const allowButton = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const scenario = copy.scenarios[selected];

  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = copy.scenarios.length;
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % count;
    else if (event.key === "ArrowLeft") next = (index + count - 1) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    select(next);
  }

  function select(index: number) {
    setSelected(index);
    setStage("idle");
    setCopied(false);
  }

  useEffect(() => {
    if (stage !== "reading" && stage !== "writing") return;
    const timer = window.setTimeout(
      () => setStage(stage === "reading" ? "approval" : "complete"),
      900,
    );
    return () => window.clearTimeout(timer);
  }, [stage]);

  const previousStage = useRef<Stage | null>(null);
  useEffect(() => {
    const previous = previousStage.current;
    previousStage.current = stage;
    if (previous === null || previous === stage) return;
    if (stage === "approval") allowButton.current?.focus({ preventScroll: true });
    if (stage === "complete") runButton.current?.focus({ preventScroll: true });
  }, [stage]);

  const busy =
    stage === "reading" || stage === "approval" || stage === "writing";
  const complete = stage === "complete";
  const activeStep =
    stage === "reading" ? 0 : stage === "writing" || complete ? 2 : -1;
  const completeSteps =
    stage === "idle" ? 0 : stage === "reading" ? 0 : stage === "stopped" ? 2 : 2;
  const sideState = complete
    ? copy.sideStateDone
    : stage === "idle" || stage === "stopped"
      ? copy.sideStateIdle
      : copy.sideStateRunning;

  function copyMarkdown() {
    const text = scenario.content;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function exportReport() {
    const anchor = document.createElement("a");
    anchor.download = scenario.filename;
    anchor.href = `data:text/${scenario.filename.endsWith("csv") ? "csv" : "markdown"};charset=utf-8,${encodeURIComponent("\uFEFF" + scenario.content)}`;
    anchor.click();
  }

  return (
    <section className="workstation wrap" id="workbench" aria-labelledby="workbench-title">
      <div className="workstation-frame">
        <div className="workstation-titlebar">
          <div className="titlebar-left">
            <span className="traffic" aria-hidden="true">
              <span className="t-close" />
              <span className="t-warn" />
              <span className="t-ok" />
            </span>
            <span className="titlebar-path">
              <Icon name="folder" size={15} />
              {copy.workbenchPath}
            </span>
          </div>
          <div
            className="workstation-tabs"
            role="tablist"
            aria-label={copy.sideTitle}
            aria-labelledby="workbench-title"
          >
            <span id="workbench-title" hidden>
              {copy.sideTitle}
            </span>
            {copy.scenarios.map((item, index) => (
              <button
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                key={item.label}
                role="tab"
                id={`scenario-${index}`}
                aria-selected={selected === index}
                aria-controls="scenario-panel"
                tabIndex={selected === index ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => onKey(event, index)}
              >
                <Icon name={TAB_ICONS[index]} size={14} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="titlebar-right">
            <span className="engine-pill">
              <span className="pill-dot" />
              {copy.enginePill}
            </span>
            <Icon name="tune" size={18} />
          </div>
        </div>
        <div className="workstation-grid">
          <div className="workstation-side">
            <div>
              <div className="side-header">
                <span className="side-title">{copy.sideTitle}</span>
                <span className="side-state">{sideState}</span>
              </div>
              <ol className="flow-steps">
                {copy.flowSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className={
                      index < completeSteps
                        ? "flow-step is-complete"
                        : index === activeStep
                          ? "flow-step is-active"
                          : "flow-step"
                    }
                  >
                    <div className="flow-step-head">
                      <span className="step-index" aria-hidden="true">
                        {index + 1}
                      </span>
                      <div className="step-body">
                        <div className="step-title-row">
                          <h3>{step.title}</h3>
                          <span
                            className={
                              complete && index === 1
                                ? "chip chip-pass"
                                : complete && index === 2
                                  ? "chip chip-done"
                                  : "chip"
                            }
                          >
                            {step.badge}
                          </span>
                        </div>
                        <p className="step-desc">{step.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              {stage === "approval" ? (
                <div className="approval-box" role="group" aria-label={copy.approval}>
                  <p>{copy.approvalBody}</p>
                  <div>
                    <button
                      className="btn btn-sm"
                      ref={allowButton}
                      onClick={() => setStage("writing")}
                    >
                      {copy.allow}
                    </button>
                    <button
                      className="plain-button"
                      onClick={() => setStage("stopped")}
                    >
                      {copy.deny}
                    </button>
                  </div>
                </div>
              ) : null}
              {stage === "stopped" ? (
                <p className="approval-denied" role="status">
                  {copy.denied}
                </p>
              ) : null}
            </div>
            <div className="runner-log" aria-hidden={stage === "idle"}>
              <div className="log-head">
                <span>{copy.logTitle}</span>
                <span>{copy.logPid}</span>
              </div>
              <div className="log-line log-model">{copy.logLines[0]}</div>
              <div className="log-line log-tokens">{copy.logLines[1]}</div>
            </div>
          </div>
          <div className="workstation-canvas" id="scenario-panel" role="tabpanel" aria-labelledby={`scenario-${selected}`}>
            <div>
              <div className="canvas-doc-head">
                <div>
                  <span className="doc-overline">{copy.docOverline}</span>
                  <h3>{scenario.label}</h3>
                </div>
                <div className="doc-actions">
                  <button
                    type="button"
                    className="btn btn-sm btn-ghosty"
                    onClick={copyMarkdown}
                  >
                    <Icon name="copy" size={15} />
                    {copied ? copy.copiedCommand : copy.copyMarkdown}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-accent"
                    onClick={exportReport}
                  >
                    <Icon name="share" size={15} />
                    {copy.exportReport}
                  </button>
                </div>
              </div>
              {complete ? (
                <>
                  <div className="doc-summary">
                    <span className="overline">
                      <Icon name="summarize" size={16} />
                      {copy.summaryLabel}
                    </span>
                    <p>{scenario.summary}</p>
                  </div>
                  {scenario.table ? (
                    <div className="doc-table-wrap">
                      <table className="doc-table">
                        <thead>
                          <tr>
                            {scenario.table.headers.map((header) => (
                              <th key={header} scope="col">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {scenario.table.rows.map((row, rowIndex) => (
                            <tr key={row[0]}>
                              {row.map((cell, cellIndex) =>
                                cellIndex === row.length - 1 ? (
                                  <td key={cellIndex}>
                                    <span
                                      className={
                                        scenario.table?.tones?.[rowIndex] ===
                                        "primary"
                                          ? "chip pill-fixed"
                                          : "chip pill-fixed-green"
                                      }
                                    >
                                      {cell}
                                    </span>
                                  </td>
                                ) : (
                                  <td
                                    key={cellIndex}
                                    className={
                                      cellIndex === 0
                                        ? undefined
                                        : cellIndex === 2
                                          ? "t-mono text-tertiary"
                                          : "t-mono"
                                    }
                                  >
                                    {cell}
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                  <div className="doc-tasks">
                    <h4>{copy.actionTitle}</h4>
                    <div className="doc-tasks-grid">
                      {scenario.items.map((item) => (
                        <div className="doc-task" key={item.title}>
                          <Icon name="check-circle" size={18} />
                          <div>
                            <p>{item.title}</p>
                            <span className="task-assignee">{item.meta}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="doc-waiting" role="status">
                  <Icon name="description" size={22} />
                  <p>
                    {stage === "stopped"
                      ? copy.denied
                      : busy
                        ? copy.running
                        : copy.waiting}
                  </p>
                </div>
              )}
            </div>
            <div className="composer">
              <div className="composer-side">
                <Icon name="add-circle" size={18} />
                <Icon name="attach" size={18} />
                <span className="composer-hint">{copy.composerHint}</span>
              </div>
              <button
                className="btn-accent"
                ref={runButton}
                aria-disabled={busy}
                onClick={() => {
                  if (!busy) setStage("reading");
                }}
              >
                <span>
                  {busy
                    ? copy.running
                    : stage === "idle" || stage === "stopped"
                      ? copy.run
                      : copy.replay}
                </span>
                <Icon name="arrow-upward" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="inference-note">{copy.demoNote}</p>
    </section>
  );
}
