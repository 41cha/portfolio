import { useState } from 'react'
import Container from '../components/Container'
import StatusPill from '../components/StatusPill'
import Button from '../components/Button'
import Icon from '../components/Icon'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Service', href: '#service' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

// Layout per breakpoint (see sections.css):
//   mobile  <768   : [Menu]  ........  [Open for work]
//   tablet  768+   : [Open for work]  [Menu]  [Let's Talk]
//   desktop 1024+  : [Open for work]  Work Service Experience Contact  [Let's Talk]
export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
      <header className="nav">
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

            <Button href="#contact" icon="arrow-up-right" className="nav__cta">
              Let's Talk
            </Button>
          </div>

          {open && (
              <nav id="nav-panel" className="nav__panel" aria-label="Main">
                {LINKS.map((l) => (
                    <a key={l.href} href={l.href} onClick={close}>
                      {l.label}
                    </a>
                ))}
                <Button
                    href="#contact"
                    icon="arrow-up-right"
                    className="nav__panel-cta"
                    onClick={close}
                >
                  Let's Talk
                </Button>
              </nav>
          )}
        </Container>
      </header>
  )
}