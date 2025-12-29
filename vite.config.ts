import { defineConfig, type ViteDevServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import type { IncomingMessage, ServerResponse } from 'http'

function neutralinoDevPlugin() {
  return {
    name: 'neutralino-dev',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.url === '/__neutralino_globals.js') {
          const authInfoPath = join(process.cwd(), '.tmp', 'auth_info.json')

          if (existsSync(authInfoPath)) {
            const authInfo = JSON.parse(readFileSync(authInfoPath, 'utf-8'))
            const port = authInfo.port || authInfo.nlPort || 45678
            const token = authInfo.accessToken || authInfo.nlToken || ''
            const ctoken = authInfo.nlConnectToken || ''

            res.setHeader('Content-Type', 'application/javascript')
            res.end(`
              window.NL_PORT = ${port};
              window.NL_TOKEN = "${token}";
              window.NL_CTOKEN = "${ctoken}";
              window.NL_CWD = "${process.cwd().replace(/\\\\/g, '\\\\\\\\')}";
              window.NL_ARGS = [];
              window.NL_OS = "Windows";
              window.NL_APPID = "com.example.neuvitevue";
              window.NL_APPVERSION = "2.0.0";
              window.NL_VERSION = "6.4.0";
              window.NL_COMMIT = "";
              window.NL_CVERSION = "6.4.0";
              window.NL_EXTENABLED = false;
              window.NL_RESMODE = "directory";
            `)
          } else {
            res.setHeader('Content-Type', 'application/javascript')
            res.end('// Neutralino auth info not ready yet - refresh the page')
          }
          return
        }
        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    neutralinoDevPlugin(),
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
