import { useSyncExternalStore } from "react";

let preference: MediaQueryList | undefined;

function mediaQuery() {
  return (preference ??= window.matchMedia("(prefers-reduced-motion: reduce)"));
}

function subscribe(notify: () => void) {
  const query = mediaQuery();
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

function getSnapshot() {
  return mediaQuery().matches;
}

/** Keep all effects in sync when the operating-system preference changes. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
