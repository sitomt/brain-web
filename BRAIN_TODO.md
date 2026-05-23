# BrAIn — Estado del Proyecto

Última actualización: 2026-05-22 (noche)

---

## ✅ COMPLETADO

### Setup técnico
- [x] Proyecto React + Vite scaffoldeado en `brain-web/`
- [x] Tailwind CSS v4 configurado con `@tailwindcss/vite`
- [x] Framer Motion instalado
- [x] Google Fonts en `index.html`: Instrument Serif, DM Sans, Syne Mono
- [x] CSS global con variables `--brain-gradient`, `--font-serif/sans/mono`
- [x] Hook `useIsMobile(breakpoint=768)` para responsive reactivo
- [x] `.claude/launch.json` configurado para preview

### Componentes — Web base
- [x] `AuroraBackground.jsx` — 5 blobs animados, props `id/style/className/intense`
- [x] `CometCard.jsx` — tilt 3D con `rotateX/Y` + cometa dibujado en canvas (sigue el borde exactamente, sin portal frágil)
- [x] `CustomCursor.jsx` — punto gradiente + anillo con lag `useSpring`
- [x] `IntroAnimation.jsx` — reescritura completa con arquitectura wheel-driven:
  - [x] 5 frases con 3 estados: latente (6% opacidad), revelándose, leído
  - [x] Línea guía sutil (4% blanco) en estado latente por frase
  - [x] F1 y F3: palabra por palabra con fadeUp staggered (0.12s delay entre palabras)
  - [x] F3: pausa dramática extra 0.3s antes de "a ti."
  - [x] F2 y F4: fade simple 0.4s — susurros visuales
  - [x] F2: alineada a la derecha con margen 12% (centrada en móvil)
  - [x] F4: alineada a la izquierda con margen 12% (centrada en móvil)
  - [x] BrAIn con 4 fases: aparición (scale 0.92→1) → ignición gradiente (fade overlay) → explosión partículas → pulso infinito
  - [x] 12 partículas circulares con posiciones aleatorias estables (módulo), colores del gradiente
  - [x] Aurora sutil de fondo (opacity 0.06) con blobs 640-760px, ciclos 43-61s
  - [x] Aurora se intensifica (opacity 0.2) durante la explosión de partículas y vuelve a 0.06
  - [x] "scroll para entrar →" en Syne Mono pulsante en fase D
  - [x] Responsive: tamaños reducidos en móvil, alineaciones centradas en F2/F4
  - [x] Completion callback al llegar a 97% del scroll
  - [x] Navegación wheel/teclado/swipe — sin useScroll ni overflow:scroll
  - [x] Body scroll bloqueado durante la intro, restaurado al completar
  - [x] AnimatePresence mode="wait" con enter (opacity+y) y exit diferenciados
  - [x] F1 y F3: word-by-word stagger (0.08s), F3 "a ti." con delay 0.4s + scale 0.85→1
  - [x] F2: fade + underline gradiente que crece desde la izquierda (delay 0.95s)
  - [x] F4: fade + punto circular gradiente (delay 0.95s)
  - [x] F5 BrAIn: 5 pasos auto — aparición (scale 0.92→1) → ignición gradiente (rAF backgroundPosition) → partículas → pulso → hint "continuar →"
  - [x] 12 partículas con posiciones aleatorias estables (módulo)
  - [x] Blobs aurora en CSS puro (@keyframes floatBlob en index.css) para rendimiento
  - [x] Indicador de progreso lateral (5 puntos, activo 8px / inactivo 4px)
  - [x] Responsive: F2/F4 centradas en móvil, dots abajo en móvil
  - [x] Sistema visual uniforme frases 1-4: misma tipografía, tamaño clamp(2.8rem,5vw,4.5rem), centradas, padding 2rem/8rem
  - [x] F1/F3 blanco 100% normal, F2/F4 rgba(255,255,255,0.45) italic — única variación
  - [x] Indicador de scroll en frase 0: "SCROLL PARA AVANZAR" + botón SALTAR + flecha animada (fade in delay 1.2s)
  - [x] BrAIn: fontSize aumentado a clamp(7rem,16vw,14rem)
  - [x] BrAIn: flash blanco sutil al montar (opacity 0→0.04→0, 0.3s)
  - [x] BrAIn: glow detrás del texto al llegar a step 2 (blur 60px, opacity 0.6)
  - [x] BrAIn: partículas con rotación aleatoria ±180°, dispersión x ±600px
  - [x] Intro simplificada a splash screen automático (~3.5s sin input del usuario)
  - [x] Eliminadas las 4 frases de scroll — la intro es solo BrAIn con su animación
  - [x] Timing automático: aparición blanca → gradiente → partículas → glow → pulso → fade out
  - [x] Fade in suave de la web tras el splash (motion.div, 0.8s, easeOut)
  - [x] Nav simplificada: links Soluciones / Casos / Nosotros con scroll suave, botón "Empecemos →"
  - [x] Hero CTAs: "Ver soluciones ↓" (scroll a #products) + "Empecemos →" (abre chat)
  - [x] IDs de sección correctos en App.jsx: #hero, #problem, #products, #cases, #cta
  - [x] Botón "Empecemos →" restaurado en la nav — a la derecha de los tres links
  - [x] Hero: dos CTAs iguales en tamaño (padding 12px 28px, borderRadius 999)
  - [x] Botón "Empecemos →" con hover de gradiente multicolor y borde que desaparece
  - [x] Hover del gradiente corregido: border-radius respetado con capa absoluta + opacity
  - [x] Splash reducido al 70% de duración original (~2.2s total)
- [x] `Navigation.jsx` — adaptativa por sección: IntersectionObserver detecta #hero/#problem/#products/#cases/#cta
      y aplica tema de color (claro en hero, oscuro en el resto) con transition 0.6s ease
  - [x] Botón "Empecemos →" en nav: mismo estilo exacto que Hero.jsx (capa gradiente interior, hover opacity 0→1, borde desaparece en hover)
  - [x] Color adaptativo: hero → borde/texto #1A1814; secciones oscuras → borde rgba(255,255,255,0.8), texto blanco
  - [x] Al pulsar: llama a onChatOpen (misma prop que ya recibía Navigation)
- [x] `Hero.jsx` — 2 col responsive, headline gradiente italic, mockup chat animado; tag "Agencia de IA" con gradiente multicolor (eliminado color verde antiguo)
  - [x] Subtexto actualizado: 3 líneas independientes con fadeUp, tercera línea con gradiente multicolor ("Más negocio con los mismos recursos.")
- [x] `Problem.jsx` — AuroraBackground MODO A, grid 2×2 CometCards con números
  - [x] Headline rediseñado: dos líneas — "Tu negocio funciona." (blanco) + "Imagina que funcionara solo." (italic gradiente)
  - [x] Tag "— El problema" en Syne Mono blanco 35%, mismo estilo que Products.jsx
  - [x] Copy de 4 cards completamente reescrito (escenarios concretos: 23:47, teléfono, dependencia, datos)
  - [x] Estética alineada con Products: rgba(255,255,255,0.04) bg, blur(12px), border 0.08, borderRadius 20
  - [x] Número pequeño Syne Mono con gradiente multicolor (eliminados los números grandes en púrpura)
  - [x] Grid 2×1 desktop / 1×1 móvil con gap 1.25rem
  - [x] whileInView con stagger 0.1s por card, amount 0.2
  - [x] Remate: frase italic blanco 55% + CTA "Para eso estamos nosotros. →" con gradiente, scroll a #products
  - [x] 4 vídeos Remotion como fondo de cada card (Problem1_Clock, Problem2_Calls, Problem3_Flow, Problem4_Data)
  - [x] Texto de cards eliminado — título y descripción desaparecen del JSX (el vídeo los comunica)
  - [x] Vídeo ocupa 100% de cada card (position absolute, inset 0, cover scaling)
  - [x] Solo el número (01/02/03/04) permanece sobre el vídeo (position absolute, top 16, left 20, zIndex 2)
  - [x] Lazy loading con IntersectionObserver (threshold 20%) + ResizeObserver para cover scaling
  - [x] Player: 210 frames, 30fps, 600×340, autoPlay loop, sin controles, sin overlay
  - [x] `src/remotion/Problem1_Clock.jsx` — reloj 23:47→48→49, colón parpadeante, burbuja WhatsApp, "Sin respuesta."
  - [x] `src/remotion/Problem2_Calls.jsx` — contador 44→52, 3 burbujas en loop, "68% preguntan siempre lo mismo."
  - [x] `src/remotion/Problem3_Flow.jsx` — diagrama SVG de nodos, nodo central desaparece, "Sin esa persona, nada funciona."
  - [x] `src/remotion/Problem4_Data.jsx` — tabla de datos, cursor SVG errante, pregunta italic, "..." en rojo
- [x] `Products.jsx` — rediseño completo Tier 1 + Tier 2 con Remotion Player
  - [x] Header con tag Syne Mono "— Lo que hacemos" y headline Instrument Serif
  - [x] Card 01: Contact Center IA 24/7 — layout 55/45, logos de conectores (WhatsApp/IG/Telegram/Web/Voz), ChatbotDemo
  - [x] Card 02: Habla con tus Datos — tags de sector, DataQueryDemo
  - [x] Card 03: Agentes IA — tags de sector, AgentDemo
  - [x] Tier 2: pills de "Más soluciones" + CTA "Exploremos juntos →" conectado al ChatWidget
  - [x] `@remotion/player` y `remotion` instalados
  - [x] `src/remotion/ChatbotDemo.jsx` — extendido a 10s (300 frames): 2 intercambios completos, hook 23:47 (pérdida nocturna), respuesta con knowledge base sin gluten + oferta proactiva WhatsApp
  - [x] `src/remotion/DataQueryDemo.jsx` — extendido a 10s: preguntas de decisión de negocio (facturación semana + márgenes), barras Premium/Estándar con animación, insight ROI "+3.200€/mes" al final
  - [x] `src/remotion/AgentDemo.jsx` — extendido a 10s: escenario concreto (María G., Clínica Dental), 5 nodos renombrados (EMAIL→AGENTE→CRM→PROPUESTA→SEGUIMIENTO), header de contexto, badge "14 segundos · Sin intervención humana"
  - [x] `Products.jsx` — `durationInFrames` actualizado de 180 a 300 en todos los Players
  - [x] `onChatOpen` prop pasado desde App.jsx a Products.jsx
  - [x] Cards: layout grid 1fr/1fr, gap 0, overflow hidden, minHeight 380px — vídeo flush sin padding
  - [x] Columna vídeo: position relative, LazyVideoColumn con IntersectionObserver (threshold 30%)
  - [x] Player renderiza solo cuando card entra en viewport; skeleton pulsante antes de activarse
  - [x] Player: autoPlay, loop, controls=false, clickToPlay=false, initiallyMuted
  - [x] AgentDemo: contenido reencuadrado y visible dentro de los límites del Player
        (`minHeight` subido de 280→380 desktop / 200→280 mobile para reducir cover-crop vertical)
  - [x] AgentDemo: layout de 3 zonas con alturas fijas (Zone1 72px / Zone2 flex:1 / Zone3 44px)
        — Eliminadas superposiciones de elementos entre zonas
        — Badge badge fijado en Zone3 con marginTop:8, igual margen arriba/abajo
        — Márgenes y espaciado corregidos; posicionamiento absoluto en % del área Z2 (592×308)
- [x] `Cases.jsx` — AuroraBackground MODO A, Baktun13 + Clesol, frase cita final
- [x] **v3.2 — Refactor visual completo (2026-05-22)**
  - [x] `Hero.jsx` — subtítulo a 2 líneas ("Tu negocio, trabajando. Tú, dirigiendo." + gradiente); trust line Syne Mono debajo de CTAs
  - [x] `Problem.jsx` — layout vertical (texto izq + vídeo der, no grid 2×2); eyebrow "El coste invisible"; H2 nuevo 3 líneas; copy expandido con párrafos; remate 3 líneas
  - [x] `Products.jsx` — nuevo orden (Contact Center → Back Office IA → Asistente IA); precios en gradiente; expand/collapse AnimatePresence (1 abierto a la vez); ExpandedContent separado; datos en PRODUCTS array; Tier2Block copy actualizado; Back Office IA como producto nuevo con AgentDemo
  - [x] `Products.jsx` — rediseño visual completo (2026-05-22 tarde): card rgba(255,255,255,0.03)/border 0.07/borderRadius 24px; padding 3rem desktop; tipografía jerarquizada (num 0.75rem/name clamp(1.8-2.4rem)/tagline clamp(1-1.2rem)/desc 0.9rem); PriceBadge con borde gradiente real (wrapper 1px); ExpandButton con chevron rotatorio 180°; ExpandedContent height:0→auto + separador gradiente + dots circulares gradiente; gap 1.5rem entre cards
  - [x] `Products.jsx` — efecto flip 3D CSS (2026-05-22 noche): perspective 1200px en wrapper; transform rotateY 0→180deg con cubic-bezier(0.4,0.2,0.2,1) 0.7s; backfaceVisibility hidden en ambas caras; cara frontal con FlipButton (↻ + stopPropagation); cara trasera `CardBack` con bullets en grid 2 col desktop / 1 col mobile, separador gradiente, dots gradiente, botón "← Volver" (stopPropagation); LazyVideoColumn con prop `isActive` para pausar Player al flipear; `flippedIndex` en Products (solo 1 card flippeada a la vez); minHeight 420px desktop / 600px mobile
  - [x] `Products.jsx` — cara frontal simplificada al mínimo: solo nombre + tagline + desc + botón "Ver precios →"; el número/tags/precio/connectors movidos a cara trasera; cara trasera con precio prominente (badge gradiente border) + bullets 2 col + closing line + footer row con "← Volver" y "Hablamos →" (llama a onChatOpen); onClick del flip SOLO en el botón (no en toda la card); minHeight 480px desktop / 620px mobile; onChatOpen propagado Products → Tier1Card → CardBack
  - [x] `Cases.jsx` — 3 casos (Baktun13, Clesol, Venta Alegría); grid 3 col desktop; placeholder "VA" circular gradiente para Venta Alegría; H2 2 líneas con gradiente; remate narrativo nuevo
- [x] `CtaFinal.jsx` — botón corregido: borderRadius 4px, fontWeight 500, borde blanco sólido,
      al pulsar abre chat y dispara automáticamente "Hola. Quiero agendar una reunión."
- [x] `CometCard.jsx` — cometa movido a portal (createPortal → body), overlay position:fixed
      con coordenadas de getBoundingClientRect(), overflow:hidden eliminado del card
- [x] `ChatWidget.jsx` — flotante fixed, borde gradiente girando, panel blanco
  - [x] Respuestas automáticas por 5 grupos de keywords + default
  - [x] Animación dots "escribiendo..." antes de respuesta
  - [x] Auto-scroll al último mensaje

### App.jsx
- [x] Orden correcto: CustomCursor → IntroAnimation → Nav → main → ChatWidget
- [x] Estado `introComplete` controla fade-in del contenido principal
- [x] Estado `chatOpen` compartido entre CTA, Hero y ChatWidget
- [x] React Router configurado con rutas `/` (landing) y `/nosotros`
- [x] Navigation y ChatWidget accesibles desde ambas rutas (nivel app)

### CTAs y conversión
- [x] CTAs unificados: solo "Empecemos →" (nav) y "Agenda tu diagnóstico gratuito" (CtaFinal)
- [x] CTA intermedio eliminado de Problem.jsx ("Para eso estamos nosotros. →")
- [x] CTA intermedio eliminado de Products.jsx ("Exploremos juntos →")
- [x] CtaFinal: botón renombrado y mensaje actualizado a "Hola. Quiero agendar un diagnóstico gratuito."

### Página Nosotros
- [x] `src/pages/Nosotros.jsx` creada con contenido completo
- [x] Hero dos columnas: headline + foto placeholder (3:4, listo para imagen real)
- [x] 4 bloques de contenido: Por qué existe BrAIn / Quién hay detrás / Cómo trabajamos / Cómo empezamos
- [x] CTA Final reutilizado con mismo botón y mensaje
- [x] Footer simple: br[AI]n · Murcia, España · 2025
- [x] Navigation: link "Nosotros" → /nosotros (tema oscuro forzado fuera de home)

### Correcciones visuales
- [x] Bug rectángulos en Problem corregido — `AuroraBackground`: `opacity` reducida (0.35→0.12 normal, 0.6→0.35 intense), `blur` unificado a 120px; todos los blobs conservan `borderRadius:'50%'`
- [x] Auditoría visual completa — Hero, Products, Cases, CtaFinal, AuroraBackground, CometCard: sin debug divs, sin borders/backgrounds erróneos
- [x] CometCard `handleMouseLeave` corregido: cancela `animationRef` y limpia canvas de forma limpia al salir del hover

---

## 🔄 EN PROGRESO

### Web — Correcciones visuales
_(sin tareas en progreso actualmente)_

---

## 📋 PENDIENTE

### Web — Mejoras visuales
- [ ] Foto real de Sito para /nosotros (sustituir placeholder en `src/pages/Nosotros.jsx`)
- [ ] Revisar meta tags y SEO de /nosotros (title, og:image, description)
- [ ] Revisar rendimiento de Remotion Player en móvil (ya tiene lazy-load; valorar fallback estático si sigue lento)
- [ ] Añadir más conectores a Card 1 cuando se integren nuevos canales
- [ ] Vídeos adicionales Remotion para las soluciones del Tier 2
- [ ] Considerar guardar en localStorage si el usuario ya vio el splash para no
      repetirlo en visitas sucesivas (mostrar solo en primera visita)
- [ ] Sección Nosotros con id="nosotros" (contenido pendiente de decisión)
- [ ] Página about completa
- [ ] Revisar timing general del splash en dispositivos lentos (móvil)
- [ ] Mobile: revisar secciones Problem y Cases en pantallas < 480px
- [ ] Optimización aurora en móvil (reducir blobs o blur en dispositivos lentos)
- [ ] Añadir `favicon.svg` propio con el logo de BrAIn
- [ ] Footer mínimo con links legales y contacto
- [ ] Añadir sección "Nosotros / Sobre Sito" (pendiente de decisión de contenido)

### Backend — Leads
- [ ] Crear proyecto en Supabase
- [ ] Crear tabla `leads` con campos:
      `id, email, nombre, sector, empresa_tamaño, dolor_principal, estado, created_at`
- [ ] Conectar ChatWidget con Supabase: guardar lead al recoger email
- [ ] Añadir recogida de email en flujo del ChatWidget
      (tras 2-3 mensajes, preguntar email para "que Sito te contacte")
- [ ] Clasificación automática de leads por sector
- [ ] Dashboard `/admin` en React protegido con contraseña
      para ver y gestionar leads (tabla, filtros, export CSV)

### Automatización — n8n
- [ ] Conectar n8n a Supabase para trigger en nuevo lead
- [ ] Email automático de bienvenida al lead tras conversación
- [ ] Notificación a Sito por email/WhatsApp al entrar lead nuevo

### Chatbot web
- [ ] Mejorar respuestas automáticas con más variedad
- [ ] Flujo de recogida de datos en conversación:
      sector → dolor → email → cierre
- [ ] Conectar con API real (OpenAI / Claude) para respuestas dinámicas

### Contenido
- [ ] Fotos/imágenes reales para casos Baktun13 y Clesol
- [ ] Métricas reales para cards de resultados (ej: "X% menos llamadas")
- [ ] Copy final revisado y aprobado por Sito
- [ ] Testimonios o quotes de clientes

### Infraestructura
- [ ] Dominio propio (brain-agencia.com o similar)
- [ ] Deploy en Vercel (conectar repo GitHub)
- [ ] Variables de entorno para Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
- [ ] Analytics (Plausible o Umami — privacy-first)
- [ ] SEO: meta tags, `og:image`, `sitemap.xml`, `robots.txt`

### Estrategia captación
- [ ] Escribir secuencias de emails fríos por sector
      (restaurantes, clínicas, concesionarios, gimnasios)
- [ ] Tracking UTM en URLs por campaña
- [ ] Landing pages específicas por sector con copy adaptado

---

## 📌 INSTRUCCIONES PARA CLAUDE

Lee siempre `BRAIN_PROJECT.md` + este archivo al inicio de cada sesión.

Cada vez que hagas un cambio en el proyecto:
1. Marca como `[x]` las tareas completadas en ✅
2. Mueve tareas de 📋 a 🔄 cuando estén en progreso
3. Mueve tareas de 🔄 a ✅ cuando estén terminadas
4. Añade tareas nuevas que el usuario pida en 📋
5. Actualiza la fecha de "Última actualización"
6. Si hay decisiones nuevas importantes (arquitectura, stack, copy aprobado),
   añádelas a `BRAIN_PROJECT.md` en "Decisiones tomadas"

Estos dos archivos son la memoria del proyecto.
