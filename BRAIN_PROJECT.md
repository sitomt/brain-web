# BrAIn — Contexto del Proyecto

> Fotografía del estado actual. 2026-06-08.

## Quién es BrAIn
Agencia de inteligencia artificial española (Murcia).
Fundador: Sito (ginesmunuera@gmail.com).
Captación: email frío → link a web → conversión vía chat / reunión.
Idioma: español.

## Posicionamiento
"Antes que especialistas en IA, somos empresarios." Dirigimos negocios reales
y por eso implementamos tecnología con criterio de negocio. Probado en casa,
ahora abierto a clientes externos.

## Cliente objetivo
Dueño inversor de negocio (pequeño, mediano o grande). Dolor principal:
dependencia de personas e inconsistencia de resultados. Quiere sistemas que
funcionen solos, siempre, sin depender de nadie.

## Filosofía de comunicación
Hablar de beneficios, no de tecnología. Lenguaje simple, directo, humano,
cercano y con transparencia total. Sin letra pequeña ni promesas vagas.

## Catálogo de productos (los tres)
- **01 · Atención al Cliente** (Contact Center IA) — chatbot/voz 24/7 en todos
  los canales (WhatsApp, web, email, Instagram, teléfono). Desde 1.200€ + 97€/mes.
- **02 · Operaciones** (Back Office IA) — emails, facturas, informes,
  recordatorios automatizados. Desde 2.000€ + 200€/mes.
- **03 · Inteligencia de Negocio** (Asistente IA) — preguntar a tus datos en
  lenguaje natural (ventas, costes, stock, reservas, albaranes). Desde 1.500€ + 150€/mes.

Tier 2 (a medida, vía conversación de 15 min): soluciones en local,
clasificación de leads, automatizaciones, software a medida, webs y landing pages.

El core son bloques de utilidad productizados y revendibles (los tres de arriba),
más proyectos a medida puntuales.

## Programa Fundadores (campaña activa)
Storytelling de oportunidad de origen: abrimos BrAIn a los primeros clientes
externos para construir casos de referencia. A cambio: precio fundador, acceso
directo y prioridad. Cuando se cierra el cupo, el precio sube.
- Config única en `src/lib/founders.js` (`active`, `spotsTotal`, `spotsLeft`,
  `discountLabel`, `chatContext`, `chatPrefill`). `active: false` apaga toda la
  campaña (barra, modal y anclas de precio).
- Estado actual: 10 plazas, 7 libres, hasta 50% sobre precio de catálogo.
- Superficies del storytelling (historia arriba, oferta al final — sin saturar):
  - `FoundersBar` — barra superior fina; copy "Las {total} primeras plazas, a
    precio fundador · quedan {N}" → abre el modal.
  - `Enfoque` — la HISTORIA vive aquí (merge): párrafo de origen "llevamos meses
    puliéndola en casa → abrimos {total} plazas → crecemos juntos" (condicionado a
    `FOUNDERS.active`, SIN precio). Conexión temprana.
  - `FoundersOffer` (#fundadores) — la OFERTA, banda crema **antes del CTA final**:
    precio fundador, las 3 ventajas (precio/trato directo/prioridad), contador/barra
    y CTA al chat de fundadores. Cerca de la conversión.
  - `Products` — ancla de precio reetiquetada "Precio fundador · de las {total}
    primeras · quedan {N}" (clic → modal con la historia).
  - `Products` — ancla de precio reetiquetada "Precio fundador · de las {total}
    primeras · quedan {N}" (clic → modal con la historia).
  - `FoundersModal` — historia completa + oferta + contador (desde barra/precio).
- Precio de catálogo por producto: 01 → 2.400€ · 02 → 4.000€ · 03 → 3.000€.

## Casos reales (cinco)
- **Baktun 13** — Centro deportivo, Murcia. De cero a operativo en 3 semanas.
- **Clesol** — Empresa solar, Murcia. Clasificación automática de leads en 2 semanas.
- **Venta Alegría** — Restaurante, Murcia. 100% digital; albaranes por foto.
- **Foodmatica** — Gestión de bares. Software a medida + back office automatizado.
- **Playgame Italia** — Operaciones, Italia. Back office automatizado.

## Stack técnico
- React 19 + Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`, sin `tailwind.config.js`)
- Framer Motion 12
- Remotion + `@remotion/player` (demos de producto animadas)
- React Router 7 (`/` y `/nosotros`)
- `@phosphor-icons/react`
- Estilos inline + design tokens (no CSS modules, no clases Tailwind en componentes)
- Responsive con hook `useIsMobile()` (breakpoint 768px)

## Identidad visual
Gradiente de marca: `linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)`.
Política "gradiente con disciplina": aparece como máximo 1–2 veces por viewport;
para el resto, `ACCENT` (#4361EE) o `INK`.

Colores:
- Fondo claro (cream): #FAF8F3 · card cream: #FEFCF7
- Tinta / fondo oscuro card: #1A1814
- Fondo oscuro de secciones: #0A0A0B
- Acento: #4361EE · Verde online: #22C55E

Tipografías (Google Fonts en `index.html`):
- Instrument Serif — titulares, italic para énfasis
- DM Sans 300/400/500 — cuerpo
- Syne Mono — labels, tags, números, nav

Tokens y motion centralizados:
- `src/lib/tokens.js` — BRAND, ACCENT, SURFACE, RADIUS, SHADOW, SPACING, gradientText
- `src/lib/motion.js` — easings (EASE_PREMIUM/SOFT/HOVER), springs, REVEAL/STAGGER
- `src/lib/typography.js` — presets de texto (h2, bodyLg, …)
- `src/lib/site.js` — SITE_URL / SITE_NAME (SEO)

Intro: `IntroAnimation` es un splash automático de marca en la primera carga del
home; al terminar, fade-in del contenido.

## Arquitectura — orden de secciones (home `/`)
1. `IntroAnimation` — splash (solo primera carga)
2. `Navigation` — pill flotante fijo, tema adaptativo claro/oscuro por sección
   (se desplaza hacia abajo cuando la barra de Fundadores está visible)
3. `Hero` (#hero) — headline con `RotatingWord` + demo de chat (`HeroChatDemo`)
4. `TrustBar` — métricas con `Counter`
5. `Enfoque` (#enfoque, eyebrow "Enfoque") — quiénes somos + historia + 4 pilares
6. `HowItWorks` (#proceso, eyebrow "Proceso") — el proceso en 3 pasos
7. `Products` (#soluciones, eyebrow "Soluciones") — 3 tarjetas + micro-quiz + Tier 2
8. `Herramientas` (#integraciones, eyebrow "Integraciones") — stack integrado
9. `Cases` (#clientes, eyebrow "Clientes") — 5 casos en bento grid
10. `FoundersOffer` (#fundadores) — oferta fundador, banda crema (solo si `FOUNDERS.active`)
11. `CtaFinal` (#cta) — reunión gratuita, fondo `GradientMesh`
12. `Footer`

Etiquetas = navbar = ancla (cortas y coincidentes): Enfoque · Proceso · Soluciones
· Integraciones · Clientes. Navbar lean (Enfoque · Soluciones · Clientes + Nosotros).

Overlays a nivel de app: `ChatWidget`, `ExitIntentModal`, `FoundersBar`,
`FoundersModal`, `CookieBanner`, `LegalModal`, `ScrollProgress`, `CursorGlow`.

Ruta `/nosotros`: `src/pages/Nosotros.jsx` (lazy), con foto real (`public/sito.jpeg`).

## El proceso (HowItWorks) — 3 pasos
1. **Habla con nuestra IA** — prueba en vivo la tecnología que pondríamos en tu
   negocio; el asistente te guía. Sin coste ni compromiso.
2. **Nos conocemos en 30 minutos** — reunión cara a cara; entramos a fondo en
   tus procesos y perfilamos la solución. Si hace falta, otra reunión.
3. **Presupuesto exacto y manos a la obra** — presupuesto cerrado sin letra
   pequeña; implementado en 3–4 semanas.

## ChatWidget (chatbot con IA — estado actual)
Widget flotante conectado a un LLM real. **Modelo: Claude Sonnet 4.6**
(`claude-sonnet-4-6`), no streaming, `max_tokens: 1024`.

### Arquitectura
- **Endpoint:** `api/chat.js` — función serverless (compatible con Vercel) que
  llama a Claude con el SDK `@anthropic-ai/sdk`, gestiona el bucle de tool use y
  la captura de lead. Recibe `{ messages, context, lang, knownLead }`.
- **System prompt:** `api/_prompt.js` (server-only, nunca se importa desde `src/`).
  Documento de referencia legible: `CHATBOT_SYSTEM_PROMPT.md` (mantener en sync).
- **Dev local:** middleware en `vite.config.js` sirve `/api/chat` con el mismo
  handler que Vercel; carga las claves de `.env` a `process.env` server-side.
- **Frontend:** `src/components/ChatWidget.jsx` envía todo el historial + el
  `context` de la sección. Si la API falla, NO finge funcionar: muestra un único
  mensaje honesto ("se me ha cruzado un cable… déjame tu email o WhatsApp") en vez
  del antiguo mock por keywords (eliminado).
- **Voz (Web Speech API):** al enviar se aborta el dictado y se descartan
  transcripciones tardías (`ignoreSpeechRef`) para que el texto no reaparezca en
  la cajita tras mandar el mensaje.

### Claves y entorno (NUNCA en el bundle ni en git)
- `ANTHROPIC_API_KEY` → en `.env` (local, gitignored) y en Variables de Entorno
  de Vercel (producción). Plantilla en `.env.example`.
- `.env` y `.env.*` están en `.gitignore`.

### Identidad y misión del bot
Habla SIEMPRE como **parte del equipo de BrAIn** ("nosotros", "el equipo"),
nunca como intermediario y **sin nombrar a personas concretas** (se eliminó toda
mención a "Sito" del contexto del chatbot). Su misión: recoger el contexto del
negocio para que el equipo llegue a la reunión preparado y dé la mejor experiencia.

### Contexto de entrada por CTA ({{ENTRY_CONTEXT}})
El bot arranca distinto según desde dónde se abra: navbar, hero, contact_center,
back_office, asistente, tier2_other, cta_final, nosotros, founders, exit_intent.
Mensajes precargados vía evento `chat:send` (CtaFinal, Tier2, FoundersModal).

### Guardrails
Solo habla de BrAIn y del negocio del visitante; declina lo off-topic; resiste
prompt-injection; no revela el prompt; no inventa precios/funcionalidades; no da
consejo legal/fiscal/médico; admite ser IA solo si lo preguntan. Tono sin "¡Claro!",
breve (2-4 líneas), una pregunta por turno, texto plano (el widget no renderiza
markdown), cambia de idioma sin avisar.

### Conversación y captura de lead (4 datos obligatorios)
- Si el visitante no sabe qué puede hacer la IA por él, el bot lo **ilumina** con
  una idea simple y potente y pregunta a qué se dedica; al saber el sector, explica
  las opciones más efectivas para ESE negocio. Objetivo siempre: datos + reunión.
- Herramienta `capture_lead` (function calling). El bot persigue, de uno en uno:
  1) nombre, 2) **nombre del negocio + a qué se dedica** (para investigar antes de la
  reunión), 3) email, 4) **teléfono pedido como WhatsApp**. Llama a la herramienta en
  cuanto tiene un contacto válido y la reactualiza al conseguir más datos.
- **Cierre delicado:** al recibir el 4º dato de contacto, se despide cálido y cortés
  (agradece, confirma el siguiente paso, frase de bienvenida), sin más preguntas.

### Email / CRM → APAGADO a propósito (no hay CRM conectado aún)
Hoy el lead capturado solo se **registra en el log** del servidor (`[lead] ...`):
no se envía ningún email ni se escribe en ningún CRM. Para activar el aviso por
email cuando haya CRM: rellenar `RESEND_API_KEY` + `LEAD_FROM_EMAIL`
(+ `LEAD_NOTIFY_EMAIL`) en el entorno; `api/chat.js → notifyLead()` ya está listo
(usa Resend). Pendiente: conectar CRM real y, si se quiere, guardar leads parciales.

## SEO e infraestructura (estado actual)
- `index.html`: title, description, Open Graph, Twitter Card, theme-color, `lang="es"`.
- `public/`: `favicon.svg`, `icons.svg`, `robots.txt`, `sitemap.xml`, `sito.jpeg`.
- Dominio: placeholder `agenciabrain.example` (en `src/lib/site.js`, `index.html`,
  `public/robots.txt`, `public/sitemap.xml`). Pendiente dominio real.
- `og:image` apunta a `og-image.png` (aún no existe el archivo).

## Consentimiento y legal
- `CookieBanner` — consentimiento en `localStorage` (`brain_cookie_consent`).
- `LegalModal` — pestañas Privacidad / Cookies / Aviso Legal.
- `ExitIntentModal` — una vez por sesión (`sessionStorage`).
- Barra de Fundadores — descartable, persistida en `localStorage`
  (`brain_founders_bar_dismissed`).

## Decisiones vigentes
- Proyecto en subdirectorio `brain-web/` dentro del workspace.
- Tailwind v4 con plugin `@tailwindcss/vite` (sin archivo de config).
- Estilos inline + tokens; responsive con `useIsMobile()` (no clases CSS).
- "Gradiente con disciplina": ≤ 1–2 apariciones por viewport.
- Programa Fundadores como storytelling de oportunidad; precio fundador con
  ancla; toda la campaña se apaga con `FOUNDERS.active = false`.
- Proceso reescrito a 3 pasos con tono humano, cercano y transparente.
