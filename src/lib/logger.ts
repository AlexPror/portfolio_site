export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogEntry {
  level: LogLevel
  message: string
  meta?: Record<string, unknown>
  ts: string
  url: string
  userAgent: string
}

const STORAGE_KEY = 'portfolio-log-buffer'
const MAX_BUFFER = 50
const isDev = import.meta.env.DEV

function persist(entry: LogEntry): void {
  if (!isDev) return
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const list: LogEntry[] = raw ? JSON.parse(raw) : []
    list.push(entry)
    while (list.length > MAX_BUFFER) list.shift()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    /* ignore quota / private mode */
  }
}

async function ship(entry: LogEntry): Promise<void> {
  if (!isDev) return
  try {
    const meta = entry.meta ?? {}
    await fetch('/api/client-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level: entry.level,
        message: entry.message.slice(0, 500),
        meta: {
          url: entry.url,
          userAgent: entry.userAgent,
          ts: entry.ts,
          ...(typeof meta.length === 'number' ? { length: meta.length } : {}),
          ...(typeof meta.path === 'string' ? { path: meta.path } : {}),
          ...(typeof meta.name === 'string' ? { name: meta.name } : {}),
          ...(typeof meta.origin === 'string' ? { origin: meta.origin } : {}),
          ...(typeof meta.hasKey === 'boolean' ? { hasKey: meta.hasKey } : {}),
          ...(typeof meta.mode === 'string' ? { mode: meta.mode } : {}),
          ...(typeof meta.status === 'number' ? { status: meta.status } : {}),
          ...(typeof meta.success === 'boolean' ? { success: meta.success } : {}),
          ...(typeof meta.apiMessage === 'string' ? { apiMessage: String(meta.apiMessage).slice(0, 200) } : {}),
          ...(typeof meta.msg === 'string' ? { msg: String(meta.msg).slice(0, 200) } : {}),
          ...(typeof meta.isCors === 'boolean' ? { isCors: meta.isCors } : {}),
          ...(typeof meta.raw === 'string' ? { raw: String(meta.raw).slice(0, 200) } : {}),
        },
      }),
      keepalive: true,
    })
  } catch {
    /* ignore */
  }
}

function write(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  const entry: LogEntry = {
    level,
    message,
    meta,
    ts: new Date().toISOString(),
    url: typeof location !== 'undefined' ? location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  }

  const prefix = `[portfolio:${level}]`
  if (level === 'error') console.error(prefix, message, meta ?? '')
  else if (isDev && level === 'warn') console.warn(prefix, message, meta ?? '')
  else if (isDev) console.log(prefix, message, meta ?? '')
  else if (message.startsWith('contact form')) console.info(prefix, message, meta ?? '')

  persist(entry)
  void ship(entry)
}

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (isDev) write('debug', message, meta)
  },
  info: (message: string, meta?: Record<string, unknown>) => write('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => write('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => write('error', message, meta),
}

export function installGlobalErrorHandlers(): void {
  window.addEventListener('error', (ev) => {
    logger.error('uncaught error', {
      message: ev.message,
      filename: ev.filename,
      lineno: ev.lineno,
      colno: ev.colno,
    })
  })

  window.addEventListener('unhandledrejection', (ev) => {
    const reason = ev.reason
    logger.error('unhandled rejection', {
      reason: reason instanceof Error ? reason.message : String(reason),
    })
  })

  logger.debug('app started', { viewport: `${window.innerWidth}x${window.innerHeight}` })
}

