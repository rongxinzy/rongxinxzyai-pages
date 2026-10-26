// vite build 之后执行：基于 dist/docs.html 为每个文档路由生成静态壳。
// 中文输出到 dist/docs/，英文输出到 dist/en/docs/，壳的 lang 与默认文案随语言切换。
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL } from "./generate-sitemap.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(projectRoot, "dist");
const shellFile = join(distDir, "docs.html");
const generatedDir = join(projectRoot, "src/docs/generated");

const LOCALES = [
  {
    contentFile: "content.json",
    outDir: "docs",
    lang: "zh-CN",
    hrefLang: "zh-CN",
    defaultTitle: "知远智能体文档",
    defaultDescription: "知远智能体的安装、使用与开发说明。",
    siteName: "知远",
    pathPrefix: "/docs/",
    alternatePrefix: "/en/docs/",
  },
  {
    contentFile: "content-en.json",
    outDir: join("en", "docs"),
    lang: "en",
    hrefLang: "en",
    defaultTitle: "Seriya Docs",
    defaultDescription:
      "Install, use, and develop with Seriya — local-first desktop AI agent with llama.cpp, GGUF models, and an OpenAI-compatible API.",
    siteName: "Seriya",
    pathPrefix: "/en/docs/",
    alternatePrefix: "/docs/",
  },
];

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const ZHIYUAN_FAVICONS = `<link rel="icon" type="image/svg+xml" href="/favicon-light.svg" media="(prefers-color-scheme: light)" />
    <link rel="icon" type="image/svg+xml" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />`;

const SERIYA_FAVICONS = `<link rel="icon" type="image/png" sizes="32x32" href="/brand/seriya-favicon-32.png" />
    <link rel="apple-touch-icon" href="/brand/seriya-apple-touch-icon.png" />`;

function withLocaleFavicons(html, lang) {
  const favicons = lang === "en" ? SERIYA_FAVICONS : ZHIYUAN_FAVICONS;
  return html.replace(ZHIYUAN_FAVICONS, favicons);
}

function absoluteUrl(pathname) {
  return new URL(pathname, SITE_URL).href;
}

function docPathname(route, pathPrefix) {
  return `${pathPrefix}${route ? `${route}/` : ""}`;
}

function alternateRouteFor(route, page, locale) {
  if (page?.alternateRoute) return page.alternateRoute;
  return route;
}

function buildHeadExtras({
  title,
  description,
  canonicalPath,
  locale,
  alternatePath,
  jsonLd,
}) {
  const canonical = absoluteUrl(canonicalPath);
  const alternate = absoluteUrl(alternatePath);
  const ogImage =
    locale.lang === "en"
      ? `${SITE_URL}/brand/seriya-owl-scarf-logo.jpg`
      : `${SITE_URL}/product/zhiyuan-workspace.png`;
  const lines = [
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="${locale.hrefLang}" href="${canonical}" />`,
    `<link rel="alternate" hreflang="${locale.lang === "en" ? "zh-CN" : "en"}" href="${alternate}" />`,
    `<link rel="alternate" hreflang="x-default" href="${locale.lang === "en" ? alternate : canonical}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="${escapeHtml(locale.siteName)}" />`,
    `<meta property="og:locale" content="${locale.lang === "en" ? "en_US" : "zh_CN"}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ];
  return lines.join("\n    ");
}

function buildJsonLd({ title, description, canonicalPath, locale, page, route }) {
  const canonical = absoluteUrl(canonicalPath);
  /** @type {Record<string, unknown>[]} */
  const graph = [
    {
      "@type": "WebPage",
      name: title,
      description,
      url: canonical,
      inLanguage: locale.lang,
      isPartOf: {
        "@type": "WebSite",
        name: locale.siteName,
        url: absoluteUrl(locale.pathPrefix),
      },
    },
    {
      "@type": "TechArticle",
      headline: page?.title ?? title,
      description,
      url: canonical,
      inLanguage: locale.lang,
      author: {
        "@type": "Organization",
        name: locale.lang === "en" ? "Seriya" : "知远",
      },
    },
  ];

  if (page?.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faq.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    });
  }

  if (locale.lang === "en" && (route === "" || route.startsWith("guide/what-is-seriya"))) {
    graph.push({
      "@type": "Organization",
      name: "Seriya",
      legalName: "Beijing Rongxin Zhiyuan Technology Co., Ltd.",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/seriya-owl-scarf-logo.jpg`,
      sameAs: ["https://github.com/rongxinzy/RongxinAI"],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function applyShell(html, { title, description, headExtras }) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeHtml(description)}" />`,
    )
    .replace("</head>", `    ${headExtras}\n  </head>`);
}

async function emitLocale(shell, locale) {
  const content = JSON.parse(await readFile(join(generatedDir, locale.contentFile), "utf8"));
  const localeShell = withLocaleFavicons(
    shell.replace(/<html lang="[^"]*">/, `<html lang="${locale.lang}">`),
    locale.lang === "en" ? "en" : "zh",
  );

  for (const [route, page] of Object.entries(content)) {
    const docTitle = `${page.title} · ${locale.defaultTitle}`;
    const description = page.description || locale.defaultDescription;
    const canonicalPath = docPathname(route, locale.pathPrefix);
    const altRoute = alternateRouteFor(route, page, locale);
    const alternatePath = docPathname(altRoute, locale.alternatePrefix);
    const headExtras = buildHeadExtras({
      title: docTitle,
      description,
      canonicalPath,
      locale,
      alternatePath,
      jsonLd: buildJsonLd({
        title: docTitle,
        description,
        canonicalPath,
        locale,
        page,
        route,
      }),
    });
    const html = applyShell(localeShell, {
      title: docTitle,
      description,
      headExtras,
    });
    const outFile = join(distDir, locale.outDir, route, "index.html");
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
  }

  const homeCanonical = docPathname("", locale.pathPrefix);
  const homeAlternate = docPathname("", locale.alternatePrefix);
  const homeHeadExtras = buildHeadExtras({
    title: locale.defaultTitle,
    description: locale.defaultDescription,
    canonicalPath: homeCanonical,
    locale,
    alternatePath: homeAlternate,
    jsonLd: buildJsonLd({
      title: locale.defaultTitle,
      description: locale.defaultDescription,
      canonicalPath: homeCanonical,
      locale,
      page: undefined,
      route: "",
    }),
  });
  const homeShell = applyShell(localeShell, {
    title: locale.defaultTitle,
    description: locale.defaultDescription,
    headExtras: homeHeadExtras,
  });
  const homeFile = join(distDir, locale.outDir, "index.html");
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
