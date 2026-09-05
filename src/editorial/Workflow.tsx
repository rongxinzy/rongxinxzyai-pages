import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { SiteLocale } from "../shared/site-types";
import type { EditorialCopy } from "./copy";
import { Arrow } from "./SiteChrome";
import { Icon } from "./Icon";

const SCENARIOS = {
  "zh-CN": [
    {
      label: "整理资料",
      prompt: "整理项目资料，形成一份有来源的摘要。",
      tasks: ["读取项目文件", "提取要点与来源", "生成项目摘要.md"],
      title: "项目摘要",
      filename: "项目摘要.md",
      content:
        "# 项目摘要\n\n> 知远官网演示 · 以下为示例数据\n\n## 本周进展\n完成需求梳理，整理了界面草图与待确认事项。\n\n## 下一步\n确认首轮测试范围，并准备演示材料。\n\n## 待确认\n测试日期与参与人员尚未确定。\n\n## 来源\n- 示例会议纪要.md\n- 示例项目进度表.csv",
      preview: [
        {
          heading: "本周进展",
          body: "完成需求梳理，整理界面草图与待确认事项。",
        },
        { heading: "下一步", body: "确认首轮测试范围，准备演示材料。" },
        { heading: "来源", body: "示例会议纪要.md · 示例项目进度表.csv" },
      ],
    },
    {
      label: "处理表格",
      prompt: "检查费用表，按类别汇总并标出缺失项。",
      tasks: ["读取示例费用表", "核对分类与缺失值", "生成费用汇总.csv"],
      title: "费用汇总",
      filename: "费用汇总.csv",
      content:
        "类别,金额,备注\n办公用品,320,示例数据\n交通,180,示例数据\n餐饮,待确认,原始记录缺少金额\n",
      preview: [
        { heading: "分类汇总", body: "办公用品 320 元 · 交通 180 元" },
        { heading: "待确认", body: "一条餐饮记录缺少金额，未计入合计。" },
        { heading: "来源", body: "示例费用表.csv · 演示数据" },
      ],
    },
    {
      label: "研究代码",
      prompt: "梳理项目入口，写出模块关系与阅读顺序。",
      tasks: ["读取示例目录", "梳理模块与调用关系", "生成代码导读.md"],
      title: "代码导读",
      filename: "代码导读.md",
      content:
        "# 代码导读\n\n> 知远官网演示 · 虚构示例项目\n\n## 入口\nsrc/main.tsx 挂载应用。\n\n## 模块关系\nApp 组合页面，components 存放界面组件。\n\n## 阅读顺序\n1. main.tsx\n2. App.tsx\n3. components/\n\n未运行该示例项目，运行行为需另行验证。",
      preview: [
        { heading: "应用入口", body: "main.tsx 挂载应用，App 组合页面。" },
        { heading: "阅读顺序", body: "入口 → 页面 → 组件 → 数据处理" },
        { heading: "验证边界", body: "演示项目未运行，运行行为需另行验证。" },
      ],
    },
  ],
  en: [
    {
      label: "Organize research",
      prompt: "Turn the project files into a summary with sources.",
      tasks: [
        "Read project files",
        "Extract findings and sources",
        "Create project-summary.md",
      ],
      title: "Project summary",
      filename: "project-summary.md",
      content:
        "# Project summary\n\n> ZhiYuan website demo — sample data\n\n## Progress\nRequirements and interface sketches are ready.\n\n## Next steps\nConfirm the first test scope and prepare demo material.\n\n## Open questions\nTest dates and participants are unconfirmed.\n\n## Sources\n- sample-meeting-notes.md\n- sample-progress.csv",
      preview: [
        {
          heading: "Progress",
          body: "Requirements and interface sketches are ready.",
        },
        {
          heading: "Next steps",
          body: "Confirm the test scope and prepare demo material.",
        },
        {
          heading: "Sources",
          body: "sample-meeting-notes.md · sample-progress.csv",
        },
      ],
    },
    {
      label: "Work with tables",
      prompt: "Group expenses by category and flag missing values.",
      tasks: [
        "Read sample expenses",
        "Check categories and missing values",
        "Create expenses.csv",
      ],
      title: "Expense summary",
      filename: "expenses.csv",
      content:
        "Category,Amount,Note\nOffice supplies,320,Sample data\nTravel,180,Sample data\nMeals,Unconfirmed,Missing amount in source\n",
      preview: [
        { heading: "By category", body: "Office supplies: 320 · Travel: 180" },
        {
          heading: "Needs review",
          body: "One meal expense has no amount and is excluded.",
        },
        { heading: "Source", body: "sample-expenses.csv · Demo data" },
      ],
    },
    {
      label: "Explore code",
      prompt: "Map the entry points, modules and reading order.",
      tasks: [
        "Read the sample directory",
        "Map modules and dependencies",
        "Create code-guide.md",
      ],
      title: "Code guide",
      filename: "code-guide.md",
      content:
        "# Code guide\n\n> ZhiYuan website demo — fictional project\n\n## Entry point\nsrc/main.tsx mounts the application.\n\n## Modules\nApp composes pages; components contains UI components.\n\n## Reading order\n1. main.tsx\n2. App.tsx\n3. components/\n\nThis project has not been executed. Runtime behavior is unverified.",
      preview: [
        {
          heading: "Entry point",
          body: "main.tsx mounts the app. App composes the pages.",
        },
        {
          heading: "Reading order",
          body: "Entry point → Pages → Components → Data",
        },
        {
          heading: "Verification boundary",
          body: "Sample code has not been run. Runtime behavior is unverified.",
        },
      ],
    },
  ],
};
type Scenario = (typeof SCENARIOS)["zh-CN"][number];
type Stage =
  "idle" | "reading" | "approval" | "writing" | "complete" | "stopped";

function Workbench({
  scenario,
  copy,
}: {
  scenario: Scenario;
  copy: EditorialCopy;
}) {
  const [stage, setStage] = useState<Stage>("idle");
  useEffect(() => {
    if (stage !== "reading" && stage !== "writing") return;
    const timer = window.setTimeout(
      () => setStage(stage === "reading" ? "approval" : "complete"),
      900,
    );
    return () => window.clearTimeout(timer);
  }, [stage]);
  const busy = stage === "reading" || stage === "writing";
  const finished = stage === "complete";
  const status = finished
    ? copy.done
    : stage === "approval"
      ? copy.approval
      : stage === "stopped"
        ? copy.denied
        : busy
          ? copy.running
          : copy.ready;
  const completedSteps = finished
    ? 3
    : stage === "idle"
      ? 0
      : stage === "reading"
        ? 1
        : 2;
  return (
    <div className="workbench">
      <div className="workbench-bar">
        <span>
          {copy.sampleLabel} / {scenario.label}
        </span>
        <span>{copy.demoLabel}</span>
      </div>
      <div className="workbench-content">
        <div className="task-process">
          <h3>{scenario.prompt}</h3>
          <ol className="task-rows">
            {scenario.tasks.map((task, index) => (
              <li
                key={task}
                className={index < completedSteps ? "is-complete" : ""}
              >
                <span className="task-file" aria-hidden="true">
                  <Icon
                    name={
                      index === 2 ? "code" : index === 1 ? "search" : "file"
                    }
                  />
                </span>
                <span>{task}</span>
                <span className="task-check" aria-hidden="true">
                  {index < completedSteps ? "✓" : "·"}
                </span>
              </li>
            ))}
          </ol>
          <div className="task-status" role="status" aria-live="polite">
            {status}
          </div>
          {stage === "approval" ? (
            <div className="approval-box">
              <p>{copy.approvalBody}</p>
              <div>
                <button
                  className="button button-small"
                  onClick={() => setStage("writing")}
                >
                  {copy.allow}
                  <Arrow />
                </button>
                <button
                  className="plain-button"
                  onClick={() => setStage("stopped")}
                >
                  {copy.deny}
                </button>
              </div>
            </div>
          ) : (
            <div className="run-action">
              <button
                className="button button-small"
                disabled={busy}
                onClick={() => setStage("reading")}
              >
                {busy
                  ? copy.running
                  : stage === "idle"
                    ? copy.run
                    : copy.replay}
                <Arrow />
              </button>
            </div>
          )}
        </div>
        <div
          className={`result-sheet ${finished ? "is-ready" : ""}`}
          aria-label={copy.preview}
        >
          <div className="paper-corner" aria-hidden="true" />
          {finished ? (
            <>
              <h3>{scenario.title}</h3>
              {scenario.preview.map((item) => (
                <div className="result-paragraph" key={item.heading}>
                  <h4>{item.heading}</h4>
                  <p>{item.body}</p>
                </div>
              ))}
              <a
                className="result-download"
                download={scenario.filename}
                href={`data:text/${scenario.filename.endsWith("csv") ? "csv" : "markdown"};charset=utf-8,${encodeURIComponent("\uFEFF" + scenario.content)}`}
              >
                <span>{scenario.filename}</span>
                <span>
                  {copy.downloadSample}
                  <Arrow down />
                </span>
              </a>
            </>
          ) : (
            <div className="result-empty">
              <span aria-hidden="true">↳</span>
              <h3>{copy.preview}</h3>
              <p>{copy.waiting}</p>
              <div className="paper-lines" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="demo-note">{copy.demoNote}</p>
    </div>
  );
}

export function Workflow({
  locale,
  copy,
}: {
  locale: SiteLocale;
  copy: EditorialCopy;
}) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const scenarios = SCENARIOS[locale];
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % scenarios.length;
    else if (event.key === "ArrowLeft")
      next = (index + scenarios.length - 1) % scenarios.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = scenarios.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }
  return (
    <section
      className="workflow wrap section-space"
      id="workflow"
      aria-labelledby="workflow-title"
    >
      <span id="product" className="anchor-alias" />
      <div className="section-heading">
        <h2 id="workflow-title" className="workflow-title">
          {locale === "en" ? (
            copy.workflow
          ) : (
            <>
              <span>从一句交代，</span>
              <span>到一份成果。</span>
            </>
          )}
        </h2>
        <span>
          {copy.workflowLabel} <i>/ 01</i>
        </span>
      </div>
      <div
        className="scenario-tabs"
        role="tablist"
        aria-label={copy.sampleLabel}
      >
        {scenarios.map((scenario, index) => (
          <button
            ref={(element) => {
              tabs.current[index] = element;
            }}
            key={scenario.label}
            role="tab"
            id={`scenario-${index}`}
            aria-selected={selected === index}
            aria-controls="scenario-panel"
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKey(event, index)}
          >
            {scenario.label}
          </button>
        ))}
      </div>
      <div className="workflow-layout">
        <ol className="workflow-steps">
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <span className="index-number">0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div
          id="scenario-panel"
          role="tabpanel"
          aria-labelledby={`scenario-${selected}`}
        >
          <Workbench
            key={`${locale}-${selected}`}
            scenario={scenarios[selected]}
            copy={copy}
          />
        </div>
      </div>
    </section>
  );
}
