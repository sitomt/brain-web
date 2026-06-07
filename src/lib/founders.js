// Programa Fundadores — single source of truth.
//
// Storytelling de "oportunidad de origen": llevamos tiempo usando nuestras
// soluciones en casa y ahora las abrimos a los primeros clientes externos.
// El precio fundador no es una rebaja, es un pacto: precio a cambio de ser
// caso de referencia. Cuando se cierra el cupo, el precio sube.
//
// Para apagar la campaña por completo: active = false (oculta barra, modal
// y las anclas de precio, dejando la web en su estado original).

export const FOUNDERS = {
  active: true,
  spotsTotal: 10,
  spotsLeft: 7, // editar a mano según se vayan cerrando plazas
  discountLabel: '50%', // ahorro máximo sobre catálogo, solo texto
  chatContext: 'founders',
  // mensaje precargado que se envía al chat al pulsar el CTA del modal
  chatPrefill:
    'Hola. Me interesa el Programa Fundadores y reservar una de las plazas con precio fundador.',
}

// Altura de la barra superior — la usa App.jsx para empujar la navegación.
export const FOUNDERS_BAR_H = 40

// Plazas ya ocupadas — para la barra de progreso del modal.
export const spotsTaken = () => FOUNDERS.spotsTotal - FOUNDERS.spotsLeft
