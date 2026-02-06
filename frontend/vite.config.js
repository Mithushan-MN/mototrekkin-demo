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
    // proxy: {
    //   "/api": {
    //     target: "https://mototrekkin-bakend.vercel.app", // Backend URL
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite /api to empty
    //   },
    proxy: {
      // All requests starting with /api go to local backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')  // keep /api
        // or if you want to remove /api in dev too: path.replace(/^\/api/, '')
      }
    },
  },
})
