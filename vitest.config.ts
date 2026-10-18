import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { include: ["scripts/**/*.test.mjs", "src/**/*.test.ts"], environment: "node" },
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1") } },
});
