import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  appType: "mpa",
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("./index.html", import.meta.url)),
        englishHome: fileURLToPath(new URL("./en/index.html", import.meta.url)),
        enterprise: fileURLToPath(new URL("./enterprise/index.html", import.meta.url)),
        englishEnterprise: fileURLToPath(
          new URL("./en/enterprise/index.html", import.meta.url),
        ),
      },
    },
  },
});
