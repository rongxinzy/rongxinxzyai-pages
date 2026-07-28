import { useEffect, useState, type ReactNode } from "react";

const GITHUB_URL = "https://github.com/rongxinzy/RongxinAI";
const RELEASE_VERSION = "2026.7.28-build.4";
const WINDOWS_URL =
  "https://downloads.rongxzyai.com/releases/2026.7.28-build.4/win32-x64-lite/知远-Setup-2026.7.28-build.4.exe";
const MACOS_URL =
  "https://downloads.rongxzyai.com/releases/2026.7.28-build.4/darwin-arm64-default/知远-2026.7.28-build.4-arm64.dmg";

type Platform = "windows" | "macos";

type IconProps = {
  className?: string;
};

function ArrowUpRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function DownloadIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />
    </svg>
  );
}

function GithubIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 22v-4.1c.04-1.03-.36-2.02-1.1-2.72 3.6-.4 7.38-1.77 7.38-8A6.22 6.22 0 0 0 19.62 3c.14-.4.58-2.05-.16-4 0 0-1.35-.43-4.42 1.61a15.35 15.35 0 0 0-8.04 0C3.93-1.43 2.58-1 2.58-1c-.74 1.95-.3 3.6-.16 4A6.22 6.22 0 0 0 .76 7.18c0 6.22 3.78 7.6 7.38 8A3.72 3.72 0 0 0 7.04 18v4m0-3c-3.5 1.08-3.5-2-4.9-2.4" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 20 6v5c0 5-3.35 8.74-8 10-4.65-1.26-8-5-8-10V6l8-3Z" />
      <path d="m9.2 12 1.8 1.8 3.8-4" />
    </svg>
  );
}

function FolderIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6.5h6l2 2h10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11Z" />
    </svg>
  );
}

function TerminalIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 7 4 4-4 4m6 0h8" />
      <rect x="2.5" y="3.5" width="19" height="17" rx="2" />
    </svg>
  );
}

function BrowserIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9h17M9 21c-1.6-2.4-2.4-5.4-2.4-9S7.4 5.4 9 3m6 18c1.6-2.4 2.4-5.4 2.4-9S16.6 5.4 15 3" />
    </svg>
  );
}

function SparkIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2 1.15 4.85L18 8l-4.85 1.15L12 14l-1.15-4.85L6 8l4.85-1.15L12 2Z" />
      <path d="m18.5 14 .7 2.8 2.8.7-2.8.7-.7 2.8-.7-2.8-2.8-.7 2.8-.7.7-2.8Z" />
    </svg>
  );
}

function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function AppleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.9 12.8c.02-2.2 1.8-3.25 1.88-3.3a4.08 4.08 0 0 0-3.2-1.73c-1.35-.14-2.66.8-3.35.8-.7 0-1.76-.78-2.9-.75a4.27 4.27 0 0 0-3.6 2.2c-1.55 2.68-.4 6.62 1.09 8.79.74 1.06 1.6 2.25 2.74 2.2 1.11-.04 1.52-.7 2.85-.7 1.32 0 1.7.7 2.86.68 1.2-.02 1.94-1.07 2.65-2.14a8.8 8.8 0 0 0 1.2-2.46 3.84 3.84 0 0 1-2.22-3.59ZM14.7 6.34a3.9 3.9 0 0 0 .9-2.8 4 4 0 0 0-2.6 1.33 3.7 3.7 0 0 0-.93 2.7 3.3 3.3 0 0 0 2.63-1.23Z" />
    </svg>
  );
}

function WindowsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 5.4 7.5-1v7H3v-6Zm8.5-1.15L21 3v8.4h-9.5V4.25ZM3 12.6h7.5v7L3 18.6v-6Zm8.5 0H21V21l-9.5-1.3v-7.1Z" />
    </svg>
  );
}

function Header() {
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
        <a href="#download">下载</a>
      </nav>
      <a className="header-github" href={GITHUB_URL} target="_blank" rel="noreferrer">
        <GithubIcon />
        <span>GitHub</span>
      </a>
    </header>
  );
}

function PrimaryDownload({
  platform,
  compact = false,
}: {
  platform: Platform;
  compact?: boolean;
}) {
  const isWindows = platform === "windows";
  return (
    <a
      className={`button button-primary${compact ? " button-compact" : ""}`}
      href={isWindows ? WINDOWS_URL : MACOS_URL}
      aria-label={`下载知远智能体 ${isWindows ? "Windows x64" : "macOS Apple Silicon"} 版本`}
    >
      <DownloadIcon />
      下载 {isWindows ? "Windows" : "macOS"}
    </a>
  );
}

function ProductFrame({
  src,
  alt,
  cropTop = false,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  cropTop?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`product-frame ${cropTop ? "crop-top" : ""} ${className}`}>
      <div className="window-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <p>知远智能体</p>
      </div>
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

function App() {
  const [preferredPlatform, setPreferredPlatform] = useState<Platform>("windows");

  useEffect(() => {
    const platform = navigator.userAgent.toLowerCase();
    if (platform.includes("mac")) setPreferredPlatform("macos");
  }, []);

  return (
    <div className="site-shell" id="top">
      <Header />

      <main>
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-brandline">
              <img src="/zhiyuan-logo.svg" alt="" />
              <span>本地优先的桌面智能体</span>
            </div>
            <h1>
              让 Agent 真正在你的
              <span>电脑</span>上工作
            </h1>
            <p className="hero-lead">
              连接文件、终端、浏览器与模型。把复杂任务交给知远，
              <br />
              过程看得见，敏感操作先批准，数据留在你的设备。
            </p>
            <div className="hero-traits" aria-label="知远智能体产品特点">
              <span>本地优先</span>
              <i />
              <span>能执行</span>
              <i />
              <span>可扩展</span>
            </div>
            <div className="hero-actions">
              <PrimaryDownload platform={preferredPlatform} />
              <a className="button button-secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">
                <GithubIcon />
                查看源码
              </a>
            </div>
            <p className="release-line">
              {RELEASE_VERSION} · Windows x64 · macOS Apple Silicon
            </p>
          </div>

          <div className="hero-product-wrap">
            <ProductFrame
              src="/product/zhiyuan-workspace.png"
              alt="知远智能体真实工作台界面"
              cropTop
              priority
              className="hero-product"
            />
          </div>
        </section>

        <section className="signal-strip" aria-label="产品信息">
          <dl>
            <div>
              <dt>42</dt>
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
            <p className="section-index">三件真正重要的事</p>
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
            <Feature icon={<ShieldIcon />} number="02" title="本地与可控">
              会话、配置和任务元数据保存在本地；需要访问敏感资源时，由你决定是否放行。
            </Feature>
            <Feature icon={<SparkIcon />} number="03" title="技能持续扩展">
              使用内置技能，接入 MCP 工具，也可以把自己的经验封装成下一次仍能复用的能力。
            </Feature>
          </div>
        </section>

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
              <div className="download-meta"><span>{RELEASE_VERSION}</span><span>330.6 MB</span></div>
              <PrimaryDownload platform="windows" compact />
            </article>
            <article>
              <div className="download-platform">
                <AppleIcon />
                <div><strong>macOS</strong><span>Apple Silicon</span></div>
              </div>
              <p>适用于搭载 Apple 芯片的 Mac</p>
              <div className="download-meta"><span>{RELEASE_VERSION}</span><span>314.6 MB</span></div>
              <PrimaryDownload platform="macos" compact />
            </article>
          </div>
          <p className="download-footnote">
            安装包由官方发布流程构建，并通过签名清单与 SHA-256 校验保护升级过程。
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
