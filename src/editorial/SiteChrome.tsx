import { useEffect, useRef, useState } from "react";
import type { SiteLocale, SitePage, SiteRelease } from "../shared/site-types";
import { cn } from "../lib/utils";
import { GITHUB, isEnglish, type EditorialCopy } from "./copy";
import { Icon } from "./icons";

export function Brand({ home, small = false }: { home: string; small?: boolean }) {
  return (
    <a className="inline-flex shrink-0 items-center" href={home} aria-label={home === "/en/" ? "ZhiYuan home" : "知远首页"}>
      <img
        src="/zhiyuan-logo.svg"
        width={small ? 100 : 132}
        height={24}
        alt=""
        className="h-6 w-auto"
      />
    </a>
  );
}

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.11-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function Header({
  locale,
  page,
  copy,
}: {
  locale: SiteLocale;
  page: SitePage;
  copy: EditorialCopy;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const en = isEnglish(locale);
  const home = en ? "/en/" : "/";
  const enterprise = `${home}enterprise/`;
  const alternate = `${en ? "/" : "/en/"}${page === "enterprise" ? "enterprise/" : ""}`;

  useEffect(() => {
    // 迟滞阈值，避免滚动位置在临界点来回抖动触发状态闪烁。
    const onScroll = () =>
      setScrolled((value) => (value ? window.scrollY > 8 : window.scrollY > 32));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const desktop = window.matchMedia(
      en ? "(min-width: 1280px)" : "(min-width: 768px)",
    );
    const resized = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resized);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resized);
    };
  }, [open, en]);

  const nav = [
    { label: copy.navWorkflow, href: `${home}#workbench` },
    { label: copy.navInference, href: `${home}#local-models` },
    {
      label: copy.navEnterprise,
      href: enterprise,
      current: page === "enterprise",
    },
    { label: copy.navDocs, href: en ? "/en/docs/" : "/docs/" },
    { label: copy.navBlog, href: "/blog/" },
  ];

  const downloadClass =
    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-[0_1px_2px_rgb(79_70_229/0.24)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(79_70_229/0.30)] active:translate-y-0 active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

  return (
    <header
      ref={header}
      className="fixed inset-x-0 top-0 z-50"
      onBlur={(event) => {
        if (
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          setOpen(false);
      }}
    >
      {/* 栏体布局在两个滚动状态下保持恒定；滚动态的悬浮玻璃 pill 作为背景层
          只做 opacity/transform 合成器动画，避免布局属性过渡带来的横向滑动与边框闪现。 */}
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-4">
        <div className="relative flex items-center justify-between gap-4 rounded-full px-2 py-2 sm:px-3">
          <span
            aria-hidden="true"
            className={cn(
              "glass-chip absolute inset-0 -z-10 rounded-full border border-hairline shadow-[0_8px_30px_rgb(12_18_34/0.06)]",
              "motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              scrolled
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 scale-[0.99] opacity-0",
            )}
          />
          <div className="flex items-center gap-3">
            <Brand home={home} small />
            <span className="hidden text-[13px] text-muted lg:block">
              {copy.brandSub}
            </span>
          </div>
          {/* 英文导航标签更宽，桌面导航到 xl 才展开，以下走汉堡菜单。 */}
          <nav
            className={cn("hidden items-center gap-1", en ? "xl:flex" : "md:flex")}
            aria-label={copy.menu}
          >
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-muted transition-colors duration-200 ease-out hover:bg-mist hover:text-ink lg:px-3.5",
                  item.current && "bg-mist text-ink",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted transition-colors duration-200 ease-out hover:bg-mist hover:text-ink sm:inline-flex"
              href={GITHUB}
              aria-label={copy.star}
            >
              <GitHubIcon />
              <span>{copy.star}</span>
            </a>
            <a
              className="hidden whitespace-nowrap text-[13px] text-muted transition-colors duration-200 ease-out hover:text-ink sm:block"
              href={alternate}
              lang={en ? "zh-CN" : "en"}
            >
              {en ? "中文" : "EN"}
            </a>
            <a className={downloadClass} href={`${home}#download`}>
              <Icon name="download" size={15} />
              <span>{copy.headerDownload}</span>
            </a>
            <button
              ref={toggle}
              className={cn(
                "inline-flex items-center justify-center rounded-full p-2 text-ink transition-[color,background-color,transform] duration-200 ease-out hover:bg-mist active:scale-95 motion-reduce:transition-none",
                en ? "xl:hidden" : "md:hidden",
              )}
              aria-expanded={open}
              aria-controls="site-navigation"
              aria-label={open ? copy.close : copy.menu}
              onClick={() => setOpen((value) => !value)}
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <div
          id="site-navigation"
          className={cn(
            "fixed inset-0 -z-10 flex flex-col bg-ground px-6 pb-8 pt-24",
            en ? "xl:hidden" : "md:hidden",
          )}
        >
          <nav aria-label={copy.menu} className="flex flex-col">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className="border-b border-hairline py-4 text-xl font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-5">
            <a
              className={cn(downloadClass, "justify-center py-3")}
              href={`${home}#download`}
              onClick={() => setOpen(false)}
            >
              <Icon name="download" size={16} />
              <span>{copy.headerDownload}</span>
            </a>
            <div className="flex items-center justify-between text-sm text-muted">
              <a
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-ink"
                href={GITHUB}
              >
                <GitHubIcon size={16} />
                <span>{copy.star}</span>
              </a>
              <a
                className="transition-colors duration-200 hover:text-ink"
                href={alternate}
                lang={en ? "zh-CN" : "en"}
                onClick={() => setOpen(false)}
              >
                {en ? "中文" : "EN"}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function Footer({
  locale,
  copy,
  release,
  releaseStatus,
}: {
  locale: SiteLocale;
  copy: EditorialCopy;
  release: SiteRelease | null;
  releaseStatus: string;
}) {
  const en = isEnglish(locale);
  const home = en ? "/en/" : "/";
  const legalLinks = [
    `${GITHUB}/blob/main/LICENSE`,
    `${GITHUB}/releases`,
    copy.footerBoundary,
  ];
  return (
    <footer className="border-t border-hairline bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Brand home={home} small />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              {copy.footerBrand}
            </p>
            <p className="tnum mt-5 inline-flex items-center gap-2 rounded-full border border-hairline bg-ground px-3 py-1.5 text-[13px] text-muted">
              <span className="size-1.5 rounded-full bg-accent-2" aria-hidden="true" />
              {release
                ? `v${release.version} ${copy.footerRelease} · ${copy.footerPlatforms}`
                : releaseStatus === "loading"
                  ? copy.loading
                  : `${copy.releaseFallback} · ${copy.footerPlatforms}`}
            </p>
          </div>
          {copy.footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-3 text-[13px] font-medium text-ink">
                {column.title}
              </h3>
              <div className="flex flex-col">
                {column.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="py-1 text-sm text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-[13px] text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-2">
            {copy.footerLegal.map((label, index) => (
              <span key={label} className="inline-flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">·</span> : null}
                <a
                  href={legalLinks[index]}
                  className="transition-colors duration-200 hover:text-ink"
                >
                  {label}
                </a>
              </span>
            ))}
          </div>
          <p>{copy.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
