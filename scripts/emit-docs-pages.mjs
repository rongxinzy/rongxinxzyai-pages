// vite build 之后执行：基于 dist/docs.html 为每个文档路由生成静态壳。
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(projectRoot, "dist");
const shellFile = join(distDir, "docs.html");
const contentFile = join(projectRoot, "src/docs/generated/content.json");

const DEFAULT_TITLE = "知远智能体文档";
const DEFAULT_DESCRIPTION = "知远智能体的安装、使用与开发说明。";

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function main() {
  const shell = await readFile(shellFile, "utf8");
  const content = JSON.parse(await readFile(contentFile, "utf8"));

  for (const [route, page] of Object.entries(content)) {
    const title = `${page.title} · ${DEFAULT_TITLE}`;
    const description = page.description || DEFAULT_DESCRIPTION;
    const html = shell
      .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${escapeHtml(description)}" />`,
      );
    const outFile = join(distDir, "docs", route, "index.html");
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
  }

  // /docs/ 首页：保留壳本身的标题与描述。
  const homeFile = join(distDir, "docs", "index.html");
  await mkdir(dirname(homeFile), { recursive: true });
  await writeFile(homeFile, shell, "utf8");
  await unlink(shellFile);

  console.log(`docs: emitted ${Object.keys(content).length + 1} pages under dist/docs/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
