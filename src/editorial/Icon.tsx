export type IconName =
  "windows" | "macos" | "linux" | "file" | "search" | "code";

/** Small native symbols; the Apple/Linux paths retain the existing brand assets. */
export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === "windows" ? (
        <path
          fill="currentColor"
          stroke="none"
          d="M2 4.4 10.5 3.2v8H2zm10-1.5L22 1.5v9.7H12zM2 12.8h8.5v8L2 19.6zm10 0h10v9.7L12 21.1z"
        />
      ) : name === "macos" ? (
        <path
          fill="currentColor"
          stroke="none"
          d="M16.9 12.8c.02-2.2 1.8-3.25 1.88-3.3a4.08 4.08 0 0 0-3.2-1.73c-1.35-.14-2.66.8-3.35.8-.7 0-1.76-.78-2.9-.75a4.27 4.27 0 0 0-3.6 2.2c-1.55 2.68-.4 6.62 1.09 8.79.74 1.06 1.6 2.25 2.74 2.2 1.11-.04 1.52-.7 2.85-.7 1.32 0 1.7.7 2.86.68 1.2-.02 1.94-1.07 2.65-2.14a8.8 8.8 0 0 0 1.2-2.46 3.84 3.84 0 0 1-2.22-3.59ZM14.7 6.34a3.9 3.9 0 0 0 .9-2.8 4 4 0 0 0-2.6 1.33 3.7 3.7 0 0 0-.93 2.7 3.3 3.3 0 0 0 2.63-1.23Z"
        />
      ) : name === "linux" ? (
        <>
          <path d="M8 17.5c-1.4-.9-2.2-2.5-2.2-4.2 0-1.5.6-2.8 1.7-3.8C7.2 8.6 7 7.6 7 6.7 7 4.1 9.1 2 11.7 2s4.7 2.1 4.7 4.7c0 1-.2 2-.6 2.9 1.1 1 1.7 2.4 1.7 3.9 0 1.7-.8 3.2-2.1 4.1M8 17.5 5.5 21M15.5 17.5 18 21M8.2 17.2c1 .8 2.2 1.2 3.5 1.2 1.4 0 2.7-.4 3.7-1.2" />
          <circle cx="10" cy="6.5" r=".7" fill="currentColor" stroke="none" />
          <circle cx="13.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
          <path d="m10.4 9 1.3 1 1.3-1" />
        </>
      ) : (
        <>
          <path d="M5 2h9l5 5v15H5zM14 2v6h5" />
          {name === "file" ? (
            <path d="M8 12h8M8 15h8M8 18h5" />
          ) : name === "code" ? (
            <path d="m10 12-3 3 3 3m4-6 3 3-3 3" />
          ) : (
            <>
              <circle cx="11" cy="14" r="3" />
              <path d="m13 16 3 3" />
            </>
          )}
        </>
      )}
    </svg>
  );
}

export function ControlIcon({
  name,
}: {
  name: "menu" | "close" | "circle" | "diamond" | "grid" | "expand";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === "circle" ? (
        <circle cx="12" cy="12" r="5" />
      ) : name === "diamond" ? (
        <path d="m12 5 7 7-7 7-7-7Z" />
      ) : name === "grid" ? (
        <path d="M5 5h14v14H5zM12 5v14M5 12h14" />
      ) : name === "menu" ? (
        <path d="M4 6h16M4 12h16M4 18h16" />
      ) : name === "close" ? (
        <path d="m6 6 12 12M6 18 18 6" />
      ) : (
        <path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" />
      )}
    </svg>
  );
}
