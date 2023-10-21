import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', messageError: '', isError: false}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({messageError: errorMessage, isError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      this.onSubmitSuccess(data.jwt_token)
    } else if (response.ok === false) {
      const data = await response.json()
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordName = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isError, messageError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <form className="login-card" onSubmit={this.submitForm}>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <div className="input-container">
            <label className="user-name-label" htmlFor="usernameInput">
              USERNAME
            </label>
            <input
              id="usernameInput"
              type="text"
              placeholder="username"
              className="input-element"
              value={username}
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="input-container">
            <label className="password-name-label" htmlFor="passwordInput">
              PASSWORD
            </label>
            <input
              id="passwordInput"
              type="password"
              placeholder="Password"
              className="input-element"
              value={password}
              onChange={this.onChangePasswordName}
            />
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
          {isError && <p className="error-message">*{messageError}</p>}
        </form>
      </div>
    )
  }
}

export default Login
