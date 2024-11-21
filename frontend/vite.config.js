import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: env.VITE_PORT,
      proxy: {
        "/api": env.VITE_API_URL,
        "/uploads": env.VITE_API_URL,
      },
    },
    optimizeDeps: {
      include: ["chartjs-adapter-date-fns"],
    },
  };
});
