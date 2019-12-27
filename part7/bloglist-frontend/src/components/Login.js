import React from "react"
import Togglable from "./Togglable"
import LoginForm from "./LoginForm"
import blogService from "../services/blogs"
import loginService from "../services/login"

import { useField } from "../hooks"
import { connect } from "react-redux"
import { loginAction }  from "../reducers/userReducer"
import { notificationAction } from "../reducers/notificationReducer"
const Login = (props) => {

  const username = useField("text")
  const password = useField("password")

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        "loggedBlogListUser", JSON.stringify(user)
      )

      props.login(user)
    } catch (exception) {
      props.setNotification({ message: "wrong username or password",type:"danger" },3)
    }
  }

  return (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    setNotification:(message,seconds) => {
      dispatch(notificationAction(message))
      setTimeout(() => {
        dispatch(notificationAction(""))
      }, seconds * 1000)
    },
    login: (user) => {
      dispatch(loginAction(user))
    }
  }
}
export default connect(null, mapDispatchToProps)(Login)