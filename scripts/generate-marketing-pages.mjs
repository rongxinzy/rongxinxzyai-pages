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
    title: "知远智能体 — 开源、本地优先的桌面 Agent",
    description: "知远是一款开源、本地优先的桌面 Agent。它会读取材料、调用工具，并在敏感操作前等待确认。",
    heroTitle: "把一项工作交给知远。",
    heroLead: "知远是一款开源、本地优先的桌面 Agent。它会读取材料、调用工具，并把结果留在工作区。敏感操作由你确认。",
    staticAction: "下载知远",
    staticHref: "/#download",
    imageAlt: "知远智能体真实桌面工作台界面",
    schemaName: "知远智能体",
  },
  {
    file: "en/index.html",
    lang: "en",
    ogLocale: "en_US",
    page: "home",
    path: "/en/",
    alternatePath: "/",
    title: "ZhiYuan — Open-source, local-first desktop agent",
    description: "ZhiYuan is an open-source, local-first desktop agent that works through your files and tools and pauses before sensitive actions.",
    heroTitle: "Give ZhiYuan a task.",
    heroLead: "ZhiYuan is an open-source, local-first desktop agent. It works through your files and tools, returns the result to your workspace, and pauses before sensitive actions.",
    staticAction: "Download ZhiYuan",
    staticHref: "/en/#download",
    imageAlt: "The ZhiYuan desktop workspace",
    schemaName: "ZhiYuan",
  },
  {
    file: "enterprise/index.html",
    lang: "zh-CN",
    ogLocale: "zh_CN",
    page: "enterprise",
    path: "/enterprise/",
    alternatePath: "/en/enterprise/",
    title: "知远企业版 — 受控的企业 Agent 工作环境",
    description: "知远企业版以独立部署、统一治理和项目交付，将身份、模型、知识、工具和数据范围纳入企业工作环境。",
    heroTitle: "让 Agent 进入受控的企业工作环境。",
    heroLead: "桌面端承接员工工作，企业服务统一管理身份、模型、知识、工具和数据范围。",
    staticAction: "联系企业团队",
    staticHref: "/enterprise/#contact",
    imageAlt: "知远企业版桌面工作空间界面",
    schemaName: "知远企业版",
  },
  {
    file: "en/enterprise/index.html",
    lang: "en",
    ogLocale: "en_US",
    page: "enterprise",
    path: "/en/enterprise/",
    alternatePath: "/enterprise/",
    title: "ZhiYuan Enterprise — Governed agent work for organizations",
    description: "ZhiYuan Enterprise brings identity, models, knowledge, tools, and data boundaries into a governed work environment.",
    heroTitle: "Bring agent workflows into a governed work environment.",
    heroLead: "The desktop app is where employees work. Enterprise services govern identity, models, knowledge, tools, and data boundaries.",
    staticAction: "Contact enterprise team",
    staticHref: "/en/enterprise/#contact",
    imageAlt: "The ZhiYuan Enterprise desktop workspace",
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
    <meta name="theme-color" content="#ffffff" />
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
    <title>${page.title}</title>
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <style>
      .marketing-static-shell { max-width: 1180px; margin: 0 auto; padding: 96px 24px; color: #121724; font: 16px/1.6 Inter, "PingFang SC", "Microsoft YaHei", sans-serif; }
      .marketing-static-shell h1 { max-width: 12ch; margin: 0 0 20px; font-size: clamp(40px, 6vw, 72px); letter-spacing: -.04em; line-height: 1.06; }
      .marketing-static-shell p { max-width: 680px; color: #667085; font-size: 18px; }
      .marketing-static-shell a { display: inline-block; padding: 13px 20px; border: 1px solid #171c27; border-radius: 11px; background: #151b26; color: #fff; font: inherit; text-decoration: none; }
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
