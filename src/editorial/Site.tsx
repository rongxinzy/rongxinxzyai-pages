import { useEffect } from "react";
import type { SiteSiteProps } from "../shared/site-types";
import { COPY } from "./copy";
import { Header, Footer } from "./SiteChrome";
import { Home } from "./Home";
import { Enterprise } from "./Enterprise";
import "./site.css";

export function EditorialSite(props: SiteSiteProps) {
  const copy = COPY[props.locale];
  useEffect(() => {
    // The static HTML has only the hero; fragment targets appear after React mounts.
    const frame = requestAnimationFrame(() => {
      const fragment = window.location.hash.slice(1);
      if (!fragment) return;
      try {
        document
          .getElementById(decodeURIComponent(fragment))
          ?.scrollIntoView({ behavior: "instant", block: "start" });
      } catch {
        /* An invalid URL fragment must not prevent the page from rendering. */
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [props.page, props.locale]);
  return (
    <div className="editorial-site" data-locale={props.locale}>
      <a className="skip-link" href="#main">
        {copy.skip}
      </a>
      <Header locale={props.locale} page={props.page} copy={copy} />
      {props.page === "home" ? (
        <Home {...props} copy={copy} />
      ) : (
        <Enterprise copy={copy} locale={props.locale} />
      )}
      <Footer locale={props.locale} copy={copy} />
    </div>
  );
}
