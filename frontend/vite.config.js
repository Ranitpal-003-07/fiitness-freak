import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = env.VITE_PORT || 3000; 
  const apiUrl = env.VITE_API_URL || 'https://fiitness-freak.onrender.com'; 

  return {
    plugins: [react()],
    server: {
      port: port,
      proxy: {
        "/api": apiUrl,
        "/uploads": apiUrl,
      },
    },
    optimizeDeps: {
      include: ["chartjs-adapter-date-fns"],
    },
    define: {
      'process.env.VITE_API_URL': JSON.stringify(apiUrl),
    },
  };
});
