import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080 // specify the port here
  },
  build: {
    minify: 'esbuild', // ensure esbuild is used for minification
    esbuild: {
      drop: ['console', 'debugger'], // drop console and debugger statements
    },
  },
})
