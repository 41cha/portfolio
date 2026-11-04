import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { NAV_LINKS } from '../data/navLinks'
import { EASE_EXPO } from '../lib/motion'

// Floating section menu (tablet and up). It slides in once the hero is scrolled
// past, and a black pill glides to the section that is on screen.
const SHOW_AFTER = 0.6 // of the viewport height

export default function MiniNav() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(() => window.scrollY > window.innerHeight * SHOW_AFTER)
  const [active, setActive] = useState(null)

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > window.innerHeight * SHOW_AFTER))

  // The section that crosses the middle of the screen is the active one.
  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="mini-nav-wrap">
      <AnimatePresence>
        {visible && (
          <motion.nav
            className="mini-nav"
            aria-label="Sections"
            initial={{ opacity: 0, y: -24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`mini-nav__link${active === l.href ? ' is-active' : ''}`}
                aria-current={active === l.href ? 'true' : undefined}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="mini-nav-pill"
                    className="mini-nav__pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    aria-hidden="true"
                  />
                )}
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
