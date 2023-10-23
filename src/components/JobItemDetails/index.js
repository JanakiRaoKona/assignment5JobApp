import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStarFill, BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import Header from '../Header'
import SkillsRoute from '../SkillsRoute'
import SimilarJobItems from '../SimilarJobItems'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {jobItemDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getJobItemDetailing()
  }

  getJobItemDetailing = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const dataTwo = data.job_details
      const jobDetails = {
        companyLogoUrl: dataTwo.company_logo_url,
        companyWebsiteUrl: dataTwo.company_website_url,
        employmentType: dataTwo.employment_type,
        id: dataTwo.employment_type,
        jobDescription: dataTwo.job_description,
        location: dataTwo.location,
        packagePerAnnum: dataTwo.package_per_annum,
        rating: dataTwo.rating,
        title: dataTwo.title,
      }

      const skillSet = dataTwo.skills
      const skills = skillSet.map(item => ({
        name: item.name,
        imageUrl: item.image_url,
      }))

      const lifeAtComp = dataTwo.life_at_company
      const lifeAtCompany = {
        description: lifeAtComp.description,
        imageUrl: lifeAtComp.image_url,
      }

      const similarJob = data.similar_jobs
      const similarJobs = similarJob.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))

      const updatedData = {jobDetails, skills, lifeAtCompany, similarJobs}
      this.setState(
        {
          jobItemDetails: updatedData,
          apiStatus: apiStatusConstants.success,
        },
        this.getJobItemDetailsView,
      )
    } else if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  failureRetryButton = () => {
    this.getJobItemDetailing()
  }

  getJobItemDetailsView = () => {
    const {jobItemDetails} = this.state
    const {jobDetails, skills, lifeAtCompany, similarJobs} = jobItemDetails

    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-item-details-container">
        <div className="job-item-container">
          <div className="jobs-first-container">
            <div className="jobs-second-container">
              <div>
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="jobs-company-logo"
                />
              </div>
              <div>
                <h1 className="job-title">{title}</h1>
                <div className="jobs-star-rating-container">
                  <BsStarFill className="job-star" />
                  <p className="job-rating">{rating}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="job-third-container">
                <div className="case-container">
                  <IoLocationSharp className="job-location-jobs-logo" />
                  <p className="job-location-name-employ-type">{location}</p>
                </div>
                <div className="case-container">
                  <BsBriefcaseFill className="job-location-jobs-logo" />
                  <p className="job-location-name-employ-type">
                    {employmentType}
                  </p>
                </div>
                <div>
                  <p className="job-package">{packagePerAnnum}</p>
                </div>
              </div>
              <hr className="hr-lines" />
              <div>
                <div className="description-and-navigate-cont">
                  <h1 className="job-des-heading">Description</h1>
                  <div className="arrow-navigate">
                    <a className="visit-navigate" href={companyWebsiteUrl}>
                      Visit <BsBoxArrowUpRight className="arrow-symbol" />
                    </a>
                  </div>
                </div>
                <p className="job-des-paragraph">{jobDescription}</p>
              </div>
            </div>
          </div>
          <div className="skills-main-container">
            <h1 className="job-des-heading">Skills</h1>
            <ul className="skills-container">
              {skills.map(eachItem => (
                <SkillsRoute skillSet={eachItem} key={eachItem.name} />
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <div>
              <h1 className="job-des-heading">Life at Company</h1>
              <p className="job-des-paragraph">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-image"
              />
            </div>
          </div>
        </div>
        <ul className="similar-jobs-container">
          {similarJobs.map(eachItem => (
            <SimilarJobItems similarJobItems={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
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
    <div className="failure-container-last">
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
        return this.getJobItemDetailsView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-container">
        <Header />
        <div>{this.renderResultsView()}</div>
      </div>
    )
  }
}

export default JobItemDetails
