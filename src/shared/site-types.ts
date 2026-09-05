export type SiteLocale = "zh-CN" | "en";

export type SitePage = "home" | "enterprise";

export type SitePlatform = "windows" | "macos" | "linux" | "linuxAppImage";

export type SiteReleaseArtifact = {
  url: string;
  size: number;
};

export type SiteRelease = {
  version: string;
  artifacts: {
    windows: SiteReleaseArtifact;
    macos: SiteReleaseArtifact;
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
  preferredPlatform?: Exclude<SitePlatform, "linuxAppImage">;
};
