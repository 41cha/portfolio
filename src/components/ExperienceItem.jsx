import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { staggerDelay, EASE_EXPO, VIEWPORT } from '../lib/motion'

// One "company / role / dates" row.
// Mobile: stacked. Tablet+: dates on the right, vertically centered.
// The divider under the row is a separate line that draws from left to right
// when the row comes into view (a border could not be animated like this).
export default function ExperienceItem({ company, role, date, details, index = 0 }) {
    return (
        <Reveal as="li" className="experience-item" delay={staggerDelay(index)}>
            <div className="experience-item__main">
                <h3 className="experience-item__company">{company}</h3>
                <p className="experience-item__role">{role}</p>
                {details && <p className="experience-item__details">{details}</p>}
            </div>
            <p className="experience-item__date">{date}</p>
            <motion.span
                className="experience-item__line"
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.1, ease: EASE_EXPO, delay: staggerDelay(index) + 0.25 }}
            />
        </Reveal>
    )
}
