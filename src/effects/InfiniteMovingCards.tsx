import React from "react";
import { cn } from "../lib/utils";

const SPEED_MAP: Record<"fast" | "normal" | "slow", string> = {
  fast: "20s",
  normal: "40s",
  slow: "80s",
};

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: React.ReactNode[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={
        {
          "--animation-duration": SPEED_MAP[speed],
          "--animation-direction":
            direction === "left" ? "normal" : "reverse",
        } as React.CSSProperties
      }
    >
      <ul
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, index) => (
          <li key={index} className="shrink-0">
            {item}
          </li>
        ))}
        {items.map((item, index) => (
          <li key={`copy-${index}`} className="shrink-0" aria-hidden="true">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
