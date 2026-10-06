// vite build 之后执行：基于 dist/docs.html 为每个文档路由生成静态壳。
// 中文输出到 dist/docs/，英文输出到 dist/en/docs/，壳的 lang 与默认文案随语言切换。
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(projectRoot, "dist");
const shellFile = join(distDir, "docs.html");
const generatedDir = join(projectRoot, "src/docs/generated");

const LOCALES = [
  {
    contentFile: "content.json",
    outDir: "docs",
    lang: "zh-CN",
    defaultTitle: "知远智能体文档",
    defaultDescription: "知远智能体的安装、使用与开发说明。",
  },
  {
    contentFile: "content-en.json",
    outDir: join("en", "docs"),
    lang: "en",
    defaultTitle: "ZhiYuan Docs",
    defaultDescription: "Install, use, and develop with the ZhiYuan agent.",
  },
];

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function emitLocale(shell, { contentFile, outDir, lang, defaultTitle, defaultDescription }) {
  const content = JSON.parse(await readFile(join(generatedDir, contentFile), "utf8"));
  const localeShell = shell.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);

  for (const [route, page] of Object.entries(content)) {
    const title = `${page.title} · ${defaultTitle}`;
    const description = page.description || defaultDescription;
    const html = localeShell
      .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${escapeHtml(description)}" />`,
      );
    const outFile = join(distDir, outDir, route, "index.html");
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
  }

  // 文档首页：保留壳本身的标题与描述（英文壳同步替换标题与描述默认值）。
  const homeShell =
    lang === "en"
      ? localeShell
          .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(defaultTitle)}</title>`)
          .replace(
            /<meta name="description" content="[^"]*" \/>/,
            `<meta name="description" content="${escapeHtml(defaultDescription)}" />`,
          )
      : localeShell;
  const homeFile = join(distDir, outDir, "index.html");
  await mkdir(dirname(homeFile), { recursive: true });
  await writeFile(homeFile, homeShell, "utf8");

  return Object.keys(content).length + 1;
}

async function main() {
  const shell = await readFile(shellFile, "utf8");
  let total = 0;
  for (const locale of LOCALES) {
    total += await emitLocale(shell, locale);
  }
  await unlink(shellFile);
  console.log(`docs: emitted ${total} pages under dist/docs/ and dist/en/docs/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
