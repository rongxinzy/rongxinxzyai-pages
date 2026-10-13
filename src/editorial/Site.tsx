import { lazy, Suspense, useEffect } from "react";
import type { SiteSiteProps } from "../shared/site-types";
import { COPY } from "./copy";
import { Header, Footer } from "./SiteChrome";
import { Home } from "./Home";
import { findFragmentTarget } from "../shared/site-navigation";
import "./site.css";

const Enterprise = lazy(() =>
  import("./Enterprise").then((m) => ({ default: m.Enterprise })),
);

export function EditorialSite(props: SiteSiteProps) {
  const copy = COPY[props.locale];
  useEffect(() => {
    // Enterprise handles its fragment after the lazy-loaded page has mounted.
    if (props.page !== "home") return;
    const frame = requestAnimationFrame(() => {
      findFragmentTarget()?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
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
        <Suspense
          fallback={
            <main
              id="main"
              className="flex min-h-[70vh] flex-col items-center justify-center px-6 pb-20 pt-28 text-center"
              aria-busy="true"
            >
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink md:text-6xl">
                {copy.enterpriseTitle.join(" ")}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted">
                {copy.enterpriseLead}
              </p>
            </main>
          }
        >
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
