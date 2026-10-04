// Centers content to 1200px max with page margins from tokens.css
export default function Container({ className = '', children, ...rest }) {
  return (
    <div className={`container ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}
