// Textos del correo informativo que el chatbot envía al visitante (send_info_email).
// Server-only. Cada tema es un bloque cerrado, alineado con KNOWLEDGE de _prompt.js:
// ni precios, ni cifras de resultados, ni promesas fuera de la web.

const TOPIC_BODIES = {
  como_trabajamos: {
    title: 'Cómo trabajamos',
    text: `Empezamos siempre con una llamada gratuita de 30 minutos con Ginés. Después te enviamos un plan por escrito con precio cerrado: sin costes que aparezcan más tarde. La entrega se hace en pocas semanas; la fecha concreta va en el plan. Construimos a medida sobre lo que ya usas (WhatsApp, Gmail, agenda, tienda online, programa de gestión) y no dejamos solo al cliente cuando está en marcha.`,
  },
  llamada: {
    title: 'La llamada gratuita',
    text: `Son 30 minutos con Ginés. Los primeros 10 nos cuentas tu negocio. De 10 a 25 te decimos qué automatizaríamos y qué no. Los últimos 5 acordamos si tiene sentido un plan. No hace falta preparar nada: basta con tener claro qué parte del día te quita más tiempo. Lo que se cuenta en la llamada se queda en la llamada.`,
  },
  servicios: {
    title: 'Qué automatizamos',
    text: `Atención al cliente automatizada, gestión de reservas y citas, control de stock y administración, CRM y clasificación de leads, reporting centralizado, apps internas para gestionar equipos y automatizaciones de papeleo. Siempre a medida y sobre las herramientas que ya usa el negocio. No vendemos un chatbot genérico ni sustituimos al equipo: le quitamos lo repetitivo.`,
  },
  casos: {
    title: 'Lo usamos en casa',
    text: `Baktun 13 (gimnasio): app interna del equipo con manuales, limpieza, mantenimiento, tareas diarias y documentos en un solo sitio. Clesol (placas solares): CRM con seguimiento de clientes, captación y clasificación de leads y atención al cliente automatizada. Foodmatica (bares): stock en tiempo real a partir de los albaranes, con administración, facturación y comunicación con la asesoría automatizadas. Playgame Italia (salones de juego): agentes que recogen datos de varias plataformas y los centralizan en un único reporte de ingresos y costes.`,
  },
  fundadores: {
    title: 'Programa Fundadores',
    text: `Las primeras 15 empresas construyen su IA con nosotros desde el principio; quedan 8 plazas. Trabajamos codo a codo con ellas, y eso no se puede hacer con cien: por eso son pocas. Incluye precio fundador y acompañamiento directo. Las condiciones concretas se cierran en la llamada.`,
  },
  datos: {
    title: 'Tus datos',
    text: `Cumplimos el RGPD y firmamos confidencialidad si lo pides. Lo que se cuenta en la llamada se queda en la llamada. Los sistemas se montan sobre tus herramientas y tus datos siguen siendo tuyos.`,
  },
}

export const KNOWN_TOPIC_IDS = Object.keys(TOPIC_BODIES)

// Devuelve { subject, text } listo para enviar. Ignora topics desconocidos.
export function buildInfoEmail({ name, topics = [], note, bookingUrl }) {
  const chosen = topics.filter((t) => TOPIC_BODIES[t]).map((t) => TOPIC_BODIES[t])
  if (!chosen.length) return null

  const hello = name ? `Hola, ${name}.` : 'Hola.'
  const intro = note
    ? `Te paso por escrito lo que hemos hablado en el chat de la web. Lo que nos contabas: «${note.replace(/\.$/, '')}».`
    : 'Te paso por escrito lo que hemos hablado en el chat de la web.'

  const sections = chosen.map((s) => `${s.title.toUpperCase()}\n${s.text}`).join('\n\n')

  const outro = [
    'Cuando quieras dar el siguiente paso, el primer movimiento es una llamada gratuita de 30 minutos con Ginés:',
    bookingUrl,
    '',
    'Si prefieres, responde a este correo y te escribimos nosotros.',
    '',
    'Un saludo,',
    'Equipo Sito Labs · Murcia',
  ].join('\n')

  return {
    subject: chosen.length === 1 ? `Sito Labs · ${chosen[0].title}` : 'Sito Labs · La información que pediste',
    text: `${hello}\n\n${intro}\n\n${sections}\n\n${outro}`,
  }
}
