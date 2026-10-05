import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleRange = isMobile ? [0.7, 0.9] : [1.05, 1];

  return (
    <div
      className="relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20"
      ref={containerRef}
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{ perspective: "1000px" }}
      >
        <ScrollHeader
          progress={scrollYProgress}
          titleComponent={titleComponent}
        />
        <ScrollCard
          progress={scrollYProgress}
          scaleRange={scaleRange}
        >
          {children}
        </ScrollCard>
      </div>
    </div>
  );
}

function ScrollHeader({
  progress,
  titleComponent,
}: {
  progress: MotionValue<number>;
  titleComponent: React.ReactNode;
}) {
  const translate = useTransform(progress, [0, 1], [0, -100]);
  const scale = useTransform(progress, [0, 0.6], [1, 0.9]);
  const opacity = useTransform(progress, [0, 0.6], [1, 0]);

  return (
    <motion.div
      style={{ translateY: translate, scale, opacity }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
}

function ScrollCard({
  progress,
  scaleRange,
  children,
}: {
  progress: MotionValue<number>;
  scaleRange: number[];
  children: React.ReactNode;
}) {
  const rotate = useTransform(progress, [0, 1], [20, 0]);
  const scale = useTransform(progress, [0, 1], scaleRange);

  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: "0 20px 60px rgb(12 18 34 / 0.12)",
      }}
      className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl overflow-hidden rounded-2xl border border-hairline bg-white md:h-[40rem]"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
}
