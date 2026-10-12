import React, { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useReducedMotion } from "../lib/useReducedMotion";
import { cn } from "../lib/utils";

export function CardSpotlight({
  children,
  className,
  radius = 350,
  color = "rgb(15 23 42 / 0.05)",
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  color?: string;
}) {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`;

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group/spotlight relative overflow-hidden rounded-2xl border border-hairline bg-white",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl transition duration-300"
        style={{ background }}
        aria-hidden="true"
        animate={{ opacity: isHovering && !reduceMotion ? 1 : 0 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
