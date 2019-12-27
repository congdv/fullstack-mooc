import React from "react"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { useField } from "../hooks"
import { connect } from "react-redux"

import { notificationAction } from "../reducers/notificationReducer"
import { newBlog } from "../reducers/blogReducer"

const CreateBlog = (props) => {
  const title = useField("text")
  const author = useField("text")
  const url = useField("text")

  const blogFormRef = React.createRef()

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      url: url.value,
      author: author.value,
    }
    try {
      props.newBlog(blogObject)
      props.setNotification(
        {
          message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
          type:"success"
        },3)
      title.reset()
      author.reset()
      url.reset()
    }catch (exception) {
      console.log(exception)
    }
  }

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        title = {title}
        author = {author}
        url = {url}
        handleSubmit={addBlog}
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
    newBlog: (blog) => {
      dispatch(newBlog(blog))
    },
  }
}
export default connect(null,mapDispatchToProps)(CreateBlog)