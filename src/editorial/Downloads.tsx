import type {
  SiteLocale,
  SitePlatform,
  SiteRelease,
  SiteReleaseStatus,
} from "../shared/site-types";
import { GITHUB, type EditorialCopy } from "./copy";
import { Arrow } from "./SiteChrome";
import { Icon } from "./Icon";

export function Downloads({
  locale,
  copy,
  release,
  status,
}: {
  locale: SiteLocale;
  copy: EditorialCopy;
  release: SiteRelease | null;
  status: SiteReleaseStatus;
}) {
  const platforms: Array<{
    id: SitePlatform;
    label: string;
    detail: string;
  }> = [
    { id: "windows", label: "Windows", detail: "x64" },
    { id: "macos", label: "macOS", detail: "Apple silicon" },
    { id: "linux", label: "Linux", detail: "Ubuntu · x64" },
    ...(release?.artifacts.linuxAppImage
      ? [
          {
            id: "linuxAppImage" as const,
            label: "Linux",
            detail: "AppImage",
          },
        ]
      : []),
  ];
  return (
    <section
      className="downloads wrap section-space"
      id="download"
      aria-labelledby="download-title"
    >
      <div className="download-layout">
        <div>
          <h2 id="download-title">
            {copy.downloadTitle.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="section-lead">{copy.downloadBody}</p>
          <a className="text-link" href={GITHUB}>
            {copy.source}
            <Arrow />
          </a>
          <p className="release-status" role="status">
            {release
              ? `${copy.version} / ${release.version}`
              : status === "loading"
                ? copy.loading
                : copy.unavailable}
          </p>
        </div>
        <div className="download-rows">
          {platforms.map((platform) => {
            const artifact = release?.artifacts[platform.id];
            return (
              <article className="download-row" key={platform.id}>
                <span className="platform-symbol" aria-hidden="true">
                  <Icon
                    name={
                      platform.id === "linuxAppImage" ? "linux" : platform.id
                    }
                  />
                </span>
                <div className="platform-name">
                  <h3>{platform.label}</h3>
                  <span>
                    {platform.detail}
                    {artifact
                      ? ` · ${(artifact.size / 1_000_000).toFixed(0)} MB`
                      : ""}
                  </span>
                </div>
                {artifact ? (
                  <a
                    className="button button-small"
                    href={artifact.url}
                    aria-label={`${copy.download} ${platform.label} ${platform.detail}`}
                  >
                    {locale === "en" ? "Download" : "下载"}
                    <Arrow />
                  </a>
                ) : status === "loading" ? (
                  <span className="download-pending">—</span>
                ) : (
                  <a
                    className="text-link download-fallback"
                    href={
                      platform.id === "linux"
                        ? `${GITHUB}#quick-start-for-developers`
                        : `${GITHUB}/releases`
                    }
                  >
                    {platform.id === "linux" ? copy.install : copy.releases}
                    <Arrow />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
      <div className="download-notes">
        <p>{copy.windowsNote}</p>
        <p>{copy.signingNote}</p>
      </div>
    </section>
  );
}
