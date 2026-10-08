// Motion tokens (mirror of --dur-*, --ease-*, --stagger in tokens.css).
// Framer Motion works in seconds and can't read CSS variables, so they live here.
export const EASE_OUT = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT = [0.65, 0, 0.35, 1]
export const DUR = { fast: 0.2, base: 0.5, slow: 0.8 }

export const REVEAL_DISTANCE = 24
export const STAGGER = 0.08
export const MAX_STAGGER_ITEMS = 5
export const VIEWPORT = { once: true, amount: 0.2 }

// Colors for the light -> dark Experience transition (--color-white, --color-black-2)
export const COLOR_SURFACE = '#FFFFFF'
export const COLOR_DARK = '#262626'

// Delay for the i-th sibling: 80ms steps, capped at 5 items.
export const staggerDelay = (i) => Math.min(i, MAX_STAGGER_ITEMS - 1) * STAGGER

// Fade + 24px rise. `custom` = delay in seconds.
export const revealVariants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT, delay },
  }),
  exit: { opacity: 0, transition: { duration: DUR.fast, ease: EASE_OUT } },
}

// Accordion open/close
export const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: DUR.base, ease: EASE_OUT },
}
