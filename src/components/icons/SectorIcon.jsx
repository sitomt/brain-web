// Iconos de sector — línea monocroma, stroke uniforme (más premium que emoji).
// Compartido entre la home (Enfoque) y /nosotros para no duplicar los trazos.
export default function SectorIcon({ name, size = 18 }) {
  const p = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'juego': // salones de juego — dado
      return (
        <svg {...p}><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" /><circle cx="15.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" /></svg>
      )
    case 'fitness': // gimnasios — mancuerna
      return (
        <svg {...p}><path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" /></svg>
      )
    case 'hosteleria': // bares — vaso
      return (
        <svg {...p}><path d="M7 4h10l-1.4 15.2a1 1 0 0 1-1 .8H9.4a1 1 0 0 1-1-.8L7 4Z" /><path d="M7.4 8.5h9.2" /></svg>
      )
    case 'solar': // placas solares — sol
      return (
        <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M18.4 5.6l1.4-1.4M4.2 19.8l1.4-1.4" /></svg>
      )
    case 'inversion': // inversión — tendencia al alza
      return (
        <svg {...p}><path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" /></svg>
      )
    default:
      return null
  }
}
