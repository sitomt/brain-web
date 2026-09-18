// Agenda de llamadas — Cal.com (plan gratuito).
//
// TODO: crea tu evento en cal.com y pega aquí tu enlace "usuario/evento"
// (lo que va detrás de https://cal.com/). Es el ÚNICO sitio que hay que tocar.
export const CAL_LINK = 'sitolabs/llamada'

export const CAL_URL = `https://cal.com/${CAL_LINK}`

// Abre el modal de reserva desde cualquier parte de la web.
// source = de dónde viene el clic (hero, fundadores, faq…), útil para medir.
export const openBooking = (source = 'web') =>
  window.dispatchEvent(new CustomEvent('booking:open', { detail: { source } }))

// Abre el formulario de particulares (ruta secundaria, sin llamada).
export const openParticulares = () =>
  window.dispatchEvent(new CustomEvent('particulares:open'))
