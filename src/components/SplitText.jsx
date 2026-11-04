import { motion } from 'framer-motion'
import { maskUp, staggerParent } from '../lib/motion'

// Splits a string into letters that rise out of a clipped line, one by one.
//
// Two ways to use it:
//  - on its own: plays on mount, or when scrolled into view with `inView`;
//  - inside a parent motion element that has `initial="hidden"` and
//    `animate="visible"`: pass `controlled` and the parent starts it.
//
// For screen readers the whole text is one aria-label; the letters are hidden.
// `as` is the wrapper tag ('span', 'h2', ...). `charClassName` styles each letter.
export default function SplitText({
  text,
  as = 'span',
  className = '',
  charClassName = '',
  delay = 0,
  stagger = 0.035,
  inView = false,
  controlled = false,
}) {
  const Wrapper = motion[as]
  const words = text.split(' ')

  const drive = controlled
    ? {}
    : inView
      ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.6 } }
      : { initial: 'hidden', animate: 'visible' }

  return (
    <Wrapper
      className={`split ${className}`.trim()}
      aria-label={text}
      variants={staggerParent(stagger, delay)}
      {...drive}
    >
      {words.map((word, w) => (
        <span key={w} className="split__word" aria-hidden="true">
          {[...word].map((ch, i) => (
            <motion.span key={i} className={`split__char ${charClassName}`.trim()} variants={maskUp}>
              {ch}
            </motion.span>
          ))}
          {w < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Wrapper>
  )
}
