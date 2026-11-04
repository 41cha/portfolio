import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useIsDesktop } from '../lib/useMediaQuery'

// Network of slowly drifting dots and thin lines on the left and right edges of
// the page. Dots near the cursor are pushed away, then drift back.
//
// How it works, in short:
//  - one <canvas> covers the screen (position: fixed, pointer-events: none, so it
//    never blocks clicks); a CSS mask fades it out toward the middle;
//  - dots only live inside two narrow bands, one at each edge;
//  - every frame: move the dots, push them away from the mouse, draw the links.
//
// It is not rendered below 1024px or with prefers-reduced-motion.

// Tune the effect here.
const CONFIG = {
  count: 75, // dots in total (split between the two sides)
  radius: 2, // dot radius, px
  linkDistance: 105, // dots closer than this get a line, px
  linkOpacity: 0.45, // line opacity at distance 0, fades to 0 at linkDistance
  dotOpacity: 0.7,
  repulseRadius: 110, // the cursor pushes dots within this distance, px
  repulseForce: 70, // how far a dot right under the cursor is pushed, px
  speed: 14, // drift speed, px per second
  color: '79, 79, 79', // dark gray (--color-gray-4), as r, g, b
  maxDpr: 2, // cap for sharper screens, keeps drawing cheap
}

// Width of each side band. Wide screens have empty margins next to the 1200px
// content column, narrower ones get a slim band so dots stay off the content.
const bandWidth = (w) => Math.round(Math.min(w * 0.2, Math.max(110, (w - 1200) / 2 + 100)))

const rand = (min, max) => min + Math.random() * (max - min)

function createDots(w, h, band) {
  const dots = []
  for (let i = 0; i < CONFIG.count; i++) {
    const side = i % 2 // 0 = left, 1 = right
    const minX = side === 0 ? 0 : w - band
    const angle = rand(0, Math.PI * 2)
    const speed = CONFIG.speed * rand(0.5, 1.5)
    dots.push({
      side,
      minX,
      maxX: minX + band,
      x: rand(minX, minX + band),
      y: rand(0, h),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      ox: 0, // how far the cursor has pushed the dot (x and y)
      oy: 0,
    })
  }
  return dots
}

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const isDesktop = useIsDesktop()
  const reduceMotion = useReducedMotion()
  const enabled = isDesktop && !reduceMotion

  useEffect(() => {
    const canvas = canvasRef.current
    if (!enabled || !canvas) return undefined
    const ctx = canvas.getContext('2d')

    let w = 0
    let h = 0
    let dots = []
    let frame = 0
    let last = 0
    const mouse = { x: null, y: null }

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDpr)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const band = bandWidth(w)
      canvas.style.setProperty('--band', `${band}px`) // the CSS mask uses the same width
      dots = createDots(w, h, band)
    }

    const step = (time) => {
      // dt is the time since the last frame in seconds (capped, so a long pause
      // does not make the dots jump).
      const dt = last ? Math.min((time - last) / 1000, 0.05) : 0
      last = time
      const ease = 1 - Math.exp(-dt * 8) // smooth return after a push

      // 1. move the dots and push them away from the cursor
      for (const d of dots) {
        d.x += d.vx * dt
        d.y += d.vy * dt
        if (d.x < d.minX || d.x > d.maxX) d.vx *= -1
        if (d.y < 0 || d.y > h) d.vy *= -1
        d.x = Math.min(Math.max(d.x, d.minX), d.maxX)
        d.y = Math.min(Math.max(d.y, 0), h)

        let tx = 0
        let ty = 0
        if (mouse.x !== null) {
          const dx = d.x - mouse.x
          const dy = d.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < CONFIG.repulseRadius) {
            const f = 1 - dist / CONFIG.repulseRadius
            const push = f * f * CONFIG.repulseForce
            const nx = dist > 0.001 ? dx / dist : 1
            const ny = dist > 0.001 ? dy / dist : 0
            tx = nx * push
            ty = ny * push
          }
        }
        d.ox += (tx - d.ox) * ease
        d.oy += (ty - d.oy) * ease
      }

      // 2. draw
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]
        const ax = a.x + a.ox
        const ay = a.y + a.oy
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]
          if (b.side !== a.side) continue
          const dist = Math.hypot(ax - (b.x + b.ox), ay - (b.y + b.oy))
          if (dist < CONFIG.linkDistance) {
            const alpha = CONFIG.linkOpacity * (1 - dist / CONFIG.linkDistance)
            ctx.strokeStyle = `rgba(${CONFIG.color}, ${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(b.x + b.ox, b.y + b.oy)
            ctx.stroke()
          }
        }
      }
      ctx.fillStyle = `rgba(${CONFIG.color}, ${CONFIG.dotOpacity})`
      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.x + d.ox, d.y + d.oy, CONFIG.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      frame = requestAnimationFrame(step)
    }

    const start = () => {
      if (!frame) {
        last = 0
        frame = requestAnimationFrame(step)
      }
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    // The canvas ignores the mouse (pointer-events: none), so the cursor is
    // tracked on the window instead.
    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = null
      mouse.y = null
    }
    // Pause while the tab is hidden.
    const onVisibility = () => (document.hidden ? stop() : start())

    setup()
    start()
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', setup)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', setup)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled])

  if (!enabled) return null
  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />
}
