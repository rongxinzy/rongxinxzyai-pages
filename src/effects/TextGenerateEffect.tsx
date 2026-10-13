import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "../lib/useReducedMotion";
import { cn } from "../lib/utils";

const CJK = /[㐀-鿿豈-﫿]/;

function tokenize(words: string): string[] {
  const tokens: string[] = [];
  let buffer = "";
  const flush = () => {
    if (buffer) {
      tokens.push(buffer);
      buffer = "";
    }
  };
  for (const char of Array.from(words)) {
    if (/\s/.test(char)) {
      flush();
      if (tokens[tokens.length - 1] !== " ") tokens.push(" ");
    } else if (CJK.test(char)) {
      flush();
      tokens.push(char);
    } else {
      buffer += char;
    }
  }
  flush();
  while (tokens.length && tokens[tokens.length - 1] === " ") tokens.pop();
  while (tokens.length && tokens[0] === " ") tokens.shift();
  return tokens;
}

export function TextGenerateEffect({
  words,
  className,
  tokenClassName,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.08,
  initialDelay = 0,
}: {
  words: string;
  className?: string;
  tokenClassName?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
  initialDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const tokens = tokenize(words);

  return (
    <span ref={ref} className={cn("inline", className)}>
      <span className="sr-only">{words}</span>
      <span aria-hidden="true">
        {tokens.map((token, index) =>
          token === " " ? (
            <span key={`space-${index}`}> </span>
          ) : (
            <motion.span
              key={`${token}-${index}`}
              className={cn("inline-block", tokenClassName)}
              style={{ "--token-i": index } as React.CSSProperties}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, filter: filter ? "blur(10px)" : "none" }
              }
              animate={
                reducedMotion || inView
                  ? {
                      opacity: 1,
                      filter: filter ? "blur(0px)" : "none",
                      transitionEnd: { filter: "none" },
                    }
                  : undefined
              }
              transition={{
                duration: reducedMotion ? 0 : duration,
                delay: reducedMotion ? 0 : initialDelay + index * staggerDelay,
                ease: "easeOut",
              }}
            >
              {token}
            </motion.span>
          ),
        )}
      </span>
    </span>
  );
}
