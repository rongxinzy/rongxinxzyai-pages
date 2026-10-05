import { useEffect, useState } from "react";
import type {
  SiteLocale,
  SitePlatform,
  SiteRelease,
  SiteReleaseStatus,
} from "../shared/site-types";
import { GITHUB, type EditorialCopy } from "./copy";
import { Icon } from "./icons";

type DownloadPlatform = Exclude<SitePlatform, "linuxAppImage"> | "linuxAppImage";

const PLATFORM_ICONS: Record<DownloadPlatform, "apple" | "monitor" | "windows" | "linux"> = {
  macos: "apple",
  windows: "windows",
  linux: "linux",
  linuxAppImage: "linux",
};

export function Downloads({
  locale,
  copy,
  release,
  status,
  preferredPlatform,
}: {
  locale: SiteLocale;
  copy: EditorialCopy;
  release: SiteRelease | null;
  status: SiteReleaseStatus;
  preferredPlatform?: Exclude<SitePlatform, "linuxAppImage">;
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const platforms: Array<{
    id: DownloadPlatform;
    title: string;
    detail: string;
    meta: string[];
  }> = [
    {
      id: "macos",
      title: "macOS",
      detail: locale === "en" ? "Apple silicon" : "Apple Silicon 芯片",
      meta: [
        locale === "en" ? "format: .dmg" : "格式：.dmg 安装包",
        locale === "en"
          ? "engine: local GGUF inference"
          : "引擎：内置 GGUF 本地推理",
      ],
    },
    {
      id: "windows",
      title: "Windows",
      detail: locale === "en" ? "x64 installer" : "x64 独立安装包",
      meta: [
        locale === "en" ? "format: .exe" : "格式：.exe 安装包",
        locale === "en"
          ? "excludes local inference components"
          : "不含本地推理组件",
      ],
    },
    {
      id: "linux",
      title: "Linux",
      detail: locale === "en" ? "Ubuntu / Debian" : "Ubuntu / Debian 发行版",
      meta: [locale === "en" ? "format: .deb" : "格式：.deb 安装包"],
    },
    {
      id: "linuxAppImage",
      title: "Linux",
      detail: locale === "en" ? "Universal AppImage" : "通用 AppImage",
      meta: [locale === "en" ? "format: AppImage" : "格式：AppImage"],
    },
  ];

  function artifactOf(id: DownloadPlatform) {
    if (!release) return undefined;
    return id === "linuxAppImage"
      ? release.artifacts.linuxAppImage
      : release.artifacts[id];
  }

  function sizeOf(id: DownloadPlatform) {
    const artifact = artifactOf(id);
    return artifact ? `${(artifact.size / 1_000_000).toFixed(0)} MB` : null;
  }

  function copyClone() {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(copy.cloneCommand).catch(() => {});
    }
    setCopied(true);
  }

  return (
    <>
      <section className="wrap section-space" id="download" aria-labelledby="download-title">
        <div className="download-panel">
          <div className="download-head">
            <div>
              <span className="overline">{copy.downloadOverline}</span>
              <h2 id="download-title" className="t-headline-lg">
                {copy.downloadTitle}
              </h2>
              <p className="module-lead t-body-lg">{copy.downloadLead}</p>
            </div>
            <span className="download-assurance">
              <Icon name="check-circle" size={16} />
              {copy.downloadAssurance}
            </span>
          </div>
          <p className="release-line" role="status">
            <span>
              {release
                ? `${copy.version} / v${release.version}`
                : status === "loading"
                  ? copy.loading
                  : copy.unavailable}
            </span>
            <a className="text-link" href={`${GITHUB}/releases`}>
              {copy.releases}
            </a>
          </p>
          <div className="download-grid" aria-busy={status === "loading"}>
            {platforms.map((platform) => {
              const artifact = artifactOf(platform.id);
              const size = sizeOf(platform.id);
              const isPreferred =
                preferredPlatform !== undefined &&
                platform.id === preferredPlatform;
              return (
                <article className="download-card" key={platform.id}>
                  <div>
                    <div className="download-card-head">
                      <Icon name={PLATFORM_ICONS[platform.id]} size={28} />
                      {isPreferred ? (
                        <span className="chip chip-solid">
                          {locale === "en" ? "Recommended" : "推荐"}
                        </span>
                      ) : null}
                    </div>
                    <h4>{platform.title}</h4>
                    <p className="download-detail">{platform.detail}</p>
                    <div className="download-meta">
                      <span>
                        {copy.sizeLabel}:{size ?? " —"}
                      </span>
                      {platform.meta.map((line, index) => (
                        <span
                          key={line}
                          className={
                            platform.id === "windows" && index === 1
                              ? "meta-warn"
                              : undefined
                          }
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="download-card-actions">
                    {artifact ? (
                      <a
                        className={platform.id === "macos" || platform.id === "windows" ? "btn btn-sm" : "btn-ghost btn-sm"}
                        href={artifact.url}
                        aria-label={`${copy.headerDownload} ${platform.title} ${platform.detail}`}
                      >
                        <Icon name="download" size={16} />
                        <span>
                          {platform.id === "macos"
                            ? locale === "en"
                              ? "Download .dmg"
                              : "下载 .dmg 安装包"
                            : platform.id === "windows"
                              ? locale === "en"
                                ? "Download .exe"
                                : "下载 .exe 安装包"
                              : platform.id === "linux"
                                ? "Ubuntu (.deb)"
                                : "AppImage"}
                        </span>
                      </a>
                    ) : status === "loading" ? (
                      <span className="download-meta">—</span>
                    ) : (
                      <a className="text-link" href={`${GITHUB}/releases`}>
                        {release ? copy.noLinux : copy.releases}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="download-note-strip">
            <div className="note-body">
              <Icon name="info" size={20} />
              <p>
                <strong>{copy.windowsNoteTitle}</strong>
                {copy.windowsNote}
              </p>
            </div>
            <a className="text-link" href={locale === "en" ? `${GITHUB}/blob/main/docs/faq/install.md` : "/docs/faq/install"}>
              {copy.windowsGuide}
              <Icon name="arrow-forward" size={14} />
            </a>
          </div>
        </div>
      </section>
      <section className="oss-band wrap" aria-labelledby="oss-title">
        <div className="oss-panel">
          <div className="oss-inner">
            <div>
              <span className="oss-overline">
                <span className="pill-dot" />
                {copy.ossOverline}
              </span>
              <h3 id="oss-title" className="t-headline-lg">
                {copy.ossTitle}
              </h3>
              <p className="oss-body">{copy.ossBody}</p>
            </div>
            <div className="oss-actions">
              <div className="clone-box">
                <code>{copy.cloneCommand}</code>
                <button
                  type="button"
                  className="clone-copy"
                  onClick={copyClone}
                  title={copy.copyCommand}
                  aria-label={copy.copyCommand}
                >
                  <Icon name="copy" size={16} />
                </button>
              </div>
              <a className="oss-star" href={GITHUB}>
                <Icon name="star" size={16} />
                {copy.ossStar}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
