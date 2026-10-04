import Icon from './Icon'
import Tag from './Tag'

// One accordion row. The title button's ::after stretches over the whole row
// (see sections.css), so clicking anywhere on the header toggles it.
export default function ServiceItem({ id, title, description, tags = [], open, onToggle }) {
  const bodyId = `service-body-${id}`

  return (
    <li className={`service-item${open ? ' is-open' : ''}`}>
      <h3 className="service-item__title">
        <button
          type="button"
          className="service-item__toggle"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={onToggle}
        >
          {title}
        </button>
      </h3>

      <span className="service-item__arrow" aria-hidden="true">
        <Icon name="arrow-up-right" weight="bold" />
      </span>

      <div className="service-item__body" id={bodyId} hidden={!open}>
        <p className="service-item__desc">{description}</p>
        {tags.length > 0 && (
          <div className="service-item__tags">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </div>

      {/* TODO: replace the gray placeholder with a real preview image */}
      <div className="service-item__media" role="img" aria-label={`${title} preview`} hidden={!open} />
    </li>
  )
}
