# BrAIn — Estado del Proyecto

Última actualización: 2026-06-08

---

## ✅ HECHO (estado actual de la web)

### Estructura y secciones
- [x] Home completa: Hero, TrustBar, Enfoque, Herramientas, HowItWorks (proceso),
      Products, Cases, CtaFinal, Footer
- [x] `IntroAnimation` — splash automático de marca en la primera carga
- [x] `Navigation` — pill flotante con tema adaptativo por sección; se desplaza
      cuando la barra de Fundadores está visible
- [x] Página `/nosotros` (lazy) con foto real de Sito (`public/sito.jpeg`)

### Contenido y producto
- [x] Tres productos con precios, beneficios, detalle expandible y demo Remotion
      (Atención al Cliente, Operaciones, Inteligencia de Negocio)
- [x] Micro-quiz "¿Por dónde empezar?" + bloque Tier 2 (a medida)
- [x] Cinco casos reales (Baktun 13, Clesol, Venta Alegría, Foodmatica, Playgame Italia)
- [x] El proceso reescrito en 3 pasos (tono humano, cercano, transparente)
- [x] Hero con `RotatingWord` + demo de chat

### Programa Fundadores
- [x] Config única en `src/lib/founders.js` (apagable con `active: false`)
- [x] Barra superior (`FoundersBar`) + modal (`FoundersModal`)
- [x] Precio fundador con ancla (catálogo tachado) en las tarjetas de Products
- [x] Greeting `founders` en el ChatWidget + mensaje precargado vía `chat:send`

### Conversión y overlays
- [x] `ChatWidget` con respuestas por keywords y saludos por contexto
- [x] `ExitIntentModal` (una vez por sesión)
- [x] `CookieBanner` + `LegalModal` (privacidad / cookies / aviso legal)
- [x] `ScrollProgress`, `CursorGlow`

### SEO base
- [x] Meta tags en `index.html` (title, description, OG, Twitter, theme-color)
- [x] `favicon.svg`, `icons.svg`, `robots.txt`, `sitemap.xml` en `public/`

---

## 📋 PENDIENTE

### Lanzamiento
- [ ] Crear `og-image.png` real (referenciado en `index.html`, aún no existe el archivo)
- [ ] Dominio real: reemplazar `agenciabrain.example` en `src/lib/site.js`,
      `index.html`, `public/robots.txt` y `public/sitemap.xml`
- [ ] Deploy en Vercel
- [ ] Analytics privacy-first (Plausible o Umami)

### Mantenimiento de la campaña
- [ ] Actualizar `spotsLeft` en `src/lib/founders.js` conforme se cierren plazas

### Contenido (opcional)
- [ ] Métricas reales y/o quotes de clientes en los casos
- [ ] Imágenes reales de casos (Baktun 13, Clesol, …)
- [ ] Revisar meta tags y `og:image` específicos de `/nosotros`

### Futuro (idea, no iniciado — fuera del proyecto actual)
- [ ] Backend de leads (captura desde el ChatWidget + panel de gestión)
- [ ] Chat conectado a una API de IA real para respuestas dinámicas
- [ ] Secuencias de email frío por sector + tracking UTM

---

## 📌 INSTRUCCIONES PARA CLAUDE
- `BRAIN_PROJECT.md` y este archivo son la memoria del proyecto: una fotografía
  del estado actual, no un histórico.
- Al hacer cambios: marca `[x]` lo terminado, añade pendientes reales en 📋 y
  actualiza la fecha. Si algo deja de existir en el código, elimínalo de aquí.
- Decisiones importantes nuevas (arquitectura, stack, copy, precios) → a
  `BRAIN_PROJECT.md`.
