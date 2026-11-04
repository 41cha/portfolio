import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'

// Shared section heading: big gray ghost word + centered "/TITLE" over it.
// Used by Work, Service, Experience.
// The ghost word drifts against the scroll (parallax) and the title rises out
// of a mask letter by letter when it enters the screen.
export default function SectionHead({ ghost, title, className = '' }) {
    const ref = useRef(null)
    const reduce = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
    const ghostY = useTransform(scrollYProgress, [0, 1], [50, -50])

    return (
        <Reveal ref={ref} className={`section-head ${className}`.trim()}>
            <motion.span
                className="section-head__ghost"
                aria-hidden="true"
                style={reduce ? undefined : { y: ghostY }}
            >
                {ghost}
            </motion.span>
            <SplitText
                as="h2"
                inView
                text={title}
                stagger={0.03}
                className="text-h1 section-head__title"
            />
        </Reveal>
    )
}
