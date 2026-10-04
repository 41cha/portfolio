// Static label (e.g. "React", "Landing Page"). Not interactive.
export default function Tag({ className = '', children }) {
  return <span className={`tag ${className}`.trim()}>{children}</span>
}
