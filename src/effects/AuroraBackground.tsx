import React from "react";
import { cn } from "../lib/utils";

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: {
  children: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-ground text-ink",
        className,
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute -inset-2.5 opacity-40 blur-[10px] will-change-transform",
            "[background-image:repeating-linear-gradient(100deg,#ffffff_0%,#ffffff_7%,transparent_10%,transparent_12%,#ffffff_16%),repeating-linear-gradient(100deg,#4f46e5_10%,#c7d2fe_15%,#0ea5e9_20%,#bae6fd_25%,#4f46e5_30%)]",
            "[background-size:300%,200%] [background-position:50%_50%,50%_50%]",
            "after:absolute after:inset-0 after:animate-aurora after:[background-image:repeating-linear-gradient(100deg,#ffffff_0%,#ffffff_7%,transparent_10%,transparent_12%,#ffffff_16%),repeating-linear-gradient(100deg,#4f46e5_10%,#c7d2fe_15%,#0ea5e9_20%,#bae6fd_25%,#4f46e5_30%)]",
            "after:[background-size:200%,100%] after:[background-attachment:fixed]",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]",
          )}
        />
      </div>
      {children}
    </div>
  );
}
