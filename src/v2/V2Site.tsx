import "../v2.css";
import { V2_COPY } from "./copy";
import type { V2SiteProps } from "./types";
import { V2EnterprisePage } from "./EnterprisePage";
import { V2HomePage } from "./HomePage";
import { V2Footer, V2Header } from "./SiteChrome";

export function V2Site({
  locale,
  page,
  release,
  releaseStatus,
  preferredPlatform = "windows",
}: V2SiteProps) {
  const copy = V2_COPY[locale];

  return (
    <div className="v2-site" data-locale={locale}>
      <V2Header locale={locale} page={page} copy={copy} />
      {page === "enterprise" ? (
        <V2EnterprisePage locale={locale} copy={copy} />
      ) : (
        <V2HomePage
          locale={locale}
          copy={copy}
          release={release}
          releaseStatus={releaseStatus}
          preferredPlatform={preferredPlatform}
        />
      )}
      <V2Footer locale={locale} copy={copy} />
    </div>
  );
}
