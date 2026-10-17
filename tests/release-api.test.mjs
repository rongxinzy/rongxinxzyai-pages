// Verifies functions/api/release.ts edition-variant fallback with a mocked update service.
import { test } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const outfile = join(mkdtempSync(join(tmpdir(), "release-api-")), "release.mjs");
await build({ entryPoints: ["functions/api/release.ts"], outfile, format: "esm", bundle: true, logLevel: "silent" });
const { onRequestGet } = await import(pathToFileURL(outfile).href);

const EXT = { lite: ".exe", cpu: ".dmg", default: ".dmg", "deb-cpu": ".deb", deb: ".deb", "appimage-cpu": ".AppImage", appimage: ".AppImage" };

function mockService(available, version = "2026.10.17") {
  const requested = [];
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    const key = `${url.searchParams.get("platform")}:${url.searchParams.get("arch")}:${url.searchParams.get("variant")}`;
    requested.push(key);
    if (!available.has(key)) return new Response("bad variant", { status: 400 });
    const variant = url.searchParams.get("variant");
    const payload = { version, artifact: { url: `https://downloads.rongxzyai.com/${key.replaceAll(":", "-")}${EXT[variant]}`, size: 1024 } };
    const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
    return new Response(JSON.stringify({ payload: encoded }), { status: 200 });
  };
  return requested;
}

test("new releases resolve the cpu edition variants", async () => {
  const requested = mockService(new Set(["win32:x64:lite", "darwin:arm64:cpu", "darwin:x64:cpu", "linux:x64:deb-cpu", "linux:x64:appimage-cpu"]));
  const body = await (await onRequestGet()).json();
  assert.equal(body.version, "2026.10.17");
  assert.match(body.artifacts.macos.url, /darwin-arm64-cpu\.dmg$/);
  assert.match(body.artifacts.macosIntel.url, /darwin-x64-cpu\.dmg$/);
  assert.match(body.artifacts.linux.url, /linux-x64-deb-cpu\.deb$/);
  assert.match(body.artifacts.linuxAppImage.url, /linux-x64-appimage-cpu\.AppImage$/);
  assert.ok(!requested.includes("linux:x64:deb"), "no fallback request when cpu variant exists");
});

test("older releases fall back to default, deb and appimage", async () => {
  mockService(new Set(["win32:x64:lite", "darwin:arm64:default", "darwin:x64:default", "linux:x64:deb", "linux:x64:appimage"]), "2026.8.13-build.2");
  const response = await onRequestGet();
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.version, "2026.8.13-build.2");
  assert.match(body.artifacts.macos.url, /darwin-arm64-default\.dmg$/);
  assert.match(body.artifacts.macosIntel.url, /darwin-x64-default\.dmg$/);
  assert.match(body.artifacts.linux.url, /linux-x64-deb\.deb$/);
  assert.match(body.artifacts.linuxAppImage.url, /linux-x64-appimage\.AppImage$/);
});

test("missing required macOS release still fails with 502", async () => {
  mockService(new Set(["win32:x64:lite"]));
  assert.equal((await onRequestGet()).status, 502);
});
