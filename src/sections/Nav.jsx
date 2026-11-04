import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_EXPO } from '../lib/motion'
import Container from '../components/Container'
import StatusPill from '../components/StatusPill'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { NAV_LINKS as LINKS } from '../data/navLinks'

// Layout per breakpoint (see sections.css):
//   mobile  <768   : [Menu]  ........  [Open for work]
//   tablet  768+   : [Open for work]  [Menu]  [Let's Talk]
//   desktop 1024+  : [Open for work]  Work Service Experience Contact  [Let's Talk]
export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
      <motion.header
          className="nav"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Container>
          <div className="nav__bar">
            <StatusPill />

            <button
                type="button"
                className="nav__menu-btn"
                aria-expanded={open}
                aria-controls="nav-panel"
                onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'x' : 'list'} />
              Menu
            </button>

            <ul className="nav__links">
              {LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
              ))}
            </ul>

            <Button magnetic href="#contact" icon="arrow-up-right" className="nav__cta">
              Let's Talk
            </Button>
          </div>

          {/* The wrapper animates the height (padding sits on the inner nav, so the
              closed state is really 0 tall); links then rise one after another. */}
          <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    key="panel"
                    id="nav-panel"
                    className="nav__panel-wrap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE_EXPO }}
                >
                  <nav className="nav__panel" aria-label="Main">
                    {LINKS.map((l, i) => (
                        <motion.a
                            key={l.href}
                            href={l.href}
                            onClick={close}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, ease: EASE_EXPO, delay: 0.08 + i * 0.06 }}
                        >
                          {l.label}
                        </motion.a>
                    ))}
                    <Button
                        href="#contact"
                        icon="arrow-up-right"
                        className="nav__panel-cta"
                        onClick={close}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: EASE_EXPO, delay: 0.08 + LINKS.length * 0.06 }}
                    >
                      Let's Talk
                    </Button>
                  </nav>
                </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </motion.header>
  )
}