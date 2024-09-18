import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080, // specify the port here
    watch: {
      usePolling: true, // This helps in certain environments like Docker or WSL
    },
    hmr: true,
  },
  esbuild: {
    // drop: ['console', 'debugger'],
  },  
})
