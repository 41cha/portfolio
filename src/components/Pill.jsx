import { motion } from 'framer-motion'
import Icon from './Icon'

// Filter / social pill.
// active: selected filter (black fill), only for button mode
// indicator: a layoutId. Pills in one group that share it get a black
//            background that slides to the active one instead of switching.
// href: renders <a> (social links), opens external URLs in a new tab
export default function Pill({
                                 active = false,
                                 icon,
                                 href,
                                 indicator,
                                 className = '',
                                 children,
                                 ...rest
                             }) {
    const classes = `pill${indicator ? ' pill--indicator' : ''} ${className}`.trim()
    const content = (
        <>
            {indicator && active && (
                <motion.span
                    layoutId={indicator}
                    className="pill__bg"
                    transition={{ type: 'spring', stiffness: 520, damping: 40 }}
                    aria-hidden="true"
                />
            )}
            {icon && <Icon name={icon} size={20} />}
            {children}
        </>
    )

    if (href) {
        const external = href.startsWith('http')
        return (
            <a
                className={classes}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...rest}
            >
                {content}
            </a>
        )
    }

    return (
        <button type="button" className={classes} aria-pressed={active} {...rest}>
            {content}
        </button>
    )
}