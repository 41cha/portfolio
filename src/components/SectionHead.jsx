import Reveal from './Reveal'

// Shared section heading: big gray ghost word + centered "/TITLE" over it.
// Used by Work, Service, Experience.
export default function SectionHead({ ghost, title, className = '' }) {
    return (
        <Reveal className={`section-head ${className}`.trim()}>
      <span className="section-head__ghost" aria-hidden="true">
        {ghost}
      </span>
            <h2 className="text-h1 section-head__title">{title}</h2>
        </Reveal>
    )
}