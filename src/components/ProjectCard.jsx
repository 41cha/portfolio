import Tag from './Tag'

// TODO: replace the gray placeholder with <img src={image} alt={title} />
// and wrap the card in a link to the project page once routing is added.
export default function ProjectCard({ title, tags }) {
  return (
    <article className="work-card">
      <div className="work-card__image" role="img" aria-label={`${title} preview`} />
      <h3 className="work-card__title">{title}</h3>
      <div className="work-card__tags">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </article>
  )
}
