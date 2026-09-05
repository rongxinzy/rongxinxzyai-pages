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
    title: "知远智能体 — 你的 AI 工作室",
    description:
      "知远把资料、模型与工具放进一个工作台。写报告、做表格、改代码；内置推理引擎支持安装和运行 GGUF 模型。Windows 安装包不含本地推理组件。",
    heroTitle: "你的电脑，你的 AI 工作室。",
    heroLead:
      "知远把资料、模型与工具放进一个工作台。写报告、做表格、改代码；内置推理引擎支持安装和运行 GGUF 模型。Windows 安装包不含本地推理组件。",
    staticAction: "下载知远",
    staticHref: "/#download",
    imageAlt: "知远智能体桌面工作台",
    schemaName: "知远智能体",
  },
  {
    file: "en/index.html",
    lang: "en",
    ogLocale: "en_US",
    page: "home",
    path: "/en/",
    alternatePath: "/",
    title: "ZhiYuan — Your AI studio",
    description:
      "ZhiYuan brings files, models and tools to one workbench. Write reports, build spreadsheets and edit code. A built-in inference engine runs GGUF models. The Windows installer excludes local inference components.",
    heroTitle: "Your computer. Your AI studio.",
    heroLead:
      "ZhiYuan brings files, models and tools to one workbench. Write reports, build spreadsheets and edit code. A built-in inference engine runs GGUF models. The Windows installer excludes local inference components.",
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
    title: "知远企业服务 — 团队的 AI 工作室",
    description:
      "连接团队的模型、知识库与业务系统。部署知远，确定成员权限与交付范围。功能和服务以合同约定为准。",
    heroTitle: "团队的 AI 工作室。",
    heroLead:
      "连接团队的模型、知识库与业务系统。部署知远，确定成员权限与交付范围。功能和服务以合同约定为准。",
    staticAction: "联系企业服务",
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
    title: "ZhiYuan Enterprise — Your team’s AI studio",
    description:
      "Connect your team’s models, knowledge bases and business systems. Deploy ZhiYuan and define permissions and deliverables. The contract defines features and services.",
    heroTitle: "Your team’s AI studio.",
    heroLead:
      "Connect your team’s models, knowledge bases and business systems. Deploy ZhiYuan and define permissions and deliverables. The contract defines features and services.",
    staticAction: "Contact enterprise sales",
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
  const isHome = page.page === "home";
  const staticBackground = "#f7f6f2";
  const staticText = "#252821";
  const staticMuted = "#66685e";
  const staticButtonBorder = "#c34b32";
  const staticButtonBackground = "#c34b32";
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
    <title>${page.title}</title>
${isHome ? '    <link rel="preload" as="image" href="/editorial/work-bridge.jpg" fetchpriority="high" />' : ""}
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <style>
      html, body { margin: 0; background: ${staticBackground}; }
      .marketing-static-shell { min-height: 100vh; max-width: 1180px; margin: 0 auto; padding: 96px 24px; box-sizing: border-box; color: ${staticText}; font: 16px/1.6 Inter, "PingFang SC", "Microsoft YaHei", sans-serif; }
      .marketing-static-shell h1 { max-width: 20ch; margin: 0 0 20px; font-family: "Songti SC", Georgia, serif; font-size: clamp(36px, 6vw, 88px); letter-spacing: -.04em; line-height: 1.3; }
      .marketing-static-shell p { max-width: 680px; color: ${staticMuted}; font-size: 18px; }
      .marketing-static-shell a { display: inline-block; padding: 13px 20px; border: 1px solid ${staticButtonBorder}; background: ${staticButtonBackground}; color: #fff; font: inherit; text-decoration: none; }
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
