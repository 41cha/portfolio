import { useState } from 'react'
import Container from '../components/Container'
import Pill from '../components/Pill'
import Button from '../components/Button'
import ProjectCard from '../components/ProjectCard'
import { FILTERS, PROJECTS } from '../data/projects'

export default function Work() {
  const [filter, setFilter] = useState('All')
  const visible = PROJECTS.filter((p) => filter === 'All' || p.category === filter)

  return (
    <section id="work" className="work">
      <Container>
        <div className="work__head">
          <span className="text-display work__ghost" aria-hidden="true">
            PORTFOLIO
          </span>
          <h2 className="text-h1 work__title">/SELECTED WORK</h2>
        </div>

        <div className="work__content">
          <div className="work__filters" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>
                {f}
              </Pill>
            ))}
          </div>

          <div className="work__cards">
            {visible.map((p) => (
              <ProjectCard key={p.id} title={p.title} tags={p.tags} />
            ))}
          </div>

          {/* TODO: link to the all-projects page when it exists */}
          <Button variant="secondary" href="#work" icon="arrow-up-right" className="work__all">
            View All Work
          </Button>
        </div>
      </Container>
    </section>
  )
}
