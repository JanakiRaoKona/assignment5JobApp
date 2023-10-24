import './index.css'

const SkillsRoute = props => {
  const {skillSet} = props
  const {imageUrl, name} = skillSet
  return (
    <li className="skills-list">
      <nav className="skills-list">
        <img src={imageUrl} alt={name} className="skill-image" />
        <h1 className="skills-name">{name}</h1>
      </nav>
    </li>
  )
}

export default SkillsRoute
