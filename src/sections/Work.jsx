import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Container from '../components/Container'
import SectionHead from '../components/SectionHead'
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
          <SectionHead ghost="PORTFOLIO" title="/SELECTED WORK" />

          <div className="work__content">
            <div className="work__filters" role="group" aria-label="Filter projects">
              {FILTERS.map((f) => (
                  <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>
                    {f}
                  </Pill>
              ))}
            </div>

            <div className="work__cards">
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                    <ProjectCard key={p.id} title={p.title} tags={p.tags} index={i} />
                ))}
              </AnimatePresence>
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