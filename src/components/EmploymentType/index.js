import './index.css'

const EmploymentType = props => {
  const {employmentType} = props
  const {employmentTypeId, label} = employmentType
  return (
    <li>
      <input
        type="checkbox"
        id={employmentTypeId}
        className="check-box-input"
      />
      <label htmlFor={employmentTypeId} className="checkbox-label">
        {label}
      </label>
    </li>
  )
}
export default EmploymentType
