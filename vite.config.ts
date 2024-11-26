import { defineConfig } from "vite";
export default defineConfig({
  esbuild: {
    legalComments: 'none',
    sourcemap: "external"
  },
  server: {
    port: 5173
  }
})