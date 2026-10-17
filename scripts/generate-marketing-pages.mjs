import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadRoadmap } from "./validate-roadmap.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://www.rongxzyai.com";
const imageUrl = `${siteUrl}/product/zhiyuan-workspace.png`;
const roadmap = await loadRoadmap();

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function roadmapItems(milestone) {
  return milestone.items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      if (a.item.date === b.item.date) return b.index - a.index;
      return a.item.date < b.item.date ? 1 : -1;
    })
    .map(({ item }) => item);
}

const pages = [
  {
    file: "index.html",
    lang: "zh-CN",
    ogLocale: "zh_CN",
    page: "home",
    path: "/",
    alternatePath: "/en/",
    title: "知远 — 开源桌面 AI 工作台，在本机运行大模型",
    description:
      "知远是开源桌面 AI 工作台，用于撰写报告、整理表格和修改代码。内置 llama.cpp，在本机运行 GGUF 模型，也可接入兼容 OpenAI 接口的服务。支持 macOS、Windows、Linux。",
    heroTitle: "你的电脑，就是 AI 工作台。",
    heroLead:
      "在一个窗口中撰写报告、整理表格和修改代码。知远内置 llama.cpp，在本机运行开源模型。本地推理不向云端发送输入，联网工具按所选服务处理数据。",
    staticAction: "下载知远",
    staticHref: "/#download",
    imageAlt: "知远桌面工作台界面",
    schemaName: "知远",
  },
  {
    file: "en/index.html",
    lang: "en",
    ogLocale: "en_US",
    page: "home",
    path: "/en/",
    alternatePath: "/",
    title: "ZhiYuan — Open-source AI workbench that runs LLMs locally",
    description:
      "ZhiYuan is an open-source desktop AI workbench for writing reports, organizing spreadsheets and editing code. It embeds llama.cpp to run GGUF models locally and connects to any OpenAI-compatible API across macOS, Windows and Linux.",
    heroTitle: "Your computer, now an AI workbench.",
    heroLead:
      "Write reports, organize spreadsheets and edit code in one window. ZhiYuan includes llama.cpp for running open models on your machine. Local inference does not send inputs to cloud models, while online tools process data through the services you configure.",
    staticAction: "Download ZhiYuan",
    staticHref: "/en/#download",
    imageAlt: "The ZhiYuan desktop workbench",
    schemaName: "ZhiYuan",
  },
  {
    file: "enterprise/index.html",
    lang: "zh-CN",
    ogLocale: "zh_CN",
    page: "enterprise",
    path: "/enterprise/",
    alternatePath: "/en/enterprise/",
    title: "知远企业版 — Persona Agent + 企业级治理",
    description:
      "知远企业版以个人搭档（Persona Agent）与部门数字员工支持日常工作，以企业级治理管理身份、模型授权与受管工具数据范围。按业务场景分阶段交付。",
    heroTitle: "Persona Agent + 企业级治理",
    heroLead:
      "以个人搭档承接员工日常工作，以部门数字员工提供专业能力，通过企业身份、模型授权与受管工具数据范围支持协作。持续工作与多搭档能力按项目范围分阶段交付。",
    staticAction: "讨论企业试点",
    staticHref: "/enterprise/#contact",
    imageAlt: "知远桌面工作台界面",
    schemaName: "知远企业版",
  },
  {
    file: "en/enterprise/index.html",
    lang: "en",
    ogLocale: "en_US",
    page: "enterprise",
    path: "/en/enterprise/",
    alternatePath: "/enterprise/",
    title: "ZhiYuan Enterprise — Persona Agent + Enterprise Governance",
    description:
      "ZhiYuan Enterprise combines personal companions (Persona Agent), departmental digital employees and enterprise governance. Delivery is phased by project.",
    heroTitle: "Persona Agent + Enterprise governance",
    heroLead:
      "Personal companions (Persona Agent), departmental digital employees and enterprise governance for daily work. Ongoing collaboration and multi-companion capabilities are delivered in phases, with scope confirmed per project.",
    staticAction: "Discuss a pilot",
    staticHref: "/en/enterprise/#contact",
    imageAlt: "The ZhiYuan desktop workbench",
    schemaName: "ZhiYuan Enterprise",
  },
  {
    file: "roadmap/index.html",
    lang: "zh-CN",
    ogLocale: "zh_CN",
    page: "roadmap",
    path: "/roadmap/",
    alternatePath: "/en/roadmap/",
    title: "知远路线图 — 桌面版",
    description:
      "知远开源桌面应用的里程碑：发布流程、macOS 与 Linux 安装包、llama.cpp 本地推理、安装包体积。每条进展对应一个 Pull Request 或 Issue。",
    heroTitle: "桌面版路线图",
    heroLead: "开源桌面应用的里程碑。每条进展对应一个 Pull Request 或 Issue。",
    staticAction: "在 GitHub 上 Star",
    staticHref: "https://github.com/rongxinzy/RongxinAI",
    imageAlt: "知远桌面工作台界面",
    schemaName: "知远桌面版路线图",
  },
  {
    file: "en/roadmap/index.html",
    lang: "en",
    ogLocale: "en_US",
    page: "roadmap",
    path: "/en/roadmap/",
    alternatePath: "/roadmap/",
    title: "ZhiYuan roadmap — Desktop",
    description:
      "Milestones for the ZhiYuan open-source desktop app: the release pipeline, macOS and Linux installers, llama.cpp local inference, and installer size. Each entry links to a pull request or issue.",
    heroTitle: "Desktop roadmap",
    heroLead:
      "Milestones for the open-source desktop app. Each entry links to its pull request or issue.",
    staticAction: "Star on GitHub",
    staticHref: "https://github.com/rongxinzy/RongxinAI",
    imageAlt: "The ZhiYuan desktop workbench",
    schemaName: "ZhiYuan desktop roadmap",
  },
];

function absoluteUrl(path) {
  return new URL(path, siteUrl).href;
}

function renderRoadmapStatic(page) {
  const blocks = roadmap.milestones
    .map((milestone) => {
      const title =
        page.lang === "en" && milestone.titleEn ? milestone.titleEn : milestone.title;
      const done = milestone.items.filter((item) => item.done).length;
      const items = roadmapItems(milestone)
        .map((item) => {
          const text = page.lang === "en" && item.textEn ? item.textEn : item.text;
          return `<li><a href="${escapeHtml(item.url)}">${escapeHtml(item.date)} ${escapeHtml(text)}</a></li>`;
        })
        .join("");
      return `<section><h2>${escapeHtml(title)}</h2><p>${done} / ${milestone.items.length}</p><ul>${items}</ul></section>`;
    })
    .join("");

  return `<main class="marketing-static-shell" aria-label="${escapeHtml(page.schemaName)}">
        <h1>${escapeHtml(page.heroTitle)}</h1>
        <p>${escapeHtml(page.heroLead)}</p>
        <a href="${page.staticHref}">${escapeHtml(page.staticAction)}</a>
        ${blocks}
      </main>`;
}

function renderPage(page) {
  const canonical = absoluteUrl(page.path);
  const alternate = absoluteUrl(page.alternatePath);
  const isEnglish = page.lang === "en";
  const isHome = page.page === "home";
  const staticBackground = "#ffffff";
  const staticText = "#0c1222";
  const staticMuted = "#5b6478";
  const staticButtonBackground = "#090d16";
  const themeTags =
    page.page === "roadmap"
      ? `<meta name="theme-color" content="${staticBackground}" media="(prefers-color-scheme: light)" />\n    <meta name="theme-color" content="#10141c" media="(prefers-color-scheme: dark)" />`
      : `<meta name="theme-color" content="${staticBackground}" />`;
  const roadmapCss =
    page.page === "roadmap"
      ? `
      .marketing-static-shell section a { display: inline; margin: 0; padding: 0; border-radius: 0; background: none; color: inherit; font-size: inherit; font-weight: 400; letter-spacing: 0; text-decoration: underline; }
      .marketing-static-shell h2 { margin: 32px 0 8px; font-size: 22px; }
      .marketing-static-shell ul { max-width: 680px; padding-left: 1.2em; }
      @media (prefers-color-scheme: dark) { html, body { background: #10141c; } .marketing-static-shell { color: #f3f5f8; } .marketing-static-shell p, .marketing-static-shell li { color: #c5cedb; } }`
      : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": page.page === "home" ? "SoftwareApplication" : "WebPage",
    name: page.schemaName,
    description: page.description,
    url: canonical,
    inLanguage: page.lang,
    image: imageUrl,
    ...(page.page === "home"
      ? {
          alternateName: "ZhiYuan Agent",
          codeRepository: "https://github.com/rongxinzy/RongxinAI",
          downloadUrl: `${siteUrl}${isEnglish ? "/en/#download" : "/#download"}`,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Windows 10, Windows 11, macOS, Ubuntu Linux",
          license: "https://www.gnu.org/licenses/agpl-3.0.html",
        }
      : {}),
  };

  return `<!doctype html>
<html lang="${page.lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${themeTags}
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="zh-CN" href="${isEnglish ? alternate : canonical}" />
    <link rel="alternate" hreflang="en" href="${isEnglish ? canonical : alternate}" />
    <link rel="alternate" hreflang="x-default" href="${isEnglish ? alternate : canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${page.ogLocale}" />
    <meta property="og:locale:alternate" content="${isEnglish ? "zh_CN" : "en_US"}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:alt" content="${page.imageAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <link rel="icon" type="image/svg+xml" href="/favicon-light.svg" media="(prefers-color-scheme: light)" />
    <link rel="icon" type="image/svg+xml" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <title>${page.title}</title>
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <style>
      html, body { margin: 0; background: ${staticBackground}; }
      .marketing-static-shell { min-height: 100vh; max-width: 1180px; margin: 0 auto; padding: 96px 24px; box-sizing: border-box; color: ${staticText}; font: 16px/1.6 "Geist Variable", "PingFang SC", "Microsoft YaHei", sans-serif; }
      .marketing-static-shell h1 { max-width: 20ch; margin: 0 0 20px; font-size: clamp(34px, 6vw, 64px); letter-spacing: -.03em; line-height: 1.15; font-weight: 600; }
      .marketing-static-shell p { max-width: 680px; color: ${staticMuted}; font-size: 18px; line-height: 1.6; }
      .marketing-static-shell a { display: inline-block; margin-top: 12px; padding: 13px 24px; border-radius: 9999px; background: ${staticButtonBackground}; color: #fff; font: inherit; font-size: 13px; font-weight: 600; letter-spacing: .04em; text-decoration: none; }${roadmapCss}
    </style>
  </head>
  <body>
    <div id="root" data-marketing-locale="${page.lang}" data-marketing-page="${page.page}">
      ${page.page === "roadmap" ? renderRoadmapStatic(page) : `<main class="marketing-static-shell" aria-label="${page.schemaName}">
        <h1>${page.heroTitle}</h1>
        <p>${page.heroLead}</p>
        <a href="${page.staticHref}">${page.staticAction}</a>
      </main>`}
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

await Promise.all(
  pages.map(async (page) => {
    const output = resolve(projectRoot, page.file);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, renderPage(page), "utf8");
  }),
);
