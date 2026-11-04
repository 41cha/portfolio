import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Tag from './Tag'
import { clipReveal, zoomSettle, staggerDelay, DUR, EASE_OUT, VIEWPORT } from '../lib/motion'

// Card entry: the image frame is uncovered (clip-path) while the picture inside
// settles from a zoom, then title, role, text, tags and link rise one after
// another. `custom` on the article is the delay of this card among its siblings.
const cardVariants = {
    hidden: {},
    visible: (delay = 0) => ({ transition: { delayChildren: delay, staggerChildren: 0.1 } }),
    exit: { opacity: 0, scale: 0.96, transition: { duration: DUR.fast, ease: EASE_OUT } },
}
// Note: no `delay` here, so the parent's stagger decides the timing.
const part = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

// Outer motion.article: entry, stagger, filter layout.
// Inner .work-card: CSS hover lift (kept separate so Framer's inline
// transform doesn't override the :hover transform). The hover zoom of the
// picture lives on .work-card__zoom for the same reason.
const ProjectCard = forwardRef(function ProjectCard(
    { title, role, description, tags, status, url, image, imagePosition, index = 0 },
    ref,
) {
    // clip-path is not a transform, so reduced-motion does not skip it by itself.
    const reduce = useReducedMotion()

    return (
        <motion.article
            ref={ref}
            layout="position"
            variants={cardVariants}
            custom={staggerDelay(index)}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={VIEWPORT}
        >
            <div className="work-card">
                {image ? (
                    <motion.div className="work-card__image" variants={reduce ? undefined : clipReveal}>
                        <div className="work-card__zoom">
                            <motion.img
                                variants={reduce ? undefined : zoomSettle}
                                src={image}
                                alt={`${title} preview`}
                                loading="lazy"
                                style={imagePosition ? { objectPosition: imagePosition } : undefined}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <div className="work-card__image" role="img" aria-label={`${title} preview`} />
                )}
                <motion.h3 className="work-card__title" variants={part}>{title}</motion.h3>
                {role && <motion.p className="work-card__role" variants={part}>{role}</motion.p>}
                {description && <motion.p className="work-card__text" variants={part}>{description}</motion.p>}
                <motion.div className="work-card__tags" variants={part}>
                    {tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                    ))}
                </motion.div>
                {status && <motion.p className="work-card__status" variants={part}>{status}</motion.p>}
                {url && (
                    <motion.a
                        className="work-card__link"
                        variants={part}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Live demo <span className="work-card__arrow" aria-hidden="true">↗</span>
                    </motion.a>
                )}
            </div>
        </motion.article>
    )
})

export default ProjectCard
