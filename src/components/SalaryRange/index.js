import './index.css'

const SalaryRange = props => {
  const {salaryRange} = props
  const {salaryRangeId, label} = salaryRange
  return (
    <li>
      <input
        type="radio"
        name="option"
        id={salaryRangeId}
        className="salary-input"
      />
      <label htmlFor={salaryRangeId} className="salary-label">
        {label}
      </label>
    </li>
  )
}
export default SalaryRange
