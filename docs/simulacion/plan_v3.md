# Plan V3 — Sito Labs (v2, ajustado con las respuestas de Ginés · 18 sep 2026)

## Decidido por Ginés
- Ginés hace todas las llamadas → se dice en Cómo trabajamos, modal de Cal.com y Cal.com.
- Sin cifras de precio en ningún sitio (web, FAQ, chat, formulario).
- Plazas 8/15, actualizadas a mano.
- Empresas: todas aparecen. Contacto: 641 310 956 (llamada/WhatsApp), hello@sitolabs.com. Dominio: sitolabs.com.
- Particulares: formulario (sin tramos de precio).
- WhatsApp: ahora WhatsApp Business (app) con el número actual; más adelante API oficial con número dedicado y el agente del chat detrás.

## Lo que hace la IA en vuestros negocios (para «Lo usamos en casa»)
| Negocio | Sector | Qué hace hoy |
|---|---|---|
| Baktun 13 | Gimnasio | App de gestión operativa interna: manuales, limpieza (empresa externa), mantenimiento, tareas diarias, documentos. Todo el trabajo del gimnasio en una sola app. |
| Clesol | Placas solares | CRM con seguimiento de clientes; captación y clasificación de leads (a quién llamar primero para rentabilizar); seguimiento hasta la firma; atención al cliente automatizada. |
| Foodmatica | Bares | Stock en tiempo real subiendo albaranes (ves el dinero que tienes en stock); administración, facturación, contabilidad y comunicación con la asesoría automatizadas. |
| Playgame Italia [CONFIRMAR que es el de salones] | Salones de juego | Equipo de agentes que recoge datos de muchas plataformas y los centraliza en un único reporte; ingresos y costes en un solo sitio. |
| Venta Alegría | Restaurante | Bot en desarrollo (se enseña tal cual está en la llamada). |

## A. Un solo CTA — 3 niveles
- **Nivel 1 · «Agendar llamada gratis»**: texto fijo en `src/lib/cta.js`, mismo `CtaButton`, en navbar (escritorio + móvil), Hero, Fundadores, cierre FAQ, CTA final, footer. Ningún otro botón sólido.
- **Nivel 2 · ghost md**: solo «Ver plazas fundador ↓» en el Hero (en móvil, link de texto).
- **Nivel 3 · links de texto**: «¿Prefieres hablar? 641 310 956 · WhatsApp o llamada» (Hero y CTA final) · «¿Eres particular? Cuéntanos tu idea» (CTA final y FAQ) · «Nuestra historia, con los errores incluidos →» (Enfoque) · «← Volver» (/nosotros).
- **Se elimina**: barra superior «Saber más»; «Reservar mi plaza fundador» (→ CTA único con nota «La plaza se decide después, con el plan delante»); «WhatsApp directo» del footer (quedan teléfono y email); `FoundersModal`, `ExitIntentModal`, `TrustBar`, `Cases`, `Products` (código muerto con cifras inventadas); anillo girando y contador «N personas hablando» del chat (aleatorio).

## B. Orden de la home
1. Hero · 2. Somos empresarios + «Lo usamos en casa» (4 tarjetas de la tabla) + tarjeta de Ginés · 3. Cómo trabajamos (minuto a minuto) · 4. Programa Fundadores · 5. Integraciones · 6. «Lo que NO hacemos» + FAQ (7) · 7. CTA final.

## C. Copy (resumen)
**Hero**
- Titular rotatorio con TAREAS (recomendado): «La IA que *contesta el WhatsApp* / *controla tu stock* / *hace el reporting* / *sigue a tus leads* / *organiza a tu equipo*». (Alternativa fija: «Ponemos la IA a trabajar en tu negocio. Primero lo hicimos en los nuestros.»)
- Subtítulo: «Hecha por empresarios de Murcia que la usan a diario en sus gimnasios, bares, salones y empresas de energía. Funcionando en pocas semanas.»
- Microcopy bajo CTA: «30 min con Ginés, gratis. Te decimos qué haría la IA en tu negocio y, si no encaja, también.»
- Franja: «Baktun 13 · gimnasio», «Clesol · energía solar», «Foodmatica · bares», «Playgame Italia · salones de juego», «Venta Alegría · restaurante».

**Somos empresarios**
- «Antes que especialistas en IA, somos empresarios. Y lo primero que automatizamos fue lo nuestro.»
- 4 tarjetas «Lo usamos en casa» con el texto de la tabla (tarea, sin cifras) + Venta Alegría como «en desarrollo».
- Tarjeta Ginés (foto de /nosotros): «Soy Ginés Munuera. La llamada la hago yo. Dirijo negocios con mis socios y fui quien empezó a meter IA en ellos. Te diré con sinceridad si en el tuyo tiene sentido.»

**Cómo trabajamos**
- 01 Llamada de 30 min con Ginés, gratis: «0-10 nos cuentas tu negocio · 10-25 te decimos qué automatizaríamos y qué no · 25-30 acordamos si tiene sentido un plan». «No hace falta preparar nada.»
- 02 Plan con precio cerrado por escrito. «Cada negocio es distinto, por eso no publicamos tarifas.» Plazo de envío [DECIDIR: 2-3 días laborables].
- 03 Lo construimos contigo sobre lo que ya usas. «En pocas semanas; te damos fecha en el plan.»

**Fundadores**
- «Las primeras 15 empresas construyen su IA con nosotros desde el principio. Quedan 8.»
- «Con estas 15 trabajamos codo a codo, y eso no se puede hacer con cien. Por eso son pocas plazas.»
- 5 ventajas en una línea (precio fundador sin cifra · prioridad · trato preferente · codo a codo · visibilidad).
- Contador + «Actualizado a mano · última actualización: [fecha]» (campo `spotsUpdatedAt`).

**Lo que NO hacemos** [DECIDIR cada línea]: no chatbot genérico · no sustituimos al equipo · no decimos que sí a todo · no publicamos precios, pero el tuyo va cerrado y por escrito · no te dejamos solo tras instalar.

**FAQ (7), todas alineadas con la web actual y sin cifras:** ¿funciona de verdad? · ya probé un chatbot y fue un desastre · ¿y si la IA se equivoca con un cliente? · ¿sustituye a mi equipo? · ¿mis datos? · ¿cuánto cuesta y hay permanencia? · ¿funciona con lo que ya uso / no sé de tecnología?

**Modal Cal.com:** «Te atiende Ginés Munuera. Tus datos solo se usan para esta llamada.» + fallback siempre visible: «¿No ves el calendario? WhatsApp 641 310 956 o hello@sitolabs.com».

**WhatsApp prefill:** «Hola Ginés, vengo de la web de Sito Labs. Tengo un [tipo de negocio] y quiero saber si la IA tiene sentido en mi caso.»

**Chat (api/_prompt.js):** reescribir con el conocimiento de la web actual (llamada gratis con Ginés, Fundadores, los 4 ejemplos reales, sin precios, sin «3 empleados», sin «auditoría», sin límite de tamaño de empresa, puede nombrar a Ginés). Cierre único: abrir el calendario. Este mismo prompt se reutilizará en WhatsApp API.

## D. P0 · Coherencia (se hace ya)
1. FAQ: quitar «desde 97 €/mes» y reescribir las 7 según la web actual.
2. Plazo único: «en pocas semanas; te damos fecha en el plan».
3. Chat alineado (ver arriba) y sin contador falso.
4. Formulario particulares: presupuesto en texto libre.
5. /nosotros: «grupo de inversores» → «socios empresarios» [aprobar].
6. Dominio: `sitolabs.example` → `https://sitolabs.com` en site.js, index.html, robots.txt, sitemap.xml, llms.txt.
7. Fallback bajo el calendario de Cal.com.
8. Borrar componentes muertos.

## E. Pendiente de Ginés
| # | Decisión | Recomendación |
|---|---|---|
| 1 | Titular rotatorio con tareas vs fijo | Rotatorio con tareas |
| 2 | Playgame Italia = salones de juego (reporting) | Confirmar |
| 3 | Plazo de envío del plan tras la llamada | 2-3 días laborables |
| 4 | «Sin permanencia» | Mantener solo si es cierto |
| 5 | Escalada a humano cuando la IA no sabe | Confirmar que es estándar |
| 6 | RGPD / NDA / infraestructura propia | Publicar solo lo que puedas firmar |
| 7 | Horario y compromiso de respuesta | «<24 h laborables · L-V 9-18 h» |
| 8 | Razón social, NIF, dirección (obligatorio LSSI) | — |
| 9 | Las 5 líneas de «Lo que NO hacemos» | Aprobar una a una |
| 10 | «Socios empresarios» en /nosotros | Sí |
| 11 | Enlace real de Cal.com | Necesario para que el CTA funcione |
| 12 | Vídeo 40-60 s | Más adelante |

## F. Ejecución
- **P0 Coherencia** (medio día) — no depende de nada.
- **P1 CTA único + orden + cookies móvil** (1 día) — no depende de nada.
- **P2 Copy + autoridad** (1 día) — necesita E.1-E.10.
- **P3** — Cal.com real, WhatsApp Business hoy / API con agente después, vídeo, medición de clics por origen.
