import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// dev 下把 /docs/* 请求交给 docs.html（文档静态资源在 /docs-assets，不受影响）。
function docsDevRewrite(): Plugin {
  return {
    name: "docs-dev-rewrite",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = (req.url ?? "").split(/[?#]/, 1)[0];
        if (path === "/docs" || (path.startsWith("/docs/") && path !== "/docs.html")) {
          req.url = "/docs.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), docsDevRewrite()],
  appType: "mpa",
  server: {
    proxy: {
      "/api/release": {
        target: "https://www.rongxzyai.com",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("./index.html", import.meta.url)),
        englishHome: fileURLToPath(new URL("./en/index.html", import.meta.url)),
        enterprise: fileURLToPath(
          new URL("./enterprise/index.html", import.meta.url),
        ),
        englishEnterprise: fileURLToPath(
          new URL("./en/enterprise/index.html", import.meta.url),
        ),
        docs: fileURLToPath(new URL("./docs.html", import.meta.url)),
      },
    },
  },
});
