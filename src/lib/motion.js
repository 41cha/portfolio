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

// ---- Expressive motion (hero, cards, section titles) ----
// A sharper ease-out for big text and images: fast start, long soft landing.
export const EASE_EXPO = [0.16, 1, 0.3, 1]
export const DUR_HERO = 0.9

// Spring for hover / magnet effects (feels physical, no fixed duration).
export const SPRING = { type: 'spring', stiffness: 220, damping: 22, mass: 0.6 }

// Parent that staggers its children. Put `variants={staggerParent(...)}` on a
// motion element; children with their own variants then play one after another.
export const staggerParent = (stagger = STAGGER, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})

// Text rises out of an overflow-hidden line (used per letter by SplitText).
export const maskUp = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: DUR_HERO, ease: EASE_EXPO } },
}

// Image frame uncovered from top to bottom. Pair with `zoomSettle` on the <img>.
export const clipReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: DUR_HERO, ease: EASE_EXPO } },
}
// The picture inside the frame starts zoomed in and settles to its size.
export const zoomSettle = {
  hidden: { scale: 1.2 },
  visible: { scale: 1, transition: { duration: 1.2, ease: EASE_EXPO } },
}

// Accordion open/close
export const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: DUR.base, ease: EASE_OUT },
}
