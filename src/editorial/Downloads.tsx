import type {
  SiteLocale,
  SitePlatform,
  SiteRelease,
  SiteReleaseStatus,
} from "../shared/site-types";
import { GITHUB, type EditorialCopy } from "./copy";
import { Icon } from "./icons";
import { cn } from "../lib/utils";

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
  const platforms: Array<{
    id: DownloadPlatform;
    title: string;
    detail: string;
    meta: string[];
  }> = [
    {
      id: "macos",
      title: "macOS",
      detail: locale === "en" ? "Apple silicon" : "Apple Silicon",
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
        locale === "en"
          ? "Local inference via plugin"
          : "本地推理需另装插件",
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
      detail: locale === "en" ? "Most distributions" : "适用于大多数发行版",
      meta: [".AppImage"],
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
            status === "loading" && "animate-pulse",
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
                    <span className="rounded-full bg-accent px-2.5 py-1 text-[var(--fs-micro)] font-medium text-white">
                      {locale === "en" ? "Recommended" : "推荐"}
                    </span>
                  ) : null}
                </div>
                <h4 className="mt-4 text-base font-semibold text-ink">
                  {platform.title}
                </h4>
                <p className="mt-1 text-sm text-muted">{platform.detail}</p>
                <div className="mt-4 space-y-1.5">
                  <span className="tnum block text-[13px] text-muted">
                    {copy.sizeLabel}:{size ?? " —"}
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
                  <a
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                      isPreferred
                        ? "bg-accent text-white hover:bg-[#4338ca]"
                        : "border border-hairline bg-white text-ink hover:bg-mist",
                    )}
                    href={artifact.url}
                    aria-label={`${copy.headerDownload} ${platform.title} ${platform.detail}`}
                  >
                    <Icon name="download" size={16} />
                    <span>
                      {platform.id === "macos"
                        ? locale === "en"
                          ? "Download .dmg"
                          : "下载 .dmg"
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
                ) : status === "loading" ? (
                  <span
                    className="block h-10 w-full animate-pulse rounded-full bg-mist"
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
          href={locale === "en" ? `${GITHUB}/blob/main/docs/faq/install.md` : "/docs/faq/install"}
        >
          {copy.windowsGuide}
          <Icon name="arrow-forward" size={14} />
        </a>
      </div>
    </section>
  );
}
