// 共享 markdown→HTML 管线：remark/gfm + rehype-slug + shiki，
// build-docs 与 build-blog 共用。每个文件渲染时创建独立 processor，
// 避免跨文件复用导致的状态串扰。
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";

export function textOf(node) {
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(textOf).join("");
}

export function walk(node, visit) {
  visit(node);
  for (const child of node.children ?? []) walk(child, visit);
}

// 去掉 shiki 写在 pre 上的内联背景色，让 CSS 里的 mist 底生效。
export function stripShikiPreBackground(node) {
  walk(node, (element) => {
    if (element.type !== "element" || element.tagName !== "pre") return;
    const style = element.properties?.style;
    if (typeof style !== "string") return;
    const kept = style
      .split(";")
      .filter((part) => !part.trim().startsWith("background-color"))
      .join(";");
    if (kept.trim()) element.properties.style = kept;
    else delete element.properties.style;
  });
}

// 把 markdown 正文渲染为 HTML，并收集 h2/h3 目录。
// rewriteHref / rewriteImageSrc 可选，用于改写文内相对链接与图片路径。
export async function renderMarkdown(body, { rewriteHref, rewriteImageSrc } = {}) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeShiki, { theme: "github-light" })
    .use(rehypeStringify);

  const tree = processor.parse(body);
  const hast = await processor.run(tree);

  const headings = [];
  walk(hast, (node) => {
    if (node.type !== "element") return;
    if (node.tagName === "h2" || node.tagName === "h3") {
      const id = node.properties?.id;
      if (typeof id === "string") {
        headings.push({ id, text: textOf(node), depth: Number(node.tagName[1]) });
      }
    }
    if (rewriteHref && node.tagName === "a" && typeof node.properties?.href === "string") {
      node.properties.href = rewriteHref(node.properties.href);
    }
    if (rewriteImageSrc && node.tagName === "img" && typeof node.properties?.src === "string") {
      node.properties.src = rewriteImageSrc(node.properties.src);
    }
  });
  stripShikiPreBackground(hast);

  return { html: processor.stringify(hast), headings, hast };
}
