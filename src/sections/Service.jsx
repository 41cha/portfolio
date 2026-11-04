import { useRef, useState } from 'react'
import Container from '../components/Container'
import SectionHead from '../components/SectionHead'
import ServiceItem from '../components/ServiceItem'
import { SERVICES } from '../data/services'

export default function Service() {
  // One row open at a time; the first one is open by default.
  const [openId, setOpenId] = useState(SERVICES[0].id)
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id))

  // Open a row on hover only when the mouse really moved. When a row opens or
  // closes, the rows shift and the browser fires a pointer event at the SAME
  // coordinates over a different row. Reacting to it made rows open and close
  // in a loop. Keyboard focus calls this without an event and always opens.
  const lastPointer = useRef(null)
  const hover = (id, e) => {
    if (e) {
      const prev = lastPointer.current
      lastPointer.current = { x: e.clientX, y: e.clientY }
      if (!prev || (prev.x === e.clientX && prev.y === e.clientY)) return
    }
    setOpenId(id)
  }

  return (
    <section id="service" className="service">
      <Container>
        <SectionHead ghost="SERVICE" title="/SERVICE" />

        <ul className="service__list">
          {SERVICES.map((s) => (
            <ServiceItem
              key={s.id}
              {...s}
              open={openId === s.id}
              onClick={() => toggle(s.id)}
              onHover={(e) => hover(s.id, e)}
            />
          ))}
        </ul>
      </Container>
    </section>
  )
}
