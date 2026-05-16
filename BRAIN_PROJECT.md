# BrAIn — Contexto del Proyecto

## Quién es BrAIn
Agencia de inteligencia artificial española (Murcia).
Fundador: Sito (ginesmunuera@gmail.com).
Captación: email frío → link a web → conversión.
Idioma: español.

## Cliente objetivo
Dueño inversor de negocio — pequeño, mediano o grande.
Dolor principal: dependencia de personas e inconsistencia
de resultados. Quiere sistemas que funcionen solos,
siempre, sin depender de nadie.

## Filosofía de comunicación
Nunca hablar de tecnología. Siempre hablar de beneficios.
Lenguaje simple, directo, elegante.

## Catálogo de productos
- Chatbot de atención 24/7 (WhatsApp, web, voz) — héroe
- Voice bot
- Habla con tus datos (stock, reservas, CRM)
- Agentes IA / soluciones agénticas
- Automatizaciones de procesos internos
- Landing pages y webs
- Sistemas de reservas
- Soluciones IA en local (privacidad total)
- Software a medida

## Casos de uso reales
- Baktun 13 (gimnasio propio de Sito)
- Clesol (empresa de servicios)

## Stack técnico
- React + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion
- Supabase (backend leads — próximamente)
- n8n (automatización flujo leads — próximamente)

## Identidad visual
Gradiente multicolor marca:
`linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)`

Sistema de inversión:
- MODO A: aurora multicolor de fondo, texto blanco/negro
- MODO B: fondo #FAF8F3 o #1A1814, detalles en gradiente

Tipografías (Google Fonts, cargadas en index.html):
- Instrument Serif: headlines, italic para énfasis
- DM Sans 300/400/500: body
- Syne Mono: labels, tags, nav, números

Colores:
- Fondo claro: #FAF8F3
- Fondo oscuro: #1A1814
- Negro intro: #0A0A0A
- Verde online: #22C55E
- Gradiente: #4361EE → #7209B7 → #F72585 → #FB5607

## Copy intro animada (5 frases con línea de luz)
1. "Un buen negocio no depende de nadie." — 4rem, blanco
2. "Depende de sistemas." — 3rem, blanco 60%
3. "Hay tareas que no te necesitan a ti." — 3.5rem, blanco
4. "Nosotros nos encargamos." — 3rem, blanco 60%
5. "BrAIn." — 6rem italic, gradiente multicolor

## Estructura de componentes
```
src/
  components/
    IntroAnimation.jsx    — 5 frases con scroll + luz que ilumina texto
    Navigation.jsx        — navbar fija, blur al scroll, oculta links en móvil
    Hero.jsx              — 2 col: headline + chat mockup flotante
    Problem.jsx           — grid 2×2 CometCards con AuroraBackground
    Products.jsx          — 3 CometCards grandes con visuals animados
    Cases.jsx             — Baktun13 + Clesol con AuroraBackground
    CtaFinal.jsx          — aurora intensa, CTA hover gradiente
    ChatWidget.jsx        — flotante esquina inferior derecha
    CometCard.jsx         — tilt 3D (rotateX/Y) + cometa borde animado
    AuroraBackground.jsx  — 5 blobs difusos animados Framer Motion
    CustomCursor.jsx      — punto gradiente + anillo lag useSpring
  hooks/
    useIsMobile.js        — breakpoint 768px reactivo
```

## Implementación del ChatWidget
Respuestas automáticas por keywords:
- precio / coste / cuesta / cuánto / tarifa → presupuesto gratuito
- chatbot / bot / whatsapp → chatbots en 2 semanas
- voz / teléfono / llamada → voicebot 24/7
- tiempo / cuándo / semanas / rápido → 1-2 semanas operativo
- restaurante / hotel / clínica / gimnasio → experiencia en sector
- default → conectar con Sito

## Decisiones tomadas
- Proyecto en subdirectorio `brain-web/` dentro del workspace
- Tailwind v4 con plugin `@tailwindcss/vite` (no tailwind.config.js)
- Responsive con hook `useIsMobile()` en lugar de clases CSS (inline styles)
- AuroraBackground acepta props: `id`, `style`, `className`, `intense`
- CometCard: cometa usa `motion.div` con `animate` en `left`/`top` al hover
- IntroAnimation usa scroll interno (`overflow-y: scroll` en el propio div fixed)
  con `useScroll({ container: containerRef })` para detectar fin del scroll
- El overlay principal usa `opacity: 0→1` con CSS transition al completar intro
- Backend leads: Supabase + dashboard /admin (pendiente)
- ChatWidget recoge leads → Supabase (pendiente)
- Hosting: Vercel (recomendado, pendiente)
