import React,{ useEffect } from "react"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import { connect } from "react-redux"

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"

import { loginAction } from "./reducers/userReducer"
import { getAllUserAction } from "./reducers/allUserReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import BlogList from "./components/BlogList"
import CreateBlog from "./components/CreateBlog"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Users from "./components/Users"
import User from "./components/User"
import Blog from "./components/Blog"
import { Navbar, Nav } from "react-bootstrap"
import { Page } from "./css"

const App = (props) => {

  const hook = () => {
    props.initializeBlogs()
    props.getAllUser()
  }

  useEffect(hook, [])

  const hookUserStorage = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser")
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.login(user)
      blogService.setToken(user.token)
    }
  }

  useEffect(hookUserStorage,[])

  const NotFound = () => (
    <div>
      <p>Not Found</p>
    </div>
  )

  const Home = () => {
    return (
      <div>
        <Notification/>
        {props.user === null ? <Login/>:
          <div>
            <h2>Blogs</h2>
            <CreateBlog />
            <BlogList />
          </div>}
      </div>
    )
  }

  return (
    <Page className="container">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="div">
                <Link to="/">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="div">
                <Link to="/users">Users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="div">
                {
                  props.user ? <Logout/> : null
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route exact path="/" render={() => <Home/>}/>
        <Route exact path="/users" render={() => <Users/>}/>
        <Route exact path="/users/:id" render={({ match }) => <User id={match.params.id}/>}/>
        <Route exact path="/blogs/" render={() => <Home/>}/>
        <Route exact path="/blogs/:id" render={({ match }) => <Blog id={match.params.id} detail="true"/>}/>
      </Router>
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeBlogs: () => {
      dispatch(initializeBlogs())
    },
    login: (user) => {
      dispatch(loginAction(user))
    },
    getAllUser: () => {
      dispatch(getAllUserAction())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
