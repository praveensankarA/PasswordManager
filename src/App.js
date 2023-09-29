// murugan thunnai

import './App.css'

import {Component} from 'react'
import {v4} from 'uuid'

class App extends Component {
  state = {
    isPasswordShow: false,
    val: [],
    websiteUrl: '',
    userName: '',
    password: '',
    searchVal: '',
  }

  addFunction = e => {
    e.preventDefault()
    console.log('hi')
    const {websiteUrl, password, userName, val} = this.state

    const newItem = {
      id: v4(),
      name: userName,
      website: websiteUrl,
      userPassword: password,
    }

    this.setState({
      val: [...val, newItem],
      password: '',
      websiteUrl: '',
      userName: '',
    })
  }

  WebsiteNameFunction = event => {
    const {websiteUrl} = this.state

    this.setState({websiteUrl: event.target.value})
  }

  userNameFunction = event => {
    this.setState({userName: event.target.value})
  }

  passwordFunction = event => {
    this.setState({password: event.target.value})
  }

  searchValFunction = event => {
    const {searchVal} = this.state
    this.setState({searchVal: event.target.value})
  }

  showHideFunction = () => {
    const {isPasswordShow} = this.state
    this.setState({isPasswordShow: !isPasswordShow})
  }

  deleteFunction = id => {
    const {val} = this.state
    const remainingItem = val.filter(each => each.id !== id)

    console.log(id)
    this.setState({val: remainingItem})
  }

  render() {
    const {
      val,
      websiteUrl,
      isPasswordShow,
      password,
      searchVal,
      userName,
    } = this.state

    const filteredList = val.filter(each => each.website.includes(searchVal))
    console.log(filteredList)

    return (
      <div className="password-manager-main-background-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="password-manager-logo"
        />
        <div className="input-main-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="password-manager-logo-image-sm"
            alt="password manager"
          />
          <form className="input-card-container" onSubmit={this.addFunction}>
            <h1 className="input-card-main-head">Add New Password</h1>
            <div className="input-ele-img-ele-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                className="input-ele-label-logo"
                alt="website"
              />
              <input
                onChange={this.WebsiteNameFunction}
                type="text"
                value={websiteUrl}
                placeholder="Enter Website"
                className="input-ele"
              />
            </div>
            <div className="input-ele-img-ele-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-ele-label-logo"
                alt="username"
              />
              <input
                onChange={this.userNameFunction}
                value={userName}
                type="text"
                placeholder="Enter Username"
                className="input-ele"
              />
            </div>
            <div className="input-ele-img-ele-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                className="input-ele-label-logo"
                alt="password"
              />
              <input
                type="password"
                value={password}
                onChange={this.passwordFunction}
                placeholder="Enter Password"
                className="input-ele"
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
            className="password-manager-logo-image-lg"
            alt="password manager"
          />
        </div>

        {/* passWord page */}

        <div className="password-page-main-card">
          <div className="password-page-search-and-title-card">
            <div className="heading-count-card">
              <h1 className="password-page-main-heading">Your Passwords</h1>
              <p className="password-count-ele">{val.length}</p>
            </div>
            <div className="input-ele-img-ele-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                className="input-ele-label-search-logo"
                alt="search"
              />
              <input
                type="search"
                value={searchVal}
                onChange={this.searchValFunction}
                placeholder="Search"
                className="search-input-ele"
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              onChange={this.showHideFunction}
              id="checkboxHead"
              className="checkbox-input-ele"
            />
            <label htmlFor="checkboxHead" className="show-password-text">
              Show passwords
            </label>
          </div>
          {filteredList.length > 0 && (
            <ul className="password-ele-card-main-container">
              {filteredList.map(each => (
                <li key={each.id} className="password-ele-card-container">
                  <h1 className="password-logo">
                    {each.website[0].toUpperCase()}
                  </h1>
                  <div className="password-name-url-password-container">
                    <p className="Website-name">{each.website}</p>
                    <p className="name">{each.name}</p>
                    {isPasswordShow ? (
                      <p className="password-ele">{each.userPassword}</p>
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="password-star-image"
                      />
                    )}
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => this.deleteFunction(each.id)}
                    type="button"
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
                      alt="delete"
                      className="delete-btn-image"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {filteredList.length === 0 && (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                alt="no passwords"
                className="no-passwords-image"
              />
              <p className="no-password-title">No passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App


