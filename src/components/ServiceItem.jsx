import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import Tag from './Tag'
import { collapse } from '../lib/motion'

// One accordion row. The title button's ::after stretches over the whole row
// (see sections.css), so the whole header is clickable. Text is centered; the
// arrow sits at the right edge.
// onClick: click / tap / Enter / Space on the row.
// onHover(e): a mouse moves over the row (opens it on desktop).
// onLeave: the mouse leaves the row.
// Opening a row moves the rows below it, so Service.jsx guards hover (see there).
export default function ServiceItem({
                                        id,
                                        title,
                                        description,
                                        tags = [],
                                        badge,
                                        groups,
                                        index = 0,
                                        open,
                                        onClick,
                                        onHover,
                                        onLeave,
                                    }) {
    const bodyId = `service-body-${id}`

    return (
        <li
            className={`service-item${open ? ' is-open' : ''}`}
            onPointerMove={(e) => e.pointerType === 'mouse' && onHover(e)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && onLeave()}
        >
            <span className="service-item__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
            </span>

            <div className="service-item__head">
                {badge && <span className="service-item__badge">{badge}</span>}
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
            </div>

            <span className="service-item__arrow" aria-hidden="true">
        <Icon name="arrow-up-right" weight="bold" />
      </span>

            {/* initial={false}: the row that is open on load doesn't animate in */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div key="body" id={bodyId} className="service-item__body" {...collapse}>
                        <div className="service-item__body-inner">
                            <p className="service-item__desc">{description}</p>
                            {groups && (
                                <dl className="service-item__groups">
                                    {groups.map((g) => (
                                        <div key={g.label} className="service-item__group">
                                            <dt>{g.label}</dt>
                                            <dd>{g.items.join(', ')}</dd>
                                        </div>
                                    ))}
                                </dl>
                            )}
                            {!groups && tags.length > 0 && (
                                <div className="service-item__tags">
                                    {tags.map((t) => (
                                        <Tag key={t}>{t}</Tag>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    )
}
