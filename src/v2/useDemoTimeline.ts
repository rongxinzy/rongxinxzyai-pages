import { useEffect, useRef, useState } from "react";

type DemoTimelineOptions = {
  phaseCount: number;
  durations?: readonly number[];
  initialPhase?: number;
};

function prefersReducedMotion() {
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}

export function useDemoTimeline({
  phaseCount,
  durations = [2200],
  initialPhase = 0,
}: DemoTimelineOptions) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const [phase, setPhase] = useState(() =>
    prefersReducedMotion() ? phaseCount - 1 : initialPhase,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
      if (media.matches) setPhase(phaseCount - 1);
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [phaseCount]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px", threshold: 0.16 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reducedMotion) return;
    const duration = durations[phase] ?? durations[durations.length - 1] ?? 2200;
    const timer = window.setTimeout(
      () => setPhase(current => (current + 1) % phaseCount),
      duration,
    );
    return () => window.clearTimeout(timer);
  }, [durations, phase, phaseCount, reducedMotion, visible]);

  return { rootRef, phase, reducedMotion };
}
