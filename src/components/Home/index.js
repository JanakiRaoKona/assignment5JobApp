import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="home-description-container">
      <h1 className="find-jobs-heading">Find The Job That Fits Your Life</h1>
      <p className="millions-description">
        Millions of people are searching for jobs,salary information, company
        reviews. Find the job thats fits your abilities and potential.
      </p>
      <Link to="/jobs" className="nav-link">
        <button className="find-jobs-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home
