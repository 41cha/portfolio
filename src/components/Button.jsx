import Icon from './Icon.jsx'

// variant: 'primary' | 'secondary'
// icon: Phosphor icon name (see Icon.jsx), rendered after the label
// href: renders <a> instead of <button>
export default function Button({
  variant = 'primary',
  icon,
  href,
  className = '',
  children,
  ...rest
}) {
  const classes = `btn btn-${variant} ${className}`.trim()
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} />}
    </>
  )

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
