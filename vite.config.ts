import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@neutralinojs/lib/dist/neutralino.js',
          dest: ''
        }
      ]
    })
  ],
  server: {
    port: 5173
  },
  base: '',
  build: {
    outDir: 'dist'
  }
})
