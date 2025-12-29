import { spawn } from 'child_process'
import { copyFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createConnection } from 'net'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const configPath = join(root, 'neutralino.config.json')
const devConfigPath = join(root, 'neutralino.config.dev.json')
const prodConfigPath = join(root, 'neutralino.config.prod.json')
const authInfoPath = join(root, '.tmp', 'auth_info.json')

function waitForFile(filePath, timeout = 10000) {
  return new Promise((resolve, reject) => {
    if (existsSync(filePath)) {
      resolve()
      return
    }

    const checkInterval = setInterval(() => {
      if (existsSync(filePath)) {
        clearInterval(checkInterval)
        resolve()
      }
    }, 100)

    setTimeout(() => {
      clearInterval(checkInterval)
      reject(new Error(`Timeout waiting for ${filePath}`))
    }, timeout)
  })
}

function cleanup() {
  copyFileSync(prodConfigPath, configPath)
  console.log('\nRestored production config')
  process.exit()
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

copyFileSync(devConfigPath, configPath)
console.log('Switched to dev config (HMR enabled)')

console.log('Starting Neutralino first to generate auth info...')
const neu = spawn('npx', ['neu', 'run'], { cwd: root, shell: true, stdio: 'inherit' })

waitForFile(authInfoPath)
  .then(() => {
    console.log('Auth info ready, starting Vite...')
    const vite = spawn('npx', ['vite'], { cwd: root, shell: true, stdio: 'inherit' })

    neu.on('close', () => {
      vite.kill()
      cleanup()
    })
  })
  .catch((err) => {
    console.error(err.message)
    neu.kill()
    cleanup()
  })
