import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const shinyTarget = env.VITE_SHINY_DASHBOARD_URL || "http://127.0.0.1:6698";

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/shiny": {
          target: shinyTarget,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (p) => p.replace(/^\/shiny/, "/"),
        },
      },
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
