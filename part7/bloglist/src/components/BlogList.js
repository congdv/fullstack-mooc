import React from "react"
import { connect } from "react-redux"
import Blog from "./Blog"
import { Table } from "react-bootstrap"

const BlogList = (props) => {
  return (
    <div>
      <Table striped><tbody>{props.blogs.map(blog => <tr key={blog.id}><td><Blog  blog={blog} id={blog.id}/></td><td>{blog.author}</td></tr>)}</tbody></Table>
    </div>
  )
}

const blogsToShow = ({ blogs }) => {
  return blogs.sort((firstBlog, secondBlog) => {
    return secondBlog.likes - firstBlog.likes
  })
}

const mapStateToProps = (state) => {
  return {
    blogs: blogsToShow(state)
  }
}

export default connect(mapStateToProps)(BlogList)