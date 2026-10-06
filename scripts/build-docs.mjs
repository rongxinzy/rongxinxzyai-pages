// 构建期文档内容管线：把 docs/**/*.md 转成 src/docs/generated/content.json（中文），
// docs/en/**/*.md 转成 content-en.json（英文）；并把 docs/assets 平移到 public/docs-assets。
// 中文文档直接放在 docs/ 下，docs/en/ 子树只放英文版，两种语言路由一一对应。
import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { renderMarkdown, textOf, walk } from "./lib/markdown-pipeline.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = join(projectRoot, "docs");
const generatedDir = join(projectRoot, "src/docs/generated");
const assetsFrom = join(docsDir, "assets");
const assetsTo = join(projectRoot, "public/docs-assets");

const ASSETS_BASE = "/docs-assets/";

const LOCALES = [
  { id: "zh", srcDir: docsDir, outFile: "content.json", base: "/docs/", assetsBase: ASSETS_BASE },
  { id: "en", srcDir: join(docsDir, "en"), outFile: "content-en.json", base: "/en/docs/", assetsBase: `${ASSETS_BASE}en/` },
];

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

// route：相对语言根目录的路径去掉 .md，index 归入目录本身（"faq/index" → "faq"）。
function routeOf(file, srcDir) {
  const rel = posix.normalize(file.slice(srcDir.length + 1)).replace(/\.md$/, "");
  return rel === "index" ? "" : rel.replace(/(^|\/)index$/, "");
}

// 解析文内相对链接为 <base><route>/ 干净路径；锚点保留。
// 无法解析到文档内路由时保留原值。
function rewriteHref(href, fromDir, routes, base) {
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
    if (routes.has(route)) return `${base}${route}${route ? "/" : ""}${hash}`;
  }
  return href;
}

function rewriteImageSrc(src, assetsBase) {
  const match = src.replace(/^\.\//, "").match(/^(?:\.\.\/)*assets\/(.+)$/);
  return match ? `${assetsBase}${match[1]}` : src;
}

async function buildLocale({ srcDir, outFile, base, assetsBase }) {
  let files;
  try {
    files = await listMarkdown(srcDir);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    files = [];
  }
  // 中文根目录遍历时排除英文子树与资源目录。
  if (srcDir === docsDir) {
    files = files.filter(
      (file) =>
        !file.startsWith(join(docsDir, "en") + "/") &&
        !file.startsWith(assetsFrom + "/") &&
        file !== join(docsDir, "index.md"),
    );
  }
  const routes = new Map();
  for (const file of files) routes.set(routeOf(file, srcDir), file);

  const content = {};
  for (const [route, file] of routes) {
    const raw = await readFile(file, "utf8");
    const { data, content: body } = matter(raw);
    const fromDir = posix.dirname(posix.normalize(file.slice(srcDir.length + 1)));

    const { html, headings, hast } = await renderMarkdown(body, {
      rewriteHref: (href) => rewriteHref(href, fromDir, new Set(routes.keys()), base),
      rewriteImageSrc: (src) => rewriteImageSrc(src, assetsBase),
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

  await mkdir(generatedDir, { recursive: true });
  await writeFile(join(generatedDir, outFile), `${JSON.stringify(content, null, 2)}\n`, "utf8");
  return Object.keys(content).length;
}

async function main() {
  let total = 0;
  for (const locale of LOCALES) {
    total = await buildLocale(locale);
    console.log(`docs(${locale.id}): ${total} routes -> ${join(generatedDir, locale.outFile)}`);
  }
  await cp(assetsFrom, assetsTo, { recursive: true });
  // 英文文档的截图单独命名空间 /docs-assets/en/，与中文版本互不覆盖。
  await cp(join(docsDir, "en", "assets"), join(assetsTo, "en"), { recursive: true }).catch(
    (error) => {
      if (error.code !== "ENOENT") throw error;
    },
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
