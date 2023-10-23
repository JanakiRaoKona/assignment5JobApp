import './index.css'

const SkillsRoute = props => {
  const {skillSet} = props
  const {imageUrl, name} = skillSet
  return (
    <li className="skills-list">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skills-name">{name}</p>
    </li>
  )
}

export default SkillsRoute
