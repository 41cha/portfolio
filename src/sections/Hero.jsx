import Section from '../components/Section'
import Button from '../components/Button'
import Pill from '../components/Pill'
import { SOCIALS } from '../data/socials'

export default function Hero() {
  return (
    <Section id="home" className="hero">
      <h1 className="text-display hero__title">
        <span className="text-outline">VOLODYMYR</span>
        <br />
        DZIMINA
      </h1>

      <div className="hero__body">
        <div className="hero__info">
          <p className="text-h3 hero__role">Full stack developer</p>
          <p className="text-body hero__desc">
            Building modern web apps, drone systems, and digital products
          </p>
          <Button href="#contact" icon="arrow-up-right">
            Let's collaborate
          </Button>
          <div className="hero__socials">
            {SOCIALS.map((s) => (
              <Pill key={s.label} href={s.href} icon={s.icon}>
                {s.label}
              </Pill>
            ))}
          </div>
        </div>

        {/* TODO: replace with real photo */}
        <div className="hero__photo" role="img" aria-label="Photo placeholder">
          Photo placeholder
        </div>
      </div>
    </Section>
  )
}
