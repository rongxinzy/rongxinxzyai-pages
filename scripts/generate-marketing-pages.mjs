import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://www.rongxzyai.com";
const imageUrl = `${siteUrl}/product/zhiyuan-workspace.png`;

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
      "知远是一款开源桌面 AI 工作台，可以写报告、整理表格、改代码。内置 llama.cpp，在本机运行 GGUF 模型，也能接入 OpenAI 兼容 API。支持 macOS、Windows、Linux。",
    heroTitle: "你的电脑，就是 AI 工作台。",
    heroLead:
      "在一个窗口中撰写报告、整理表格和修改代码。知远内置 llama.cpp，可在本机运行开源模型。本地推理无需将输入发送至云端模型。联网工具按所选服务处理数据。",
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
      "ZhiYuan is an open-source desktop AI workbench for writing reports, cleaning up spreadsheets and editing code. llama.cpp is built in, so GGUF models run on your machine, and any OpenAI-compatible API works too.",
    heroTitle: "Your computer, now an AI workbench.",
    heroLead:
      "Write reports, organize spreadsheets and edit code in one window. ZhiYuan includes llama.cpp for running open models locally. Local inference does not send inputs to a cloud model. Online tools process data through the services you choose.",
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
];

function absoluteUrl(path) {
  return new URL(path, siteUrl).href;
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": page.page === "enterprise" ? "WebPage" : "SoftwareApplication",
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
    <meta name="theme-color" content="${staticBackground}" />
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
      .marketing-static-shell a { display: inline-block; margin-top: 12px; padding: 13px 24px; border-radius: 9999px; background: ${staticButtonBackground}; color: #fff; font: inherit; font-size: 13px; font-weight: 600; letter-spacing: .04em; text-decoration: none; }
    </style>
  </head>
  <body>
    <div id="root" data-marketing-locale="${page.lang}" data-marketing-page="${page.page}">
      <main class="marketing-static-shell" aria-label="${page.schemaName}">
        <h1>${page.heroTitle}</h1>
        <p>${page.heroLead}</p>
        <a href="${page.staticHref}">${page.staticAction}</a>
      </main>
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
