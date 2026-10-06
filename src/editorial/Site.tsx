import { lazy, Suspense, useEffect } from "react";
import type { SiteSiteProps } from "../shared/site-types";
import { COPY } from "./copy";
import { Header, Footer } from "./SiteChrome";
import { Home } from "./Home";
import "./site.css";

const Enterprise = lazy(() =>
  import("./Enterprise").then((m) => ({ default: m.Enterprise })),
);

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
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        href="#main"
      >
        {copy.skip}
      </a>
      <Header locale={props.locale} page={props.page} copy={copy} />
      {props.page === "home" ? (
        <Home {...props} copy={copy} />
      ) : (
        <Suspense fallback={null}>
          <Enterprise copy={copy} locale={props.locale} />
        </Suspense>
      )}
      <Footer
        locale={props.locale}
        copy={copy}
        release={props.release}
        releaseStatus={props.releaseStatus}
      />
    </div>
  );
}
