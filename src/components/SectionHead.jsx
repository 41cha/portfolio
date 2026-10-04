// Shared section heading: big gray ghost word + centered "/TITLE" over it.
// Used by Work, Service, Experience.
export default function SectionHead({ ghost, title, className = '' }) {
  return (
    <div className={`section-head ${className}`.trim()}>
      <span className="section-head__ghost" aria-hidden="true">
        {ghost}
      </span>
      <h2 className="text-h1 section-head__title">{title}</h2>
    </div>
  )
}
