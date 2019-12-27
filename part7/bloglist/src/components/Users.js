import React,{ useEffect } from "react"
import { connect } from "react-redux"
import Login from "./Login"
import { getAllUserAction } from "../reducers/allUserReducer"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"


const Users = (props) => {
  const hook = () => {
    props.getAllUser()
  }
  useEffect(hook, [])

  return (
    <div>
      {props.user === null ? <Login/>:
        <div>
          <h2>Users</h2>
          <Table striped>
            <thead>
              <tr>
                <td>Users</td>
                <td>Blogs created</td>
              </tr>
            </thead>
            <tbody>
              {
                props.users.map(user =>
                  <tr key={user.id}>
                    <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                    <td>{user.blogs.length}</td>
                  </tr>)
              }
            </tbody>
          </Table>
        </div>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => {
      dispatch(getAllUserAction())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users)