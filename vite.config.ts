import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": "/src/hooks",
      "@modules": "/src/modules",
      "@utils": "/src/utils",
      "@containers": "/src/containers",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@layouts": "/src/layouts",
      "@constants": "/src/constants",
      "src": "/src",
    }
  }
})
