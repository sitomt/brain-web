import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Sirve /api/chat durante `npm run dev` reutilizando el mismo handler serverless
// que usa Vercel en producción. La clave se carga desde .env a process.env (server-side):
// nunca se expone al navegador.
function devApiPlugin(env) {
  return {
    name: 'brain-dev-api',
    configureServer(server) {
      for (const k of ['ANTHROPIC_API_KEY', 'RESEND_API_KEY', 'LEAD_FROM_EMAIL', 'LEAD_NOTIFY_EMAIL']) {
        if (env[k] && !process.env[k]) process.env[k] = env[k]
      }
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const { default: handler } = await server.ssrLoadModule('/api/chat.js')
          await handler(req, res)
        } catch (err) {
          server.config.logger.error('[dev-api] ' + (err?.stack || err))
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'dev_api_failed' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
  plugins: [react(), tailwindcss(), devApiPlugin(env)],
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendors into their own chunks so the main bundle stays
        // light. Rolldown (Vite 8) expects manualChunks as a function.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('remotion')) return 'remotion'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('react-dom') || id.includes('react-router') || /\/react\//.test(id)) {
            return 'react'
          }
        },
      },
    },
  },
  }
})
