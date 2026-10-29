import { lazy, Suspense, useLayoutEffect } from "react";
import type { SiteSiteProps } from "../shared/site-types";
import { COPY } from "./copy";
import { Header, Footer } from "./SiteChrome";
import { Home } from "./Home";
import { findFragmentTarget } from "../shared/site-navigation";
import "./site.css";

const Enterprise = lazy(() =>
  import("./Enterprise").then((m) => ({ default: m.Enterprise })),
);

const Browser = lazy(() =>
  import("./Browser").then((m) => ({ default: m.Browser })),
);

const RoadmapPage = lazy(() =>
  import("../roadmap/RoadmapPage").then((m) => ({ default: m.RoadmapPage })),
);

export function EditorialSite(props: SiteSiteProps) {
  const copy = COPY[props.locale];
  useLayoutEffect(() => {
    // Enterprise handles its fragment after the lazy-loaded page has mounted.
    if (props.page !== "home") return;
    const target = findFragmentTarget();
    if (target) {
      target.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [props.page, props.locale]);
  return (
    <div
      className={
        props.page === "roadmap"
          ? "editorial-site roadmap-root min-h-screen bg-ground"
          : "editorial-site"
      }
      data-locale={props.locale}
    >
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-ground"
        href="#main"
      >
        {copy.skip}
      </a>
      <Header locale={props.locale} page={props.page} copy={copy} />
      {props.page === "home" ? (
        <Home {...props} copy={copy} />
      ) : props.page === "roadmap" ? (
        <Suspense
          fallback={
            <main
              id="main"
              className="mx-auto min-h-[70vh] max-w-3xl px-6 pb-20 pt-28"
              aria-busy="true"
            >
              <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                {copy.roadmapTitle}
              </h1>
              <p className="mt-4 text-base leading-7 text-muted">{copy.roadmapLead}</p>
            </main>
          }
        >
          <RoadmapPage copy={copy} locale={props.locale} />
        </Suspense>
      ) : props.page === "browser" ? (
        <Suspense
          fallback={
            <main
              id="main"
              className="flex min-h-[62vh] flex-col items-center justify-center px-6 pb-20 pt-28 text-center"
              aria-busy="true"
            >
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
                {copy.browserTitle}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-muted">
                {copy.browserSlogan}
              </p>
            </main>
          }
        >
          <Browser copy={copy} locale={props.locale} />
        </Suspense>
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
