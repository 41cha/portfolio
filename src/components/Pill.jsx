import Icon from './Icon'

// Filter / social pill.
// active: selected filter (black fill), only for button mode
// href: renders <a> (social links), opens external URLs in a new tab
export default function Pill({
                                 active = false,
                                 icon,
                                 href,
                                 className = '',
                                 children,
                                 ...rest
                             }) {
    const classes = `pill ${className}`.trim()
    const content = (
        <>
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