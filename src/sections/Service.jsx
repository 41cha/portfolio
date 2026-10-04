import { useState } from 'react'
import Container from '../components/Container'
import SectionHead from '../components/SectionHead'
import ServiceItem from '../components/ServiceItem'
import { SERVICES } from '../data/services'

export default function Service() {
  // One row open at a time; the first one is open by default.
  const [openId, setOpenId] = useState(SERVICES[0].id)
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <section id="service" className="service">
      <Container>
        <SectionHead ghost="SERVICE" title="/SERVICE" />

        <ul className="service__list">
          {SERVICES.map((s) => (
            <ServiceItem key={s.id} {...s} open={openId === s.id} onToggle={() => toggle(s.id)} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
