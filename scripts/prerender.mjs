// Prerender de las rutas a HTML estático tras `vite build`.
// La web es un SPA: sin esto, los crawlers que NO ejecutan JS (la mayoría de los
// de IA) ven el <body> vacío. Aquí servimos dist, renderizamos cada ruta con
// Chromium y guardamos el HTML ya pintado (con su contenido, meta y JSON-LD).
import puppeteer from 'puppeteer'
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join, extname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '../dist')
const PORT = 5179
const ROUTES = ['/', '/nosotros']

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
}

// Servidor estático mínimo con fallback SPA a index.html.
const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(req.url.split('?')[0])
    let filePath = join(DIST, urlPath)
    if (urlPath.endsWith('/')) filePath = join(filePath, 'index.html')
    if (extname(filePath) && existsSync(filePath)) {
      const data = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
      return res.end(data)
    }
    // Fallback SPA
    const data = await readFile(join(DIST, 'index.html'))
    res.writeHead(200, { 'Content-Type': MIME['.html'] })
    res.end(data)
  } catch {
    res.writeHead(404)
    res.end('not found')
  }
})

await new Promise((r) => server.listen(PORT, r))

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })

for (const route of ROUTES) {
  const page = await browser.newPage()
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
  // El contenido lo pinta React; esperamos a que exista un H1 y damos margen para
  // que termine el splash del home y monte la ruta perezosa /nosotros.
  await page.waitForSelector('h1', { timeout: 15000 }).catch(() => {})
  await new Promise((r) => setTimeout(r, route === '/' ? 5500 : 2800))
  const html = await page.content()

  const outDir = route === '/' ? DIST : join(DIST, route)
  await mkdir(outDir, { recursive: true })
  await writeFile(join(outDir, 'index.html'), html, 'utf8')
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
  console.log(`prerender ${route} → ${join(outDir, 'index.html').replace(DIST, 'dist')}  (${text.length} chars de texto)`)
  await page.close()
}

await browser.close()
server.close()
console.log('Prerender completo.')
