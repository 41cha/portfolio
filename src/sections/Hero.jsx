import Container from '../components/Container'
import Button from '../components/Button'
import Pill from '../components/Pill'
import { SOCIALS } from '../data/socials'

export default function Hero() {
  return (
      <section id="home" className="hero">
        <Container className="hero__inner">
          <h1 className="text-display hero__title">
            <span className="text-outline">VOLODYMYR</span>
            <br />
            DZIMINA
          </h1>

          <div className="hero__body">
            <div className="hero__info">
              <p className="text-h2 hero__role">Full stack developer</p>
              <p className="text-body hero__desc">
                Building modern web apps,
                <br />
                drone systems, and digital products
              </p>
              <Button href="#contact" icon="arrow-up-right" className="hero__cta">
                Let's collaborate
              </Button>
            </div>

            <div className="hero__socials">
              {SOCIALS.map((s) => (
                  <Pill key={s.label} href={s.href} icon={s.icon} className="hero__social">
                    {s.label}
                  </Pill>
              ))}
            </div>
          </div>
        </Container>
      </section>
  )
}