import type { ReactNode, SVGProps } from "react";

const STROKE_ICONS: Record<string, ReactNode> = {
  "arrow-forward": <path d="M4 12h15m-6-6 6 6-6 6" />,
  "arrow-upward": <path d="M12 19V5m-6 6 6-6 6 6" />,
  download: <path d="M12 4v10m-5-4 5 5 5-5M5 19h14" />,
  laptop: <path d="M4 6h16v10H4zM2 19h20" />,
  monitor: <path d="M3 5h18v12H3zM9 21h6m-3-4v4" />,
  terminal: <path d="M4 5h16v14H4zM7 9l3.5 3L7 15m6.5 0H17" />,
  star: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 3l2.7 5.5 6 .8-4.4 4.2 1.1 6-5.4-2.9L6.6 19.5l1.1-6L3.3 9.3l6-.8L12 3z"
    />
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5.5 20c1.4-3.2 3.9-4.8 6.5-4.8s5.1 1.6 6.5 4.8" />
    </>
  ),
  description: (
    <>
      <path d="M6 3h8l4 4v14H6zM14 3v5h5" />
      <path d="M9 12.5h6M9 15.5h6" />
    </>
  ),
  table: (
    <>
      <path d="M4 5h16v14H4z" />
      <path d="M4 10h16M4 15h16M12 5v14" />
    </>
  ),
  "code-blocks": (
    <>
      <path d="m9.5 8-4 4 4 4m5-8 4 4-4 4" />
      <path d="M3 3h18v18H3z" strokeDasharray="2.5 3" opacity="0.45" />
    </>
  ),
  mic: (
    <>
      <rect x="9.5" y="3" width="5" height="10" rx="2.5" />
      <path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21m-3 0h6" />
    </>
  ),
  dataset: (
    <>
      <path d="M4 6.5C4 4.8 7.6 3.5 12 3.5s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z" />
      <path d="M4 6.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6M4 12.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  summarize: (
    <>
      <path d="M6 3h8l4 4v14H6zM14 3v5h5" />
      <path d="M9 12.5h6M9 15.5h4" />
    </>
  ),
  "file-copy": (
    <>
      <path d="M13 8h5v12H8v-3" />
      <path d="M5 3h8l4 4v2" transform="translate(-1 -1)" />
      <path d="M4 4h7l3 3v9H4z" />
    </>
  ),
  share: <path d="M12 15V4m-4 4 4-4 4 4M5 12v8h14v-8" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.3 12.3 2.4 2.4 4.9-5.1" />
    </>
  ),
  "add-circle": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.5v7m-3.5-3.5h7" />
    </>
  ),
  attach: (
    <path d="M8 12.5 14.6 6a2.2 2.2 0 0 1 3.1 3.1L11 15.8a3.7 3.7 0 0 1-5.2-5.2l7-7" />
  ),
  "cloud-download": (
    <>
      <path d="M7 16.5a4 4 0 0 1-.5-8A6 6 0 0 1 18 10a3.5 3.5 0 0 1-.5 7" />
      <path d="M12 11.5v5m-2.2-2.3 2.2 2.3 2.2-2.3" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  memory: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M10 10.5h4v3h-4zM9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4" />
    </>
  ),
  folder: <path d="M3 7h6l2 2h10v9H3z" />,
  "swap-calls": (
    <>
      <path d="M7 4v12m-2.5-2.7L7 16.5l2.5-3.2M17 20V8m-2.5 2.7L17 7.5l2.5 3.2" />
    </>
  ),
  shield: <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" />,
  "shield-check": (
    <>
      <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" />
      <path d="m9 12 2 2 4-4.2" />
    </>
  ),
  key: (
    <>
      <circle cx="7.5" cy="12.5" r="3.5" />
      <path d="M11 12.5h9.5M17.5 9.5v3M20.5 9.5v3" />
    </>
  ),
  rule: (
    <>
      <path d="M4 6.5h9M4 12h9M4 17.5h5.5" />
      <path d="m16.5 14.8 1.8 1.8 3.4-3.6" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5" />
      <path d="M12 7.8h.01" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c-5.2 4.8-5.2 12.2 0 17 5.2-4.8 5.2-12.2 0-17z" />
    </>
  ),
  tune: (
    <>
      <path d="M4 7h9m4 0h3M4 12h3m4 0h9M4 17h13m4 0h-1" />
      <circle cx="15" cy="7" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="9" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="19" cy="17" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
  copy: (
    <path
      fill="currentColor"
      stroke="none"
      d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"
    />
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path fill="currentColor" stroke="none" d="M10 8.6v6.8l5.6-3.4z" />
    </>
  ),
  windows: (
    <path
      fill="currentColor"
      stroke="none"
      d="M2 4.4 10.5 3.2v8H2zm10-1.5L22 1.5v9.7H12zM2 12.8h8.5v8L2 19.6zm10 0h10v9.7L12 21.1z"
    />
  ),
  apple: (
    <path
      fill="currentColor"
      stroke="none"
      d="M16.9 12.8c.02-2.2 1.8-3.25 1.88-3.3a4.08 4.08 0 0 0-3.2-1.73c-1.35-.14-2.66.8-3.35.8-.7 0-1.76-.78-2.9-.75a4.27 4.27 0 0 0-3.6 2.2c-1.55 2.68-.4 6.62 1.09 8.79.74 1.06 1.6 2.25 2.74 2.2 1.11-.04 1.52-.7 2.85-.7 1.32 0 1.7.7 2.86.68 1.2-.02 1.94-1.07 2.65-2.14a8.8 8.8 0 0 0 1.2-2.46 3.84 3.84 0 0 1-2.22-3.59ZM14.7 6.34a3.9 3.9 0 0 0 .9-2.8 4 4 0 0 0-2.6 1.33 3.7 3.7 0 0 0-.93 2.7 3.3 3.3 0 0 0 2.63-1.23Z"
    />
  ),
  linux: (
    <>
      <path d="M8 17.5c-1.4-.9-2.2-2.5-2.2-4.2 0-1.5.6-2.8 1.7-3.8C7.2 8.6 7 7.6 7 6.7 7 4.1 9.1 2 11.7 2s4.7 2.1 4.7 4.7c0 1-.2 2-.6 2.9 1.1 1 1.7 2.4 1.7 3.9 0 1.7-.8 3.2-2.1 4.1M8 17.5 5.5 21m9.5-3.5L18 21m-9.8-.3c1 .8 2.2 1.2 3.5 1.2 1.4 0 2.7-.4 3.7-1.2" />
      <circle cx="10" cy="6.5" r=".7" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
      <path d="m10.4 9 1.3 1 1.3-1" />
    </>
  ),
};

export type IconName = keyof typeof STROKE_ICONS;

export function Icon({
  name,
  size = 18,
  ...rest
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {STROKE_ICONS[name]}
    </svg>
  );
}
