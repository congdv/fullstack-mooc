import React from "react"
import PropTypes from "prop-types"
import { Form, Button } from "react-bootstrap"
const BlogForm = ({
  title, author, url,
  handleSubmit,
}) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id="title"
            value={title.value}
            type={title.type}
            onChange={title.onChange}/>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            id="author"
            value={author.value}
            type={author.type}
            onChange={author.onChange}/>
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            value={url.value}
            type={url.type}
            onChange={url.onChange}/>
          <Button type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm