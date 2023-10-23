import './index.css'

const SalaryRange = props => {
  const {salaryRange, onChangeSalaryRange} = props
  const {salaryRangeId, label} = salaryRange
  const onChangeSalary = () => {
    onChangeSalaryRange(salaryRangeId)
  }
  return (
    <li>
      <input
        type="radio"
        name="option"
        id={salaryRangeId}
        className="salary-input"
        value={salaryRangeId}
        onChange={onChangeSalary}
      />
      <label htmlFor={salaryRangeId} className="salary-label">
        {label}
      </label>
    </li>
  )
}
export default SalaryRange
