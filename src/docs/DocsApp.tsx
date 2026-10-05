import { useEffect, useMemo, useState } from "react";
import { Header, Footer } from "../editorial/SiteChrome";
import { COPY } from "../editorial/copy";
import { cn } from "../lib/utils";
import { DOCS_NAV, DOCS_SEQUENCE, docsHref, type DocsNavItem } from "./nav";
import type { DocsHeading, DocsPage } from "./types";
import rawContent from "./generated/content.json";

const CONTENT = rawContent as unknown as Record<string, DocsPage>;
const copy = COPY["zh-CN"];

function currentRoute(): string {
  return window.location.pathname.replace(/^\/docs\/?/, "").replace(/\/+$/, "");
}

function SidebarItems({ route, onNavigate }: { route: string; onNavigate?: () => void }) {
  const renderItem = (item: DocsNavItem, nested = false) => {
    if (item.items) {
      return (
        <li key={item.text}>
          <p className="px-3 py-1.5 text-sm text-muted">{item.text}</p>
          <ul className="ml-3 border-l border-hairline pl-2">
            {item.items.map((child) => renderItem(child, true))}
          </ul>
        </li>
      );
    }
    const active = item.route === route;
    return (
      <li key={item.route}>
        <a
          href={docsHref(item.route!)}
          aria-current={active ? "page" : undefined}
          onClick={onNavigate}
          className={cn(
            "block rounded-lg px-3 py-1.5 text-sm transition-colors duration-200",
            nested ? "pl-2" : "",
            active
              ? "bg-mist font-medium text-accent"
              : "text-muted hover:bg-mist hover:text-ink",
          )}
        >
          {item.text}
        </a>
      </li>
    );
  };
  return (
    <>
      {DOCS_NAV.map((group) => (
        <section key={group.text} className="mb-6">
          <h2 className="mb-1.5 px-3 text-[13px] font-medium text-ink">
            {group.text}
          </h2>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => renderItem(item))}
          </ul>
        </section>
      ))}
    </>
  );
}

function Outline({ headings }: { headings: DocsHeading[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    setActive("");
    const targets = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );
    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;
  return (
    <nav aria-label="本页内容" className="flex flex-col gap-0.5">
      <p className="mb-1.5 text-[13px] font-medium text-ink">本页内容</p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={cn(
            "border-l py-1 text-[13px] leading-5 transition-colors duration-200",
            heading.depth === 3 ? "pl-6" : "pl-3",
            active === heading.id
              ? "border-accent text-accent"
              : "border-hairline text-muted hover:text-ink",
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}

function PrevNext({ route }: { route: string }) {
  const index = DOCS_SEQUENCE.findIndex((link) => link.route === route);
  if (index === -1) return null;
  const prev = DOCS_SEQUENCE[index - 1];
  const next = DOCS_SEQUENCE[index + 1];
  if (!prev && !next) return null;
  const card =
    "group flex flex-col gap-1 rounded-xl border border-hairline bg-ground px-4 py-3 transition-colors duration-200 hover:bg-mist";
  return (
    <nav aria-label="上一篇和下一篇" className="mt-14 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <a href={docsHref(prev.route)} className={card}>
          <span className="text-[13px] text-muted">上一篇</span>
          <span className="text-sm font-medium text-ink group-hover:text-accent">
            {prev.text}
          </span>
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a href={docsHref(next.route)} className={cn(card, "sm:text-right")}>
          <span className="text-[13px] text-muted">下一篇</span>
          <span className="text-sm font-medium text-ink group-hover:text-accent">
            {next.text}
          </span>
        </a>
      ) : null}
    </nav>
  );
}

const HOME_GROUPS: Array<{ text: string; route: string; description: string }> = [
  {
    text: "开始使用",
    route: "guide/quick-start",
    description: "下载安装知远，配置模型，创建第一个工作页面。",
  },
  {
    text: "功能介绍",
    route: "guide/work-page",
    description: "工作页面、任务、上下文、技能与模型配置的说明。",
  },
  {
    text: "实战指南",
    route: "capabilities/research",
    description: "按场景组织的使用示例：研究、写作、数据、编程等。",
  },
  {
    text: "常见问题",
    route: "faq",
    description: "安装、模型连接与文件处理中的问题排查。",
  },
  {
    text: "开发者",
    route: "developer",
    description: "开发环境、Skill 开发与项目结构。",
  },
];

function DocsHome() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        知远智能体文档
      </h1>
      <p className="mt-3 text-base leading-7 text-muted">
        安装知远、配置模型、创建任务。
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {HOME_GROUPS.map((group) => (
          <a
            key={group.text}
            href={docsHref(group.route)}
            className="group flex flex-col gap-2 rounded-xl border border-hairline bg-ground p-5 transition-colors duration-200 hover:bg-mist"
          >
            <span className="text-base font-medium text-ink group-hover:text-accent">
              {group.text}
            </span>
            <span className="text-sm leading-6 text-muted">
              {group.description}
            </span>
          </a>
        ))}
      </div>
      <p className="mt-10 text-sm leading-6 text-muted">
        从<CopyLink route="guide/quick-start" text="快速开始" />
        读起，或在左侧目录中选择一篇。
      </p>
    </div>
  );
}

function CopyLink({ route, text }: { route: string; text: string }) {
  return (
    <a href={docsHref(route)} className="text-accent hover:underline">
      {text}
    </a>
  );
}

export function DocsApp() {
  const route = useMemo(currentRoute, []);
  const page = CONTENT[route];
  const isHome = route === "" || !page;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome && page) document.title = `${page.title} · 知远智能体文档`;
  }, [isHome, page]);

  useEffect(() => {
    if (!window.location.hash) return;
    const target = document.getElementById(
      decodeURIComponent(window.location.hash.slice(1)),
    );
    target?.scrollIntoView();
  }, [route]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale="zh-CN" page="home" copy={copy} />
      <div className="mx-auto w-full max-w-7xl flex-1 px-5 pb-20 pt-24">
        <div className="mb-6 lg:hidden">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="docs-sidebar"
            onClick={() => setMenuOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-ground px-4 py-2 text-sm text-ink"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h10" />
            </svg>
            文档目录
          </button>
        </div>
        <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[232px_minmax(0,1fr)_184px]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8 pr-2">
              <a
                href={docsHref("")}
                className={cn(
                  "mb-4 block px-3 text-sm font-medium",
                  isHome ? "text-accent" : "text-ink hover:text-accent",
                )}
              >
                文档首页
              </a>
              <SidebarItems route={route} />
            </div>
          </aside>
          <main className="min-w-0">
            {isHome ? (
              <DocsHome />
            ) : (
              <>
                <article
                  className="docs-prose prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: page.html }}
                />
                <PrevNext route={route} />
              </>
            )}
          </main>
          <aside className="hidden xl:block">
            {!isHome && (
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8">
                <Outline headings={page.headings} />
              </div>
            )}
          </aside>
        </div>
      </div>
      <Footer locale="zh-CN" copy={copy} release={null} releaseStatus="unavailable" />
      {menuOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/20"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="docs-sidebar"
            role="dialog"
            aria-label="文档目录"
            className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-ground p-5 shadow-[0_8px_30px_rgb(12_18_34/0.12)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-ink">文档目录</p>
              <button
                type="button"
                aria-label="关闭目录"
                onClick={() => setMenuOpen(false)}
                className="rounded-full p-1.5 text-muted transition-colors duration-200 hover:bg-mist hover:text-ink"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <a
              href={docsHref("")}
              onClick={() => setMenuOpen(false)}
              className="mb-4 block px-3 text-sm font-medium text-ink"
            >
              文档首页
            </a>
            <SidebarItems route={route} onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
