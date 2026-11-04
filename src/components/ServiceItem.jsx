import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import Tag from './Tag'
import { collapse } from '../lib/motion'

// One accordion row. The title button's ::after stretches over the whole row
// (see sections.css), so the whole header is clickable.
// onClick: click / tap / Enter / Space on the row. There is no hover-to-open:
// opening a row moves the rows below it, and that made hover open and close
// rows in a loop.
export default function ServiceItem({
                                        id,
                                        title,
                                        description,
                                        tags = [],
                                        image,
                                        open,
                                        onClick,
                                    }) {
    const bodyId = `service-body-${id}`

    return (
        <li className={`service-item${open ? ' is-open' : ''}`}>
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
                    <motion.div key="media" className="service-item__media-wrap" {...collapse}>
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