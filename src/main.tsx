import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { redirectLegacyHash } from "./routing/marketing";

if (!redirectLegacyHash()) {
  createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
