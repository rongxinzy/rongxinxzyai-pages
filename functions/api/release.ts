const UPDATE_URL = "https://updates.rongxzyai.com/v1/updates/latest";
const DOWNLOAD_HOST = "downloads.rongxzyai.com";
const SUCCESS_CACHE_CONTROL = "public, max-age=300, s-maxage=300, stale-while-revalidate=86400";

type ArtifactTarget = {
  name: "linux" | "linuxAppImage" | "macos" | "macosIntel" | "windows" | "windowsCpu" | "windowsCuda";
  platform: "darwin" | "linux" | "win32";
  arch: "arm64" | "x64";
  /** Variants to request in order; later entries are fallbacks for older releases. */
  variants: string[];
  extension: ".AppImage" | ".deb" | ".dmg" | ".exe";
};

type UpdateArtifact = {
  url: string;
  size: number;
};

type ReleaseArtifact = {
  url: string;
  size: number;
};

type ReleasePayload = {
  version: string;
  artifact: UpdateArtifact;
};

const ARTIFACT_TARGETS: ArtifactTarget[] = [
  { name: "windows", platform: "win32", arch: "x64", variants: ["lite"], extension: ".exe" },
  { name: "windowsCpu", platform: "win32", arch: "x64", variants: ["cpu"], extension: ".exe" },
  { name: "windowsCuda", platform: "win32", arch: "x64", variants: ["cuda"], extension: ".exe" },
  { name: "macos", platform: "darwin", arch: "arm64", variants: ["cpu", "default"], extension: ".dmg" },
  { name: "macosIntel", platform: "darwin", arch: "x64", variants: ["cpu", "default"], extension: ".dmg" },
  { name: "linux", platform: "linux", arch: "x64", variants: ["deb-cpu", "deb"], extension: ".deb" },
  {
    name: "linuxAppImage",
    platform: "linux",
    arch: "x64",
    variants: ["appimage-cpu", "appimage"],
    extension: ".AppImage",
  },
];

function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", init.status && init.status >= 400 ? "no-store" : SUCCESS_CACHE_CONTROL);

  return new Response(JSON.stringify(data), { ...init, headers });
}

function parseBase64UrlJson(value: unknown): unknown {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error("The update manifest does not contain a payload.");
  }

  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(`${base64}${padding}`);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}

function normalizeArtifact(value: unknown, target: ArtifactTarget): ReleaseArtifact {
  if (typeof value !== "object" || value === null) {
    throw new Error(`The ${target.name} manifest payload is invalid.`);
  }

  const payload = value as Record<string, unknown>;
  const artifact = payload.artifact as Record<string, unknown> | undefined;
  if (typeof payload.version !== "string" || payload.version.length === 0 || !artifact) {
    throw new Error(`The ${target.name} manifest is missing a release artifact.`);
  }

  if (typeof artifact.url !== "string" || typeof artifact.size !== "number") {
    throw new Error(`The ${target.name} artifact has an invalid shape.`);
  }

  const url = new URL(artifact.url);
  if (
    url.protocol !== "https:" ||
    url.hostname !== DOWNLOAD_HOST ||
    !url.pathname.endsWith(target.extension) ||
    !Number.isSafeInteger(artifact.size) ||
    artifact.size <= 0
  ) {
    throw new Error(`The ${target.name} artifact did not pass validation.`);
  }

  return { url: url.toString(), size: artifact.size };
}

// Releases built since the lite/cpu/cuda editions publish cpu, deb-cpu and
// appimage-cpu; older releases (e.g. v2026.8.13) only know default, deb and
// appimage. Try each variant in order and use the first that validates.
async function fetchRelease(target: ArtifactTarget): Promise<ReleasePayload> {
  let lastError: unknown;
  for (const variant of target.variants) {
    try {
      return await fetchReleaseVariant(target, variant);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error(`No ${target.name} release found.`);
}

async function fetchReleaseVariant(target: ArtifactTarget, variant: string): Promise<ReleasePayload> {
  const url = new URL(UPDATE_URL);
  url.search = new URLSearchParams({
    channel: "stable",
    platform: target.platform,
    arch: target.arch,
    variant,
  }).toString();

  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`The ${target.name} update service responded with ${response.status}.`);
  }

  const envelope: unknown = await response.json();
  if (typeof envelope !== "object" || envelope === null) {
    throw new Error(`The ${target.name} update response is invalid.`);
  }

  const payload = parseBase64UrlJson((envelope as Record<string, unknown>).payload);
  if (typeof payload !== "object" || payload === null) {
    throw new Error(`The ${target.name} update payload is invalid.`);
  }

  const payloadRecord = payload as Record<string, unknown>;
  if (typeof payloadRecord.version !== "string" || payloadRecord.version.length === 0) {
    throw new Error(`The ${target.name} update payload is missing a version.`);
  }

  return {
    version: payloadRecord.version,
    artifact: normalizeArtifact(payloadRecord, target),
  };
}

export async function onRequestGet(): Promise<Response> {
  try {
    const [windows, windowsCpu, windowsCuda, macos, macosIntel, linux, linuxAppImage] = await Promise.all([
      fetchRelease(ARTIFACT_TARGETS[0]),
      fetchRelease(ARTIFACT_TARGETS[1]).catch(() => null),
      fetchRelease(ARTIFACT_TARGETS[2]).catch(() => null),
      fetchRelease(ARTIFACT_TARGETS[3]).catch(() => null),
      fetchRelease(ARTIFACT_TARGETS[4]).catch(() => null),
      fetchRelease(ARTIFACT_TARGETS[5]).catch(() => null),
      fetchRelease(ARTIFACT_TARGETS[6]).catch(() => null),
    ]);

    const withVersion = (release: ReleasePayload) => ({ ...release.artifact, version: release.version });
    const artifacts: Record<string, ReleaseArtifact & { version: string }> = {
      windows: withVersion(windows),
    };
    // Releases before the inference editions only publish the lite installer.
    if (windowsCpu?.version === windows.version) artifacts.windowsCpu = withVersion(windowsCpu);
    if (windowsCuda?.version === windows.version) artifacts.windowsCuda = withVersion(windowsCuda);
    // Platforms ship in stages (Windows, then macOS, then Linux), so each one
    // serves its own latest stable release; a missing platform is left out.
    if (macos) artifacts.macos = withVersion(macos);
    if (macosIntel) artifacts.macosIntel = withVersion(macosIntel);
    if (linux) artifacts.linux = withVersion(linux);
    if (linuxAppImage) artifacts.linuxAppImage = withVersion(linuxAppImage);

    return json({
      version: windows.version,
      artifacts,
    });
  } catch {
    return json({ error: "Unable to load the current release." }, { status: 502 });
  }
}
