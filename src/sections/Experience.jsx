import { motion, useReducedMotion } from 'framer-motion'
import Container from '../components/Container'
import SectionHead from '../components/SectionHead'
import ExperienceItem from '../components/ExperienceItem'
import { EXPERIENCE } from '../data/experience'
import { COLOR_SURFACE, COLOR_DARK, DUR, EASE_IN_OUT } from '../lib/motion'

export default function Experience() {
    const reduce = useReducedMotion()

    return (
        // Light -> dark section transition (Slow, ease in-out), once.
        // The final color matches .section--dark in components.css.
        <motion.section
            id="experience"
            className="experience section--dark"
            initial={{ backgroundColor: COLOR_SURFACE }}
            whileInView={{ backgroundColor: COLOR_DARK }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduce ? 0 : DUR.slow, ease: EASE_IN_OUT }}
        >
            <Container>
                <SectionHead ghost="EXPERIENCE" title="/EXPERIENCE" />

                <ul className="experience__list">
                    {EXPERIENCE.map((e, i) => (
                        <ExperienceItem key={e.id} {...e} index={i} />
                    ))}
                </ul>
            </Container>
        </motion.section>
    )
}