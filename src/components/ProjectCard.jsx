import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import Tag from './Tag'
import { revealVariants, staggerDelay, VIEWPORT } from '../lib/motion'

// Outer motion.article: reveal, stagger, filter layout.
// Inner .work-card: CSS hover lift (kept separate so Framer's inline
// transform doesn't override the :hover transform).
// TODO: wrap the card in a link to the project page once routing is added.
const ProjectCard = forwardRef(function ProjectCard({ title, tags, image, imagePosition, index = 0 }, ref) {
    return (
        <motion.article
            ref={ref}
            layout="position"
            variants={revealVariants}
            custom={staggerDelay(index)}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={VIEWPORT}
        >
            <div className="work-card">
                {image ? (
                    <div className="work-card__image">
                        <img
                            src={image}
                            alt={`${title} preview`}
                            loading="lazy"
                            style={imagePosition ? { objectPosition: imagePosition } : undefined}
                        />
                    </div>
                ) : (
                    <div className="work-card__image" role="img" aria-label={`${title} preview`} />
                )}
                <h3 className="work-card__title">{title}</h3>
                <div className="work-card__tags">
                    {tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                    ))}
                </div>
            </div>
        </motion.article>
    )
})

export default ProjectCard