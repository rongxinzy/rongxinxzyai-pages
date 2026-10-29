import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  SITE_URL,
  collectSitemapUrls,
  distIndexToPathname,
  pathnameToLoc,
  renderRobotsTxt,
  renderSitemapXml,
} from "../scripts/generate-sitemap.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("dist index paths map to canonical trailing-slash URLs", () => {
  assert.equal(distIndexToPathname("/dist/index.html", "/dist"), "/");
  assert.equal(pathnameToLoc("/en/enterprise/"), `${SITE_URL}/en/enterprise/`);
});

test("build output includes a valid sitemap and robots.txt", async () => {
  const distDir = join(projectRoot, "dist");
  const urls = await collectSitemapUrls(distDir);
  assert.ok(urls.length >= 80, `expected many indexable routes, got ${urls.length}`);

  const locs = new Set(urls.map((entry) => entry.loc));
  for (const path of [
    "/",
    "/en/",
    "/enterprise/",
    "/en/enterprise/",
    "/roadmap/",
    "/en/roadmap/",
    "/docs/",
    "/en/docs/",
    "/blog/",
    "/blog/2026-10-05-blog-launch/",
  ]) {
    assert.ok(locs.has(pathnameToLoc(path)), `missing ${path}`);
  }

  const xml = await readFile(join(distDir, "sitemap.xml"), "utf8");
  assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>/);
  assert.match(xml, /xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/);
  assert.equal((xml.match(/<url>/g) ?? []).length, urls.length);

  const robots = await readFile(join(distDir, "robots.txt"), "utf8");
  assert.equal(robots, renderRobotsTxt());
});

test("renderSitemapXml escapes special characters", () => {
  const xml = renderSitemapXml([{ loc: `${SITE_URL}/?a=1&b=2` }]);
  assert.match(xml, /&amp;/);
});
