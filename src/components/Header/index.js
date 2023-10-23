import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <nav className="header-nav-container">
        <Link to="/" className="nav-link">
          <img
            className="header-web-site-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <div className="mobile-icon-container">
          <Link to="/" className="nav-link">
            <AiFillHome className="home-icon" />
          </Link>
          <Link to="/jobs" className="nav-link">
            <BsBriefcaseFill className="home-icon" />
          </Link>
          <FiLogOut className="home-icon" onClick={onClickLogout} />
        </div>
        <div className="home-job-nav-container">
          <Link to="/" className="nav-link">
            <p className="home-nav">Home</p>
          </Link>
          <Link to="/jobs" className="nav-link">
            <p className="job-nav">Jobs</p>
          </Link>
        </div>

        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
    </div>
  )
}

export default withRouter(Header)
