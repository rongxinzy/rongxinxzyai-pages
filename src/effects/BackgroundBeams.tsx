import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "../lib/utils";

const PATHS = [
  "M-40 320C-40 320 60 240 120 200C180 160 240 120 320 100C400 80 520 60 760 -40",
  "M-40 340C-40 340 80 260 160 210C240 160 300 130 380 110C460 90 560 70 780 -30",
  "M-40 300C-40 300 40 220 100 180C160 140 220 100 300 80C380 60 500 40 740 -50",
  "M-40 360C-40 360 100 280 180 230C260 180 320 150 400 130C480 110 580 90 800 -20",
  "M-40 280C-40 280 20 200 80 160C140 120 200 80 280 60C360 40 480 20 720 -60",
  "M-40 380C-40 380 120 300 200 250C280 200 340 170 420 150C500 130 600 110 820 -10",
  "M-40 260C-40 260 0 180 60 140C120 100 180 60 260 40C340 20 460 0 700 -70",
  "M-40 400C-40 400 140 320 220 270C300 220 360 190 440 170C520 150 620 130 840 0",
  "M-60 330C-60 330 70 250 140 205C210 160 270 125 350 105C430 85 540 65 770 -35",
  "M-60 350C-60 350 90 270 170 215C250 165 310 135 390 115C470 95 570 75 790 -25",
  "M-60 310C-60 310 50 230 110 185C170 145 230 105 310 85C390 65 510 45 750 -45",
  "M-60 370C-60 370 110 290 190 235C270 185 330 155 410 135C490 115 590 95 810 -15",
];

export function BackgroundBeams({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Animated beams unmount offscreen; the static base paths stay, so the
  // visible result is identical while the gradient repaint loop only runs
  // near the viewport.
  const inView = useInView(ref, { margin: "240px" });
  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-hidden",
        className,
      )}
    >
      <svg
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {PATHS.map((d, index) => (
          <path
            key={`base-${index}`}
            d={d}
            stroke="rgb(12 18 34 / 0.06)"
            strokeWidth="0.6"
          />
        ))}
        {inView &&
          PATHS.map((d, index) => (
            <motion.path
              key={`beam-${index}`}
              d={d}
              stroke={`url(#beam-gradient-${index})`}
              strokeOpacity="0.5"
              strokeWidth="0.6"
            />
          ))}
        <defs>
          {inView &&
            PATHS.map((_, index) => (
              <motion.linearGradient
                key={`gradient-${index}`}
                id={`beam-gradient-${index}`}
                gradientUnits="userSpaceOnUse"
                initial={{ x1: "0%", x2: "0%", y1: "100%", y2: "100%" }}
                animate={{
                  x1: ["0%", "100%"],
                  x2: ["0%", "95%"],
                  y1: ["100%", "0%"],
                  y2: ["100%", `${5 + ((index * 3) % 10)}%`],
                }}
                transition={{
                  duration: 10 + ((index * 1.7) % 8),
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: (index * 2.3) % 8,
                }}
              >
                <stop stopColor="#4f46e5" stopOpacity="0" />
                <stop stopColor="#4f46e5" stopOpacity="0.6" />
                <stop offset="32.5%" stopColor="#0ea5e9" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </motion.linearGradient>
            ))}
        </defs>
      </svg>
    </div>
  );
}
