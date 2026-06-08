// Genera public/og-image.png (1200×630) — la imagen de previsualización al
// compartir la web (WhatsApp, LinkedIn, X, tarjetas de agentes de IA).
// Uso puntual: `npm run og`. El PNG resultante se commitea en public/.
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../public/og-image.png')

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&family=Syne+Mono&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#0A0A0B; overflow:hidden;
         font-family:'DM Sans',sans-serif; position:relative; }
  .aura { position:absolute; width:760px; height:760px; top:-220px; right:-160px;
          background:radial-gradient(circle at center, rgba(114,9,183,0.30), transparent 62%);
          filter:blur(8px); }
  .aura2 { position:absolute; width:640px; height:640px; bottom:-260px; left:-140px;
           background:radial-gradient(circle at center, rgba(67,97,238,0.22), transparent 62%); }
  .bar { position:absolute; top:0; left:0; right:0; height:6px; background:${GRADIENT}; }
  .wrap { position:relative; height:100%; display:flex; flex-direction:column;
          justify-content:center; padding:0 84px; }
  .eyebrow { font-family:'Syne Mono',monospace; font-size:22px; letter-spacing:0.22em;
             text-transform:uppercase; color:rgba(255,255,255,0.55); margin-bottom:30px;
             display:flex; align-items:center; gap:14px; }
  .dot { width:10px; height:10px; border-radius:50%; background:#22C55E;
         box-shadow:0 0 14px rgba(34,197,94,0.8); }
  h1 { font-family:'Instrument Serif',serif; font-size:96px; line-height:1.05;
       color:#fff; letter-spacing:-0.01em; margin-bottom:26px; }
  h1 em { font-style:italic; background:${GRADIENT}; -webkit-background-clip:text;
          background-clip:text; -webkit-text-fill-color:transparent; }
  p { font-family:'DM Sans',sans-serif; font-weight:300; font-size:32px;
      color:rgba(255,255,255,0.72); max-width:760px; line-height:1.45; }
  .foot { position:absolute; bottom:54px; left:84px; right:84px; display:flex;
          align-items:center; justify-content:space-between; }
  .brand { font-family:'Instrument Serif',serif; font-size:40px; color:#fff; }
  .brand b { font-weight:400; background:${GRADIENT}; -webkit-background-clip:text;
             background-clip:text; -webkit-text-fill-color:transparent; }
  .pill { font-family:'Syne Mono',monospace; font-size:20px; letter-spacing:0.06em;
          color:#fff; border:1px solid rgba(255,255,255,0.22); border-radius:999px;
          padding:12px 22px; }
</style></head>
<body>
  <div class="aura"></div><div class="aura2"></div><div class="bar"></div>
  <div class="wrap">
    <div class="eyebrow"><span class="dot"></span>Agencia de IA · Murcia</div>
    <h1>La IA que hace<br>funcionar tu <em>negocio</em></h1>
    <p>Atención al cliente, operaciones e inteligencia de negocio, con criterio de empresario.</p>
  </div>
  <div class="foot">
    <div class="brand">br<b>[AI]</b>n</div>
    <div class="pill">Primera reunión gratuita</div>
  </div>
</body></html>`

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 })
await page.setContent(html, { waitUntil: 'networkidle0' })
// eslint-disable-next-line no-undef -- corre dentro del navegador (page.evaluate)
await page.evaluate(() => document.fonts.ready)
await new Promise((r) => setTimeout(r, 400))
await page.screenshot({ path: OUT, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } })
await browser.close()
console.log('og-image generada →', OUT)
