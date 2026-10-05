import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/jetbrains-mono";
import "../editorial/site.css";
import "./docs.css";
import { DocsApp } from "./DocsApp";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <DocsApp />
  </StrictMode>,
);
