// "Open for work" pill with green dot (Nav and Footer)
export default function StatusPill({ label = 'Open for work' }) {
  return (
    <span className="status-pill">
      <span className="status-pill__dot" aria-hidden="true" />
      {label}
    </span>
  )
}
