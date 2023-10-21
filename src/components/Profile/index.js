import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {profileBio: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileBio: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  profileSuccessView = () => {
    const {profileBio} = this.state
    const {name, profileImageUrl, shortBio} = profileBio
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" />
        <p className="name-rahul">{name}</p>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  loaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="error-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  finalProfileResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.profileSuccessView()
      case apiStatusConstants.inProgress:
        return this.loaderView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  onClickRetryButton = () => {
    this.getProfileDetails()
  }

  render() {
    return <>{this.finalProfileResultView()}</>
  }
}
export default Profile
