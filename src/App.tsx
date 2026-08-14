import { useEffect, useState } from "react";
import { getMarketingRoute } from "./routing/marketing";
import { V2Site, type V2Platform, type V2Release, type V2ReleaseArtifact, type V2ReleaseStatus } from "./v2";

const DOWNLOAD_HOST = "downloads.rongxzyai.com";

function isReleaseArtifact(value: unknown): value is V2ReleaseArtifact {
  if (typeof value !== "object" || value === null) return false;
  const artifact = value as Record<string, unknown>;
  if (typeof artifact.url !== "string" || typeof artifact.size !== "number") return false;

  try {
    const url = new URL(artifact.url);
    return (
      url.protocol === "https:" &&
      url.hostname === DOWNLOAD_HOST &&
      Number.isSafeInteger(artifact.size) &&
      artifact.size > 0
    );
  } catch {
    return false;
  }
}

function isRelease(value: unknown): value is V2Release {
  if (typeof value !== "object" || value === null) return false;
  const release = value as Record<string, unknown>;
  if (typeof release.version !== "string" || release.version.length === 0) return false;
  if (typeof release.artifacts !== "object" || release.artifacts === null) return false;

  const artifacts = release.artifacts as Record<string, unknown>;
  return (
    isReleaseArtifact(artifacts.windows) &&
    isReleaseArtifact(artifacts.macos) &&
    (artifacts.linux === undefined || isReleaseArtifact(artifacts.linux)) &&
    (artifacts.linuxAppImage === undefined || isReleaseArtifact(artifacts.linuxAppImage))
  );
}

function detectPlatform(): Exclude<V2Platform, "linuxAppImage"> {
  const agent = navigator.userAgent.toLowerCase();
  if (agent.includes("mac")) return "macos";
  if (agent.includes("linux")) return "linux";
  return "windows";
}

export default function App() {
  const route = getMarketingRoute();
  const [release, setRelease] = useState<V2Release | null>(null);
  const [releaseStatus, setReleaseStatus] = useState<V2ReleaseStatus>("loading");
  const [preferredPlatform] = useState(detectPlatform);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRelease() {
      try {
        const response = await fetch("/api/release", {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!response.ok) {
          setReleaseStatus("unavailable");
          return;
        }

        const payload: unknown = await response.json();
        if (!isRelease(payload)) {
          setReleaseStatus("unavailable");
          return;
        }

        setRelease(payload);
        setReleaseStatus("ready");
      } catch {
        if (!controller.signal.aborted) setReleaseStatus("unavailable");
      }
    }

    void loadRelease();
    return () => controller.abort();
  }, []);

  return (
    <V2Site
      locale={route.locale}
      page={route.page}
      release={release}
      releaseStatus={releaseStatus}
      preferredPlatform={preferredPlatform}
    />
  );
}
