import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site under /<repo-name>/, the deploy workflow sets BASE_PATH
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  build: {
    // items.generated.json is big, so the bundle is always a bit over 500 kB
    chunkSizeWarningLimit: 700,
  },
})
