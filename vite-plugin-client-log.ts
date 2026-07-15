import fs from 'node:fs'
import path from 'node:path'
import type { Plugin, Connect } from 'vite'

const LOG_DIR = 'logs'
const MAX_BODY_BYTES = 8_192

function todayLogPath(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return path.join(LOG_DIR, `portfolio-${y}-${m}-${day}.log`)
}

function appendLog(line: string): void {
  fs.mkdirSync(LOG_DIR, { recursive: true })
  fs.appendFileSync(todayLogPath(), line + '\n', 'utf8')
}

function readBody(req: Connect.IncomingMessage, maxBytes: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (c: Buffer) => {
      size += c.length
      if (size > maxBytes) {
        reject(new Error('body too large'))
        req.destroy()
        return
      }
      chunks.push(c)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function clientLogMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    if (req.url !== '/api/client-log' || req.method !== 'POST') {
      next()
      return
    }

    try {
      const raw = await readBody(req, MAX_BODY_BYTES)
      const entry = JSON.parse(raw) as Record<string, unknown>
      const ts = new Date().toISOString()
      const level = String(entry.level ?? 'info').toUpperCase().slice(0, 8)
      const msg = String(entry.message ?? '').slice(0, 500)
      appendLog(`[${ts}] ${level} ${msg}`)
      res.statusCode = 204
      res.end()
    } catch (e) {
      appendLog(`[${new Date().toISOString()}] ERROR log-handler ${String(e)}`)
      res.statusCode = 400
      res.end('bad request')
    }
  }
}

export function clientLogPlugin(): Plugin {
  return {
    name: 'client-log',
    configureServer(server) {
      server.middlewares.use(clientLogMiddleware())
    },
    // preview тоже ограничен по размеру body; на статическом хостинге плагин не используется
    configurePreviewServer(server) {
      server.middlewares.use(clientLogMiddleware())
    },
  }
}
