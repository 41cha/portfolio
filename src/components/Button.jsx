import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import Icon from './Icon.jsx'
import { SPRING } from '../lib/motion'
import { useCanHover } from '../lib/useMediaQuery'

// variant: 'primary' | 'secondary'
// icon: Phosphor icon name (see Icon.jsx), rendered after the label
// href: renders <a> instead of <button>
// magnetic: the button leans toward the mouse a few pixels while it is over it.
//           Only with a real mouse and without reduced motion.
const MAGNET = 0.25 // how far the button follows the pointer (fraction of the offset)
const MAX_PULL = 12 // px, so a wide button never slides far from the cursor
const pull = (offset) => Math.max(-MAX_PULL, Math.min(MAX_PULL, offset * MAGNET))

export default function Button({
  variant = 'primary',
  icon,
  href,
  magnetic = false,
  className = '',
  children,
  ...rest
}) {
  const canHover = useCanHover()
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, SPRING)
  const y = useSpring(my, SPRING)

  const classes = `btn btn-${variant} ${className}`.trim()
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} className={`btn__icon btn__icon--${icon}`} />}
    </>
  )

  // While the magnet is on, Framer owns `transform`, so the CSS press scale
  // (.btn:active) is replaced by whileTap.
  const magnet =
    magnetic && canHover && !reduce
      ? {
          style: { x, y },
          whileTap: { scale: 0.97 },
          onPointerMove: (e) => {
            const r = e.currentTarget.getBoundingClientRect()
            mx.set(pull(e.clientX - (r.left + r.width / 2)))
            my.set(pull(e.clientY - (r.top + r.height / 2)))
          },
          onPointerLeave: () => {
            mx.set(0)
            my.set(0)
          },
        }
      : {}

  if (href) {
    return (
      <motion.a className={classes} href={href} {...rest} {...magnet}>
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" className={classes} {...rest} {...magnet}>
      {content}
    </motion.button>
  )
}
