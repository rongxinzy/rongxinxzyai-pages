import { useState } from "react";
import type {
  SiteLocale,
  SitePlatform,
  SiteRelease,
  SiteReleaseStatus,
} from "../shared/site-types";
import { GITHUB, type EditorialCopy } from "./copy";
import { Icon } from "./icons";
import { cn } from "../lib/utils";

type DownloadPlatform =
  Exclude<SitePlatform, "linuxAppImage" | "macosIntel"> | "linuxAppImage";

const PLATFORM_ICONS: Record<
  DownloadPlatform,
  "apple" | "monitor" | "windows" | "linux"
> = {
  macos: "apple",
  windows: "windows",
  linux: "linux",
  linuxAppImage: "linux",
};

function detectMacArch(): "arm64" | "x64" {
  if (typeof window === "undefined") return "arm64";
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    const debugInfo = gl?.getExtension("WEBGL_debug_renderer_info");
    const renderer =
      debugInfo && gl
        ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
        : "";
    if (/intel|amd/i.test(renderer) && !/apple/i.test(renderer)) {
      return "x64";
    }
  } catch {
    // fallback
  }
  return "arm64";
}

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
  preferredPlatform?: Exclude<SitePlatform, "linuxAppImage" | "macosIntel">;
}) {
  const [macArch, setMacArch] = useState<"arm64" | "x64">(detectMacArch);

  const platforms: Array<{
    id: DownloadPlatform;
    title: string;
    detail: string;
    meta: string[];
  }> = [
    {
      id: "macos",
      title: "macOS",
      detail:
        macArch === "arm64"
          ? locale === "en"
            ? "Apple silicon"
            : "Apple Silicon"
          : "Intel",
      meta: [
        ".dmg",
        locale === "en" ? "llama.cpp built in" : "内置 llama.cpp 本地推理",
      ],
    },
    {
      id: "windows",
      title: "Windows",
      detail: "x64",
      meta: [
        ".exe",
        locale === "en" ? "Local inference via plugin" : "本地推理需另装插件",
      ],
    },
    {
      id: "linux",
      title: "Linux",
      detail: "Ubuntu / Debian",
      meta: [".deb"],
    },
    {
      id: "linuxAppImage",
      title: "Linux",
      detail: locale === "en" ? "Generic Linux" : "通用 Linux 发行版",
      meta: [".AppImage"],
    },
  ];

  function artifactOf(id: DownloadPlatform) {
    if (!release) return undefined;
    if (id === "linuxAppImage") return release.artifacts.linuxAppImage;
    if (id === "macos") {
      return macArch === "x64"
        ? (release.artifacts.macosIntel ?? release.artifacts.macos)
        : release.artifacts.macos;
    }
    return release.artifacts[id];
  }

  function sizeOf(id: DownloadPlatform) {
    const artifact = artifactOf(id);
    return artifact ? `${(artifact.size / 1_000_000).toFixed(0)} MB` : null;
  }

  const altMacArtifact =
    release &&
    (macArch === "arm64"
      ? release.artifacts.macosIntel
      : release.artifacts.macos);
  const altMacSize = altMacArtifact
    ? `${(altMacArtifact.size / 1_000_000).toFixed(0)} MB`
    : null;

  return (
    <section
      className="mx-auto max-w-7xl px-6"
      id="download"
      aria-labelledby="download-title"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="font-mono text-[var(--fs-micro)] tracking-[0.18em] text-accent uppercase">
            {copy.downloadOverline}
          </span>
          <h2
            id="download-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            {copy.downloadTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            {copy.downloadLead}
          </p>
        </div>
        <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-hairline bg-mist px-4 py-2 text-[13px] text-muted">
          <Icon name="check-circle" size={16} className="text-accent" />
          {copy.downloadAssurance}
        </span>
      </div>

      <p
        className="mt-10 flex flex-wrap items-center justify-between gap-3 border-y border-hairline py-3"
        role="status"
      >
        <span
          className={cn(
            "tnum font-mono text-[13px]",
            release ? "text-ink" : "text-muted",
            status === "loading" && "motion-safe:animate-pulse",
          )}
        >
          {release
            ? `${copy.version} / v${release.version}`
            : status === "loading"
              ? copy.loading
              : copy.unavailable}
        </span>
        <a
          className="inline-flex items-center gap-1 text-[13px] font-medium text-accent hover:underline"
          href={`${GITHUB}/releases`}
        >
          {copy.releases}
          <Icon name="arrow-forward" size={14} />
        </a>
      </p>

      <div
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-busy={status === "loading"}
      >
        {platforms.map((platform) => {
          const artifact = artifactOf(platform.id);
          const size = sizeOf(platform.id);
          const isPreferred =
            preferredPlatform !== undefined &&
            platform.id === preferredPlatform;
          return (
            <article
              className={cn(
                "flex flex-col rounded-2xl border bg-white p-5",
                isPreferred ? "border-accent" : "border-hairline",
              )}
              key={platform.id}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      isPreferred
                        ? "bg-accent/10 text-accent"
                        : "bg-mist text-ink",
                    )}
                  >
                    <Icon name={PLATFORM_ICONS[platform.id]} size={22} />
                  </span>
                  {isPreferred ? (
                    <span className="rounded-full bg-ink px-2.5 py-1 text-[var(--fs-micro)] font-medium text-white shadow-sm">
                      {locale === "en" ? "Recommended" : "推荐"}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {platform.title}
                </h3>
                {platform.id === "macos" ? (
                  <div className="mt-2">
                    <div
                      role="group"
                      aria-label={
                        locale === "en"
                          ? "macOS architecture"
                          : "macOS 芯片架构"
                      }
                      className="inline-flex rounded-lg border border-hairline bg-mist p-0.5 text-xs font-medium"
                    >
                      <button
                        type="button"
                        onClick={() => setMacArch("arm64")}
                        className={cn(
                          "rounded-md px-2.5 py-1 text-xs transition-colors",
                          macArch === "arm64"
                            ? "bg-white font-medium text-ink shadow-sm"
                            : "text-muted hover:text-ink",
                        )}
                      >
                        Apple Silicon
                      </button>
                      <button
                        type="button"
                        onClick={() => setMacArch("x64")}
                        className={cn(
                          "rounded-md px-2.5 py-1 text-xs transition-colors",
                          macArch === "x64"
                            ? "bg-white font-medium text-ink shadow-sm"
                            : "text-muted hover:text-ink",
                        )}
                      >
                        Intel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-muted">{platform.detail}</p>
                )}
                <div className="mt-4 space-y-1.5">
                  <span className="tnum block text-[13px] text-muted">
                    {copy.sizeLabel}: {size ?? "—"}
                  </span>
                  {platform.meta.map((line, index) => (
                    <span
                      key={line}
                      className={cn(
                        "block text-[13px]",
                        platform.id === "windows" && index === 1
                          ? "text-amber-700"
                          : "text-muted",
                      )}
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                {artifact ? (
                  <>
                    <a
                      className={cn(
                        "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-[transform,background-color,box-shadow]",
                        isPreferred
                          ? "bg-ink text-white shadow-[0_1px_2px_rgb(9_13_22/0.2),0_4px_12px_rgb(9_13_22/0.1)] hover:bg-black hover:shadow-[0_6px_20px_rgb(9_13_22/0.18)]"
                          : "border border-hairline bg-white text-ink hover:border-ink/25 hover:bg-mist",
                      )}
                      href={artifact.url}
                      aria-label={`${copy.headerDownload} ${platform.title} ${platform.detail}`}
                    >
                      <Icon name="download" size={16} />
                      <span>
                        {platform.id === "macos"
                          ? locale === "en"
                            ? `Download .dmg · ${macArch === "arm64" ? "Apple Silicon" : "Intel"}`
                            : `下载 .dmg · ${macArch === "arm64" ? "Apple Silicon" : "Intel"}`
                          : platform.id === "windows"
                            ? locale === "en"
                              ? "Download .exe"
                              : "下载 .exe"
                            : platform.id === "linux"
                              ? locale === "en"
                                ? "Download .deb"
                                : "下载 .deb"
                              : locale === "en"
                                ? "Download AppImage"
                                : "下载 AppImage"}
                      </span>
                    </a>
                    {platform.id === "macos" && altMacArtifact ? (
                      <p className="mt-2 text-center">
                        <a
                          className="text-[12px] text-muted transition-colors hover:text-ink hover:underline"
                          href={altMacArtifact.url}
                        >
                          {macArch === "arm64"
                            ? locale === "en"
                              ? `Download Intel build · .dmg · ${altMacSize}`
                              : `下载 Intel 版 · .dmg · ${altMacSize}`
                            : locale === "en"
                              ? `Download Apple Silicon build · .dmg · ${altMacSize}`
                              : `下载 Apple Silicon 版 · .dmg · ${altMacSize}`}
                        </a>
                      </p>
                    ) : null}
                  </>
                ) : status === "loading" ? (
                  <span
                    className="block h-10 w-full motion-safe:animate-pulse rounded-full bg-mist"
                    aria-hidden="true"
                  />
                ) : (
                  <a
                    className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                    href={`${GITHUB}/releases`}
                  >
                    {release ? copy.noLinux : copy.releases}
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-4 text-[var(--fs-micro)] text-muted">
        {copy.signingNote}
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-xl border-l border-accent bg-mist p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <Icon name="info" size={18} className="mt-0.5 shrink-0 text-accent" />
          <p className="text-sm leading-relaxed text-muted">
            <strong className="font-semibold text-ink">
              {copy.windowsNoteTitle}
            </strong>
            {copy.windowsNote}
          </p>
        </div>
        <a
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-accent hover:underline"
          href={
            locale === "en" ? "/en/docs/faq/install/" : "/docs/faq/install/"
          }
        >
          {copy.windowsGuide}
          <Icon name="arrow-forward" size={14} />
        </a>
      </div>
    </section>
  );
}
