import { motion, useScroll, useSpring } from 'framer-motion'

// Thin line at the top of the screen that fills as the page is scrolled.
// The spring smooths it so it follows the scroll with a soft lag.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
