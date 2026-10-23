import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/jetbrains-mono";
import App from "./App";
import { getMarketingRoute, redirectLegacyHash } from "./routing/marketing";

if (!redirectLegacyHash()) {
  // Let the home page choose its initial position before its first paint,
  // rather than restoring a previous visit's demo position after mounting.
  if (getMarketingRoute().page === "home") {
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
  createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
