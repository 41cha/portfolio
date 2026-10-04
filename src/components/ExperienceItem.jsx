// One "company / role / dates" row.
// Mobile: stacked. Tablet+: dates on the right, vertically centered.
export default function ExperienceItem({ company, role, date }) {
  return (
    <li className="experience-item">
      <div className="experience-item__main">
        <h3 className="experience-item__company">{company}</h3>
        <p className="experience-item__role">{role}</p>
      </div>
      <p className="experience-item__date">{date}</p>
    </li>
  )
}
