import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Tailwind is wired through PostCSS (postcss.config.js) so the build has no
// native/platform binaries and runs anywhere Netlify puts it.
export default defineConfig({
  plugins: [react()],
  server: {
    // Dev only: forward AI assistant calls to the local Express server
    // (see ../../server, default port 8787). Change the port here if needed.
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
})
