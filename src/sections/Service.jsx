import { useRef, useState } from 'react'
import Container from '../components/Container'
import SectionHead from '../components/SectionHead'
import ServiceItem from '../components/ServiceItem'
import { SERVICES } from '../data/services'

// Hover-to-open guards. Opening a row moves the rows below it, so a mouse that
// stands still can suddenly be over another row. Without guards the rows
// open and close in a loop.
const COOLDOWN_MS = 450 // ignore hover while the open/close animation runs
const MIN_MOVE_PX = 24 // the mouse must really move this far since the last switch

export default function Service() {
  // One row open at a time; the first one is open by default.
  const [openId, setOpenId] = useState(SERVICES[0].id)

  // Where and when the last switch happened (pointer coordinates, not layout).
  const lastSwitch = useRef({ x: -9999, y: -9999, t: 0 })
  // A row the user just closed by click: hover must not reopen it until the
  // mouse leaves that row.
  const suppressedId = useRef(null)

  const click = (id, e) => {
    lastSwitch.current = { x: e.clientX, y: e.clientY, t: e.timeStamp }
    suppressedId.current = openId === id ? id : null
    setOpenId((cur) => (cur === id ? null : id))
  }

  const hover = (id, e) => {
    if (id === openId || id === suppressedId.current) return
    const last = lastSwitch.current
    if (e.timeStamp - last.t < COOLDOWN_MS) return
    if (Math.hypot(e.clientX - last.x, e.clientY - last.y) < MIN_MOVE_PX) return
    lastSwitch.current = { x: e.clientX, y: e.clientY, t: e.timeStamp }
    setOpenId(id)
  }

  const leave = (id) => {
    if (suppressedId.current === id) suppressedId.current = null
  }

  return (
    <section id="service" className="service">
      <Container>
        <SectionHead ghost="SERVICE" title="/SERVICE" />

        <ul className="service__list">
          {SERVICES.map((s, i) => (
            <ServiceItem
              key={s.id}
              {...s}
              index={i}
              open={openId === s.id}
              onClick={(e) => click(s.id, e)}
              onHover={(e) => hover(s.id, e)}
              onLeave={() => leave(s.id)}
            />
          ))}
        </ul>
      </Container>
    </section>
  )
}
