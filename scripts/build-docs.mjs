// 构建期文档内容管线：把 docs/**/*.md 转成 src/docs/generated/content.json，
// 并把 docs/assets 平移到 public/docs-assets。
import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { renderMarkdown, textOf, walk } from "./lib/markdown-pipeline.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = join(projectRoot, "docs");
const outFile = join(projectRoot, "src/docs/generated/content.json");
const assetsFrom = join(docsDir, "assets");
const assetsTo = join(projectRoot, "public/docs-assets");

const DOCS_BASE = "/docs/";
const ASSETS_BASE = "/docs-assets/";

async function listMarkdown(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await listMarkdown(path)));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(path);
  }
  return files.sort();
}

// route：相对 docs/ 的路径去掉 .md，index 归入目录本身（"faq/index" → "faq"）。
function routeOf(file) {
  const rel = posix.normalize(file.slice(docsDir.length + 1)).replace(/\.md$/, "");
  return rel === "index" ? "" : rel.replace(/(^|\/)index$/, "");
}

// 解析文内相对链接为 /docs/<route>/ 干净路径；锚点保留。
// 无法解析到文档内路由时保留原值。
function rewriteHref(href, fromDir, routes) {
  if (
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }
  const [rawPath, anchor] = href.split("#", 2);
  const hash = anchor ? `#${anchor}` : "";
  if (!rawPath) return href;
  const resolved = posix.normalize(posix.join(fromDir, rawPath));
  const candidates = [];
  if (rawPath.endsWith(".md")) {
    candidates.push(resolved.replace(/\.md$/, "").replace(/(^|\/)index$/, ""));
  } else {
    candidates.push(resolved.replace(/\/$/, ""));
    candidates.push(posix.join(resolved, "index").replace(/(^|\/)index$/, ""));
  }
  for (const candidate of candidates) {
    const route = candidate.replace(/\/$/, "");
    if (routes.has(route)) return `${DOCS_BASE}${route}${route ? "/" : ""}${hash}`;
  }
  return href;
}

function rewriteImageSrc(src) {
  const match = src.replace(/^\.\//, "").match(/^(?:\.\.\/)*assets\/(.+)$/);
  return match ? `${ASSETS_BASE}${match[1]}` : src;
}

async function main() {
  const files = (await listMarkdown(docsDir)).filter(
    (file) => file !== join(docsDir, "index.md"),
  );
  const routes = new Map();
  for (const file of files) routes.set(routeOf(file), file);

  const content = {};
  for (const [route, file] of routes) {
    const raw = await readFile(file, "utf8");
    const { data, content: body } = matter(raw);
    const fromDir = posix.dirname(posix.normalize(file.slice(docsDir.length + 1)));

    const { html, headings, hast } = await renderMarkdown(body, {
      rewriteHref: (href) => rewriteHref(href, fromDir, new Set(routes.keys())),
      rewriteImageSrc,
    });

    let title = typeof data.title === "string" ? data.title : "";
    if (!title) {
      walk(hast, (node) => {
        if (!title && node.type === "element" && node.tagName === "h1") {
          title = textOf(node);
        }
      });
    }

    content[route] = {
      title: title || route.split("/").pop() || "知远智能体文档",
      description: typeof data.description === "string" ? data.description : "",
      html,
      headings,
    };
  }

  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  await cp(assetsFrom, assetsTo, { recursive: true });

  console.log(`docs: ${Object.keys(content).length} routes -> ${outFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
