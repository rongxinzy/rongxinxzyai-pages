export const MARKETING_LOCALES = ["zh-CN", "en"] as const;
export const MARKETING_PAGES = ["home", "enterprise", "roadmap", "browser"] as const;

export type MarketingLocale = (typeof MARKETING_LOCALES)[number];
export type MarketingPage = (typeof MARKETING_PAGES)[number];

export type MarketingRoute = Readonly<{
  locale: MarketingLocale;
  page: MarketingPage;
  path: string;
  alternatePath: string;
  documentationHref: string;
}>;

const ROUTES: Record<MarketingLocale, Record<MarketingPage, MarketingRoute>> = {
  "zh-CN": {
    home: {
      locale: "zh-CN",
      page: "home",
      path: "/",
      alternatePath: "/en/",
      documentationHref: "/docs/",
    },
    enterprise: {
      locale: "zh-CN",
      page: "enterprise",
      path: "/enterprise/",
      alternatePath: "/en/enterprise/",
      documentationHref: "/docs/",
    },
    roadmap: {
      locale: "zh-CN",
      page: "roadmap",
      path: "/roadmap/",
      alternatePath: "/en/roadmap/",
      documentationHref: "/docs/",
    },
    browser: {
      locale: "zh-CN",
      page: "browser",
      path: "/browser/",
      alternatePath: "/en/browser/",
      documentationHref: "/docs/",
    },
  },
  en: {
    home: {
      locale: "en",
      page: "home",
      path: "/en/",
      alternatePath: "/",
      documentationHref: "/en/docs/",
    },
    enterprise: {
      locale: "en",
      page: "enterprise",
      path: "/en/enterprise/",
      alternatePath: "/enterprise/",
      documentationHref: "/en/docs/",
    },
    roadmap: {
      locale: "en",
      page: "roadmap",
      path: "/en/roadmap/",
      alternatePath: "/roadmap/",
      documentationHref: "/en/docs/",
    },
    browser: {
      locale: "en",
      page: "browser",
      path: "/en/browser/",
      alternatePath: "/browser/",
      documentationHref: "/en/docs/",
    },
  },
};

function normalizePathname(pathname: string) {
  const withoutIndex = pathname.replace(/\/index\.html$/, "/");
  const withLeadingSlash = withoutIndex.startsWith("/") ? withoutIndex : `/${withoutIndex}`;

  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

/**
 * Returns the locale and marketing page represented by a direct marketing URL.
 * Unknown paths deliberately fall back to the Chinese home page so application
 * components have a stable route during local development and static previews.
 */
export function getMarketingRoute(pathname: string = window.location.pathname): MarketingRoute {
  switch (normalizePathname(pathname)) {
    case "/en/":
      return ROUTES.en.home;
    case "/enterprise/":
      return ROUTES["zh-CN"].enterprise;
    case "/en/enterprise/":
      return ROUTES.en.enterprise;
    case "/roadmap/":
      return ROUTES["zh-CN"].roadmap;
    case "/en/roadmap/":
      return ROUTES.en.roadmap;
    case "/browser/":
      return ROUTES["zh-CN"].browser;
    case "/en/browser/":
      return ROUTES.en.browser;
    default:
      return ROUTES["zh-CN"].home;
  }
}

export function getLocalizedPath(page: MarketingPage, locale: MarketingLocale) {
  return ROUTES[locale][page].path;
}

export function getLegacyHashDestination(hash: string, locale: MarketingLocale = "zh-CN") {
  const route = ROUTES[locale];

  switch (hash) {
    case "#enterprise":
      return route.enterprise.path;
    case "#enterprise-contact":
      return `${route.enterprise.path}#contact`;
    case "#docs":
      return locale === "en" ? route.home.documentationHref : "/docs/";
    default:
      return null;
  }
}

/**
 * Replaces retired hash-only routes before React renders. This keeps bookmarks
 * and links from the previous single-page site from leaving an invalid history
 * entry behind.
 */
export function redirectLegacyHash(): boolean {
  const destination = getLegacyHashDestination(
    window.location.hash,
    getMarketingRoute().locale,
  );

  if (!destination) return false;

  const query = window.location.search;
  const hashIndex = destination.indexOf("#");
  const path = hashIndex === -1 ? destination : destination.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : destination.slice(hashIndex);
  window.location.replace(`${path}${query}${hash}`);
  return true;
}
