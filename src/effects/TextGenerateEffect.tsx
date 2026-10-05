import { useRef } from "react";
import { motion, useInView } from "motion/react";
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
  filter = true,
  duration = 0.5,
  staggerDelay = 0.08,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const tokens = tokenize(words);

  return (
    <span ref={ref} className={cn("inline", className)}>
      {tokens.map((token, index) =>
        token === " " ? (
          <span key={`space-${index}`}>{" "}</span>
        ) : (
          <motion.span
            key={`${token}-${index}`}
            className="inline-block"
            initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }}
            animate={
              inView
                ? { opacity: 1, filter: filter ? "blur(0px)" : "none" }
                : undefined
            }
            transition={{
              duration,
              delay: index * staggerDelay,
              ease: "easeOut",
            }}
          >
            {token}
          </motion.span>
        ),
      )}
    </span>
  );
}
