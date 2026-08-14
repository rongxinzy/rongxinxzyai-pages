import { useEffect, useRef, useState, type ReactNode } from "react";
import type { V2Locale } from "./types";
import {
  CheckIcon,
  ClockIcon,
  FileIcon,
  FolderIcon,
  SearchIcon,
  SettingsIcon,
  SparkIcon,
  TerminalIcon,
} from "./Icons";

export type ProductDemoVariant = "workspace" | "models" | "skills";

type AmbientProductDemoProps = {
  locale: V2Locale;
  variant: ProductDemoVariant;
  className?: string;
};

const COPY = {
  "zh-CN": {
    aria: {
      workspace: "自动演示：知远读取材料并生成项目周报",
      models: "自动演示：知远下载并加载本地模型",
      skills: "自动演示：知远安装并启用技能",
    },
    nav: ["工作", "对话", "本地推理", "自动化", "专家"],
    project: "项目",
    settings: "设置",
    workspace: {
      title: "整理项目周报",
      task: "读取会议纪要和进度表，整理本周汇报。",
      steps: ["读取 3 份材料", "整理项目时间线", "生成进展图表"],
      result: "本周汇报.md",
      meta: "Markdown · 已保存到工作区",
      status: ["正在读取材料", "正在整理", "正在生成", "已完成"],
    },
    models: {
      title: "本地模型",
      search: "搜索 GGUF 模型",
      models: ["Qwen3 8B", "DeepSeek R1 7B", "Llama 3.2 3B"],
      detail: "Qwen3 8B · Q4_K_M",
      size: "5.2 GB",
      speed: ["准备下载", "18.6 MB/s", "21.3 MB/s", "校验文件"],
      ready: "已就绪 · 可用于 Agent",
    },
    skills: {
      title: "技能中心",
      search: "搜索技能",
      rows: ["网页调研", "文档整理", "项目周报", "浏览器操作"],
      selected: "项目周报",
      body: "读取项目材料，整理进展与待确认事项。",
      steps: ["检查依赖", "写入技能目录", "载入工作空间"],
      enabled: "已启用",
    },
  },
  en: {
    aria: {
      workspace: "Automatic preview: ZhiYuan reads project files and creates a weekly update",
      models: "Automatic preview: ZhiYuan downloads and loads a local model",
      skills: "Automatic preview: ZhiYuan installs and enables a skill",
    },
    nav: ["Work", "Chat", "Local models", "Automation", "Experts"],
    project: "Project",
    settings: "Settings",
    workspace: {
      title: "Project weekly update",
      task: "Read the meeting notes and progress sheet, then draft this week's update.",
      steps: ["Read 3 project files", "Build the project timeline", "Generate the progress chart"],
      result: "weekly-update.md",
      meta: "Markdown · Saved to workspace",
      status: ["Reading files", "Organizing", "Generating", "Complete"],
    },
    models: {
      title: "Local models",
      search: "Search GGUF models",
      models: ["Qwen3 8B", "DeepSeek R1 7B", "Llama 3.2 3B"],
      detail: "Qwen3 8B · Q4_K_M",
      size: "5.2 GB",
      speed: ["Preparing", "18.6 MB/s", "21.3 MB/s", "Verifying files"],
      ready: "Ready · Available to Agent",
    },
    skills: {
      title: "Skills",
      search: "Search skills",
      rows: ["Web research", "Document review", "Weekly update", "Browser control"],
      selected: "Weekly update",
      body: "Read project material and summarize progress and open questions.",
      steps: ["Check dependencies", "Write skill files", "Load into workspace"],
      enabled: "Enabled",
    },
  },
} as const;

function useAmbientPhase(phaseCount: number, delay = 1500) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px", threshold: 0.18 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setPhase(current => (current + 1) % phaseCount), delay);
    return () => window.clearInterval(timer);
  }, [delay, phaseCount, visible]);

  return { rootRef, phase };
}

function DemoShell({
  locale,
  variant,
  phase,
  children,
}: AmbientProductDemoProps & { phase: number; children: ReactNode }) {
  const copy = COPY[locale];
  return (
    <div className={`v2-ambient-shell is-${variant}`} data-phase={phase} role="img" aria-label={copy.aria[variant]}>
      <aside className="v2-ambient-sidebar" aria-hidden="true">
        <div className="v2-ambient-brand"><img src="/zhiyuan-logo.svg" alt="" /><span>知远</span></div>
        <nav>
          {copy.nav.map((item, index) => (
            <span key={item} className={index === (variant === "workspace" ? 0 : variant === "models" ? 2 : 4) ? "is-active" : ""}>
              {index === 2 ? <TerminalIcon /> : index === 3 ? <ClockIcon /> : <SparkIcon />}{item}
            </span>
          ))}
        </nav>
        <p>{copy.project}</p>
        <span className="v2-ambient-project"><FolderIcon />project</span>
        <span className="v2-ambient-settings"><SettingsIcon />{copy.settings}</span>
      </aside>
      <div className="v2-ambient-main">{children}</div>
    </div>
  );
}

function WorkspaceDemo({ locale, phase }: { locale: V2Locale; phase: number }) {
  const copy = COPY[locale].workspace;
  return (
    <DemoShell locale={locale} variant="workspace" phase={phase}>
      <header className="v2-ambient-topbar"><strong>{copy.title}</strong><span className={phase === 3 ? "is-done" : ""}><i />{copy.status[phase]}</span></header>
      <div className="v2-workspace-canvas">
        <div className="v2-ambient-task">{copy.task}</div>
        <div className="v2-ambient-agent-row"><img src="/zhiyuan-logo.svg" alt="" /><span /></div>
        <ol className="v2-ambient-steps">
          {copy.steps.map((step, index) => (
            <li key={step} className={index < phase ? "is-complete" : index === phase ? "is-running" : ""}>
              <span>{index < phase || phase === 3 ? <CheckIcon /> : <i />}</span><strong>{step}</strong><em />
            </li>
          ))}
        </ol>
        <article className={`v2-ambient-artifact ${phase === 3 ? "is-visible" : ""}`}>
          <FileIcon /><div><strong>{copy.result}</strong><span>{copy.meta}</span></div><CheckIcon />
        </article>
      </div>
    </DemoShell>
  );
}

function ModelDemo({ locale, phase }: { locale: V2Locale; phase: number }) {
  const copy = COPY[locale].models;
  const progress = [8, 38, 76, 100][phase];
  return (
    <DemoShell locale={locale} variant="models" phase={phase}>
      <header className="v2-ambient-topbar"><strong>{copy.title}</strong><span><i />{phase === 3 ? copy.ready : copy.speed[phase]}</span></header>
      <div className="v2-model-market-canvas">
        <div className="v2-ambient-search"><SearchIcon />{copy.search}</div>
        <div className="v2-model-layout">
          <div className="v2-model-list">
            {copy.models.map((model, index) => <span key={model} className={index === 0 ? "is-active" : ""}><i>{model.slice(0, 1)}</i><strong>{model}</strong><em /></span>)}
          </div>
          <section className="v2-model-detail">
            <div className="v2-model-orbit"><span>Q</span><i /><i /><i /></div>
            <h3>{copy.detail}</h3><p>{copy.size}</p>
            <div className="v2-model-progress"><span style={{ width: `${progress}%` }} /></div>
            <div className="v2-model-progress-meta"><strong>{phase === 3 ? copy.ready : `${progress}%`}</strong><span>{phase === 3 ? <CheckIcon /> : copy.speed[phase]}</span></div>
          </section>
        </div>
      </div>
    </DemoShell>
  );
}

function SkillsDemo({ locale, phase }: { locale: V2Locale; phase: number }) {
  const copy = COPY[locale].skills;
  return (
    <DemoShell locale={locale} variant="skills" phase={phase}>
      <header className="v2-ambient-topbar"><strong>{copy.title}</strong><span className={phase === 3 ? "is-done" : ""}><i />{phase === 3 ? copy.enabled : copy.steps[Math.min(phase, 2)]}</span></header>
      <div className="v2-skills-canvas">
        <div className="v2-ambient-search"><SearchIcon />{copy.search}</div>
        <div className="v2-skills-layout-inner">
          <div className="v2-skill-library">
            {copy.rows.map((skill, index) => <span key={skill} className={index === 2 ? "is-active" : ""}><SparkIcon /><strong>{skill}</strong><i className={index === 2 && phase === 3 ? "is-on" : ""} /></span>)}
          </div>
          <section className="v2-skill-detail">
            <div className="v2-skill-mark"><SparkIcon /><i /></div>
            <h3>{copy.selected}</h3><p>{copy.body}</p>
            <ol>
              {copy.steps.map((step, index) => <li key={step} className={index < phase || phase === 3 ? "is-complete" : index === phase ? "is-running" : ""}><span>{index < phase || phase === 3 ? <CheckIcon /> : <i />}</span>{step}</li>)}
            </ol>
            <div className={`v2-skill-enable ${phase === 3 ? "is-enabled" : ""}`}><span /><strong>{phase === 3 ? copy.enabled : "…"}</strong></div>
          </section>
        </div>
      </div>
    </DemoShell>
  );
}

export function AmbientProductDemo({ locale, variant, className = "" }: AmbientProductDemoProps) {
  const { rootRef, phase } = useAmbientPhase(4, variant === "models" ? 1350 : 1550);
  return (
    <div ref={rootRef} className={`v2-ambient-demo ${className}`}>
      {variant === "workspace" ? <WorkspaceDemo locale={locale} phase={phase} /> : null}
      {variant === "models" ? <ModelDemo locale={locale} phase={phase} /> : null}
      {variant === "skills" ? <SkillsDemo locale={locale} phase={phase} /> : null}
    </div>
  );
}
