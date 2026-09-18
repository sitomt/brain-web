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
  spotsTotal: 15,
  spotsLeft: 8, // editar a mano según se vayan cerrando plazas
  spotsUpdatedAt: '18 sep 2026', // actualizar junto con spotsLeft
  chatContext: 'founders',
}


// Plazas ya ocupadas — para la barra de progreso del modal.
export const spotsTaken = () => FOUNDERS.spotsTotal - FOUNDERS.spotsLeft
