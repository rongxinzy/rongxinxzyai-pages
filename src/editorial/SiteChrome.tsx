import { useEffect, useRef, useState } from "react";
import type { SiteLocale, SitePage, SiteRelease } from "../shared/site-types";
import { GITHUB, isEnglish, type EditorialCopy } from "./copy";
import { Icon } from "./icons";

export function Brand({ home, small = false }: { home: string; small?: boolean }) {
  return (
    <a className="brand" href={home} aria-label="知远 Zhiyuan AI">
      <img
        src="/zhiyuan-logo.svg"
        width={small ? 100 : 132}
        height={24}
        alt=""
      />
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
  const header = useRef<HTMLElement>(null);
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
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resized = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resized);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resized);
    };
  }, [open]);
  const nav = [
    { label: copy.navWorkflow, href: `${home}#workbench` },
    { label: copy.navInference, href: `${home}#models` },
    {
      label: copy.navEnterprise,
      href: enterprise,
      current: page === "enterprise",
    },
    { label: copy.navDocs, href: en ? `${GITHUB}#readme` : "/docs/" },
  ];
  return (
    <header
      ref={header}
      className="site-header"
      onBlur={(event) => {
        if (
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          setOpen(false);
      }}
    >
      <div className="site-header-inner wrap">
        <Brand home={home} />
        <nav
          id="site-navigation"
          className={open ? "site-nav is-open" : "site-nav"}
          aria-label={copy.menu}
        >
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="header-chip header-lang"
            href={alternate}
            lang={en ? "zh-CN" : "en"}
          >
            {en ? "中文" : "EN"}
          </a>
          <a
            className="header-chip"
            href={GITHUB}
            aria-label={copy.star}
          >
            <Icon name="star" size={14} />
            <span>{copy.star}</span>
          </a>
          <a className="btn-accent" href={`${home}#download`}>
            <Icon name="download" size={16} />
            <span>{copy.headerDownload}</span>
          </a>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-navigation"
            aria-label={open ? copy.close : copy.menu}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} size={18} />
          </button>
        </div>
      </div>
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
    `${home}#local-models`,
  ];
  return (
    <footer className="site-footer">
      <div className="site-footer-inner wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand home={home} small />
            <p>{copy.footerBrand}</p>
            <span className="pill pill-live">
              <span className="pill-dot" />
              {release
                ? `v${release.version} ${copy.footerRelease} · ${copy.footerPlatforms}`
                : releaseStatus === "loading"
                  ? copy.loading
                  : `${copy.releaseFallback} · ${copy.footerPlatforms}`}
            </span>
          </div>
          {copy.footerColumns.map((column) => (
            <nav className="footer-col" key={column.title} aria-label={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-legal">
            {copy.footerLegal.map((label, index) => (
              <span key={label} className="legal-item">
                {index > 0 ? <span className="sep">·</span> : null}
                <a href={legalLinks[index]}>{label}</a>
              </span>
            ))}
          </div>
          <p className="footer-copy">{copy.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
