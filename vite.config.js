import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendors into their own chunks so the main bundle stays
        // light. Rolldown (Vite 8) expects manualChunks as a function.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('remotion')) return 'remotion'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('react-dom') || id.includes('react-router') || /\/react\//.test(id)) {
            return 'react'
          }
        },
      },
    },
  },
})
