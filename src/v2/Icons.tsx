import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconShell({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </IconShell>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </IconShell>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="m5 12 4 4 10-10" />
    </IconShell>
  );
}

export function ActivityIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M3 12h4l2.2-6 4 12 2.2-6H21" />
    </IconShell>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M4 19V5M4 19h16" />
      <path d="m7 15 3-3 3 2 5-6" />
    </IconShell>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </IconShell>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="m4 7 8-4 8 4-8 4zM4 7v10l8 4 8-4V7M12 11v10" />
    </IconShell>
  );
}

export function TableIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11M15 9v11" />
    </IconShell>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="m7 10 5 5 5-5" />
    </IconShell>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </IconShell>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </IconShell>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M14 4l-4 16" />
    </IconShell>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="8" y="8" width="11" height="11" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </IconShell>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />
    </IconShell>
  );
}

export function SendIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M8 5h9v9" />
      <path d="m17 5-9.5 9.5" />
      <path d="M5 11v6a2 2 0 0 0 2 2h6" />
    </IconShell>
  );
}

export function AppleIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        fill="currentColor"
        stroke="none"
        d="M16.9 12.8c.02-2.2 1.8-3.25 1.88-3.3a4.08 4.08 0 0 0-3.2-1.73c-1.35-.14-2.66.8-3.35.8-.7 0-1.76-.78-2.9-.75a4.27 4.27 0 0 0-3.6 2.2c-1.55 2.68-.4 6.62 1.09 8.79.74 1.06 1.6 2.25 2.74 2.2 1.11-.04 1.52-.7 2.85-.7 1.32 0 1.7.7 2.86.68 1.2-.02 1.94-1.07 2.65-2.14a8.8 8.8 0 0 0 1.2-2.46 3.84 3.84 0 0 1-2.22-3.59ZM14.7 6.34a3.9 3.9 0 0 0 .9-2.8 4 4 0 0 0-2.6 1.33 3.7 3.7 0 0 0-.93 2.7 3.3 3.3 0 0 0 2.63-1.23Z"
      />
    </IconShell>
  );
}

export function LinuxIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M8 17.5c-1.4-.9-2.2-2.5-2.2-4.2 0-1.5.6-2.8 1.7-3.8C7.2 8.6 7 7.6 7 6.7 7 4.1 9.1 2 11.7 2s4.7 2.1 4.7 4.7c0 1-.2 2-.6 2.9 1.1 1 1.7 2.4 1.7 3.9 0 1.7-.8 3.2-2.1 4.1" />
      <path d="M8 17.5 5.5 21M15.5 17.5 18 21M8.2 17.2c1 .8 2.2 1.2 3.5 1.2 1.4 0 2.7-.4 3.7-1.2" />
      <circle cx="10" cy="6.5" r=".7" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
      <path d="m10.4 9 1.3 1 1.3-1" />
    </IconShell>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h4" />
    </IconShell>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M3 6h6l2 2h10v11H3z" />
    </IconShell>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        fill="currentColor"
        stroke="none"
        d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.58-.3-5.3-1.3-5.3-5.74 0-1.27.46-2.31 1.2-3.12-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.17 1.2a11 11 0 0 1 5.77 0c2.2-1.51 3.17-1.2 3.17-1.2.63 1.6.23 2.78.11 3.08.75.81 1.2 1.85 1.2 3.12 0 4.46-2.72 5.44-5.31 5.73.42.36.79 1.06.79 2.15v3.19c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
      />
    </IconShell>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </IconShell>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </IconShell>
  );
}

export function MoreIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
    </IconShell>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M12 5v14M5 12h14" />
    </IconShell>
  );
}

export function ReplayIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M4 12a8 8 0 1 0 2.34-5.66L4 8.68" />
      <path d="M4 4v4.68h4.68" />
    </IconShell>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </IconShell>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1L14.5 3h-5l-.3 3.1a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L5.1 11a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 3.1h5l.3-3.1a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5a7 7 0 0 0 .1-1Z" />
    </IconShell>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M12 3 20 6v5c0 5-3.3 8.7-8 10-4.7-1.3-8-5-8-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </IconShell>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="m12 2 1.4 5.6L19 9l-5.6 1.4L12 16l-1.4-5.6L5 9l5.6-1.4z" />
      <path d="m19 15 .6 2.4L22 18l-2.4.6L19 21l-.6-2.4L16 18l2.4-.6z" />
    </IconShell>
  );
}

export function TerminalIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="2.5" y="3.5" width="19" height="17" rx="2" />
      <path d="m6 8 4 4-4 4M12.5 16H18" />
    </IconShell>
  );
}

export function WindowIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 4v16" />
    </IconShell>
  );
}
