import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="page-not-found-heading">Page Not Found</h1>
    <p className="not-found-page-para">
      We are sorry, the page you requested could not found
    </p>
  </div>
)

export default NotFound
