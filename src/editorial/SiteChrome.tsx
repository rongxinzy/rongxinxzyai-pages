import { useEffect, useRef, useState } from "react";
import type { SiteLocale, SitePage } from "../shared/site-types";
import { GITHUB, isEnglish, type EditorialCopy } from "./copy";

export function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      className="arrow"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={down ? "M8 3v10m-4-4 4 4 4-4" : "M4 12 12 4M5 4h7v7"} />
    </svg>
  );
}

export function TitleText({ text }: { text: string }) {
  return text.split(/\b(AI)\b/).map((part, index) =>
    part === "AI" ? (
      <span className="title-latin" key={index}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function TitleLines({
  lines,
  spaced = false,
}: {
  lines: string[];
  spaced?: boolean;
}) {
  return lines.map((line, index) => (
    <span key={line}>
      <TitleText text={line} />
      {spaced && index < lines.length - 1 ? " " : ""}
    </span>
  ));
}

export function Brand({ home }: { home: string }) {
  return (
    <a className="brand" href={home} aria-label="知远 ZhiYuan">
      <span>知远</span>
      <small>ZHIYUAN</small>
    </a>
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
  const toggle = useRef<HTMLButtonElement>(null);
  const en = isEnglish(locale);
  const home = en ? "/en/" : "/";
  const enterprise = `${home}enterprise/`;
  const alternate = `${en ? "/" : "/en/"}${page === "enterprise" ? "enterprise/" : ""}`;
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header wrap">
      <Brand home={home} />
      <nav
        id="site-navigation"
        className={open ? "site-nav is-open" : "site-nav"}
        aria-label={copy.menu}
      >
        <a href={`${home}#workflow`} onClick={() => setOpen(false)}>
          {copy.nav[0]}
        </a>
        <a href={`${home}#inference`} onClick={() => setOpen(false)}>
          {copy.inferenceNav}
        </a>
        <a
          href={enterprise}
          aria-current={page === "enterprise" ? "page" : undefined}
        >
          {copy.nav[1]}
        </a>
        <a href={en ? `${GITHUB}#readme` : "/docs/"}>{copy.nav[2]}</a>
      </nav>
      <div className="header-actions">
        <a
          href={alternate}
          lang={en ? "zh-CN" : "en"}
          className="language-link"
        >
          {en ? "中文" : "EN"}
        </a>
        <a className="header-download" href={`${home}#download`}>
          {en ? "Download" : "下载"}
          <Arrow />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-navigation"
          aria-label={open ? copy.close : copy.menu}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>
    </header>
  );
}

export function Footer({
  locale,
  copy,
}: {
  locale: SiteLocale;
  copy: EditorialCopy;
}) {
  const en = isEnglish(locale),
    home = en ? "/en/" : "/";
  const links = [
    en ? `${GITHUB}#readme` : "/docs/",
    `${home}enterprise/`,
    GITHUB,
    `${GITHUB}/blob/main/LICENSE`,
  ];
  return (
    <footer className="site-footer wrap">
      <Brand home={home} />
      <nav aria-label={en ? "Footer" : "页脚导航"}>
        {copy.footer.map((label, index) => (
          <a key={label} href={links[index]}>
            {label}
          </a>
        ))}
      </nav>
      <small>{copy.copyright}</small>
    </footer>
  );
}
