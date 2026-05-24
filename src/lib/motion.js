// Motion tokens — premium custom cubic-bezier curves used across the site.
// Replaces native easings (easeIn/easeOut/linear) with weighted, cinematic feel.

// Snappy exit / heavy entrance — "Apple-tier" feel
export const EASE_PREMIUM = [0.32, 0.72, 0, 1]

// Soft overshoot, cinematic
export const EASE_SOFT = [0.16, 1, 0.3, 1]

// Subtle deceleration for hover micro-interactions
export const EASE_HOVER = [0.22, 1, 0.36, 1]

// Spring physics for interactive elements
export const SPRING_PREMIUM = { type: 'spring', stiffness: 100, damping: 20 }
export const SPRING_SNAPPY = { type: 'spring', stiffness: 180, damping: 22 }

// Reveal-on-scroll preset — fade + rise + blur dissolve.
// Apply as: initial={REVEAL.initial} whileInView={REVEAL.animate} transition={REVEAL.transition}
export const REVEAL = {
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, ease: EASE_PREMIUM },
  viewport: { once: true, amount: 0.25 },
}

// Smaller, faster reveal for child items inside staggered lists
export const REVEAL_ITEM = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.6, ease: EASE_PREMIUM },
}

// Stagger preset for parent motion containers
export const STAGGER = (children = 0.08, delayChildren = 0.05) => ({
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.2 },
  variants: {
    hidden: {},
    visible: {
      transition: { staggerChildren: children, delayChildren },
    },
  },
})

export const STAGGER_CHILD = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
}
