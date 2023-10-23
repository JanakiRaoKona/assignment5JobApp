import {Component} from 'react'
import Loader from 'react-loader-spinner'
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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobs: [],
    searchInput: '',
    employmentTypes: [],
    salaryRanges: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  onClickSearchInput = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeEmploymentType = employmentId => {
    this.setState(
      prevState => ({
        employmentTypes: [...prevState.employmentTypes, employmentId],
      }),
      this.getJobs,
    )
  }

  onChangeSalaryRange = salaryRangeId => {
    this.setState({salaryRanges: salaryRangeId}, this.getJobs)
  }

  failureRetryButton = () => {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, employmentTypes, salaryRanges} = this.state
    const employJoin = employmentTypes.join()

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employJoin}&minimum_package=${salaryRanges}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
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
      this.setState({jobs: updatedData, apiStatus: apiStatusConstants.success})
    } else if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  noJobsView = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-container-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-paragraph">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  successView = () => {
    const {jobs} = this.state
    const view = jobs.length === 0

    return (
      <>
        {view ? (
          this.noJobsView()
        ) : (
          <ul className="job-items-list">
            {jobs.map(eachItem => (
              <JobItem jobItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  loadingView = () => (
    <>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="jobs-oops-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-oops-paragraph">
        We cannot seem to find the page your looking for.
      </p>
      <button
        type="button"
        className="retry-button-jobs"
        onClick={this.failureRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderResultsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-description-details-container">
          <div className="first-desktop-container">
            <div className="search-bar-container-mobile">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon-container"
                onClick={this.onClickSearchInput}
              >
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
                  onChangeEmploymentType={this.onChangeEmploymentType}
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
                  onChangeSalaryRange={this.onChangeSalaryRange}
                />
              ))}
            </ul>
            <hr className="hr-line" />
          </div>
          <div className="desktop-container">
            <div className="search-bar-container-desktop">
              <input
                type="search"
                className="search-input"
                placeholder="search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon-container"
                onClick={this.onClickSearchInput}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <>{this.renderResultsView()}</>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
