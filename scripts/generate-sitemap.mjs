// After vite build + docs/blog emit: walk dist for index.html shells and write sitemap.xml + robots.txt.
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const SITE_URL = "https://www.rongxzyai.com";

/** @typedef {{ loc: string, lastmod?: string }} SitemapUrl */

/**
 * @param {string} distIndexPath absolute path to an index.html under dist
 * @param {string} distDir
 */
export function distIndexToPathname(distIndexPath, distDir) {
  const rel = relative(distDir, distIndexPath).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  const withoutIndex = rel.replace(/\/index\.html$/, "");
  return `/${withoutIndex}/`;
}

/**
 * @param {string} pathname trailing-slash path like /docs/guide/foo/
 */
export function pathnameToLoc(pathname) {
  return new URL(pathname, SITE_URL).href;
}

/**
 * @param {string} distDir
 * @returns {Promise<SitemapUrl[]>}
 */
export async function collectSitemapUrls(distDir) {
  const blogContentPath = join(projectRoot, "src/blog/generated/content.json");
  /** @type {Record<string, { date?: string }>} */
  let blogBySlug = {};
  try {
    blogBySlug = JSON.parse(await readFile(blogContentPath, "utf8"));
  } catch {
    // blog content may be missing in partial runs
  }

  const urls = [];
  await walk(distDir, async (filePath) => {
    if (!filePath.endsWith("/index.html") && !filePath.endsWith("\\index.html")) return;
    const pathname = distIndexToPathname(filePath, distDir);
    const loc = pathnameToLoc(pathname);
    /** @type {SitemapUrl} */
    const entry = { loc };

    const blogMatch = pathname.match(/^\/blog\/([^/]+)\/$/);
    if (blogMatch) {
      const date = blogBySlug[blogMatch[1]]?.date;
      if (date) entry.lastmod = date;
    } else {
      const { mtime } = await stat(filePath);
      entry.lastmod = mtime.toISOString().slice(0, 10);
    }

    urls.push(entry);
  });

  urls.sort((a, b) => a.loc.localeCompare(b.loc));
  return urls;
}

/**
 * @param {SitemapUrl[]} urls
 */
export function renderSitemapXml(urls) {
  const body = urls
    .map(({ loc, lastmod }) => {
      const lastmodTag = lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : "";
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmodTag}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export function renderRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/**
 * @param {string} dir
 * @param {(filePath: string) => void | Promise<void>} visit
 */
async function walk(dir, visit) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, visit);
    else if (entry.isFile()) await visit(full);
  }
}

async function main() {
  const distDir = join(projectRoot, "dist");
  const urls = await collectSitemapUrls(distDir);
  const sitemapPath = join(distDir, "sitemap.xml");
  const robotsPath = join(distDir, "robots.txt");

  await writeFile(sitemapPath, renderSitemapXml(urls), "utf8");
  await writeFile(robotsPath, renderRobotsTxt(), "utf8");

  console.log(`sitemap: wrote ${urls.length} URLs to dist/sitemap.xml and dist/robots.txt`);
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
