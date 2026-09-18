# Plan V3 — Sito Labs (pendiente de aprobación)

Consolidado de tres auditorías de experto (jerarquía de CTAs, copy/orden de mensaje, autoridad/confianza/cercanía) sobre la web actual. Nada de esto está implementado.

## A. Un solo CTA — sistema de 3 niveles

**Nivel 1 · CTA único: «Agendar llamada gratis»** (texto fijo en `src/lib/cta.js`, mismo componente `CtaButton` siempre).
Aparece en: navbar (escritorio + menú móvil), Hero, Fundadores, cierre de FAQ, CTA final, footer. Ningún otro botón sólido en la web.

**Nivel 2 · Secundario (ghost, tamaño md, nunca al lado de un lg):**
- Hero: «Ver plazas fundador ↓» (en móvil pasa a link de texto para que solo haya UNA pastilla bajo el titular).

**Nivel 3 · Links de texto pequeños (subrayado, sin borde ni flecha):**
- «¿Prefieres hablar? 641 310 956 · WhatsApp o llamada» → Hero y CTA final.
- «¿Eres particular? Cuéntanos tu idea» → CTA final y FAQ.
- «Nuestra historia, con los errores incluidos →» → Enfoque (deja de ser pastilla).
- «← Volver» en /nosotros → link de texto.

**Se elimina / fusiona:**
- Barra superior «Programa Fundadores · Saber más» (repite hero + sección + modal; en móvil suma 3 barras fijas con cookies).
- «Reservar mi plaza fundador» → pasa al CTA único con nota «La plaza se decide después, con el plan delante».
- Footer: botón a mano → `CtaButton`; quitar «WhatsApp directo» del footer (queda en hero y CTA final; teléfono y email se quedan).
- `FoundersModal.jsx`, `ExitIntentModal.jsx`, `TrustBar.jsx`, `Cases.jsx`, `Products.jsx`: borrar (código muerto con cifras inventadas: «50 %», «7 empresas», «+40 h»).
- Chat flotante: quitar el anillo girando y el contador «N personas hablando» (es aleatorio: prueba social falsa). El quick reply «Hablar con una persona» abre el calendario.

## B. Orden de la página (problema → promesa → prueba → mecanismo → oferta → objeciones → cierre)

| # | Ahora | Propuesto | Por qué |
|---|---|---|---|
| 0 | Barra Fundadores + nav | Solo nav | Menos ruido fijo |
| 1 | Hero | **Hero** con 3 tareas concretas + quién lo hace | El lector de 10 s sale sabiendo qué hace la IA |
| 2 | Fundadores | **Somos empresarios + «lo usamos en casa» + tarjeta de Ginés** | Nadie compra una plaza de algo que aún no entiende ni de alguien que no conoce |
| 3 | Enfoque | **Cómo trabajamos** (con el minuto a minuto de la llamada) | Baja el riesgo antes de pedir |
| 4 | Cómo trabajamos | **Programa Fundadores** | Ahora la escasez se lee como lógica, no como truco |
| 5 | Integraciones | **Integraciones** (cinta de logos, titular corto) | Confianza técnica, justo después de la oferta |
| 6 | FAQ (10) | **«Lo que NO hacemos» + FAQ (7)** | Desactiva al escéptico |
| 7 | CTA final | CTA final (se mantiene: es lo mejor de la web) | — |

## C. Copy propuesto (resumen; el detalle está en los informes)

**Hero**
- Titular fijo (sin palabra rotatoria): «Ponemos la IA a trabajar en tu negocio. Primero lo hicimos en los nuestros.»
  Alternativa: mantener la rotación pero con TAREAS («contesta el WhatsApp», «toma reservas», «ordena el papeleo»), nunca sectores.
- Subtítulo: «Contesta el WhatsApp cuando tú no puedes, toma reservas y citas, y se quita de encima el papeleo que se repite. Hecha por empresarios de Murcia que la usan a diario.»
- 3 bullets (visibles en móvil antes de la demo): atención por WhatsApp/web/teléfono · reservas y citas apuntadas solas · facturas, emails y recordatorios hechos.
- Microcopy bajo CTA: «Sin compromiso. Te decimos qué haría la IA en tu negocio y, si no encaja, también.»
- Franja de negocios con sector: «Baktun 13 · gimnasio», «Clesol · energía solar», «Venta Alegría · restaurante», «Foodmatica · [DECIDIR]», «Playgame Italia · [DECIDIR]».

**Somos empresarios (Enfoque reescrito)**
- «Antes que especialistas en IA, somos empresarios. Y lo primero que automatizamos fue lo nuestro.»
- 3 mini-tarjetas «lo usamos en casa» (tarea, sin cifras) [DECIDIR cada una]:
  gimnasio → «responde horarios y precios y apunta a clase de prueba» · restaurante (Venta Alegría) → «asistente de reservas y consultas, en desarrollo; te lo enseñamos tal cual está» · placas solares → «las solicitudes se clasifican solas».
- **Tarjeta «quién te atiende»** (foto que ya existe en /nosotros): «Soy Ginés Munuera. La llamada la hago yo. Dirijo negocios con mis socios y fui quien empezó a meter IA en ellos. Te diré con sinceridad si en el tuyo tiene sentido.» [DECIDIR]

**Cómo trabajamos**
- 01 Llamada 30 min gratis, con «0-10 nos cuentas tu negocio · 10-25 te decimos qué automatizaríamos y qué no · 25-30 acordamos si tiene sentido un plan». «No hace falta preparar nada.»
- 02 Plan con precio cerrado por escrito. «Cada negocio es distinto, por eso no publicamos tarifas.» «En 2-3 días laborables» [DECIDIR].
- 03 Lo construimos contigo sobre lo que ya usas. Plazo único [DECIDIR].

**Fundadores**
- «Las primeras 15 empresas construyen su IA con nosotros desde el principio. Quedan 8.»
- «Con estas 15 trabajamos codo a codo, y eso no se puede hacer con cien. Por eso son pocas plazas.»
- 5 ventajas en una línea: precio fundador (sin cifra) · prioridad · trato preferente · codo a codo · visibilidad.
- Contador + «Actualizado a mano cada vez que se cierra una plaza · última actualización: [fecha]» (campo `spotsUpdatedAt`).
- Quitar «Es la mejor ventaja… y solo existe ahora» (suena a teletienda).

**Lo que NO hacemos** (5 líneas) [DECIDIR cada una]: no chatbot genérico · no sustituimos al equipo · no decimos que sí a todo · no publicamos precios pero el tuyo va cerrado y por escrito · no te dejamos solo tras instalar.

**FAQ (7):** ¿funciona de verdad? · ya probé un chatbot y fue un desastre · ¿y si la IA se equivoca con un cliente? · ¿sustituye a mi equipo? · ¿mis datos? · ¿cuánto cuesta y hay permanencia? (sin cifras) · ¿funciona con lo que ya uso / no sé de tecnología?

**Modal Cal.com:** «Te atiende Ginés Munuera. Tus datos solo se usan para esta llamada.» + fallback siempre visible bajo el calendario: «¿No ves el calendario? WhatsApp 641 310 956 o hello@sitolabs.com».

**WhatsApp prefill:** «Hola Ginés, vengo de la web de Sito Labs. Tengo un [tipo de negocio] y quiero saber si la IA tiene sentido en mi caso.»

## D. Incoherencias que hay que arreglar sí o sí (P0)

1. FAQ «desde 97 €/mes» → contradice «sin cifras». Quitar.
2. Plazo: Hero «semanas», Cómo trabajamos «3-4», FAQ «2-3», chat «2-3». Unificar.
3. Chat (`api/_prompt.js`): vende «3 empleados de IA», precios 1.200/2.400 €, «auditoría gratis», casos con plazos, «equipos de 3 a 50», y prohíbe nombrar a Ginés. Reescribir para que diga lo mismo que la web y cierre siempre en el calendario.
4. Formulario particulares: tramos de presupuesto con cifras → texto libre.
5. /nosotros: «grupo de inversores» → «socios empresarios».
6. Aviso legal sin razón social, NIF ni dirección (LSSI art. 10).
7. Dominio placeholder `sitolabs.example` en site.js, index.html, robots, sitemap.
8. Cookies en móvil: banner compacto de una línea; chat oculto hasta cerrarlo.

## E. [DECIDIR] — Ginés

| # | Decisión | Recomendación |
|---|---|---|
| 1 | ¿Haces tú todas las llamadas? | Si sí, decirlo: es el mayor multiplicador de confianza |
| 2 | Foto + texto firmado en la home | Sí (reutilizar la foto de /nosotros) |
| 3 | Titular fijo vs rotatorio | Fijo; si rotatorio, con tareas y no sectores |
| 4 | Qué hace hoy la IA en cada negocio (gimnasio, solar, restaurante) y qué está en producción vs desarrollo | Publicar solo lo confirmado |
| 5 | Sector de Foodmatica y Playgame Italia | — |
| 6 | Plazo único | «En pocas semanas; te damos fecha en el plan» |
| 7 | Plazo de envío del plan tras la llamada | 2-3 días laborables |
| 8 | «Sin permanencia» | Mantener solo si es cierto |
| 9 | Escalada a humano cuando la IA no sabe | Confirmar que es estándar |
| 10 | RGPD / NDA / infraestructura propia | Publicar solo lo que puedas firmar hoy |
| 11 | Horario y compromiso de respuesta | «<24 h laborables · L-V 9-18 h» |
| 12 | Razón social, NIF, dirección | Obligatorio |
| 13 | Las 5 líneas de «Lo que NO hacemos» | Aprobar una a una |
| 14 | Chat flotante: mantener (alineado) u ocultar | Mantener sin contador falso y alineado |
| 15 | Vídeo 40-60 s de Ginés | Cuando haya buena toma; la foto basta para empezar |
| 16 | Enlace real de Cal.com | Necesario para que el CTA funcione |

## F. Plan de ejecución

- **P0 · Coherencia (medio día):** D.1-D.5, D.7, borrar componentes muertos, quitar contador falso del chat, fallback en el modal de Cal.com.
- **P1 · CTA único + orden (1 día):** sección A completa, reordenar App.jsx, quitar FoundersBar, cookies compactas en móvil.
- **P2 · Copy + autoridad (1 día, tras tus [DECIDIR]):** hero, tarjetas «lo usamos en casa», tarjeta de Ginés, minuto a minuto de la llamada, Fundadores, «Lo que NO hacemos», FAQ 7, modal Cal.com, WhatsApp prefill, footer con datos legales.
- **P3 · Cuando exista:** vídeo de Ginés, Cal.com real con recordatorios, medición de eventos (clics por origen: hero/fundadores/faq/cta/footer/chat).
