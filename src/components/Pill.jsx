import Icon from './Icon.jsx'

// Filter / social pill. `active` marks the selected filter (black fill).
export default function Pill({
  active = false,
  icon,
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      type="button"
      className={`pill ${className}`.trim()}
      aria-pressed={active}
      {...rest}
    >
      {icon && <Icon name={icon} size={20} />}
      {children}
    </button>
  )
}
