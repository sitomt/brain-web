# Propuesta final — Home Sito Labs (tras 100 visitantes simulados)

> Todo lo marcado **[DECIDIR]** es hipótesis: Ginés debe validarlo antes de publicar. Hechos confirmados: Programa Fundadores (15 plazas, quedan 8; precio especial, prioridad, trato preferente, codo a codo, visibilidad), llamada gratuita de 30 min por Cal.com, y "Negocios que dirigimos y con los que trabajamos: Baktun 13, Clesol, Venta Alegría (bot en desarrollo), Foodmatica, Playgame Italia". Estética: se mantiene la actual (Instrument Serif, crema, degradados de FoundersOffer).

---

## a) Resumen ejecutivo

1. La web actual convierte ~47% en simulación (T1-T3); el Borrador V2 sube a ~65% y con los ajustes finales a ~70-75%, con menos secciones, no más.
2. Estructura final: 6 bloques y 1 CTA principal ("Agendar llamada gratis"). Se eliminan la barra superior de Fundadores, la palabra rotatoria y "piloto automático".
3. El nº1 de abandonos (sin persona detrás) se resuelve con un link discreto "o te llamamos nosotros" + teléfono en footer, sin WhatsApp en el hero.
4. El mayor riesgo detectado en la tanda final no es de conversión sino de reputación: la web y el chat atribuyen sectores, plazos y resultados a las empresas nombradas sin confirmar. P0: dejar solo la fórmula confirmada.
5. El detalle vive fuera de la home: acordeones FAQ, chat alineado y un evento Cal.com autoexplicativo.

### Métricas simuladas por tanda

| Tanda | Web evaluada | Agendan (Cal.com) | Leads humanos → agenda prob. | Chat sin agenda | Abandonos | Conversión cualificada |
|---|---|---|---|---|---|---|
| T1 #1-20 | Actual | 10 | 0 | 3 | 7 | 50% |
| T2 #21-40 | Actual | 10 | 0 | 4 | 6 | 50% |
| T3 #41-60 | Actual | 8 (6 cualificadas) | – | 4 | 8 | 30% (65-70% con soluciones) |
| T4 #61-80 | Borrador V2 | 11 | 2 | 1 | 4 | ~65% |
| T5 #81-100 (estrés) | V2 final | 11 + 1 mantenida | 2 | 0 | 3 | ~65% (70-75% con V2.9-V2.20) |

Clientes ideales de alto valor en T5: 4/4 agendan. Qué les hace decir "sí" en 60 s: su tarea escrita tal cual, "codo a codo con quien lo construye", precio orientativo sin buscarlo y precio cerrado/garantía. La escasez no fue decisiva para ninguno.

---

## b) Estructura final de la home

Orden en `src/App.jsx`: Navigation → Hero → QueHace (Enfoque reutilizado) → FoundersOffer → HowItWorks → Faq → CtaFinal → Footer. ChatWidget, BookingModal y CookieBanner globales.

**Se ELIMINA de la home:** `FoundersBar.jsx` (no montar; conservar archivo), `RotatingWord.jsx` en el H1, `Products.jsx` y `Cases.jsx` (contienen claims no confirmados), `ExitIntentModal`/`FoundersModal` si estuvieran montados, `CursorGlow` (opcional, no aporta a conversión). `Herramientas.jsx` NO se monta: su función la cubre 1 línea.

### 0. Navegación — `Navigation.jsx` (modificar)
- Logo "Sito Labs"
- Enlaces: "Fundadores" (#fundadores) · "Cómo trabajamos" (#como-funciona) · "Preguntas" (#faq) · "Nosotros" (/nosotros)
- Botón: **"Agendar llamada"**
- Quitar `topOffset` (sin barra superior).

### 1. Hero — `Hero.jsx` (modificar)
- Eyebrow: **"Sito Labs · Agencia de IA · Murcia"** (contraste AA, no gris al 45%)
- H1 (fijo): **"La IA que hace el trabajo repetitivo de tu negocio."**
- Subtítulo: **"Contesta WhatsApp, agenda citas y prepara presupuestos. Conectada a lo que ya usas, sin copiar ni pegar."**
- Chips (`<ul>`, visibles en la 1ª pantalla del móvil, antes de la demo):
  - Responde WhatsApp y mensajes
  - Toma citas, reservas y pedidos
  - Prepara presupuestos
  - Recuerda cobros y matrículas
  - Contesta "¿dónde está mi pedido?"
  - Ordena emails y papeleo
- Botón principal: **"Agendar llamada gratis · 30 min"**
- Microcopy bajo el botón: **"Sin compromiso · Programa Fundadores: quedan 8 plazas"**
- Link secundario (target ≥44 px): **"¿Prefieres que te llamemos?"** → mini-form (ver CtaFinal)
- Línea de confianza (texto legible, sin etiquetas de sector): **"Negocios que dirigimos y con los que trabajamos: Baktun 13 · Clesol · Venta Alegría · Foodmatica · Playgame Italia"** — logos con `alt`. Sectores entre paréntesis solo si [DECIDIR] los confirma.
- Demo animada (`remotion/HeroChatDemo`): mantener, con poster estático; en móvil debajo de los chips.

### 2. Qué hace — `Enfoque.jsx` (modificar y recortar)
- Eyebrow: **"Nuestro enfoque"**
- H2: **"Tareas, no promesas."**
- Párrafo: **"No es un chatbot genérico ni ChatGPT. La conectamos a tus herramientas —WhatsApp, Gmail, tu agenda, Shopify o tu programa de gestión— y trabaja con tus datos."**
- Frase empresario: **"Antes que especialistas en IA, somos empresarios: la construimos pensando en cómo funciona un negocio de verdad."** → link **"Quiénes somos →"** (/nosotros)
- (Los chips ya están en el hero; no repetirlos aquí.)

### 3. Programa Fundadores — `FoundersOffer.jsx` (modificar; mantener degradados)
Debe caber en un pantallazo de móvil (se reenvía a socios).
- Eyebrow: **"Programa Fundadores"**
- H2: **"15 empresas que empiezan con nosotros. Quedan 8."**
- Microcopy contador: **"Actualizado el DD/MM"** [DECIDIR: solo si se actualiza de verdad; si no, "Plazas limitadas"]
- Intro: **"Abrimos a los primeros negocios lo que ya construimos para los nuestros. A cambio de empezar con nosotros, te damos:"**
- Ventajas (1 línea cada una):
  - **Precio especial** — Pagas precio fundador mientras sigas con nosotros. [DECIDIR "mientras sigas"]
  - **Prioridad** — Vas primero en desarrollo, soporte y cada mejora nueva.
  - **Codo a codo** — Hablas directamente con quien lo construye.
  - **Trato preferente** — Revisamos contigo cómo va y lo ajustamos.
  - **Visibilidad** — Si quieres, te presentamos como empresa fundadora en nuestra web y redes.
- Bloque precio: **"Desde 97 €/mes + construcción con precio cerrado antes de empezar. Sin permanencia."** [DECIDIR cifra] · **"Grupos y cadenas: precio por proyecto. Una plaza por empresa, no por local."**
- Garantía: **"Si no funciona como acordamos, no pagas la construcción."** [DECIDIR — alternativa por defecto si no: "Precio cerrado antes de empezar: sin sorpresas."]
- Firma humana: foto pequeña circular + **"Te atiende Ginés Munuera, fundador."** [DECIDIR foto]
- Mini-caso: **NO se publica** hasta tener un dato real autorizado. Plantilla para cuando exista: "En [empresa], la IA [tarea] · [resultado medible]".
- Botón: **"Reservar mi llamada gratis"** · micro: **"30 min · la llamada no te compromete a nada"**

### 4. Cómo funciona — `HowItWorks.jsx` (modificar textos, `id="como-funciona"`)
- H2: **"Así trabajamos"**
1. **"Llamada de 30 minutos"** — "Nos cuentas qué te quita tiempo. Te decimos con sinceridad si la IA te ayuda y por dónde empezar."
2. **"Plan con precio cerrado"** — "Te enviamos qué haremos, cuánto cuesta y cuándo estará. Sin letra pequeña."
3. **"Lo construimos contigo"** — "Funcionando en unas [2-3] semanas [DECIDIR plazo], y lo seguimos mejorando."
- Mismo plazo en Faq y en el chat.

### 5. Preguntas frecuentes — `Faq.jsx` (reescribir, 7 acordeones accesibles, `id="faq"`)
1. **¿Esto funciona de verdad o es otra moda?**
   "Lo construimos y usamos en negocios que dirigimos y con los que trabajamos. En la llamada te enseñamos qué haría en el tuyo antes de que pagues nada. Si no vemos claro que te ahorre tiempo, te lo decimos."
2. **Ya probé un chatbot y no funcionó. ¿Qué cambia?**
   "Los chatbots genéricos responden con frases hechas. Nosotros conectamos la IA a tus datos reales (agenda, stock, precios) y la probamos contigo antes de ponerla delante de tus clientes. Y el presupuesto es cerrado: sabes lo que pagas desde el principio."
3. **¿Y si la IA se equivoca?**
   "Solo responde con la información de tu negocio. Lo que no sabe o es delicado, lo pasa a una persona de tu equipo. Tú decides qué hace sola y qué necesita tu visto bueno."
4. **¿La IA va a sustituir a mi equipo?**
   "No. Se encarga del trabajo repetitivo —contestar lo mismo cincuenta veces, meter facturas, perseguir recordatorios— para que tu gente dedique su tiempo a lo que importa."
5. **¿Qué pasa con mis datos?**
   "Tus datos son tuyos y no se usan para entrenar ninguna IA. Cumplimos el RGPD, firmamos contrato de encargado del tratamiento y, si lo necesitas, confidencialidad. Si tu sector lo exige, podemos desplegarla en tu propia infraestructura." [DECIDIR: servidores en la UE / opción local]
6. **¿Funciona con el programa que ya uso? ¿Y si soy franquicia?**
   "Casi siempre sí: trabajamos sobre lo que ya tienes (WhatsApp, Gmail, tu agenda, tu tienda online o tu programa de gestión). Si tu central te impone un software, lo revisamos en la llamada y te decimos qué es posible."
7. **Soy autónomo o particular. ¿Me atendéis?**
   "Autónomos y profesionales: sí, agenda la llamada igual. Para proyectos personales trabajamos desde [500 €] [DECIDIR]: cuéntanoslo en este formulario y te respondemos por email." → link "Contar mi proyecto" (formulario 3 campos: nombre, email, qué necesitas).
- Precio y plazo NO van como FAQ separada (ya están en Fundadores y Cómo funciona).
- ¿Tengo que saber de tecnología? → fusionada como última frase de la 6: "No necesitas saber de tecnología: lo dejamos funcionando y te enseñamos."

### 6. CTA final — `CtaFinal.jsx` (modificar)
- H2: **"La primera conversación no cuesta nada."**
- Sub: **"30 minutos para ver qué tareas de tu negocio puede hacer la IA. Sin compromiso."**
- Botón: **"Agendar llamada gratis"**
- Link: **"¿Prefieres que te llamemos?"** → mini-form inline:
  - Campos: "Nombre" · "Teléfono" · honeypot oculto
  - Botón: **"Llamadme"**
  - Legal: "Te llamaremos en horario laboral. Usamos tu teléfono solo para esto. Política de privacidad."
  - Confirmación: **"Hecho. Te llamamos en [menos de 24 h laborables] [DECIDIR]."**
- Microcopy: **"Teléfono: [XXX XXX XXX] · L-V [9-14 h]"** [DECIDIR]

### 7. Footer — `Footer.jsx` (modificar)
- Contacto: **[hola@sitolabs.xx]** [DECIDIR dominio; sustituir ginesmunuera@gmail.com] · teléfono [DECIDIR] · "Murcia"
- **"We speak English"**
- Enlaces: Nosotros · Colabora con nosotros · Prensa · Aviso legal · Privacidad · Cookies
- Aviso legal con razón social, CIF y dirección (obligatorio LSSI) [DECIDIR datos]

---

## c) Cambios fuera de la home

### Cal.com (`src/lib/booking.js`: `CAL_LINK` sigue como TODO provisional → poner el enlace real)
- **Título del evento:** "Llamada gratuita con Sito Labs · 30 min"
- **Descripción:**
  "Sito Labs es una agencia de IA de Murcia hecha por empresarios. En esta llamada:
  · nos cuentas qué tareas te quitan más tiempo;
  · te decimos con sinceridad si la IA te ayuda y por dónde empezar;
  · si encaja, te enviamos un plan con precio cerrado.
  Para aprovecharla: piensa en 2-3 tareas repetitivas y qué programas usas.
  La llamada es gratis y no te compromete a nada. Más info: [url web]"
- **Preguntas del formulario:**
  - Obligatorias: Nombre · Email · Teléfono (para avisarte si hay cambios) · "¿A qué se dedica tu negocio?" (texto corto)
  - Opcionales: "¿Cuántas personas sois?" (Solo yo / 2-10 / 11-50 / Más de 50) · "¿Cómo nos conociste?" (Recomendación / LinkedIn / Evento / Instagram / Google / Otro) · "¿Algo que debamos saber?" · Añadir invitado · "Idioma: Español / English"
- **Disponibilidad:** huecos en las próximas 48 h [DECIDIR].
- **Recordatorios:** 24 h y 1 h antes, con la descripción repetida.
- **Metadata:** mantener `metadata[source]` (ya existe en BookingModal).

### Chat — `api/_prompt.js` (y CHATBOT_SYSTEM_PROMPT.md, que dice ser fuente de verdad)
Quitar:
- Los tres "empleados de IA" (Recepcionista/Administrativo/Analista), sus precios "desde 1.200 € (normal 2.400 €)" y la regla dura de `recommend_product`.
- Toda la "Auditoría IA gratuita" y el contexto `audit`.
- "equipos de ~3 a 50 personas".
- Casos: "Baktun 13 (gimnasio): operativo en 3 semanas", "Clesol: clasificación de leads en 2 semanas" y cualquier sector/resultado no confirmado.
- La prohibición absoluta de nombrar a Ginés → permitir: "El fundador es Ginés Munuera; en la llamada hablas con el equipo que lo construye."
Alinear/añadir:
- Mismos textos de la web: precio "desde 97 €/mes + construcción con precio cerrado, sin permanencia" [DECIDIR], plazo único [DECIDIR], Fundadores (15 plazas, quedan N — leer de `lib/founders.js`).
- Referencias: solo "negocios que dirigimos y con los que trabajamos: Baktun 13, Clesol, Venta Alegría, Foodmatica, Playgame Italia", sin detalles salvo los aprobados.
- Respuesta a "¿y si se equivoca?" igual que FAQ 3; a "¿qué modelo / dónde se alojan los datos?" igual que FAQ 5.
- Intención en `capture_lead`: campo `tipo` = cliente | autonomo | particular | partner | prensa | empleo | inversor | otro. Particulares → enlace a formulario, no a llamada.
- Salida amable para fuera de dominio (mantener) y límite de mensajes por sesión.
- `ChatWidget.jsx`: no autoabrir; foco accesible; rate-limit en `/api/chat` (por IP).

### /nosotros — `src/pages/Nosotros.jsx`
- Foto y 3-4 líneas de Ginés (empresario, qué dirige).
- "Quién construye": perfil técnico en 1-2 líneas [DECIDIR].
- Dato de lanzamiento: "Nacemos en [año] en Murcia" [DECIDIR socios/grupo inversor: nombrar o no].
- Misma línea de confianza confirmada.
- CTA: "Agendar llamada gratis".

### Banner de cookies móvil — `CookieBanner.jsx`
- 1 línea + 2 botones del mismo peso: "Usamos cookies para medir la web." [Aceptar] [Rechazar] · link "Configurar".
- Altura máx. ~72 px, anclado abajo, sin tapar el botón del hero; no cubrir el ChatWidget (subir el botón flotante mientras esté visible).
- Botones ≥44 px.

### Accesibilidad (requisitos)
- H1 sin palabra rotatoria (o `aria-live="off"` y texto fijo para lectores).
- Chips y ventajas como `<ul>/<li>`.
- Acordeones FAQ: `<button aria-expanded aria-controls>`.
- BookingModal: foco atrapado, cierre con Escape, devolver foco al botón.
- Contraste AA en eyebrows/línea de confianza (fuera opacidad 45%, tamaño mínimo ~0.8rem).
- Targets táctiles ≥44 px; `alt` en logos; `prefers-reduced-motion` para demo y animaciones.

---

## d) Lista [DECIDIR] para Ginés (con recomendación por defecto)

| # | Decisión | Recomendación por defecto |
|---|---|---|
| 1 | Sectores/rol de cada empresa en la línea de confianza (¿cuál es propia y cuál cliente? ¿Baktun 13 gimnasio o salones?) | Sin etiquetas: solo "Negocios que dirigimos y con los que trabajamos". Pedir OK por escrito a cada empresa antes de añadir detalle. |
| 2 | Precio público "desde 97 €/mes + construcción" | Publicarlo solo si coincide con lo pactado con las 7 fundadoras; si no, "Precio cerrado antes de empezar, sin permanencia" sin cifra. |
| 3 | Garantía "si no funciona como acordamos, no pagas la construcción" | No publicar si no se está dispuesto a cumplirla; por defecto "Precio cerrado antes de empezar: sin sorpresas". |
| 4 | Plazo ("2-3 semanas") | Usar "en pocas semanas; te damos fecha en el plan" hasta tener histórico real. |
| 5 | Contador "quedan 8" y fecha de actualización | Mantener número solo si Ginés lo actualiza al cerrar cada plaza; si no, "Plazas limitadas". |
| 6 | Mini-caso con número | No publicar hasta tener un dato real autorizado. |
| 7 | Teléfono visible y horario | Sí: móvil de empresa, "L-V 9-14 h". |
| 8 | "Te llamamos" — plazo de respuesta | "En menos de 24 h laborables". |
| 9 | Email con dominio propio | Sí, antes de publicar (hola@dominio). |
| 10 | Precio mínimo particulares ("desde 500 €") | Poner una cifra mínima real; si no se quiere atender particulares, decirlo y no poner formulario. |
| 11 | Tamaño de cliente ("3 a 300 personas") | No publicar cifra; "Desde autónomos hasta empresas con cientos de personas". |
| 12 | Foto y nombre de Ginés en Fundadores | Sí (lo piden LinkedIn/evento). |
| 13 | "Visibilidad": mostrar fundadoras actuales | Solo las que autoricen; si ninguna aún, no mostrar bloque. |
| 14 | Privacidad: servidores UE / despliegue local / encargo de tratamiento | Publicar solo lo que se pueda firmar hoy; por defecto RGPD + encargo de tratamiento. |
| 15 | Huecos Cal.com ≤48 h | Sí, 4-6 huecos por semana mínimo. |
| 16 | Atención en inglés | Sí, si Ginés puede hacer la llamada en inglés. |
| 17 | Datos legales (razón social, CIF, dirección) | Obligatorio publicarlos. |
| 18 | Captura/vídeo real (p. ej. bot Venta Alegría) | Añadir cuando exista y la empresa lo autorice; mientras, demo animada. |
| 19 | Grupo inversor/socios en /nosotros | Mencionar solo lo que Ginés quiera hacer público. |
| 20 | "Precio especial mientras sigas con nosotros" | Confirmar duración; si no, solo "Precio especial". |

---

## e) Plan de implementación

### P0 — antes de volver a enseñar la web (≈1,5-2 días)
| Tarea | Archivos | Esfuerzo |
|---|---|---|
| Quitar claims no confirmados (sectores, plazos, resultados) de web y chat; línea de confianza con fórmula confirmada | Hero, Faq, Products/Cases (desmontar), api/_prompt.js | 2-3 h |
| Alinear prompt del chat (quitar 3 empleados, 1.200/2.400 €, auditoría, 3-50 personas; permitir nombrar a Ginés) | api/_prompt.js, CHATBOT_SYSTEM_PROMPT.md | 3-4 h |
| Hero nuevo: H1 fijo, chips, 1 CTA, micro, link "te llamamos"; chips antes de demo en móvil | Hero.jsx | 3-4 h |
| Quitar FoundersBar y topOffset | App.jsx, Navigation.jsx | 30 min |
| FoundersOffer con textos finales (sin mini-caso; precio/garantía según [DECIDIR]) | FoundersOffer.jsx, lib/founders.js | 2-3 h |
| FAQ reescrita (7) + plazo único en HowItWorks | Faq.jsx, HowItWorks.jsx | 2 h |
| Cal.com: enlace real, descripción, preguntas, recordatorios | booking.js + panel Cal.com | 1-2 h |
| Email de dominio propio en footer | Footer.jsx | 15 min (+ alta dominio) |

### P1 — primera semana tras publicar (≈2 días)
| Tarea | Esfuerzo |
|---|---|
| Mini-form "Te llamamos" (nombre+teléfono, honeypot, validación ES, envío a email/Sheet) en Hero y CtaFinal | 3-4 h |
| Formulario particulares (3 campos) | 2 h |
| Banner cookies compacto móvil + targets 44 px | 2 h |
| Accesibilidad (ul, aria-expanded, foco modal, contraste, reduced-motion) | 3-4 h |
| Footer: teléfono, We speak English, Colabora/Prensa, aviso legal con datos | 1-2 h |
| Enfoque recortado + foto/nombre de Ginés en Fundadores | 2 h |
| /nosotros: perfil, dato de lanzamiento, CTA | 2 h |
| Rate-limit /api/chat + `tipo` en capture_lead | 2-3 h |
| Poster estático de la demo del hero | 1 h |
| Analítica de eventos (ver f) | 2-3 h |

### P2 — cuando haya datos reales (continuo)
| Tarea | Esfuerzo |
|---|---|
| Mini-caso con número real autorizado en FoundersOffer | 1 h (tras dato) |
| Bloque "Ya dentro" con fundadoras que autoricen | 2 h |
| Captura/vídeo corto real (bot Venta Alegría) o vídeo de Ginés 30-45 s | 0,5-1 día |
| URL /fundadores para eventos y LinkedIn | 1 h |
| Test A/B del H1 y de mostrar/ocultar precio | 1 día config |

---

## f) Qué medir tras publicar

**Eventos** (con `source` = hero | nav | fundadores | ctafinal | chat | faq):
- `booking_open` (abre modal Cal.com) · `booking_completed` (webhook Cal.com / postMessage `bookingSuccessful`)
- `callback_open` / `callback_submit` ("te llamamos")
- `particular_form_submit`
- `faq_open` (qué pregunta)
- `chat_open`, `chat_lead_captured` con `tipo`
- `scroll_depth` 25/50/75/100 y `section_view` (fundadores, faq)
- `phone_click` (tel:) · `email_click`
- `cookie_banner_action` (aceptar/rechazar) y tiempo hasta acción en móvil

**KPIs y umbrales de validación (primeras 4-6 semanas o 500 visitas):**
| KPI | Objetivo inicial |
|---|---|
| Visita → llamada agendada | ≥3-5% (tráfico frío); ≥15% (LinkedIn/evento/referido) |
| `booking_open` → `booking_completed` | ≥45% (si menor: formulario/huecos de Cal.com) |
| Leads "te llamamos" / total contactos | 10-25% (si >40%, el calendario tiene fricción) |
| No-show en llamadas | ≤20% |
| Llamadas cualificadas (empresa con encaje) | ≥70% |
| Llamada → plaza fundador cerrada | medir; objetivo definido por Ginés |
| % visitas móviles que ven FoundersOffer | ≥40% |
| FAQ más abierta | si es "datos" o "se equivoca", subir esa respuesta a Fundadores |
| Origen ("¿Cómo nos conociste?") | priorizar canal con mejor tasa llamada→cliente |

**Validación cualitativa:** preguntar en cada llamada "¿qué casi te hizo no agendar?" y anotarlo; revisar grabaciones de sesión (si se usan, con consentimiento) de 10 visitas móviles que abandonan en Fundadores.
