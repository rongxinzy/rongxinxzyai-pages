const UPDATE_URL = "https://updates.rongxzyai.com/v1/updates/latest";
const DOWNLOAD_HOST = "downloads.rongxzyai.com";
const SUCCESS_CACHE_CONTROL = "public, max-age=300, s-maxage=300, stale-while-revalidate=86400";

type ArtifactTarget = {
  name: "windows" | "macos";
  platform: "win32" | "darwin";
  arch: "x64" | "arm64";
  variant: "lite" | "default";
  extension: ".exe" | ".dmg";
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
  { name: "windows", platform: "win32", arch: "x64", variant: "lite", extension: ".exe" },
  { name: "macos", platform: "darwin", arch: "arm64", variant: "default", extension: ".dmg" },
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

async function fetchRelease(target: ArtifactTarget): Promise<ReleasePayload> {
  const url = new URL(UPDATE_URL);
  url.search = new URLSearchParams({
    channel: "stable",
    platform: target.platform,
    arch: target.arch,
    variant: target.variant,
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
    const [windows, macos] = await Promise.all(ARTIFACT_TARGETS.map(fetchRelease));
    if (windows.version !== macos.version) {
      throw new Error("The platform manifests point to different versions.");
    }

    return json({
      version: windows.version,
      artifacts: {
        windows: windows.artifact,
        macos: macos.artifact,
      },
    });
  } catch {
    return json({ error: "Unable to load the current release." }, { status: 502 });
  }
}
