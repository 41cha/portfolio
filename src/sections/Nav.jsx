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

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="nav">
      <Container>
        <div className="nav__bar">
          <StatusPill />

          <ul className="nav__links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>

          <div className="nav__actions">
            <Button href="#contact" icon="arrow-up-right" className="nav__cta">
              Let's Talk
            </Button>
            <button
              type="button"
              className="pill nav__menu-btn"
              aria-expanded={open}
              aria-controls="nav-panel"
              onClick={() => setOpen((o) => !o)}
            >
              Menu
              <Icon name={open ? 'x' : 'list'} size={20} />
            </button>
          </div>
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
