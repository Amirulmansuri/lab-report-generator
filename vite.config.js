import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  // --- Add this server section ---
  server: {
    host: true, // Allows access from network
    // This is the part that fixes the "Blocked request" error
    allowedHosts: [
      '.ngrok-free.dev'
    ]
  }
})