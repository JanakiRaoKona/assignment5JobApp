import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import './index.css'
import {IoLocationSharp} from 'react-icons/io5'

const JobItem = props => {
  const {jobItem} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem
  return (
    <li className="job-item-container">
      <div className="jobs-first-container">
        <div className="jobs-second-container">
          <div>
            <img
              src={companyLogoUrl}
              alt="company logo"
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
              <p className="job-location-name-employ-type">{employmentType}</p>
            </div>
            <div>
              <p className="job-package">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hr-lines" />
          <div>
            <h1 className="job-des-heading">Description</h1>
            <p className="job-des-paragraph">{jobDescription}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default JobItem
