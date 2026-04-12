import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import electron from "vite-plugin-electron/simple";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
    strictPort: true,
  },
  plugins: [
    react(),
    electron({
      main: {
        // Main process entry
        entry: "electron/main.ts",
        vite: {
          build: {
            outDir: "dist-electron",
            rollupOptions: {
              output: {
                // Ensures output is main.js to match your package.json
                entryFileNames: "[name].js", 
              },
            },
          },
        },
      },
      preload: {
        // Preload script entry
        input: "electron/preload.ts",
        vite: {
          build: {
            outDir: "dist-electron",
          },
        },
      },
      // renderer: {} // Polyfill settings if you need Node APIs in frontend
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Essential for Electron: ensures assets are loaded via relative paths in prod
  base: mode === "production" ? "./" : "/",
  build: {
    // This helps resolve the "jsx" invalid key warning
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));