import React from "react"
import { connect } from "react-redux"
import { loginAction } from "../reducers/userReducer"
import { Button } from "react-bootstrap"

const Logout = (props) => {

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("loggedBlogListUser")
    props.login(null)
  }

  return (
    <div>
      {props.user.name} logged in
      <Button variant="primary" type="submit" onClick={handleLogout}> Log out </Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(loginAction(user))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Logout)