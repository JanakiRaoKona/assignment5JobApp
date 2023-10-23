import './index.css'

const EmploymentType = props => {
  const {employmentType, onChangeEmploymentType} = props
  const {employmentTypeId, label} = employmentType

  const onChangeEmployment = () => {
    onChangeEmploymentType(employmentTypeId)
  }

  return (
    <li>
      <input
        type="checkbox"
        id={employmentTypeId}
        className="check-box-input"
        onChange={onChangeEmployment}
      />
      <label htmlFor={employmentTypeId} className="checkbox-label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentType
