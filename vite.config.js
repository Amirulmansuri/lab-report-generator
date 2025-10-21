// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/lab-report-generator/", // 👈 Required for GitHub Pages


  server: {
    host: true,
    allowedHosts: ['.ngrok-free.dev']
  }
})
