# BrAIn — Estrategia de Producto (rediseño desde cero)

> Documento estratégico. No es copy de web ni especificación técnica.
> Fecha: 2026-06-13 · Autor: estrategia de producto.
> Fuente de verdad del estado actual: `BRAIN_PROJECT.md` + `src/components/Products.jsx`.
> **Este documento solo analiza y propone. No modifica nada del proyecto.**

---

## 0. Resumen ejecutivo (para los que no leen entero)

El problema no es que BrAIn haga poco. Es que **ofrece demasiado bien organizado para BrAIn y demasiado mal organizado para el cliente.** Los tres productos están estructurados por área funcional de la empresa (atención / operaciones / inteligencia) — que es como lo ve un *operador de agencia*, no como lo siente un *dueño de negocio agobiado*.

La prueba más clara de que la estructura confunde está **dentro de la propia web**: hay un micro-quiz titulado *"¿Por dónde empezar?"*. Si necesitas un quiz para que el visitante entienda qué comprar, la arquitectura de producto te está pidiendo ayuda a gritos. El quiz no es una feature: es una confesión.

Y mientras tanto, el activo comercial más potente de todo el catálogo — la **batería de bonuses** (auditoría de procesos, librerías de prompts, formación, check-ins, plantillas SOP) — **no aparece por ningún lado en la página de producto.** Está tirado en el suelo. Eso es dinero y confianza sin recoger.

**Recomendación (desarrollada en §3):** dejar de vender "tres soluciones de IA" y empezar a vender **empleados que no se van** — con una **Auditoría IA gratuita** como única puerta de entrada que elimina la decisión "¿cuál de los tres?". Reduce la carga de decisión a cero, encaja como un guante con el Programa Fundadores, y convierte una venta de catálogo en una conversación de diagnóstico (que es lo que un fundador sin casos externos necesita).

---

## 1. DIAGNÓSTICO (sin anestesia)

### 1.1 Lo que funciona — y por qué

| Activo | Por qué funciona |
|---|---|
| **Posicionamiento "empresarios primero"** | Diferencia de verdad. Casi toda la competencia vende "IA"; BrAIn vende criterio de negocio. Es defendible y emocionalmente correcto para el target. **No tocar.** |
| **"Que tu negocio funcione sin ti encima"** | Es la promesa central correcta. Habla al dolor real (dependencia de personas), no a la tecnología. Es el eje sobre el que debe colgar TODO el producto. |
| **El chatbot como demo viva** | Genial. El producto se demuestra a sí mismo. "Habla con nuestra IA" es el mejor primer paso posible: cero fricción, prueba tangible, captura de lead. Esto es un foso, no una feature. |
| **"Probado en casa" + 5 casos reales** | Resuelve la objeción nº1 de una agencia sin clientes externos: *"¿esto funciona?"*. Mantener y amplificar. |
| **Estructura de precio setup + cuota** | El modelo correcto: paga la construcción, paga el mantenimiento. El problema no es el modelo, es la **multiplicidad** (ver 1.4). |
| **Tono transparente, sin letra pequeña** | Es coherente y crea confianza. La estrategia de producto no puede romper esto. |

### 1.2 Lo que confunde en la cabeza del comprador

**a) La categorización es de oferta, no de demanda.**
Atención / Operaciones / Inteligencia de Negocio es el organigrama de una empresa. Pero un dueño de bar, de gimnasio o de empresa solar **no se levanta pensando "tengo un problema de back-office"**. Se levanta pensando *"se me acumulan los WhatsApp sin contestar"*, *"vuelvo a estar metiendo facturas a mano un domingo"*, *"no tengo ni idea de si este mes gano dinero"*. La web le obliga a traducir su dolor concreto al idioma interno de BrAIn antes de poder comprar. Cada traducción que obligas a hacer al cliente es fricción, y la fricción mata conversión.

**b) Los nombres son etiquetas de tecnología disfrazadas.**
"Contact Center IA", "Back Office IA", "Asistente IA". Son términos de consultoría / SaaS. Chocan frontalmente con la propia filosofía declarada de BrAIn ("hablar de beneficios, no de tecnología, sin jerga"). **El producto contradice el manifiesto.**

**c) Los tres productos se solapan en la mente del comprador.**
La clasificación de leads aparece en 01 *y* en Tier 2. "Preguntar a tus datos" (03) y "genera informes" (02) suenan a lo mismo para un no-técnico. Resultado: el comprador no percibe tres cosas distintas, percibe **una nube difusa de IA troceada en tres facturas distintas**, y no sabe si necesita una, dos o las tres.

**d) El quiz delata la confusión.**
*"¿Por dónde empezar? 1/3"* es un parche de UX sobre un problema de arquitectura de producto. Está bien hecho técnicamente, pero su mera existencia dice: *"sabemos que no lo vas a entender solo"*. La solución correcta no es un mejor quiz; es un producto que no necesite quiz.

**e) El Tier 2 abre más puertas justo cuando hay que cerrar la venta.**
"¿Tu caso no encaja en los tres?" + 5 píldoras más (software a medida, webs, local…). Acaba de presentar 3 opciones y a continuación insinúa que hay infinitas más. Para un comprador indeciso, eso es **abrir el menú entero otra vez**. Refuerza la sensación de "estos hacen de todo" — que el fundador cree que es una fortaleza y en realidad, en la fase de decisión, es ansiedad.

### 1.3 ¿Es correcto el marco de las 3 áreas?

**No. Es una categorización interna conveniente que se ha filtrado a la cara del cliente.**

Las tres áreas son una forma perfectamente razonable de que BrAIn organice *su propia capacidad de entrega*. El error es haberlas usado como **arquitectura de venta**. El cliente no compra "áreas de su empresa cubiertas por IA"; compra **resultados** ("dejo de perder clientes por no contestar") y **alivio** ("recupero mis domingos"). El marco de áreas es un mapa del proveedor, y se lo estamos entregando al cliente como si fuera un mapa del cliente.

> Regla: organiza el catálogo por **cómo el cliente nombra su dolor**, no por cómo tú nombras tu capacidad.

### 1.4 ¿El precio genera confianza o duda?

**Genera duda — no por el nivel, sino por la estructura.**

- **Tres setups distintos (1.200 / 2.000 / 1.500) + tres cuotas distintas (97 / 200 / 150).** Seis números para procesar. Cada número adicional es una micro-decisión y una micro-duda. El cerebro del comprador, ante seis cifras dispersas, no concluye "qué transparente"; concluye "esto es más complicado de lo que pensaba".
- **El ancla de descuento funciona** (2.400 tachado → 1.200 fundador es psicológicamente potente), pero está dispersa en tres tarjetas, lo que diluye el golpe. Un único ancla grande pega más fuerte que tres anclas medianas.
- **No hay precio de entrada de bajo riesgo.** El salto más pequeño es 1.200€ + 97€/mes. Para un dueño de SMB español que aún no te conoce y no tiene casos de referencia externos delante, ese es un salto de confianza grande **como primer compromiso**. Falta un peldaño antes del peldaño.

Veredicto: el modelo (setup + cuota) es correcto. La **presentación fragmentada** es lo que erosiona la confianza.

### 1.5 ¿Se usan los bonuses estratégicamente?

**No. Están abandonados — y es el mayor desperdicio del catálogo actual.**

La lista de capacidades incluye un arsenal de bonuses de coste marginal casi cero y altísimo valor percibido:

- Auditoría de procesos (identifica las 3 automatizaciones de mayor ROI)
- Librerías de prompts por sector
- Plantillas de informes pre-construidas
- Playbook de onboarding
- Sesión de formación al equipo
- Llamada de seguimiento mensual (primeros 3 meses)
- Plantillas SOP

**Ninguno aparece en la página de producto.** Ni como cierre de venta, ni como herramienta de retención, ni como gancho de entrada. Esto es grave por tres razones:

1. **La Auditoría de Procesos es, literalmente, el producto de entrada perfecto** — y se está usando como nota a pie de página (si acaso). Es tangible, valioso, regalable, y *genera el diagnóstico que justifica la venta siguiente*. Es el caballo de Troya ideal y está en el establo.
2. **El check-in mensual y la formación son anti-churn puro.** Con cuotas recurrentes (97-200€/mes), la retención es el negocio. Regalar tres meses de check-in reduce la cancelación temprana — y no cuesta casi nada.
3. **Los bonuses son la munición de cierre del fundador.** En una venta founder-led, poder decir *"y te incluyo la auditoría + la formación de tu equipo + tres meses de acompañamiento"* en el momento de la duda es lo que inclina el "sí". Ahora mismo esa munición no está cargada.

---

## 2. OPCIONES ESTRATÉGICAS (4 caminos genuinamente distintos)

> Las cuatro se construyen **solo** con las capacidades confirmadas. Cambia el empaquetado, el orden de venta y la psicología — no lo que BrAIn sabe hacer.

---

### OPCIÓN A — "Una puerta, mil habitaciones"
**(Radical: 1 producto visible + a medida ilimitado detrás)**

**Lógica central.** El catálogo de tres productos compite con la realidad: BrAIn hace soluciones a medida. Entonces deja de fingir que hay un catálogo. Vende **una sola cosa**: *"montamos el sistema de IA que tu negocio necesita"*, y haz que la única decisión del cliente sea **empezar la conversación**, no elegir SKU. La especificidad se construye en la llamada, no en la web. Menos opciones = más conversión (paradoja de la elección de Iyengar: menos mermeladas, más ventas).

**Lineup completo.**
- **Producto único: "Tu sistema BrAIn"** — un sistema de IA a medida construido sobre tus procesos. *Pizza test:* "he contratado a una agencia que me está montando una IA que contesta a mis clientes y me lleva el papeleo." ✅
- Sin sub-productos visibles. Las tres áreas pasan a ser **"lo que puede incluir"** (ejemplos ilustrativos), no productos a elegir.

**Capacidades.** Todas, sin compartimentar. Chatbots, agentes, RAG, consulta en lenguaje natural, automatización de email/facturas, dashboards, Hermes/VPS, software a medida.

**Bonuses.** Auditoría de procesos = **el primer entregable del proyecto** (no un extra, sino el paso 1). Formación + check-ins incluidos como estándar de servicio. Posicionamiento: "no te vendemos software, te acompañamos."

**Punto de entrada.** La conversación misma (chat → llamada). No hay producto de entrada porque no hay productos: hay un proceso.

**Expansión.** Orgánica dentro del proyecto: empiezas resolviendo un dolor, el sistema crece módulo a módulo. Land-and-expand *dentro de la misma factura*.

**Precio.** Un único ancla: *"Proyectos desde 1.200€ + desde 97€/mes"*. Presupuesto cerrado tras la auditoría. Una sola cifra de entrada, sin matriz.

**Compatibilidad con Fundadores.** Excelente. "Precio fundador" se aplica a *un* ancla, no a tres → el golpe psicológico es más limpio y fuerte.

**Riesgo.** Pierdes la concreción que ayuda a un comprador frío a *imaginar* qué compra. "Hacemos lo que necesites" puede sonar a "no sabemos qué hacemos" si no se ancla en ejemplos muy tangibles. Riesgo de parecer consultora difusa en vez de producto. Mitigación: ejemplos ultra-concretos por sector como prueba.

---

### OPCIÓN B — "Empleados que no se van"
**(Reencuadre por persona/resultado: mismas 3 capacidades, personificadas)**

**Lógica central.** El dueño de negocio no entiende "Back Office IA", pero entiende perfectamente lo que es **un empleado**: alguien que hace un trabajo, que no falla, que no se va, que no cuesta una nómina. El dolor declarado del cliente objetivo es literalmente *"dependencia de personas"*. Así que vende **la solución a ese dolor en su propio lenguaje**: empleados de IA. Misma tecnología, encuadre que se explica solo y ataca el dolor de frente.

**Lineup completo.**
- **El Recepcionista** — atiende a todos tus clientes 24/7 en WhatsApp, web, Instagram, email y teléfono. No deja un mensaje sin contestar. *Pizza test:* "tengo un recepcionista que trabaja a todas horas y no cobra nómina." ✅ (= Atención al Cliente)
- **El Administrativo** — se encarga del papeleo que odias: emails, facturas, informes, recordatorios. *Pizza test:* "tengo a alguien metiendo las facturas y mandando los recordatorios solo." ✅ (= Operaciones)
- **El Analista** — le preguntas en español cómo va el negocio y te contesta al instante: ventas, costes, stock, márgenes. *Pizza test:* "le pregunto al móvil cómo voy de ventas y me lo dice." ✅ (= Inteligencia)

**Capacidades.** Las mismas que hoy, redistribuidas idénticamente — solo cambia el nombre y la promesa (de feature a persona).

**Bonuses.**
- *Cierre:* "tu nuevo empleado viene con manual" → playbook + plantillas SOP incluidos.
- *Retención:* formación al equipo + check-in mensual 3 meses = "periodo de adaptación de tu empleado".
- *Upsell trigger:* la auditoría revela que *"el Recepcionista ya está, pero tu Administrativo está desbordado"* → siguiente contratación.

**Punto de entrada.** **El Recepcionista.** Es el dolor más visible, más universal, más fácil de demostrar (el propio chatbot de la web *es* un Recepcionista funcionando). Venta más fácil del catálogo.

**Expansión.** Narrativa de "plantilla": contratas uno, luego amplías el equipo. *"Tu Recepcionista ya no da abasto pasando pedidos al sistema → ficha al Administrativo."* La metáfora hace el upsell evidente y no agresivo.

**Precio.** Por "empleado", con la misma estructura setup + cuota. La metáfora justifica la cuota mejor que ningún argumento técnico: *"un empleado cobra cada mes; este, 97€."* Comparación implícita con un salario = el precio parece ridículamente barato.

**Compatibilidad con Fundadores.** Muy buena. "Sé de los primeros en tener un equipo de IA a precio fundador." La narrativa de plantilla + la de fundador se refuerzan.

**Riesgo.** La metáfora "empleado" puede asustar en clave de *"esto me va a sustituir a mi gente"* — sensible en SMB familiar español. Mitigación: encuadrar siempre como *"hace el trabajo que nadie quiere hacer / que te quita tiempo"*, no como *"despide a tu equipo"*. La metáfora debe liberar, no amenazar.

---

### OPCIÓN C — "Diagnóstico primero" (Auditoría como cuña)
**(Land-and-expand con un entregable productizado de entrada)**

**Lógica central.** El obstáculo nº1 de una agencia sin clientes externos no es el precio: es la **confianza** y la **incertidumbre de alcance** ("¿qué me vais a hacer exactamente?"). Resuélvelo invirtiendo el orden: no vendas la solución, vende **el diagnóstico**. Un producto de entrada de riesgo casi nulo que entrega valor real (un documento con las 3 automatizaciones de mayor ROI de *su* negocio) y que, por diseño, **justifica y dimensiona la venta siguiente**. El cliente compra certidumbre antes de comprar software.

**Lineup completo.**
- **Producto de entrada: "Auditoría IA"** — analizamos tu negocio y te entregamos un informe con las 3 cosas que la IA puede automatizar ya, con impacto estimado. Gratis (modo fundador) o de pago simbólico (p. ej. 290€, deducible si contratas). *Pizza test:* "me han hecho un informe de qué puedo automatizar en mi negocio." ✅
- **Detrás, las soluciones** (pueden mantenerse como 3, o fusionarse con la Opción B). La auditoría dicta cuál.

**Capacidades.** La auditoría usa: análisis de procesos + el conocimiento de sector embebido. La entrega posterior, cualquier capacidad según el informe.

**Bonuses.** Aquí el bonus *se convierte en el héroe*: la auditoría deja de ser un extra y pasa a ser el **producto-cuña**. El resto de bonuses se reservan como cierres de la venta grande.

**Punto de entrada.** La Auditoría, obviamente. Es la venta más fácil del mundo: riesgo bajo o nulo, valor inmediato, sin compromiso. Y crea reciprocidad (Cialdini): después de darte un informe útil gratis, el "no" cuesta más.

**Expansión.** Estructural y limpia: Auditoría → "las 3 cosas que encontramos" → implementación de la nº1 → de la nº2… El propio entregable *es* el roadmap de upsell. No hay que vender; hay que ejecutar lo que el cliente ya vio que necesita.

**Precio.** Auditoría gratis/simbólica como gancho. Implementación con setup + cuota. El informe convierte un precio abstracto en uno justificado ("esto te ahorra X horas/semana, cuesta Y").

**Compatibilidad con Fundadores.** **Perfecta — casi parece diseñada para esto.** "Como eres de los primeros, te hacemos la auditoría gratis." La gratuidad de la auditoría *es* el beneficio fundador tangible nº1. Encaja sin fricción con el storytelling ya activo.

**Riesgo.** (1) Coste de tiempo del fundador: cada auditoría consume horas suyas, no escala mientras es founder-led. (2) Auditoría sin venta = trabajo regalado. Mitigación: estandarizar la auditoría con plantilla (capacidad de "generación de informes") para que cueste poco producir, y cualificar antes (el chatbot ya capta sector/negocio) para no auditar a quien no va a comprar.

---

### OPCIÓN D — "BrAIn como plataforma" (suscripción por niveles)
**(Subscription-first; Hermes/VPS como tier premium soberano)**

**Lógica central.** En vez de vender proyectos puntuales con cuota de mantenimiento, vende una **relación**: BrAIn es tu socio de IA, con una suscripción mensual que crece contigo. Mueve el peso de la decisión del setup grande (barrera de entrada) a una cuota recurrente (compromiso pequeño, ingreso predecible). Y usa Hermes/VPS — hoy enterrado — como el **tier estrella**: *tu propia IA privada, en tu servidor, que no comparte tus datos con nadie.* En 2026, "soberanía de datos" es un argumento de venta premium real para empresas medianas/grandes.

**Lineup completo (3 niveles, no 3 productos).**
- **BrAIn Starter** — un empleado/sistema a elegir, cuota mensual. Entrada asequible.
- **BrAIn Pro** — varios sistemas coordinados (multi-agente), dashboards, prioridad. El grueso del valor.
- **BrAIn Soberano** — todo lo anterior **desplegado en tu propia infraestructura (Hermes/VPS)**: IA privada, datos 100% tuyos, sin terceros. *Pizza test:* "tengo mi propia inteligencia artificial en mi servidor, no la comparto con nadie." ✅ — y es el tier que justifica el precio alto.

**Capacidades.** Distribuidas por nivel: capacidades base abajo, multi-agente + BI en medio, Hermes/VPS + datos en infra propia arriba.

**Bonuses.** Escalonados por tier (formación solo Pro+, check-in mensual Pro+, auditoría incluida en todos como onboarding). Los bonuses *diferencian niveles* en lugar de regalarse planos.

**Punto de entrada.** Starter. Cuota baja, sin setup intimidante. La barrera psicológica de entrada es mínima.

**Expansión.** Vertical por niveles: Starter → Pro → Soberano. El upgrade es un cambio de plan, no una venta nueva. Modelo SaaS clásico.

**Compatibilidad con Fundadores.** Media. Funciona ("precio fundador bloqueado de por vida en tu suscripción" es potentísimo para retención), pero **choca con la promesa actual de "presupuesto cerrado, sin letra pequeña"**: una suscripción por niveles puede oler a "plan con asteriscos". Hay que comunicarla con extremo cuidado para no romper el tono.

**Riesgo.** (1) El más alto de las cuatro. BrAIn aún **entrega a medida**; empaquetar a medida como tiers fijos crea promesas que el delivery quizá no pueda cumplir uniformemente. (2) Suscripción sin setup mina el ingreso inicial que financia la construcción. (3) Riesgo de prematuridad: el modelo plataforma es para cuando hay producto repetible probado; con 0 clientes externos, es vender la piel antes de cazar el oso.

---

### Tabla comparativa rápida

| | A · Una puerta | B · Empleados | C · Diagnóstico | D · Plataforma |
|---|---|---|---|---|
| **Nº de cosas a elegir** | 1 | 3 (personas) | 1 (entrada) | 3 (niveles) |
| **Eje** | Conversación | Persona/resultado | Diagnóstico→ROI | Suscripción |
| **Entrada más fácil** | El chat | El Recepcionista | La Auditoría | Starter |
| **Carga de decisión** | Mínima | Baja | Mínima | Media |
| **Pizza test** | Medio | Fuerte | Fuerte | Fuerte (Soberano) |
| **Encaje Fundadores** | Alto | Alto | **Máximo** | Medio |
| **Riesgo** | Difuso | Metáfora amenaza | Tiempo fundador | Prematuro |
| **Madurez requerida** | Baja | Baja | Baja | Alta |

---

## 3. RECOMENDACIÓN

### Combina B (empleados) como **marco**, con C (auditoría) como **puerta**.

No es una mezcla cobarde: es la única combinación donde las dos piezas se necesitan. **B resuelve el problema de *comprensión*** (qué compro, en mi idioma) y **C resuelve el problema de *confianza y decisión*** (por dónde empiezo, sin riesgo). Juntas, eliminan los dos fallos del diagnóstico de un golpe.

En concreto:

> **Una puerta de entrada gratuita — la "Auditoría IA" — que termina recomendándote a qué "empleado de IA" fichar primero.**

El visitante ya no elige entre tres productos abstractos. Hace *una* cosa de riesgo cero (pedir su auditoría), y BrAIn le dice cuál de sus "empleados" necesita. La estructura de tres se conserva por detrás (mínimo cambio de delivery), pero **deja de ser una decisión del cliente y pasa a ser una recomendación de BrAIn.** El quiz "¿por dónde empezar?" se jubila: ya no preguntas al cliente confundido; le das un diagnóstico experto.

### Por qué esta, y no otra — 5 razones sin rodeos

1. **Mata la confusión raíz, no el síntoma.** El problema del brief es "el visitante no sabe qué compra". B lo nombra en su idioma (empleados), C le quita la decisión (tú diagnosticas). El quiz era una tirita; esto es cirugía.

2. **Está hecha a medida para la fase "0 clientes externos / founder-led".** Sin casos externos, tu activo es la confianza, y la confianza se construye **dando antes de pedir**. La auditoría gratis es reciprocidad pura: entregas valor real antes de cobrar. Ninguna otra opción de-riesga al comprador frío tan bien.

3. **Encaja como anillo al dedo con el Programa Fundadores YA activo.** No tienes que reinventar el storytelling: *"por ser de los primeros, te hacemos la auditoría gratis"* es el beneficio fundador más tangible que puedes ofrecer. La maquinaria de Fundadores (barra, modal, contador) ya existe — esto le da algo concreto que regalar. Cero fricción con lo construido.

4. **Convierte la metáfora-empleado en una máquina de upsell honesta.** La auditoría encuentra 3 cosas; ejecutas la nº1 ("fichas al Recepcionista"); el informe ya justifica las nº2 y nº3. La expansión no se vende, se *ejecuta* sobre algo que el cliente ya vio que necesitaba. Land-and-expand sin agresividad — coherente con el tono transparente.

5. **Es la de menor riesgo de delivery.** No te obliga a empaquetar lo a-medida en tiers rígidos (riesgo de D), ni a parecer consultora difusa (riesgo de A). Mantienes la flexibilidad de entrega real de BrAIn, pero le pones una **fachada simple y un punto de entrada único**. Cambias el marketing, no la cocina.

### Lo que descarto, dicho claro
- **A (una puerta)** es valiente pero deja al comprador frío sin nada concreto que imaginar. Bueno para cuando tengas marca; prematuro ahora.
- **D (plataforma)** es el destino correcto a 2-3 años, **no ahora**: empaquetar a medida como suscripción con 0 clientes es vender un producto repetible que aún no has probado. Además roza con "sin letra pequeña". Guárdala.

---

## 4. LA VICTORIA INMEDIATA

> **Una sola cosa, implementable en la próxima sesión de Claude Code, sin reescribir la sección:**
> **Añadir la "Auditoría IA gratuita" como peldaño de entrada único — encima de las tres tarjetas — y jubilar el quiz como mecanismo de elección.**

**Qué es exactamente.** Un bloque destacado al principio de la sección `Soluciones`, antes de las tres cards, con una sola promesa y un solo CTA:

> *"¿No sabes por dónde empezar? Nosotros sí."*
> *Auditoría IA gratuita: analizamos tu negocio y te decimos las 3 cosas que puedes automatizar ya — y cuál te conviene primero.*
> **[ Pedir mi auditoría gratis ]** → abre el chat con contexto `audit`.

**Por qué es LA victoria, y no otra:**
- **Sustituye una decisión por una invitación.** Hoy la sección abre obligando a elegir (quiz + 3 cards). Pasaría a abrir *regalando* (un diagnóstico). El visitante indeciso — la mayoría — por fin tiene un sí fácil.
- **Pone en juego el mayor activo desaprovechado** (la auditoría, §1.5) con esfuerzo mínimo.
- **Es 100% coherente con lo ya construido.** El `ChatWidget` ya arranca con contextos por CTA (`contact_center`, `back_office`, etc.); añadir un contexto `audit` es exactamente el patrón existente. El sistema de captura de lead, el `recommend_product` y el resaltado de cards **ya hacen justo lo que la auditoría necesita**: conversar, diagnosticar y abrir el producto recomendado. La infraestructura ya está; solo falta el encuadre.
- **No rompe nada.** Las tres cards y el Tier 2 se quedan donde están, debajo, para quien ya sabe lo que quiere. Solo añades un peldaño antes del peldaño. Reversible, de bajo riesgo, alto impacto.

**Bonus de la victoria (si sobra margen en la misma sesión):** cambiar las tres etiquetas-tecnología de las cards por las etiquetas-persona — *"Contact Center IA" → "Tu Recepcionista"*, *"Back Office IA" → "Tu Administrativo"*, *"Asistente IA" → "Tu Analista"*. Es un cambio de `tag`/`name` en el array `PRODUCTS`, sin tocar estructura, y empieza a instalar el marco de la Opción B sin compromiso.

---

## Apéndice — Principios que deben sobrevivir a cualquier opción

1. **El idioma es del cliente, no de BrAIn.** Nada de "back office", "RAG", "multi-agente" en la cara del comprador. Beneficio, persona, resultado.
2. **Menos decisiones = más ventas.** Cada SKU, cada número y cada "o también hacemos…" que añades en la fase de decisión resta. Suma claridad, no opciones.
3. **Da antes de pedir.** Sin casos externos, la confianza se compra regalando valor real primero (auditoría, demo viva del chat). Es tu ventaja de fundador, no tu debilidad.
4. **Los bonuses son munición, no relleno.** Cárgalos: como cierre (en la duda), como retención (tras el mes 1), como disparador del siguiente "empleado".
5. **No rompas el tono.** Simple, humano, directo, sin letra pequeña. Cualquier estructura que necesite asteriscos para explicarse ha fallado el test de BrAIn.
