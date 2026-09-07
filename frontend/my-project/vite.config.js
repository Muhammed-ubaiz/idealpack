import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Tailwind is wired through PostCSS (postcss.config.js) so the build has no
// native/platform binaries and runs anywhere Netlify puts it.
export default defineConfig({
  plugins: [react()],
})
