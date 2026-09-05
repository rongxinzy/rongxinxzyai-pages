import { useEffect, useRef, useState } from "react";
import type { SiteLocale, SitePage } from "../shared/site-types";
import { GITHUB, isEnglish, type EditorialCopy } from "./copy";

export function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span className="arrow" aria-hidden="true">
      {down ? "↓" : "↗"}
    </span>
  );
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
