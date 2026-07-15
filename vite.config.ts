import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { clientLogPlugin } from './vite-plugin-client-log'

export default defineConfig({
  plugins: [vue(), clientLogPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5180,
    open: true,
  },
  preview: {
    port: 4180,
  },
})
