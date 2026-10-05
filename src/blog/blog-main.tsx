import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/jetbrains-mono";
import "../editorial/site.css";
import "../docs/docs.css";
import { BlogApp } from "./BlogApp";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BlogApp />
  </StrictMode>,
);
