export type SiteLocale = "zh-CN" | "en";

export type SitePage = "home" | "enterprise" | "roadmap" | "browser";

export type SitePlatform =
  | "windows"
  | "macos"
  | "macosIntel"
  | "linux"
  | "linuxAppImage";

export type SiteReleaseArtifact = {
  url: string;
  size: number;
};

export type SiteRelease = {
  version: string;
  artifacts: {
    windows: SiteReleaseArtifact;
    windowsCpu?: SiteReleaseArtifact;
    windowsCuda?: SiteReleaseArtifact;
    macos?: SiteReleaseArtifact;
    macosIntel?: SiteReleaseArtifact;
    linux?: SiteReleaseArtifact;
    linuxAppImage?: SiteReleaseArtifact;
  };
};

export type SiteReleaseStatus = "loading" | "ready" | "unavailable";

export type SiteSiteProps = {
  locale: SiteLocale;
  page: SitePage;
  release: SiteRelease | null;
  releaseStatus: SiteReleaseStatus;
  preferredPlatform?: Exclude<SitePlatform, "linuxAppImage" | "macosIntel">;
};
