export type V2Locale = "zh-CN" | "en";

export type V2Page = "home" | "enterprise";

export type V2Platform = "windows" | "macos" | "linux" | "linuxAppImage";

export type V2ReleaseArtifact = {
  url: string;
  size: number;
};

export type V2Release = {
  version: string;
  artifacts: {
    windows: V2ReleaseArtifact;
    macos: V2ReleaseArtifact;
    linux?: V2ReleaseArtifact;
    linuxAppImage?: V2ReleaseArtifact;
  };
};

export type V2ReleaseStatus = "loading" | "ready" | "unavailable";

export type V2SiteProps = {
  locale: V2Locale;
  page: V2Page;
  release: V2Release | null;
  releaseStatus: V2ReleaseStatus;
  preferredPlatform?: Exclude<V2Platform, "linuxAppImage">;
};

export type V2DemoState =
  | "idle"
  | "typing"
  | "planning"
  | "approval"
  | "working"
  | "complete";
