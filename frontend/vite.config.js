import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    port: 5174, // Matches your frontend port
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite /api to empty
      },
    },
  },
})
