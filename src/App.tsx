import { useEffect, useState, type ReactNode } from "react";

const GITHUB_URL = "https://github.com/rongxinzy/RongxinAI";
const GITHUB_ISSUES_URL = `${GITHUB_URL}/issues`;
const RELEASE_WORKFLOW_URL = `${GITHUB_URL}/blob/main/.github/workflows/online-update-release.yml`;

type Platform = "linux" | "macos" | "windows";
type ReleaseArtifact = {
  url: string;
  size: number;
};
type Release = {
  version: string;
  artifacts: {
    linux?: ReleaseArtifact;
    linuxAppImage?: ReleaseArtifact;
    macos: ReleaseArtifact;
    windows: ReleaseArtifact;
  };
};
type ReleaseStatus = "loading" | "ready" | "unavailable";
type Page = "docs" | "enterprise" | "home";

type IconProps = {
  className?: string;
};

const PLATFORM_DOWNLOAD_COPY: Record<
  Platform,
  { ariaName: string; buttonLabel: string; unavailableLabel: string }
> = {
  windows: {
    ariaName: "Windows x64",
    buttonLabel: "下载 Windows",
    unavailableLabel: "Windows 版本暂时不可用",
  },
  macos: {
    ariaName: "macOS Apple Silicon",
    buttonLabel: "下载 macOS",
    unavailableLabel: "macOS 版本暂时不可用",
  },
  linux: {
    ariaName: "Ubuntu Linux x64 deb",
    buttonLabel: "下载 Ubuntu 版",
    unavailableLabel: "Linux 版本尚未发布",
  },
};

function formatArtifactSize(size: number) {
  return `${(size / 1_000_000).toFixed(1)} MB`;
}

function isReleaseArtifact(value: unknown): value is ReleaseArtifact {
  if (typeof value !== "object" || value === null) return false;
  const artifact = value as Record<string, unknown>;

  return (
    typeof artifact.url === "string" &&
    artifact.url.startsWith("https://downloads.rongxzyai.com/") &&
    typeof artifact.size === "number" &&
    Number.isSafeInteger(artifact.size) &&
    artifact.size > 0
  );
}

function isRelease(value: unknown): value is Release {
  if (typeof value !== "object" || value === null) return false;
  const release = value as Record<string, unknown>;
  if (typeof release.version !== "string" || release.version.length === 0) return false;
  if (typeof release.artifacts !== "object" || release.artifacts === null) return false;

  const artifacts = release.artifacts as Record<string, unknown>;
  return (
    isReleaseArtifact(artifacts.windows) &&
    isReleaseArtifact(artifacts.macos) &&
    (artifacts.linux === undefined || isReleaseArtifact(artifacts.linux)) &&
    (artifacts.linuxAppImage === undefined || isReleaseArtifact(artifacts.linuxAppImage))
  );
}

function ArrowUpRight({ className }: IconProps) {
  return (
    <svg className={`github-icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function DownloadIcon({ className }: IconProps) {
  return (
    <svg className={`github-icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />
    </svg>
  );
}

function GithubIcon({ className }: IconProps) {
  return (
    <svg className={`github-icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={`github-icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 20 6v5c0 5-3.35 8.74-8 10-4.65-1.26-8-5-8-10V6l8-3Z" />
      <path d="m9.2 12 1.8 1.8 3.8-4" />
    </svg>
  );
}

function FolderIcon({ className }: IconProps) {
  return (
    <svg className={`github-icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6.5h6l2 2h10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11Z" />
    </svg>
  );
}

function TerminalIcon({ className }: IconProps) {
  return (
    <svg className={`github-icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 7 4 4-4 4m6 0h8" />
      <rect x="2.5" y="3.5" width="19" height="17" rx="2" />
    </svg>
  );
}

function BrowserIcon({ className }: IconProps) {
  return (
    <svg className={`github-icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9h17M9 21c-1.6-2.4-2.4-5.4-2.4-9S7.4 5.4 9 3m6 18c1.6-2.4 2.4-5.4 2.4-9S16.6 5.4 15 3" />
    </svg>
  );
}

function SparkIcon({ className }: IconProps) {
  return (
    <svg className={`github-icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2 1.15 4.85L18 8l-4.85 1.15L12 14l-1.15-4.85L6 8l4.85-1.15L12 2Z" />
      <path d="m18.5 14 .7 2.8 2.8.7-2.8.7-.7 2.8-.7-2.8-2.8-.7 2.8-.7.7-2.8Z" />
    </svg>
  );
}

function CpuIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 2v3m3-3v3m3-3v3M9 19v3m3-3v3m3-3v3M2 9h3m-3 3h3m-3 3h3m14-6h3m-3 3h3m-3 3h3" />
      <path d="M10 10h4v4h-4z" />
    </svg>
  );
}

function ClockIcon({ className }: IconProps) {
  return (
    <svg className={`github-icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function AppleIcon({ className }: IconProps) {
  return (
    <svg className={`github-icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.9 12.8c.02-2.2 1.8-3.25 1.88-3.3a4.08 4.08 0 0 0-3.2-1.73c-1.35-.14-2.66.8-3.35.8-.7 0-1.76-.78-2.9-.75a4.27 4.27 0 0 0-3.6 2.2c-1.55 2.68-.4 6.62 1.09 8.79.74 1.06 1.6 2.25 2.74 2.2 1.11-.04 1.52-.7 2.85-.7 1.32 0 1.7.7 2.86.68 1.2-.02 1.94-1.07 2.65-2.14a8.8 8.8 0 0 0 1.2-2.46 3.84 3.84 0 0 1-2.22-3.59ZM14.7 6.34a3.9 3.9 0 0 0 .9-2.8 4 4 0 0 0-2.6 1.33 3.7 3.7 0 0 0-.93 2.7 3.3 3.3 0 0 0 2.63-1.23Z" />
    </svg>
  );
}

function WindowsIcon({ className }: IconProps) {
  return (
    <svg className={`github-icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 5.4 7.5-1v7H3v-6Zm8.5-1.15L21 3v8.4h-9.5V4.25ZM3 12.6h7.5v7L3 18.6v-6Zm8.5 0H21V21l-9.5-1.3v-7.1Z" />
    </svg>
  );
}

function LinuxIcon({ className }: IconProps) {
  return (
    <svg
      className={`linux-icon github-icon ${className ?? ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8M12 18v3M7 9l2 2-2 2m5 0h5" />
    </svg>
  );
}

function Header({ page }: { page: Page }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="知远智能体首页">
        <img src="/zhiyuan-logo.svg" alt="知远" />
        <span>ZHIYUAN AGENT</span>
      </a>
      <nav aria-label="主导航">
        <a href="#highlights">特色</a>
        <a href="#workflow">工作方式</a>
        <a href="#product">产品</a>
        <a href="#community">社区</a>
        <a href="#download">下载</a>
        <a href="/docs/">文档</a>
      </nav>
      <a className="header-enterprise" href="#enterprise" aria-current={page === "enterprise" ? "page" : undefined}>
        企业版
      </a>
      <a className="header-github" href={GITHUB_URL} target="_blank" rel="noreferrer">
        <GithubIcon />
        <span>GitHub</span>
      </a>
    </header>
  );
}

function DocsPage() {
  return (
    <main className="docs-view" id="docs">
      <section className="docs-view-inner" aria-labelledby="docs-title">
        <p className="section-index">知远智能体文档</p>
        <h1 id="docs-title">文档正在整理中。</h1>
        <p>安装、配置、技能与开发说明会持续在这里更新。</p>
      </section>
    </main>
  );
}

function EnterprisePage() {
  return (
    <main className="enterprise-view" id="enterprise">
      <section className="enterprise-hero" aria-labelledby="enterprise-title">
        <div className="enterprise-hero-glow" aria-hidden="true" />
        <div className="enterprise-hero-inner">
          <div className="enterprise-hero-brandline">
            <img src="/zhiyuan-logo.svg" alt="知远" />
            <span>企业版 · 面向企业办公环境的 AI Agent</span>
          </div>
          <h1 id="enterprise-title">让 Agent 真正进入<br /><span>企业</span>的真实工作</h1>
          <p className="enterprise-hero-lead">为企业提供稳定、受控、持续运行的智能体软件能力。让员工在桌面工作空间中直接工作，企业统一管理模型、知识、工具与数据范围。</p>
          <div className="enterprise-hero-traits" aria-label="企业版产品特点"><span>独立部署</span><i /><span>统一治理</span><i /><span>持续交付</span></div>
          <div className="enterprise-hero-actions">
            <a className="button button-primary" href="#enterprise-contact">合作咨询</a>
          </div>
          <p className="enterprise-hero-note">支持企业模型、知识库、办公连接与项目制交付</p>
        </div>
      </section>

      <section className="enterprise-product-preview" aria-label="企业版工作空间预览">
        <div className="enterprise-product-placeholder">
          <img src="/product/zhiyuan-workspace.png" alt="知远企业版工作空间界面预览" onLoad={(event) => { event.currentTarget.parentElement?.classList.add("has-image"); }} onError={(event) => { event.currentTarget.style.display = "none"; }} />
        </div>
      </section>

      <section className="enterprise-section" aria-labelledby="comparison-title">
        <div className="enterprise-section-heading"><p className="section-index">01 / 产品能力</p><h2 id="comparison-title">开源版的能力，企业版的秩序。</h2><p>在熟悉的智能体工作流之上，增加企业级身份、治理、模型和交付能力。</p></div>
        <div className="enterprise-comparison" role="table" aria-label="企业版与开源版功能对比">
          <div className="comparison-row comparison-head" role="row"><span role="columnheader">能力维度</span><span role="columnheader">开源版</span><span className="comparison-enterprise" role="columnheader">企业版</span></div>
          {[
            ["工作空间", "个人使用", "企业共享空间、模板与成员管理"],
            ["模型与工具", "按个人配置", "统一网关、策略、额度与连接治理"],
            ["数据与权限", "本地优先", "组织权限、审计与生命周期管理"],
            ["部署与服务", "社区自助", "独立部署、项目交付与持续运维"],
          ].map(([name, open, enterprise]) => <div className="comparison-row" role="row" key={name}><strong role="rowheader">{name}</strong><span role="cell">{open}</span><span className="comparison-enterprise" role="cell">{enterprise}</span></div>)}
        </div>
      </section>

      <section className="enterprise-section architecture-section" aria-labelledby="architecture-title">
        <div className="enterprise-section-heading"><p className="section-index">02 / 技术架构</p><h2 id="architecture-title">桌面工作入口，Server 统一治理。</h2><p>企业版桌面端承接员工工作，企业增强版 Server 连接模型、知识与业务系统，并保留清晰的权限边界。</p></div>
        <div className="architecture-map" aria-label="企业版技术架构">
          <div className="architecture-column"><p>工作入口</p><div className="architecture-node primary"><b>企业版桌面端</b><span>工作空间 · 本地资料 · 智能体运行 · 成果编辑</span></div><div className="architecture-node"><b>企业受控模块</b><span>绑定 · 同步 · 路由 · 策略 · 状态</span></div></div>
          <div className="architecture-column server-column"><p>企业增强版 Server</p><div className="architecture-node primary"><b>企业控制中心</b><span>身份 · 权限 · 工作空间 · 审计 · 运维</span></div><div className="architecture-node"><b>共享能力与计划运行</b><span>知识 · Skill · MCP · 连接目录 · 后台任务</span></div><div className="architecture-node accent"><b>企业大模型网关</b><span>模型登记 · 路由 · 额度 · 状态处置</span></div></div>
          <div className="architecture-column"><p>受控资源</p><div className="architecture-node accent"><b>客户内部模型</b><span>项目指定的计算、存储与网络环境</span></div><div className="architecture-node"><b>企业系统连接</b><span>企业微信 · 飞书 · OA · 审批</span></div><div className="architecture-node"><b>外部模型服务</b><span>由管理员按数据策略显式启用</span></div></div>
        </div>
      </section>

      <section className="enterprise-section delivery-section" aria-labelledby="delivery-title">
        <div className="enterprise-section-heading"><p className="section-index">03 / 定制交付</p><h2 id="delivery-title">从需求到上线，每一步都有交付物。</h2><p>项目团队与客户共同完成环境准备、能力配置、系统联调和验收。</p></div>
        <ol className="delivery-steps"><li><span>01</span><div><b>需求与方案</b><p>明确组织、岗位、数据策略、模型范围与连接目标。</p></div></li><li><span>02</span><div><b>部署与初始化</b><p>完成软件节点、企业身份、工作空间与共享资源配置。</p></div></li><li><span>03</span><div><b>联调与培训</b><p>接入企业系统，验证权限边界，并培训管理员与员工。</p></div></li><li><span>04</span><div><b>试运行与验收</b><p>按平台、数据、权限、模型和连接标准完成验收。</p></div></li></ol>
      </section>

      <section className="enterprise-contact" id="enterprise-contact" aria-labelledby="contact-title">
        <div><p className="section-index">04 / 联系我们</p><h2 id="contact-title">一起把智能体带进真实工作。</h2><p>欢迎交流企业部署、定制开发与项目合作。</p><a href="mailto:likeran@rongxinzy.com">likeran@rongxinzy.com</a></div>
        <div className="enterprise-qr-grid"><div className="enterprise-qr"><img src="/zhiyuan-community-qr.png" alt="扫码加入知远智能体交流群" /><b>扫码加入交流群</b></div><div className="enterprise-qr"><img src="/zhiyuan-official-qr.png" alt="微信扫描二维码关注知远公众号" /><b>关注知远公众号</b></div></div>
      </section>
    </main>
  );
}

function PrimaryDownload({
  platform,
  release,
  status,
  compact = false,
}: {
  platform: Platform;
  release: Release | null;
  status: ReleaseStatus;
  compact?: boolean;
}) {
  const copy = PLATFORM_DOWNLOAD_COPY[platform];
  const artifact = release?.artifacts[platform];

  if (!artifact) {
    return (
      <span
        className={`button button-primary button-download button-loading${compact ? " button-compact" : ""}`}
        aria-live="polite"
        aria-label="正在读取最新下载链接"
      >
        <DownloadIcon />
        {status === "loading" ? "正在读取最新版本…" : copy.unavailableLabel}
      </span>
    );
  }

  return (
    <a
      className={`button button-primary button-download${compact ? " button-compact" : ""}`}
      href={artifact.url}
      aria-label={`下载知远智能体 ${copy.ariaName} 版本`}
    >
      <DownloadIcon />
      {copy.buttonLabel}
    </a>
  );
}

function ProductFrame({
  src,
  alt,
  cropTop = false,
  priority = false,
  showWindowBar = true,
  className = "",
}: {
  src: string;
  alt: string;
  cropTop?: boolean;
  priority?: boolean;
  showWindowBar?: boolean;
  className?: string;
}) {
  return (
    <figure className={`product-frame ${cropTop ? "crop-top" : ""} ${className}`}>
      {showWindowBar && (
        <div className="window-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <p>知远智能体</p>
        </div>
      )}
      <div className="product-image-viewport">
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </div>
    </figure>
  );
}

const galleryItems = [
  {
    id: "workspace",
    label: "工作台",
    title: "把一句话，变成一条执行轨迹。",
    description:
      "给出目标，知远会组织文件、工具、技能与模型完成任务。执行过程持续呈现，结果直接留在工作区。",
    src: "/product/zhiyuan-workspace.png",
    alt: "知远智能体真实工作台界面，包含工作区、任务输入框、本地推理与自动化入口",
    cropTop: true,
  },
  {
    id: "skills",
    label: "技能",
    title: "把成熟的方法，装进智能体。",
    description:
      "内置网页搜索、文档处理、邮件、代码与营销等技能，也可以创建自己的技能，把团队方法变成可重复的工作流。",
    src: "/product/zhiyuan-skills.png",
    alt: "知远智能体真实技能中心界面，展示已安装技能、搜索和批量管理",
    cropTop: false,
  },
  {
    id: "models",
    label: "本地模型",
    title: "从模型市场，把推理搬回本地。",
    description:
      "搜索并安装 ModelScope 上的 GGUF 模型，统一管理上下文、GPU offload、线程与服务生命周期。",
    src: "/product/zhiyuan-model-market.png",
    alt: "知远智能体真实模型市场界面，展示多个 GGUF 模型与安装入口",
    cropTop: false,
  },
] as const;

function ProductGallery() {
  const [activeId, setActiveId] = useState<(typeof galleryItems)[number]["id"]>("workspace");
  const activeItem = galleryItems.find((item) => item.id === activeId) ?? galleryItems[0];

  return (
    <section className="product-gallery section" id="product">
      <div className="section-heading centered">
        <p className="section-index">真实产品界面</p>
        <h2>一套桌面工作台，接住完整的 Agent 工作。</h2>
        <p>下面全部来自当前版本的知远智能体，没有概念图，也没有重绘。</p>
      </div>
      <div className="gallery-tabs" role="tablist" aria-label="知远智能体产品界面">
        {galleryItems.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeId === item.id}
            aria-controls="product-gallery-panel"
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="gallery-copy" id="product-gallery-panel" role="tabpanel">
        <h3>{activeItem.title}</h3>
        <p>{activeItem.description}</p>
      </div>
      <ProductFrame
        key={activeItem.id}
        src={activeItem.src}
        alt={activeItem.alt}
        cropTop={activeItem.cropTop}
        showWindowBar={false}
        className="gallery-frame"
      />
    </section>
  );
}

function Feature({
  icon,
  number,
  title,
  children,
}: {
  icon: ReactNode;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="feature">
      <div className="feature-top">
        <span className="feature-icon">{icon}</span>
        <span className="feature-number">{number}</span>
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

function StarCallout() {
  return (
    <section className="star-callout" aria-labelledby="star-callout-title">
      <div className="star-callout-mark" aria-hidden="true">
        <GithubIcon />
      </div>
      <div className="star-callout-copy">
        <p>OPEN SOURCE, BUILT IN PUBLIC</p>
        <h2 id="star-callout-title">如果知远对你有用，给项目一个 Star。</h2>
        <span>关注后续版本，也让更多人找到一个源码可检查、权限可控制的桌面 AI Agent。</span>
      </div>
      <a className="button button-primary" href={GITHUB_URL} target="_blank" rel="noreferrer">
        <GithubIcon />
        在 GitHub 上 Star
      </a>
    </section>
  );
}

function Community() {
  return (
    <section className="community section" id="community">
      <div className="section-heading centered">
        <p className="section-index">开源共建</p>
        <h2>让知远适配更多真实工作流。</h2>
        <p>知远以开源方式持续迭代。欢迎报告问题、分享需求，或直接参与代码贡献。</p>
      </div>
      <div className="community-grid">
        <article className="community-card community-card-primary">
          <p className="community-card-label">反馈与讨论</p>
          <h3>把你的使用场景告诉我们</h3>
          <p>遇到问题、缺少能力，或有更好的工作流想法，都可以通过 Issue 与社区交流。</p>
          <a className="community-card-link" href={GITHUB_ISSUES_URL} target="_blank" rel="noreferrer">
            提交 Issue 或功能建议
            <ArrowUpRight />
          </a>
        </article>
        <article className="community-card">
          <p className="community-card-label">贡献代码</p>
          <h3>从源码开始参与</h3>
          <p>查看项目架构和开发说明；准备好后，欢迎通过 Pull Request 提交可复现、可审查的改进。</p>
          <a className="community-card-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
            查看源码与 README
            <ArrowUpRight />
          </a>
        </article>
        <aside className="community-qr" aria-label="知远智能体交流群二维码">
          <img src="/zhiyuan-community-qr.png" alt="扫码加入知远智能体交流群" />
          <p>扫码加入知远智能体交流群</p>
        </aside>
        <aside className="community-qr" aria-label="知远公众号二维码">
          <img src="/zhiyuan-official-qr.png" alt="微信扫描二维码关注知远公众号" />
          <p>微信扫码关注公众号</p>
        </aside>
      </div>
    </section>
  );
}

function App() {
  const [page, setPage] = useState<Page>(() => {
    if (window.location.hash === "#docs") return "docs";
    if (window.location.hash === "#enterprise" || window.location.hash === "#enterprise-contact") return "enterprise";
    return "home";
  });
  const [preferredPlatform, setPreferredPlatform] = useState<Platform>("windows");
  const [release, setRelease] = useState<Release | null>(null);
  const [releaseStatus, setReleaseStatus] = useState<ReleaseStatus>("loading");

  useEffect(() => {
    function syncPage() {
      if (window.location.hash === "#docs") {
        setPage("docs");
      } else if (window.location.hash === "#enterprise" || window.location.hash === "#enterprise-contact") {
        setPage("enterprise");
      } else {
        setPage("home");
      }
    }

    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useEffect(() => {
    if (page !== "home" && page !== "enterprise") return;

    const targetId = window.location.hash.slice(1);
    if (!targetId || targetId === "enterprise") return;

    requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
  }, [page]);

  useEffect(() => {
    const platform = navigator.userAgent.toLowerCase();
    if (platform.includes("mac")) {
      setPreferredPlatform("macos");
    } else if (platform.includes("linux")) {
      setPreferredPlatform("linux");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRelease() {
      try {
        const response = await fetch("/api/release", {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!response.ok) {
          setReleaseStatus("unavailable");
          return;
        }

        const payload: unknown = await response.json();
        if (isRelease(payload)) {
          setRelease(payload);
          setReleaseStatus("ready");
        } else {
          setReleaseStatus("unavailable");
        }
      } catch {
        if (!controller.signal.aborted) setReleaseStatus("unavailable");
      }
    }

    void loadRelease();
    return () => controller.abort();
  }, []);

  if (page === "docs") {
    return (
      <div className="site-shell">
        <Header page={page} />
        <DocsPage />
      </div>
    );
  }

  if (page === "enterprise") {
    return (
      <div className="site-shell">
        <Header page={page} />
        <EnterprisePage />
      </div>
    );
  }

  return (
    <div className="site-shell" id="top">
      <Header page={page} />

      <main>
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-brandline">
              <img src="/zhiyuan-logo.svg" alt="" />
              <span>开源 · 本地优先的桌面 AI Agent</span>
            </div>
            <h1>
              让 Agent 真正在你的
              <span>电脑</span>上<span className="hero-work">工作</span>
            </h1>
            <p className="hero-lead">
              连接文件、终端、浏览器与模型。把复杂任务交给知远，
              <br />
              过程，敏感操作先批准，数据留在你的设备。
            </p>
            <div className="hero-traits" aria-label="知远智能体产品特点">
              <span>本地优先</span>
              <i />
              <span>能执行</span>
              <i />
              <span>可扩展</span>
            </div>
            <div className="hero-actions">
              <PrimaryDownload platform={preferredPlatform} release={release} status={releaseStatus} />
              <a className="button button-secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">
                <GithubIcon />
                去 GitHub 点个 Star
              </a>
            </div>
            <p className="release-line" aria-live="polite">
              {release
                ? `${release.version} · Windows x64 · macOS Apple Silicon${release.artifacts.linux ? " · Ubuntu Linux x64" : ""}`
                : releaseStatus === "unavailable"
                  ? "当前稳定版本暂时不可用，请稍后刷新。"
                  : "正在读取当前稳定版本…"}
            </p>
          </div>

          <div className="hero-product-wrap">
            <ProductFrame
              src="/product/zhiyuan-workspace.png"
              alt="知远智能体真实工作台界面"
              cropTop
              priority
              showWindowBar={false}
              className="hero-product"
            />
          </div>
        </section>

        <section className="signal-strip" aria-label="产品信息">
          <dl>
            <div>
              <dt>49</dt>
              <dd>当前内置技能</dd>
            </div>
            <div>
              <dt>Local-first</dt>
              <dd>会话与任务数据</dd>
            </div>
            <div>
              <dt>GGUF</dt>
              <dd>本地模型支持</dd>
            </div>
            <div>
              <dt>AGPL-3.0</dt>
              <dd>开放源代码</dd>
            </div>
          </dl>
        </section>

        <section className="highlights section" id="highlights">
          <div className="section-heading">
            <p className="section-index">四件真正重要的事</p>
            <h2>不是多一个聊天框，<br />是多一位能动手的同事。</h2>
            <p>
              知远把 Agent 的执行环境、模型、技能和连接器装进一个桌面应用。
              你给出目标，它负责把工作真正向前推进。
            </p>
          </div>
          <div className="feature-grid">
            <Feature icon={<TerminalIcon />} number="01" title="从建议到执行">
              读取文件、运行命令、操作浏览器、制作文档。每一次工具调用都有清晰的状态与结果。
            </Feature>
            <Feature icon={<CpuIcon />} number="02" title="端侧推理，数据留在设备">
              从模型市场安装 GGUF 模型，让模型、上下文与推理服务运行在你的电脑上；本地模型可直接参与 Agent 工作流。
            </Feature>
            <Feature icon={<ShieldIcon />} number="03" title="按你的硬件调优">
              按模型控制上下文长度、GPU offload、线程、批大小、主 GPU、内存映射与 keep-alive，权衡速度、占用与响应。
            </Feature>
            <Feature icon={<SparkIcon />} number="04" title="技能持续扩展">
              使用内置技能，接入 MCP 工具，也可以把自己的经验封装成下一次仍能复用的能力。
            </Feature>
          </div>
        </section>

        <StarCallout />

        <section className="workflow section" id="workflow">
          <div className="workflow-copy">
            <p className="section-index">工作方式</p>
            <h2>一句话开始，<br />每一步都有迹可循。</h2>
            <p>
              Agent 会拆解目标、选择工具并持续汇报进度。遇到敏感操作时停下来等待你的决定，然后继续完成任务。
            </p>
            <div className="permission-note">
              <ShieldIcon />
              <div>
                <strong>权限不是开关，是过程的一部分</strong>
                <span>按次批准高风险操作，不把整台电脑一次性交出去。</span>
              </div>
            </div>
          </div>
          <ol className="workflow-steps">
            <li>
              <span><SparkIcon /></span>
              <div><strong>理解目标</strong><small>明确交付物与边界</small></div>
            </li>
            <li>
              <span><FolderIcon /></span>
              <div><strong>读取材料</strong><small>只访问任务所需文件</small></div>
            </li>
            <li>
              <span><BrowserIcon /></span>
              <div><strong>调用工具</strong><small>终端、浏览器、技能与 MCP</small></div>
            </li>
            <li className="is-active">
              <span><ShieldIcon /></span>
              <div><strong>请求批准</strong><small>敏感动作由你确认</small></div>
            </li>
            <li>
              <span><DownloadIcon /></span>
              <div><strong>交付结果</strong><small>文件、报告或持续任务</small></div>
            </li>
          </ol>
        </section>

        <ProductGallery />

        <section className="reach section">
          <div className="reach-visual" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="reach-core">
              <ClockIcon />
            </div>
            <span className="reach-node node-wechat">企微</span>
            <span className="reach-node node-feishu">飞书</span>
            <span className="reach-node node-ding">钉钉</span>
            <span className="reach-node node-mail">邮件</span>
          </div>
          <div className="reach-copy">
            <p className="section-index">自动化与触达</p>
            <h2>你不在桌前，任务也可以继续。</h2>
            <p>
              用自然语言创建定时任务。完成后，结果可以留在桌面应用，也可以通过企业微信、飞书、钉钉、QQ 或邮件送达。
            </p>
          </div>
        </section>

        <Community />

        <section className="download section" id="download">
          <div className="download-glow" aria-hidden="true" />
          <div className="download-heading">
            <img src="/zhiyuan-logo.svg" alt="" />
            <h2>把知远装进你的电脑。</h2>
            <p>下载当前稳定版本，第一次启动后即可配置云端模型，或在模型市场安装本地 GGUF 模型。</p>
          </div>
          <div className="download-options">
            <article>
              <div className="download-platform">
                <WindowsIcon />
                <div><strong>Windows</strong><span>x64 · Lite</span></div>
              </div>
              <p>适用于 Windows 10/11 64 位系统</p>
              <div className="download-meta">
                <span>{release?.version ?? (releaseStatus === "unavailable" ? "暂时不可用" : "正在读取版本…")}</span>
                <span>{release ? formatArtifactSize(release.artifacts.windows.size) : "—"}</span>
              </div>
              <PrimaryDownload platform="windows" release={release} status={releaseStatus} compact />
            </article>
            <article>
              <div className="download-platform">
                <AppleIcon />
                <div><strong>macOS</strong><span>Apple Silicon</span></div>
              </div>
              <p>适用于搭载 Apple 芯片的 Mac</p>
              <div className="download-meta">
                <span>{release?.version ?? (releaseStatus === "unavailable" ? "暂时不可用" : "正在读取版本…")}</span>
                <span>{release ? formatArtifactSize(release.artifacts.macos.size) : "—"}</span>
              </div>
              <PrimaryDownload platform="macos" release={release} status={releaseStatus} compact />
            </article>
            <article>
              <div className="download-platform">
                <LinuxIcon />
                <div><strong>Linux / Ubuntu</strong><span>x64 · .deb</span></div>
              </div>
              <p>优先支持 Ubuntu 22.04 / 24.04；其他发行版可尝试 AppImage</p>
              <div className="download-meta">
                <span>{release?.version ?? (releaseStatus === "unavailable" ? "暂时不可用" : "正在读取版本…")}</span>
                <span>{release?.artifacts.linux ? formatArtifactSize(release.artifacts.linux.size) : "—"}</span>
              </div>
              <div className="download-actions">
                <PrimaryDownload platform="linux" release={release} status={releaseStatus} compact />
                {release?.artifacts.linuxAppImage ? (
                  <a
                    className="button button-secondary button-compact"
                    href={release.artifacts.linuxAppImage.url}
                    aria-label="下载知远智能体 Linux x64 AppImage 版本"
                  >
                    <DownloadIcon />
                    下载 AppImage
                  </a>
                ) : null}
              </div>
            </article>
          </div>
          <p className="download-footnote">
            安装包由官方发布流程构建，并通过签名清单与 SHA-256 校验保护升级过程。
            <a href={RELEASE_WORKFLOW_URL} target="_blank" rel="noreferrer">
              想了解构建和升级校验，回 GitHub 查看发布流程。
            </a>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src="/zhiyuan-logo.svg" alt="知远" />
          <p>让每一台电脑，都有一位能真正工作的智能体。</p>
        </div>
        <nav aria-label="页脚导航">
          <a href="#highlights">特色</a>
          <a href="#product">产品</a>
          <a href="#community">社区</a>
          <a href="#download">下载</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight />
          </a>
        </nav>
        <div className="footer-meta">
          <span>© 2026 北京容芯致远</span>
          <span>AGPL-3.0 开源</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
