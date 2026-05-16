# BrAIn — Estado del Proyecto

Última actualización: 2026-05-16 (3)

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
  - [x] Botón "Empecemos →" eliminado de la nav — solo quedan los tres links de texto
  - [x] Hero: dos CTAs iguales en tamaño (padding 12px 28px, borderRadius 999)
  - [x] Botón "Empecemos →" con hover de gradiente multicolor y borde que desaparece
  - [x] Hover del gradiente corregido: border-radius respetado con capa absoluta + opacity
  - [x] Splash reducido al 70% de duración original (~2.2s total)
- [x] `Navigation.jsx` — adaptativa por sección: IntersectionObserver detecta #hero/#problem/#products/#cases/#cta
      y aplica tema de color (claro en hero, oscuro en el resto) con transition 0.6s ease
- [x] `Hero.jsx` — 2 col responsive, headline gradiente italic, mockup chat animado; tag "Agencia de IA" con gradiente multicolor (eliminado color verde antiguo)
- [x] `Problem.jsx` — AuroraBackground MODO A, grid 2×2 CometCards con números
- [x] `Products.jsx` — fondo #1A1814, 3 cards grandes, visuals animados por producto
  - [x] Card 01: ChatVisual con typewriter (mensajes que aparecen solos)
  - [x] Card 02: DataVisual con filas de datos + query rotante
  - [x] Card 03: IconsVisual con grid de emojis que aparecen escalonados
- [x] `Cases.jsx` — AuroraBackground MODO A, Baktun13 + Clesol, frase cita final
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

---

## 🔄 EN PROGRESO

### Web — Correcciones visuales
_(sin tareas en progreso actualmente)_

---

## 📋 PENDIENTE

### Web — Mejoras visuales
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
