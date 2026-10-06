import { useEffect, useMemo, useState } from "react";
import { Header, Footer } from "../editorial/SiteChrome";
import { COPY } from "../editorial/copy";
import { cn } from "../lib/utils";
import {
  DOCS_NAV,
  DOCS_NAV_EN,
  DOCS_SEQUENCE,
  DOCS_SEQUENCE_EN,
  docsHref,
  type DocsLocale,
  type DocsNavGroup,
  type DocsNavItem,
  type DocsNavLink,
} from "./nav";
import type { DocsHeading, DocsPage } from "./types";
import rawContent from "./generated/content.json";
import rawContentEn from "./generated/content-en.json";

const CONTENT: Record<DocsLocale, Record<string, DocsPage>> = {
  zh: rawContent as unknown as Record<string, DocsPage>,
  en: rawContentEn as unknown as Record<string, DocsPage>,
};

const UI = {
  zh: {
    outline: "本页内容",
    menu: "文档目录",
    menuClose: "关闭目录",
    home: "文档首页",
    prev: "上一篇",
    next: "下一篇",
    prevNext: "上一篇和下一篇",
    titleSuffix: "知远智能体文档",
    homeTitle: "知远智能体文档",
    homeLead: "安装知远、配置模型、创建任务。",
    homeTailPre: "从",
    homeTailLink: "快速开始",
    homeTailPost: "读起，或在左侧目录中选择一篇。",
  },
  en: {
    outline: "On this page",
    menu: "Docs menu",
    menuClose: "Close menu",
    home: "Docs home",
    prev: "Previous",
    next: "Next",
    prevNext: "Previous and next pages",
    titleSuffix: "ZhiYuan Docs",
    homeTitle: "ZhiYuan Docs",
    homeLead: "Install ZhiYuan, set up models, and create tasks.",
    homeTailPre: "Start with ",
    homeTailLink: "Quick start",
    homeTailPost: ", or pick a page from the sidebar.",
  },
} as const;

type Ui = (typeof UI)[DocsLocale];

const NAV: Record<DocsLocale, DocsNavGroup[]> = { zh: DOCS_NAV, en: DOCS_NAV_EN };
const SEQUENCE: Record<DocsLocale, DocsNavLink[]> = {
  zh: DOCS_SEQUENCE,
  en: DOCS_SEQUENCE_EN,
};

function detectLocale(): DocsLocale {
  return window.location.pathname.startsWith("/en/docs") ? "en" : "zh";
}

function currentRoute(locale: DocsLocale): string {
  return window.location.pathname
    .replace(locale === "en" ? /^\/en\/docs\/?/ : /^\/docs\/?/, "")
    .replace(/\/+$/, "");
}

function SidebarItems({
  route,
  locale,
  onNavigate,
}: {
  route: string;
  locale: DocsLocale;
  onNavigate?: () => void;
}) {
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
          href={docsHref(item.route!, locale)}
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
      {NAV[locale].map((group) => (
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

function Outline({ headings, ui }: { headings: DocsHeading[]; ui: Ui }) {
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
    <nav aria-label={ui.outline} className="flex flex-col gap-0.5">
      <p className="mb-1.5 text-[13px] font-medium text-ink">{ui.outline}</p>
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

function PrevNext({ route, locale, ui }: { route: string; locale: DocsLocale; ui: Ui }) {
  const sequence = SEQUENCE[locale];
  const index = sequence.findIndex((link) => link.route === route);
  if (index === -1) return null;
  const prev = sequence[index - 1];
  const next = sequence[index + 1];
  if (!prev && !next) return null;
  const card =
    "group flex flex-col gap-1 rounded-xl border border-hairline bg-ground px-4 py-3 transition-colors duration-200 hover:bg-mist";
  return (
    <nav aria-label={ui.prevNext} className="mt-14 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <a href={docsHref(prev.route, locale)} className={card}>
          <span className="text-[13px] text-muted">{ui.prev}</span>
          <span className="text-sm font-medium text-ink group-hover:text-accent">
            {prev.text}
          </span>
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a href={docsHref(next.route, locale)} className={cn(card, "sm:text-right")}>
          <span className="text-[13px] text-muted">{ui.next}</span>
          <span className="text-sm font-medium text-ink group-hover:text-accent">
            {next.text}
          </span>
        </a>
      ) : null}
    </nav>
  );
}

const HOME_GROUPS: Record<
  DocsLocale,
  Array<{ text: string; route: string; description: string }>
> = {
  zh: [
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
  ],
  en: [
    {
      text: "Getting started",
      route: "guide/quick-start",
      description: "Download and install ZhiYuan, set up a model, and create your first work page.",
    },
    {
      text: "Features",
      route: "guide/work-page",
      description: "Work pages, tasks, context, skills, and model configuration.",
    },
    {
      text: "Guides",
      route: "capabilities/research",
      description: "Scenario-based walkthroughs: research, writing, data, coding, and more.",
    },
    {
      text: "FAQ",
      route: "faq",
      description: "Troubleshooting for installation, model connections, and file handling.",
    },
    {
      text: "Developers",
      route: "developer",
      description: "Dev environment, skill development, and project structure.",
    },
  ],
};

function DocsHome({ locale, ui }: { locale: DocsLocale; ui: Ui }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        {ui.homeTitle}
      </h1>
      <p className="mt-3 text-base leading-7 text-muted">{ui.homeLead}</p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {HOME_GROUPS[locale].map((group) => (
          <a
            key={group.text}
            href={docsHref(group.route, locale)}
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
        {ui.homeTailPre}
        <a href={docsHref("guide/quick-start", locale)} className="text-accent hover:underline">
          {ui.homeTailLink}
        </a>
        {ui.homeTailPost}
      </p>
    </div>
  );
}

export function DocsApp() {
  const locale = useMemo(detectLocale, []);
  const ui = UI[locale];
  const siteLocale = locale === "en" ? "en" : "zh-CN";
  const copy = COPY[siteLocale];
  const route = useMemo(() => currentRoute(locale), [locale]);
  const page = CONTENT[locale][route];
  const isHome = route === "" || !page;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "zh-CN";
  }, [locale]);

  useEffect(() => {
    if (!isHome && page) document.title = `${page.title} · ${ui.titleSuffix}`;
  }, [isHome, page, ui]);

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
      <Header locale={siteLocale} page="home" copy={copy} />
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
            {ui.menu}
          </button>
        </div>
        <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[232px_minmax(0,1fr)_184px]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8 pr-2">
              <a
                href={docsHref("", locale)}
                className={cn(
                  "mb-4 block px-3 text-sm font-medium",
                  isHome ? "text-accent" : "text-ink hover:text-accent",
                )}
              >
                {ui.home}
              </a>
              <SidebarItems route={route} locale={locale} />
            </div>
          </aside>
          <main className="min-w-0">
            {isHome ? (
              <DocsHome locale={locale} ui={ui} />
            ) : (
              <>
                <article
                  className="docs-prose prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: page.html }}
                />
                <PrevNext route={route} locale={locale} ui={ui} />
              </>
            )}
          </main>
          <aside className="hidden xl:block">
            {!isHome && (
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8">
                <Outline headings={page.headings} ui={ui} />
              </div>
            )}
          </aside>
        </div>
      </div>
      <Footer locale={siteLocale} copy={copy} release={null} releaseStatus="unavailable" />
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
            aria-label={ui.menu}
            className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-ground p-5 shadow-[0_8px_30px_rgb(12_18_34/0.12)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-ink">{ui.menu}</p>
              <button
                type="button"
                aria-label={ui.menuClose}
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
              href={docsHref("", locale)}
              onClick={() => setMenuOpen(false)}
              className="mb-4 block px-3 text-sm font-medium text-ink"
            >
              {ui.home}
            </a>
            <SidebarItems route={route} locale={locale} onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
