// 构建期博客内容管线：把 blog/*.md 转成 src/blog/generated/content.json。
// slug = 文件名去掉 .md。
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { renderMarkdown } from "./lib/markdown-pipeline.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = join(projectRoot, "blog");
const outFile = join(projectRoot, "src/blog/generated/content.json");

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

async function main() {
  const entries = await readdir(blogDir, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => join(blogDir, entry.name))
    .sort();

  const content = {};
  for (const file of files) {
    const slug = file.slice(blogDir.length + 1).replace(/\.md$/, "");
    const raw = await readFile(file, "utf8");
    const { data, content: body } = matter(raw);

    if (typeof data.title !== "string" || !data.title) {
      throw new Error(`blog: ${slug} 缺少 frontmatter title`);
    }
    // js-yaml 会把未加引号的日期解析成 Date 对象，两种形态都接受。
    const date =
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : typeof data.date === "string"
          ? data.date
          : "";
    if (!DATE_PATTERN.test(date)) {
      throw new Error(`blog: ${slug} 的 date 必须是 YYYY-MM-DD 字符串`);
    }
    const tags = Array.isArray(data.tags)
      ? data.tags.filter((tag) => typeof tag === "string")
      : [];

    const { html, headings } = await renderMarkdown(body);

    content[slug] = {
      title: data.title,
      date,
      description: typeof data.description === "string" ? data.description : "",
      tags,
      html,
      headings,
    };
  }

  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, `${JSON.stringify(content, null, 2)}\n`, "utf8");

  console.log(`blog: ${Object.keys(content).length} posts -> ${outFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
