import Container from '../components/Container.jsx'
import SectionHead from '../components/SectionHead.jsx'
import ExperienceItem from '../components/ExperienceItem.jsx'
import { EXPERIENCE } from '../data/experience.js'

export default function Experience() {
  return (
    <section id="experience" className="experience section--dark">
      <Container>
        <SectionHead ghost="EXPERIENCE" title="/EXPERIENCE" />

        <ul className="experience__list">
          {EXPERIENCE.map((e) => (
            <ExperienceItem key={e.id} {...e} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
