import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import type { EditorialCopy } from "./copy";
import { Icon } from "./icons";
import { cn } from "../lib/utils";

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
    <section
      className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28"
      id="workbench"
      aria-labelledby="workbench-title"
    >
      <div className="relative overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_20px_60px_rgb(12_18_34/0.10)]">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-4 py-3 md:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/5" />
            </span>
            <span className="flex min-w-0 items-center gap-1.5 font-mono text-[var(--fs-micro)] text-muted">
              <Icon name="folder" size={15} className="shrink-0" />
              <span className="truncate">{copy.workbenchPath}</span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1 font-mono text-[var(--fs-micro)] tnum text-sky-600">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-accent-2"
                aria-hidden="true"
                animate={
                  busy
                    ? { opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }
                    : { opacity: 1, scale: 1 }
                }
                transition={
                  busy
                    ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.2 }
                }
              />
              {copy.enginePill}
            </span>
            <Icon name="tune" size={18} className="text-muted" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)]">
          <div className="flex flex-col gap-4 border-b border-hairline bg-mist p-4 md:border-b-0 md:border-r md:p-5">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-semibold text-ink">
                  {copy.sideTitle}
                </span>
                <span className="font-mono text-[var(--fs-micro)] tnum text-muted">
                  {sideState}
                </span>
              </div>
              <ol className="mt-4 flex flex-col gap-2">
                {copy.flowSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className={
                      index < completeSteps
                        ? "rounded-xl border border-hairline bg-white p-3.5"
                        : index === activeStep
                          ? "rounded-xl border border-hairline border-l-accent bg-[rgb(79_70_229/0.06)] p-3.5"
                          : "rounded-xl border border-hairline bg-white/60 p-3.5"
                    }
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[var(--fs-micro)] tnum",
                          index < completeSteps
                            ? "border-transparent bg-emerald-50 text-emerald-600"
                            : "border-hairline bg-white text-muted",
                        )}
                        aria-hidden="true"
                      >
                        {index < completeSteps ? (
                          <Icon name="check" size={13} />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-[13px] font-semibold text-ink">
                            {step.title}
                          </h3>
                          <span
                            className={
                              complete && index === 1
                                ? "rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[var(--fs-micro)] tnum text-emerald-600"
                                : complete && index === 2
                                  ? "rounded-full bg-[rgb(79_70_229/0.08)] px-2 py-0.5 font-mono text-[var(--fs-micro)] tnum text-accent"
                                  : "rounded-full border border-hairline bg-mist px-2 py-0.5 font-mono text-[var(--fs-micro)] tnum text-muted"
                            }
                          >
                            {step.badge}
                          </span>
                        </div>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              {stage === "stopped" ? (
                <p
                  className="mt-3 font-mono text-[var(--fs-micro)] text-muted"
                  role="status"
                >
                  {copy.denied}
                </p>
              ) : null}
            </div>
            <div
              className="overflow-hidden rounded-xl bg-ink p-3.5 font-mono text-[var(--fs-micro)] leading-relaxed md:mt-auto"
              aria-hidden={stage === "idle"}
            >
              <div className="flex items-center justify-between gap-3 text-white/50">
                <span className="tnum">{copy.logTitle}</span>
                <span className="tnum">{copy.logPid}</span>
              </div>
              <div className="mt-2 overflow-x-auto whitespace-nowrap tnum text-[rgb(148_197_255/0.9)]">
                {copy.logLines[0]}
              </div>
              <div className="overflow-x-auto whitespace-nowrap tnum text-[rgb(52_211_153/0.9)]">
                {copy.logLines[1]}
              </div>
            </div>
          </div>
          <div
            className="flex min-w-0 flex-col"
            id="scenario-panel"
            role="tabpanel"
            aria-labelledby={`scenario-${selected}`}
          >
            <div
              className="flex gap-1 overflow-x-auto border-b border-hairline px-2 md:px-4"
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
                  className={cn(
                    "-mb-px inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 pb-2.5 pt-3 text-[13px] transition-colors",
                    selected === index
                      ? "border-accent font-medium text-ink"
                      : "border-transparent text-muted hover:text-ink",
                  )}
                >
                  <Icon name={TAB_ICONS[index]} size={14} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="flex-1 p-4 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="font-mono text-[var(--fs-micro)] uppercase tracking-[0.08em] text-accent">
                    {copy.docOverline}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-ink">
                    {scenario.label}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-mist px-2.5 py-0.5 font-mono text-[var(--fs-micro)] tnum text-muted">
                    <Icon name="description" size={12} />
                    {scenario.filename}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-mist"
                    onClick={copyMarkdown}
                  >
                    <Icon name="copy" size={15} />
                    {copied ? copy.copiedCommand : copy.copyMarkdown}
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-mist"
                    onClick={exportReport}
                  >
                    <Icon name="share" size={15} />
                    {copy.exportReport}
                  </button>
                </div>
              </div>
              {complete ? (
                <>
                  <div className="mt-5 rounded-xl bg-mist p-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[var(--fs-micro)] uppercase tracking-[0.08em] text-accent">
                      <Icon name="summarize" size={16} />
                      {copy.summaryLabel}
                    </span>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink/80">
                      {scenario.summary}
                    </p>
                  </div>
                  {scenario.table ? (
                    <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
                      <table className="w-full min-w-[520px] text-left text-[13px]">
                        <thead>
                          <tr className="bg-mist">
                            {scenario.table.headers.map((header) => (
                              <th
                                key={header}
                                scope="col"
                                className="px-3.5 py-2.5 font-mono text-[var(--fs-micro)] font-medium tracking-wide text-muted"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {scenario.table.rows.map((row, rowIndex) => (
                            <tr key={row[0]} className="border-t border-hairline">
                              {row.map((cell, cellIndex) =>
                                cellIndex === row.length - 1 ? (
                                  <td key={cellIndex} className="px-3.5 py-2.5">
                                    <span
                                      className={
                                        scenario.table?.tones?.[rowIndex] ===
                                        "primary"
                                          ? "inline-flex items-center whitespace-nowrap rounded-full bg-[rgb(79_70_229/0.08)] px-2.5 py-0.5 font-mono text-[var(--fs-micro)] tnum text-accent"
                                          : "inline-flex items-center whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[var(--fs-micro)] tnum text-emerald-600"
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
                                        ? "px-3.5 py-2.5 font-medium text-ink"
                                        : cellIndex === 2
                                          ? "px-3.5 py-2.5 font-mono tnum text-muted"
                                          : "px-3.5 py-2.5 font-mono tnum text-ink"
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
                  <div className="mt-5">
                    <h4 className="text-[13px] font-semibold text-ink">
                      {copy.actionTitle}
                    </h4>
                    <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                      {scenario.items.map((item) => (
                        <div
                          className="flex items-start gap-2.5 rounded-xl border border-hairline bg-white p-3"
                          key={item.title}
                        >
                          <Icon
                            name="check-circle"
                            size={18}
                            className="mt-0.5 shrink-0 text-emerald-600"
                          />
                          <div className="min-w-0">
                            <p className="text-[13px] font-medium leading-snug text-ink">
                              {item.title}
                            </p>
                            <span className="mt-0.5 block font-mono text-[var(--fs-micro)] text-muted">
                              {item.meta}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className="flex flex-col items-center justify-center gap-2.5 py-20 text-center"
                  role="status"
                >
                  <Icon name="description" size={22} className="text-muted" />
                  <p className="text-[13px] text-muted">
                    {stage === "stopped"
                      ? copy.denied
                      : busy
                        ? copy.running
                        : copy.waiting}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 border-t border-hairline px-4 py-3.5 md:px-6">
              <div className="flex min-w-0 flex-1 items-center gap-3 text-muted">
                <Icon name="add-circle" size={18} className="shrink-0" />
                <Icon name="attach" size={18} className="shrink-0" />
                <span className="truncate text-[13px]">{copy.composerHint}</span>
              </div>
              <motion.button
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-white transition-colors",
                  busy ? "cursor-default opacity-80" : "hover:bg-accent/90",
                )}
                ref={runButton}
                aria-disabled={busy}
                onClick={() => {
                  if (!busy) setStage("reading");
                }}
                animate={busy ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                transition={
                  busy
                    ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.15 }
                }
              >
                <span>
                  {busy
                    ? copy.running
                    : stage === "idle" || stage === "stopped"
                      ? copy.run
                      : copy.replay}
                </span>
                <Icon name="arrow-upward" size={16} />
              </motion.button>
            </div>
          </div>
        </div>
        {stage === "approval" ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[rgb(255_255_255/0.9)] p-4">
            <div
              className="w-full max-w-sm rounded-2xl border border-hairline bg-white p-5 shadow-[0_20px_60px_rgb(12_18_34/0.10)]"
              role="group"
              aria-label={copy.approval}
            >
              <p className="text-[13px] font-semibold text-ink">
                {copy.approval}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                {copy.approvalBody}
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                <button
                  className="rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent/90"
                  ref={allowButton}
                  onClick={() => setStage("writing")}
                >
                  {copy.allow}
                </button>
                <button
                  className="rounded-full border border-hairline bg-white px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-mist"
                  onClick={() => setStage("stopped")}
                >
                  {copy.deny}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <p className="mt-4 text-center text-[var(--fs-micro)] text-muted">
        {copy.demoNote}
      </p>
    </section>
  );
}
