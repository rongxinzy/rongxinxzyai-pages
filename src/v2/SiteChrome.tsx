import { useState } from "react";
import type { V2Copy } from "./copy";
import { GITHUB_URL } from "./copy";
import type { V2Locale, V2Page } from "./types";
import { ArrowUpRightIcon, DownloadIcon, GithubIcon, MenuIcon, CloseIcon } from "./Icons";

type ChromeProps = {
  locale: V2Locale;
  page: V2Page;
  copy: V2Copy;
};

function localeRoot(locale: V2Locale) {
  return locale === "en" ? "/en/" : "/";
}

function enterpriseRoot(locale: V2Locale) {
  return locale === "en" ? "/en/enterprise/" : "/enterprise/";
}

export function V2Header({ locale, page, copy }: ChromeProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const home = localeRoot(locale);
  const enterprise = enterpriseRoot(locale);
  const languageHref = locale === "en"
    ? page === "enterprise" ? "/enterprise/" : "/"
    : page === "enterprise" ? "/en/enterprise/" : "/en/";
  const docsHref = locale === "en" ? `${GITHUB_URL}#readme` : "/docs/";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="v2-header">
      <div className="v2-header-inner">
        <a className="v2-brand" href={home} aria-label="ZhiYuan">
          <img src="/zhiyuan-logo.svg" alt="ZhiYuan" />
        </a>
        <nav className={menuOpen ? "is-open" : ""} aria-label={copy.navigation.aria}>
          <a href={`${home}#product`} onClick={closeMenu}>{copy.navigation.product}</a>
          <a href={`${home}#workflow`} onClick={closeMenu}>{copy.navigation.workflow}</a>
          <a href={`${home}#local-models`} onClick={closeMenu}>{copy.navigation.localModels}</a>
          <a href={enterprise} aria-current={page === "enterprise" ? "page" : undefined} onClick={closeMenu}>
            {copy.navigation.enterprise}
          </a>
          <a href={docsHref} target={locale === "en" ? "_blank" : undefined} rel={locale === "en" ? "noreferrer" : undefined} onClick={closeMenu}>
            {copy.navigation.docs}
          </a>
        </nav>
        <div className="v2-header-actions">
          <a className="v2-language" href={languageHref} lang={locale === "en" ? "zh-CN" : "en"}>
            {copy.languageSwitch}
          </a>
          <a className="v2-header-github" href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label={copy.navigation.github}>
            <GithubIcon />
          </a>
          <a className="v2-button v2-button-primary v2-header-download" href={`${home}#download`}>
            <DownloadIcon />{copy.navigation.download}
          </a>
          <button
            type="button"
            className="v2-menu-button"
            aria-label={menuOpen ? copy.navigation.close : copy.navigation.menu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function V2Footer({ locale, copy }: Omit<ChromeProps, "page">) {
  const home = localeRoot(locale);
  const enterprise = enterpriseRoot(locale);
  const docsHref = locale === "en" ? `${GITHUB_URL}#readme` : "/docs/";

  return (
    <footer className="v2-footer">
      <div className="v2-container v2-footer-inner">
        <a className="v2-brand" href={home} aria-label="ZhiYuan">
          <img src="/zhiyuan-logo.svg" alt="ZhiYuan" />
        </a>
        <nav aria-label={copy.navigation.aria}>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">{copy.footer.source}<ArrowUpRightIcon /></a>
          <a href={docsHref} target={locale === "en" ? "_blank" : undefined} rel={locale === "en" ? "noreferrer" : undefined}>{copy.footer.docs}</a>
          <a href={enterprise}>{copy.footer.enterprise}</a>
          <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noreferrer">{copy.footer.license}</a>
        </nav>
        <p>{copy.footer.copyright}</p>
      </div>
    </footer>
  );
}
