import React,{ useState, useEffect } from "react"
import { connect } from "react-redux"
import { deleteBlog, updateBlog } from "../reducers/blogReducer"
import Login from "./Login"
import Comments from "./Comments"

import blogService from "../services/blogs"
import { Button } from "react-bootstrap"

const Blog = (props) => {
  const user = props.user

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(0)
  const [blog, setBlog] = useState(null)
  const [comments, setComments] = useState([])
  const showWhenVisible = { display: visible ? "":"none" }

  console.log("Detail Blog")
  const hook = () => {
    blogService.get(props.id).then(savedBlog => {
      setComments(savedBlog.comments)
      setBlog(savedBlog)
    })
  }

  useEffect(hook, [])


  if(blog === undefined || blog === null) {
    return "Unknown"
  }


  if(blog.likes > likes){
    setLikes(blog.likes)
  }


  const toggleVisibility = () => {
    if(!visible){
      setLikes(blog.likes)
    }
    setVisible(!visible)
  }

  const handleLikeOnClick = async() => {
    setLikes(likes+1)
    const newObject = {
      likes: likes,
    }
    props.updateBlog(blog,newObject)
    console.log(likes+" et likes")

  }

  const handleRemoveBlog = async() => {
    const message = `remove ${blog.title} by ${blog.author}`
    if(window.confirm(message)) {
      props.deleteBlog(blog)
    }
  }
  const removableBlog = () => {
    if(typeof blog.user === "undefined") {
      return ""
    } else if(user.username === blog.user.username || user.id === blog.user.id) {
      return (<Button variant="outline-warning" onClick={handleRemoveBlog}>remove</Button>)
    }
  }


  return (
    <div>
      {props.detail === "true" ?
        <div>
          <h2>Blog List</h2>
          {props.user === null ? <Login/>:
            <div>
              <h3>{blog.title}</h3>
              <p><a href={blog.url}>{blog.url}</a></p>
              {likes} likes <Button  variant="outline-primary" onClick={handleLikeOnClick}>like</Button><br/>
              <p>added by {blog.user === undefined ? "Unknown" : blog.user.username}</p>
              <div>
                <h3>Comments</h3>
                <Comments comments={comments} id={blog.id}/>
              </div>
            </div>}
        </div>
        :<div className=".blog">
          <div onClick={toggleVisibility} className="togglable">
            <a href={`/blogs/${blog.id}`}>{blog.title}</a>
          </div>
          <div style={showWhenVisible} className="invisibility">
            {blog.url}<br/>
            {likes} likes <Button variant="outline-primary" onClick={handleLikeOnClick}>like</Button><br/>
            {removableBlog()}
          </div>
        </div>}
    </div>
  )
}



const mapStateToProps = (state, props) => {
  console.log(props,state.blogs)
  return {
    user: state.loggedUser,
    blog: state.blogs.find(blog => blog.id === props.id),
    detail: props.detail,
    id: props.id
  }
}

export default connect(mapStateToProps,{ deleteBlog, updateBlog })(Blog)