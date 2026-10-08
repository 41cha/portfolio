import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import Tag from './Tag'
import { collapse } from '../lib/motion'

// One accordion row. The title button's ::after stretches over the whole row
// (see sections.css), so the whole header is clickable.
// onHover: called when a mouse moves over the row (opens it on desktop).
// onClick: click / tap on the row.
export default function ServiceItem({
                                        id,
                                        title,
                                        description,
                                        tags = [],
                                        open,
                                        onClick,
                                        onHover,
                                    }) {
    const bodyId = `service-body-${id}`

    return (
        <li
            className={`service-item${open ? ' is-open' : ''}`}
            onPointerMove={(e) => e.pointerType === 'mouse' && onHover()}
        >
            <h3 className="service-item__title">
                <button
                    type="button"
                    className="service-item__toggle"
                    aria-expanded={open}
                    aria-controls={bodyId}
                    onClick={onClick}
                    // keyboard users: tabbing to a row opens it (taps don't match :focus-visible)
                    onFocus={(e) => e.currentTarget.matches(':focus-visible') && onHover()}
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
                    <motion.div key="media" className="service-item__media-wrap" {...collapse}>
                        {/* TODO: replace the gray placeholder with a real preview image */}
                        <div className="service-item__media" role="img" aria-label={`${title} preview`} />
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    )
}