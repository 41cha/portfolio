import Container from '../components/Container'
import StatusPill from '../components/StatusPill'
import Button from '../components/Button'
import { SOCIALS } from '../data/socials'
import { EMAIL } from '../data/contact'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <Container>
        <div className="footer__cta">
          <StatusPill />

          <h2 className="footer__title">HAVE A PROJECT IN MIND?</h2>

          <p className="footer__desc">
            Let's build something clear, fast and reliable. Tell me about your project and I'll
            get back to you.
          </p>

          <Button href={`mailto:${EMAIL}`} icon="arrow-up-right" className="footer__btn">
            Contact Me
          </Button>

          <p className="footer__mail">
            or write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>

        <div className="footer__bar">
          <p className="footer__copy">© 2026 Volodymyr Dzimina</p>
          <ul className="footer__links">
            {SOCIALS.map((s) => {
              const external = s.href.startsWith('http')
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {s.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
