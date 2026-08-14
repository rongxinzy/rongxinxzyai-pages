import type { V2Copy } from "./copy";
import type { V2Platform, V2Release, V2ReleaseArtifact, V2ReleaseStatus } from "./types";
import { AppleIcon, DownloadIcon, LinuxIcon } from "./Icons";

type DownloadProps = {
  copy: V2Copy;
  release: V2Release | null;
  releaseStatus: V2ReleaseStatus;
  preferredPlatform?: Exclude<V2Platform, "linuxAppImage">;
};

function formatSize(size: number) {
  return `${(size / 1_000_000).toFixed(1)} MB`;
}

function PlatformMark({ platform }: { platform: V2Platform }) {
  if (platform === "windows") return <span className="v2-platform-windows" aria-hidden="true"><i /><i /><i /><i /></span>;
  if (platform === "macos") return <span className="v2-platform-apple" aria-hidden="true"><AppleIcon /></span>;
  return <span className="v2-platform-linux" aria-hidden="true"><LinuxIcon /></span>;
}

function PlatformRow({
  platform,
  artifact,
  copy,
  version,
  status,
}: {
  platform: V2Platform;
  artifact?: V2ReleaseArtifact;
  copy: V2Copy;
  version?: string;
  status: V2ReleaseStatus;
}) {
  return (
    <div className={`v2-platform-row is-${platform}`}>
      <PlatformMark platform={platform} />
      <div className="v2-platform-name">
        <strong>{copy.release.platformLabels[platform]}</strong>
        <span>{copy.release.platformDetails[platform]}</span>
      </div>
      <div className="v2-platform-meta">
        <span>{artifact && version ? version : status === "loading" ? "—" : copy.release.unavailable}</span>
        <span>{artifact ? formatSize(artifact.size) : "—"}</span>
      </div>
      {artifact ? (
        <a href={artifact.url} className="v2-platform-download">
          {copy.release.downloadLabels[platform]}<DownloadIcon />
        </a>
      ) : (
        <span className="v2-platform-unavailable">
          {platform === "linux" || platform === "linuxAppImage" ? copy.release.linuxUnavailable : copy.release.unavailable}
        </span>
      )}
    </div>
  );
}

export function V2HeroDownload({ copy, release, releaseStatus, preferredPlatform = "windows" }: DownloadProps) {
  const selected = preferredPlatform === "linux" && !release?.artifacts.linux ? "windows" : preferredPlatform;
  const artifact = release?.artifacts[selected];

  return artifact ? (
    <a className="v2-button v2-button-secondary" href={artifact.url}>
      {copy.actions.download}<DownloadIcon />
    </a>
  ) : (
    <a className="v2-button v2-button-secondary" href="#download" aria-describedby="v2-release-status">
      {copy.actions.download}<DownloadIcon />
    </a>
  );
}

export function V2DownloadSection({ copy, release, releaseStatus }: DownloadProps) {
  return (
    <section className="v2-section v2-download-section" id="download" aria-labelledby="v2-download-title">
      <div className="v2-container v2-download-layout">
        <div className="v2-section-copy">
          <span className="v2-section-number" aria-hidden="true">07</span>
          <h2 id="v2-download-title">{copy.home.downloadTitle}</h2>
          <p>{copy.home.downloadBody}</p>
          <p id="v2-release-status" className="v2-release-status" aria-live="polite">
            {release
              ? `${copy.release.versionLabel} · ${release.version}`
              : releaseStatus === "loading"
                ? copy.release.loading
                : copy.release.unavailable}
          </p>
        </div>
        <div className="v2-platform-list">
          <PlatformRow platform="windows" artifact={release?.artifacts.windows} version={release?.version} copy={copy} status={releaseStatus} />
          <PlatformRow platform="macos" artifact={release?.artifacts.macos} version={release?.version} copy={copy} status={releaseStatus} />
          {release?.artifacts.linux ? (
            <PlatformRow platform="linux" artifact={release.artifacts.linux} version={release.version} copy={copy} status={releaseStatus} />
          ) : (
            <PlatformRow platform="linux" copy={copy} status={releaseStatus} />
          )}
          {release?.artifacts.linuxAppImage ? (
            <PlatformRow platform="linuxAppImage" artifact={release.artifacts.linuxAppImage} version={release.version} copy={copy} status={releaseStatus} />
          ) : null}
        </div>
      </div>
      <div className="v2-container v2-download-notes">
        <p>{copy.home.windowsNote}</p>
        <p>{copy.home.signingNote}</p>
      </div>
    </section>
  );
}
