import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// ESM için __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  // VITE_ değişkenlerini yükle
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // GitHub Pages repo adı: donguitakademidemo
    base: '/donguitakademidemo/',

    plugins: [react()],

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    define: {
      // bazı paketler process.env bekliyor, bunu dolduruyoruz
      'process.env': JSON.stringify(env),
      global: 'window',
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  }
})