# Sito Labs — Plan de transformación V4 (consultoría)

Tres auditorías independientes (conversión y copy · diseño visual y motion · técnica y rendimiento), sobre capturas y mediciones reales de la web actual (18 sep 2026). Pendiente de aprobación.

## 1. Diagnóstico ejecutivo

1. **Los titulares pueden leerse rotos.** El remate en cursiva de 6 titulares ("…tu ___", "Se conecta con lo que ___", "Lo que ___") depende de una animación (`WipeReveal` con clip-path, `RotatingWord` con blur) que solo dispara cuando el 60 % del bloque entra en pantalla. En scroll rápido, en móvil, en capturas y en el HTML prerenderizado que ve Google, el mensaje principal falta. **Crítico.**
2. **La web repite el mismo argumento 4-5 veces** ("si no encaja te lo decimos", "precio cerrado por escrito") y usa la misma plantilla de cabecera 7 veces. ~1.200 palabras visibles para una decisión de 30 minutos. Objetivo: −45 % de texto, de 8.400 px a ~4.800 px en escritorio y de 10.400 a ~7.000 en móvil.
3. **El primer pantallazo móvil tiene 8 elementos** antes del pliegue (eyebrow, H1, párrafo de 4 líneas, botón, 2 microcopys, teléfono, franja de negocios) y la demo del chat queda cortada debajo. La burbuja de chat flota encima de todo.
4. **La prueba real (tus negocios + tu cara) está enterrada**: 6 tarjetas apiladas, ~2.400 px en móvil, tu tarjeta la última. Es lo único que una agencia nueva puede enseñar y se ve en la tercera pantalla.
5. **Fundadores está escrito para justificarse**: párrafo defensivo de 54 palabras + 5 ventajas en formato lista de precios + barra + contador + fecha. Convierte pertenencia en cuenta atrás.
6. **Rendimiento**: 723 kB de JS (Remotion = 199 kB solo para la demo del hero), LCP móvil 2,48 s (al límite), TBT ~400 ms (rojo), CLS 0,076, y 10-19 % de CPU consumida permanentemente por animaciones que no se pausan. La animación de entrada del H1 (blur) regala ~1 s de LCP.
7. **SEO/IA incoherente**: el JSON-LD de `index.html` y `llms.txt` siguen publicando los 3 productos antiguos con precios (1.200 €, 97 €/mes), teléfono 968 25 84 19, dirección y redes sociales inexistentes. Google puede mostrar esos precios en resultados enriquecidos.
8. **Leads que se pierden**: sin Resend configurado, los leads del chat y del formulario solo van a un log y el usuario ve "Recibido".

## 2. Principios de la V4

- **Una acción, un botón, tres veces** (nav, hero, cierre) + sticky en móvil. Todo lo demás es texto.
- **Persona → prueba → camino → oferta → objeciones → cierre.** Cada scroll responde una sola pregunta.
- **Identidad intacta, capas fuera**: mismas fuentes, mismo crema/negro, mismo degradado, pero el degradado solo 3 veces (logo, palabra rotatoria, titular final), un solo negro, 4 bandas de fondo (crema/oscuro/crema/oscuro), cero tarjetas en la home salvo el dispositivo del hero.
- **El mensaje nunca depende de una animación.** Un solo patrón de reveal (opacity + 12 px), sin blur ni clip-path; una animación infinita por pantalla como máximo.
- **Presupuesto de rendimiento**: JS ≤ 380 kB raw / ~120 kB gz, LCP < 1,6 s, TBT < 150 ms, CLS < 0,02.

## 3. Layout y copy pantalla a pantalla (escritorio ~4.800 px)

### P1 · Hero — crema (100dvh)
- Sin eyebrow (el logo ya lo dice). H1 rotatorio conservado, visible desde el frame 0 (palabra 0 = "negocio", sin blur): `La IA que hace funcionar tu {gimnasio · bar · restaurante · salón de juego · empresa solar · clínica · tienda}`.
- Sub (19 palabras): `Contesta clientes, controla stock, sigue leads y hace el reporting. La usamos a diario en nuestros propios negocios.`
- `[ Agendar llamada gratis ]` (único botón; ancho completo en móvil). Microcopy 1 línea: `30 min con Ginés. Te dice qué haría la IA en tu negocio, y si no encaja, también.`
- Label: `Lo usamos en: Baktun 13 · Clesol · Foodmatica · Playgame Italia · Venta Alegría`.
- Derecha: **el chat real embebido** (no una película): primer mensaje del asistente + 3 chips ("Tengo un restaurante / una clínica / una tienda online") → conversación que termina en `open_booking`. Elimina Remotion y la burbuja flotante duplicada. En móvil, panel plegado ≤ 180 px bajo el botón.
- Se elimina del hero: "Ver plazas fundador", teléfono/WhatsApp, párrafo largo, sectores bajo cada nombre.

### P2 · Prueba — crema
- H2: `Antes que especialistas en IA, somos empresarios.` Sub: `Lo primero que automatizamos fue lo nuestro. Esto es lo que hace hoy la IA en cada negocio.`
- **Ledger editorial** (5 filas con hairline, sin tarjetas ni iconos): nombre · sector · una frase ≤ 12 palabras:
  - Baktun 13 · Gimnasio — `Toda la operativa del equipo en una sola app.`
  - Clesol · Energía solar — `CRM que clasifica leads y dice a quién llamar primero.`
  - Foodmatica · Bares — `Stock en tiempo real desde los albaranes; facturación y asesoría solas.`
  - Playgame Italia · Salones de juego — `Datos de todas las plataformas en un solo informe.`
  - Venta Alegría · Restaurante — `Asistente de reservas, en construcción. Te lo enseñamos tal cual está.`
- **Ginés** (split foto 3:4 + cita, sin tarjeta), primero en móvil tras el hero: `«Soy Ginés Munuera. La llamada la hago yo. Dirijo negocios con mis socios y fui quien metió la IA en ellos. Si en el tuyo no tiene sentido, te lo diré.»` + link `Hablar con Ginés · 30 min gratis` (abre el calendario, source `gines`).
- Link: `Nuestra historia, con los errores incluidos →`.

### P3 · Camino + logos — oscuro
- H2: `Tres pasos. El primero es gratis.` Sin sub. 3 columnas sin tarjeta, una frase por paso:
  - 01 `Llamada de 30 min con Ginés` — `Le cuentas tu negocio y te dice qué automatizaría y qué no.` (nota: No hace falta preparar nada)
  - 02 `Plan con precio cerrado, por escrito` — `Qué haremos, cuándo y cuánto. Sin costes que aparezcan después.` (nota: Decides tú)
  - 03 `Lo construimos sobre lo que ya usas` — `WhatsApp, Gmail, tu agenda o tu programa de gestión. Funcionando en pocas semanas.`
- Debajo, **cinta de 10 logos en una fila** (monocromo, color al hover), 72 px. Desaparece la sección Integraciones.

### P4 · Fundadores — oscuro (un blob estático magenta)
- H2: `Quince empresas. Las primeras. Quedan ocho.` Sub: `Con quince podemos sentarnos contigo y construirlo a tu medida. Con cien, no.`
- 3 líneas (pertenencia · acceso · co-creación): `Tu nombre, si quieres, en la lista de empresas fundadoras.` · `Hablas con quien lo construye. Hoy y cuando algo cambie.` · `Lo que pidas tú, lo tendrán los demás después. Y a precio fundador.`
- `[ Agendar llamada gratis ]` + nota `La plaza no se decide en la llamada. Se decide después, con el plan delante.`
- Fuera: párrafo defensivo, las 5 etiquetas, barra de progreso, "7 ya dentro", fecha de actualización, y "Quedan 8 plazas" del modal.

### P5 · Objeciones — crema, 2 columnas (título sticky + acordeón)
- Izquierda: `Lo que querrías preguntarnos.` + 3 líneas de "no hacemos" (chatbot genérico · sustituir al equipo · decir que sí a todo).
- Derecha, 5 FAQ (respuesta ≤ 30 palabras): ¿Funciona de verdad? · Ya probé un chatbot y fue un desastre · ¿Y si se equivoca o sustituye a mi equipo? · ¿Cuánto cuesta? · ¿Y mis datos? ¿Y si no sé de tecnología?
- Sin botón ni enlace aquí. Particulares pasa a ser una respuesta dentro de la FAQ de "¿Cuánto cuesta?": `¿Eres particular? Cuéntanos tu idea →`.

### P6 · Cierre — oscuro (2 radiales estáticos)
- `Treinta minutos. Y un plan concreto.` (único degradado de sección). Sub: `Nos cuentas tu negocio. Te decimos qué haría la IA y, si encaja, te llega un plan con precio cerrado.`
- `[ Agendar llamada gratis ]` + una sola alternativa en mono: `641 310 956 · WhatsApp`.

### P7 · Footer — una fila
`sitolabs. · Murcia · hello@sitolabs.com · Aviso legal · Privacidad · Cookies · Nuestra historia →`. Sin columna "Navega", sin cuarto botón.

### Móvil
- Todo alineado a la izquierda. Nav: logo + CTA compacto (sin hamburguesa; "Nosotros" vive en el footer).
- **Sticky CTA** inferior (64 px + safe-area) que aparece cuando el botón del hero sale del viewport y desaparece al llegar al cierre: `[ Agendar llamada gratis ]` + icono WhatsApp. Sustituye a la burbuja de chat en móvil.
- Orden: hero → Ginés → ledger (5 filas de 2 líneas) → 3 pasos numerados → logos → Fundadores → FAQ → cierre → footer.

## 4. Momentos de verdad (donde se gana o pierde la reserva)

| # | Momento | Estado objetivo |
|---|---|---|
| 1 | Primer pantallazo móvil | H1 completo · sub 3 líneas · botón ancho · 1 microcopy · borde del chat. Nada más. |
| 2 | Tarjeta de Ginés | Primera cosa tras "somos empresarios"; en móvil, justo tras el hero. Con su propio link al calendario. |
| 3 | Modal de Cal.com | Skeleton "Cargando el calendario de Ginés…" (hoy 1-3 s en blanco). Sub: `Te atiende Ginés Munuera. La invitación te llega al email al momento.` Sin "Quedan 8 plazas" ni aviso de datos. Fallback WhatsApp/email se mantiene. |
| 4 | **Post-reserva** (hoy no existe) | Escuchar `bookingSuccessful` del embed y sustituir el iframe por: `Hecho. Ginés te llama el {día} a las {hora}.` + `No prepares nada: solo ten a mano qué te quita más tiempo.` + link WhatsApp con prefill `Hola Ginés, acabo de reservar para el {día}. Mi negocio es…`. Reduce no-shows y da contexto. Evento `booking_success`. |
| 5 | Chat | Saludo: `Soy el asistente de Sito Labs, el mismo que instalamos en los negocios de nuestros clientes. ¿A qué se dedica el tuyo?`. Tras `open_booking`, el chat se minimiza (no cierra) con línea `Calendario abierto arriba. Aquí sigo si te surge algo.` |

## 5. Sistema de diseño depurado

- **Tipografía (5 tamaños, cero inline):** display `clamp(2.75rem,5.2vw,4.5rem)` (solo H1 y titular final) · h2 `clamp(2rem,3.4vw,3rem)` · h3 `1.375rem` · body DM Sans **400** 17 px/1.6 (el 300 solo en el sub del hero a 20 px) · label Syne Mono 12 px (nada por debajo de 12 px; hoy hay mono a 9-10 px).
- **Espaciado:** sección `py 8rem`/`5rem` móvil, una sola constante. Cabecera→contenido `3.5rem`. Columna de texto `60ch` alineada al borde izquierdo del contenedor de 1180 (hoy hay 5 anchos distintos: 760/820/880/900/1000 centrados, lo que produce el efecto "desplazado").
- **Color:** un negro `#0A0A0B` (superficie elevada `#111114`), tinta `#1A1814` solo para texto sobre crema; botón sólido `#0A0A0B`. Degradado en 3 sitios; hover de botones = `translateY(-1px)` + sombra, no degradado. `ACCENT` azul como único color funcional.
- **Componentes:** `SpotlightCard` solo en /nosotros y contenedor del chat (sin spotlight). Eyebrow siempre "pill" (hoy mezcla pill/minimal). Iconos Phosphor `weight="light"`, sin cajas tintadas de 46 px. `SectorIcon` fuera.

## 6. Motion: "un gesto, tres velocidades"

```js
EASE = [0.32, 0.72, 0, 1]
REVEAL = { initial:{opacity:0,y:12}, whileInView:{opacity:1,y:0}, viewport:{once:true, margin:'0px 0px -10% 0px'}, transition:{duration:0.5} }
DUR = { fast:0.2, base:0.5, slow:0.8 }
```
- Un reveal por bloque (no por elemento), stagger 60 ms máx. 6 hijos. Solo `transform` y `opacity`.
- **Eliminar:** `WipeReveal`, `CometCard` (tilt + canvas), `CursorGlow`, `ScrollProgress`, `GradientMesh`, grano SVG, float infinito del hero, raíl animado del proceso, "amaneceres", `SectionBridge`, `SplitText`, `IntroAnimation`, `src/remotion/*` de la home y las 3 dependencias de Remotion.
- `AuroraBackground` → div con 2 `radial-gradient` estáticos. Marquee CSS se mantiene (1 fila). Magnetic solo en el CTA del hero en escritorio. `RotatingWord` sin blur (máscara vertical) y con `aria-hidden` + texto sr-only.
- `LazyMotion` + `m` (`domAnimation`): framer de 142 kB a ~40 kB. `MotionConfig reducedMotion="user"`. Pausar cualquier animación fuera del viewport.

## 7. Técnica: rendimiento, SEO, medición, backend

**Rendimiento (a CWV verdes):** quitar Remotion (−199 kB, −150-250 ms TBT) · sin fade/blur en H1 y párrafo del hero (−0,8-1 s LCP) · fuentes autoalojadas con preload y `size-adjust` (−300-500 ms móvil, CLS → 0) · lazy de ChatWidget/BookingModal/ParticularesForm/LegalModal/CookieBanner (−30 kB gz) · `sito2.jpg` 218 kB → WebP 400/800 con srcset (−190 kB) · `content-visibility: auto` en secciones · caché immutable en `/assets` y `/fonts`.

**SEO/IA (bloqueante antes del dominio):** reescribir JSON-LD de `index.html` (FAQPage con las FAQ reales, sin `hasOfferCatalog` de productos antiguos, sin `priceRange`, teléfono `+34641310956`, sin dirección/horario/redes no verificables, `logo.png` 512) · title/description nuevos (fuera "Resultados en menos de 30 días") · canonical y OG por ruta (/nosotros hoy sale como duplicado de la home) · `llms.txt` sin precios ni productos antiguos, con Fundadores, la llamada y las FAQ · sitemap con `lastmod` de build · prerender con reduced-motion, sin banner de cookies y `hydrateRoot` en vez de `createRoot` · retirar `/preview-animaciones`.

**Medición (una conversión):** Vercel Web Analytics (o Plausible), cookieless, activado solo con consentimiento `analytics: true`. Un helper `track()` y 6 eventos: `cta_click{source}` en `openBooking`, `booking_success{source}` escuchando `postMessage` de Cal.com, `whatsapp_click`, `particulares_submit`, `chat_open`, `chat_to_booking`. Embudo: cta_click → booking_success por origen.

**Backend:** Resend configurado con dominio verificado (SPF/DKIM/DMARC) y `LEAD_NOTIFY_EMAIL` como variable; mientras no esté, el formulario no debe decir "Recibido" · rate limit + origen también en `api/particular.js` (extraer `_guard.js`) · validar `knownLead`/`context`/`lang` (hoy inyectables en el prompt) · timeout 30 s y prompt caching en Anthropic (−80 % coste de entrada) · WAF rate limit en `/api/chat` · `vercel.json` con rewrite SPA, cabeceras de seguridad, CSP (`frame-src cal.com`) · servir `/api/particular` en dev.

**Accesibilidad (10 puntos):** focus trap y foco inicial en los 3 modales y el chat · `role="dialog"`/`aria-label` en LegalModal y chat · toggle de cookies como `switch` · contrastes ≥ 4,5:1 (hoy 0,42-0,5 sobre crema) · targets ≥ 24 px en footer/enlaces · reduced-motion también en framer · `RotatingWord` legible ("restauranteclínica" hoy) · ids duplicados (`faq`, gradientes SVG) · `<a href="#id">` + `<header>` + skip-link · `forced-colors` para el texto en degradado.

## 8. Plan de ejecución (3 sprints)

**Sprint 1 · Bloqueantes y quick wins (2 días) — publicable solo**
1. Titulares siempre visibles: borrar `WipeReveal`, `RotatingWord` sin blur/retardo. *(crítico)*
2. Hero sin fade/blur en H1 y párrafo; hero móvil con 4 elementos; sticky CTA móvil; burbuja de chat oculta en móvil.
3. Borrar `GradientMesh`, `CursorGlow`, `ScrollProgress`, `CometCard`, grano; auroras estáticas.
4. JSON-LD, title/description, `llms.txt`, sitemap, robots coherentes con la web.
5. `vercel.json` (rewrite, caché, cabeceras), Resend + variables, formulario honesto sin Resend.
6. Post-reserva propio + skeleton del modal + analítica con `track()`.

**Sprint 2 · Estructura y copy V4 (3 días)**
7. Fundadores reescrito (3 líneas de pertenencia, sin barra/contador/fecha).
8. Ledger de 5 negocios + Ginés en split; Ginés primero en móvil.
9. Proceso en 3 columnas de una frase + cinta de 10 logos; desaparece Integraciones.
10. FAQ a 2 columnas, 5 preguntas, "no hacemos" en 3 líneas; sin botón ni enlaces.
11. Cierre con una sola alternativa; footer de una fila; nav de 2 enlaces + CTA.
12. Sistema tipográfico de 5 tamaños, un negro, degradado en 3 sitios, bandas crema/oscuro/crema/oscuro.

**Sprint 3 · Producto y rendimiento (3-4 días)**
13. Chat real embebido en el hero (modo inline del `ChatWidget`) y salida de Remotion.
14. `LazyMotion` + `m`, un solo reveal, `MotionConfig reducedMotion`, pausa fuera de viewport.
15. Fuentes autoalojadas, imágenes WebP, lazy de modales/chat, `content-visibility`, `hydrateRoot`.
16. Accesibilidad (10 puntos) y backend (guard, validación, caching, WAF).
17. Presupuesto de rendimiento en el build (falla si JS > 380 kB o hay `filter` animado).

## 9. Decisiones que necesito de Ginés

| # | Decisión | Recomendación |
|---|---|---|
| 1 | Hero derecha: chat real embebido (A) o animación ligera CSS (B) | A (es el producto; B si hay prisa) |
| 2 | Fundadores sin barra ni contador, solo "Quedan ocho" en el titular | Sí |
| 3 | Quitar hamburguesa en móvil (Nosotros al footer) | Sí |
| 4 | FAQ de 7 a 5 y "Lo que no hacemos" de sección a 3 líneas | Sí |
| 5 | Body a peso 400 (menos "fino", más legible) | Sí |
| 6 | Analítica: Vercel Web Analytics o Plausible | Vercel (ya estás en Vercel, 1 kB) |
| 7 | Resend con `leads@sitolabs.com` (requiere DNS) | Antes de publicar |
| 8 | Dirección física en JSON-LD y aviso legal | Quitar hasta constituir la empresa |

## 10. Métricas de éxito (4 semanas tras publicar)
- % de visitas móviles que ven a Ginés ≥ 60 % (hoy queda a ~2.400 px).
- `cta_click → booking_success` ≥ 50 % con el estado post-reserva.
- LCP móvil < 1,6 s · TBT < 150 ms · CLS < 0,02 · JS ≤ 120 kB gz.
- Altura: ≤ 4.800 px escritorio, ≤ 7.000 px móvil; texto visible ≤ 650 palabras.

---
## Estado de ejecución (18 sep 2026)
**Hecho:** Sprint 1 completo (titulares sin dependencia de animación, hero limpio, sticky CTA móvil, efectos eliminados, JSON-LD/llms/sitemap/robots, vercel.json, post-reserva y skeleton del modal). Sprint 2 completo (Fundadores, ledger + Ginés, proceso 3 columnas + logos, FAQ 5 a 2 columnas, cierre, footer, nav sin hamburguesa, tipografía y bandas). Sprint 3 parcial: chat real embebido en el hero (Remotion eliminado), lazy de modales/chat, MotionConfig reduced-motion, imagen 400/800, foco en modal, aria en chat/nav.
**Pendiente:** fuentes autoalojadas · LazyMotion (`m`) · analítica (Ginés: más adelante) · Resend (Ginés: antes de publicar) · rate limit en /api/particular y validación de knownLead · hydrateRoot + prerender con reduced-motion · razón social/NIF en aviso legal.
**Medidas:** JS 723 → 451 kB raw (index 157 → 90; Remotion −199); altura 8.368 → ~6.200 px escritorio, 10.404 → ~6.600 px móvil.
