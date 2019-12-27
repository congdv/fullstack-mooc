import React,{ useEffect } from "react"
import { connect } from "react-redux"
import { selectUserAction } from "../reducers/userReducer"
import Login from "../components/Login"
const User = (props) => {

  const hook = () => {
    props.getUser()
  }

  useEffect(hook, [])
  if ( props.user === null || props.user === undefined ||props.user.blogs === undefined ) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      {props.user === null ? <Login/>:
        <div>
          <h2>{props.user.username}</h2>
          <h3>added blogs</h3>
          <ul>
            {props.user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
          </ul>
        </div>}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.selectedUser,
  }
}

const mapDispatchToProps = (dispatch,props) => {
  console.log(props)
  return {
    getUser: () => {
      dispatch(selectUserAction(props.id))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(User)