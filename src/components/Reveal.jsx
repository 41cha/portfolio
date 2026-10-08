import { motion } from 'framer-motion'
import { revealVariants, VIEWPORT } from '../lib/motion'

// Fades in and rises 24px once, when it enters the viewport.
// as: any HTML tag name ('div', 'h1', 'li', ...). delay: seconds.
export default function Reveal({ as = 'div', delay = 0, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      variants={revealVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  )
}
