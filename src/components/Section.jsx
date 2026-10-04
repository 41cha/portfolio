import Container from './Container.jsx'

// Page section with vertical rhythm from tokens.css.
// dark: Black 2 background (Experience section)
export default function Section({ id, dark = false, className = '', children }) {
  const classes = `section ${dark ? 'section--dark' : ''} ${className}`.trim()
  return (
    <section id={id} className={classes}>
      <Container>{children}</Container>
    </section>
  )
}
