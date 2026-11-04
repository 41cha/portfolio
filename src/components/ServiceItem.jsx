import { useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import Tag from './Tag'
import { collapse, DUR, EASE_OUT } from '../lib/motion'

// >= 1024px the open row is three columns and the image fills the text height.
// There the image only fades in. Below that it sits under the text and the
// row grows with a height animation.
const DESKTOP = '(min-width: 1024px)'
const subscribe = (cb) => {
    const mq = window.matchMedia(DESKTOP)
    mq.addEventListener('change', cb)
    return () => mq.removeEventListener('change', cb)
}
const useIsDesktop = () =>
    useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false)

const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: DUR.base, ease: EASE_OUT },
}

// One accordion row. The title button's ::after stretches over the whole row
// (see sections.css), so the whole header is clickable.
// onClick: click / tap / Enter / Space on the row.
// onHover(e): a mouse moves over the row (opens it on desktop).
// onLeave: the mouse leaves the row.
// Opening a row moves the rows below it, so Service.jsx guards hover (see there).
export default function ServiceItem({
                                        id,
                                        title,
                                        description,
                                        tags = [],
                                        image,
                                        open,
                                        onClick,
                                        onHover,
                                        onLeave,
                                    }) {
    const bodyId = `service-body-${id}`
    const isDesktop = useIsDesktop()

    return (
        <li
            className={`service-item${open ? ' is-open' : ''}`}
            onPointerMove={(e) => e.pointerType === 'mouse' && onHover(e)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && onLeave()}
        >
            <h3 className="service-item__title">
                <button
                    type="button"
                    className="service-item__toggle"
                    aria-expanded={open}
                    aria-controls={bodyId}
                    onClick={onClick}
                >
                    {title}
                </button>
            </h3>

            <span className="service-item__arrow" aria-hidden="true">
        <Icon name="arrow-up-right" weight="bold" />
      </span>

            {/* initial={false}: the row that is open on load doesn't animate in */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div key="body" id={bodyId} className="service-item__body" {...collapse}>
                        <div className="service-item__body-inner">
                            <p className="service-item__desc">{description}</p>
                            {tags.length > 0 && (
                                <div className="service-item__tags">
                                    {tags.map((t) => (
                                        <Tag key={t}>{t}</Tag>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {open && (
                    <motion.div
                        key="media"
                        className="service-item__media-wrap"
                        {...(isDesktop ? fade : collapse)}
                    >
                        {/* image: a screenshot of a real project that shows this service */}
                        <div className="service-item__media" role={image ? undefined : 'img'} aria-label={image ? undefined : `${title} preview`}>
                            {image && <img src={image} alt={`${title} example project`} loading="lazy" />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    )
}