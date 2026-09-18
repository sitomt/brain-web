// Sistema de motion: "un gesto, tres velocidades".
// Un único patrón de reveal (opacity + 12 px), un easing, tres duraciones.
// Solo transform y opacity: nunca filter ni clip-path (repintan cada frame y
// pueden ocultar el mensaje si la animación no dispara).

export const EASE = [0.32, 0.72, 0, 1]
export const EASE_PREMIUM = EASE
export const EASE_SOFT = [0.16, 1, 0.3, 1]
export const EASE_HOVER = [0.22, 1, 0.36, 1]

export const DUR = { fast: 0.2, base: 0.5, slow: 0.8 }

export const SPRING_PREMIUM = { type: 'spring', stiffness: 100, damping: 20 }
export const SPRING_SNAPPY = { type: 'spring', stiffness: 180, damping: 22 }

// Reveal al hacer scroll — aplicar con {...REVEAL} en un bloque, no por elemento.
export const REVEAL = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: DUR.base, ease: EASE },
}

// Reveal con retardo (para el hero, que no depende del scroll).
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.base, delay, ease: EASE },
})

// Lista escalonada: el padre lleva STAGGER(), cada hijo STAGGER_CHILD. Máx. ~6 hijos.
export const STAGGER = (children = 0.06, delayChildren = 0) => ({
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  variants: { hidden: {}, visible: { transition: { staggerChildren: children, delayChildren } } },
})

export const STAGGER_CHILD = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
}
