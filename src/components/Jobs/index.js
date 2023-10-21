import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {jobs: []}

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.jobs.map(item => ({
      companyLogoUrl: item.company_logo_url,
      employmentType: item.employment_type,
      id: item.id,
      jobDescription: item.job_description,
      location: item.location,
      packagePerAnnum: item.package_per_annum,
      rating: item.rating,
      title: item.title,
    }))
    this.setState({jobs: updatedData})
  }

  render() {
    const {jobs} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-description-details-container">
          <div>
            <div className="search-bar-container">
              <input
                type="search"
                className="search-input"
                placeholder="search"
              />
              <button type="button" className="search-icon-container">
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="profile-component">
              <Profile />
            </div>
            <hr className="hr-line" />
            <h1 className="employment-type">Type of Employment</h1>
            <ul className="ul-list-checkbox">
              {employmentTypesList.map(eachItem => (
                <EmploymentType
                  employmentType={eachItem}
                  key={eachItem.employmentTypeId}
                />
              ))}
            </ul>
            <hr className="hr-line" />
            <h1 className="employment-type">Salary Range</h1>
            <ul className="ul-list-checkbox">
              {salaryRangesList.map(eachItem => (
                <SalaryRange
                  salaryRange={eachItem}
                  key={eachItem.salaryRangeId}
                />
              ))}
            </ul>
            <hr className="hr-line" />
            <ul className="job-items-list">
              {jobs.map(eachItem => (
                <JobItem jobItem={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
