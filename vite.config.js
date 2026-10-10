import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Repo is thorst/portfolio -> served at https://thorst.github.io/portfolio/
// If you later add a custom domain or rename the repo, change `base` to match ('/' for a custom domain).
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
})
