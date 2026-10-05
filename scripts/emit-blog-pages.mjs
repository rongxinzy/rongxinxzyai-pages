// vite build 之后执行：基于 dist/blog.html 为 /blog/ 与每篇文章生成静态壳。
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(projectRoot, "dist");
const shellFile = join(distDir, "blog.html");
const contentFile = join(projectRoot, "src/blog/generated/content.json");

const DEFAULT_TITLE = "知远博客";
const DEFAULT_DESCRIPTION = "知远的版本更新说明、本地推理技术笔记与功能设计背景。";

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function main() {
  const shell = await readFile(shellFile, "utf8");
  const content = JSON.parse(await readFile(contentFile, "utf8"));

  for (const [slug, post] of Object.entries(content)) {
    const title = `${post.title} · ${DEFAULT_TITLE}`;
    const description = post.description || DEFAULT_DESCRIPTION;
    const html = shell
      .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${escapeHtml(description)}" />`,
      );
    const outFile = join(distDir, "blog", slug, "index.html");
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
  }

  // /blog/ 列表页：保留壳本身的标题与描述。
  const homeFile = join(distDir, "blog", "index.html");
  await mkdir(dirname(homeFile), { recursive: true });
  await writeFile(homeFile, shell, "utf8");
  await unlink(shellFile);

  console.log(`blog: emitted ${Object.keys(content).length + 1} pages under dist/blog/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
