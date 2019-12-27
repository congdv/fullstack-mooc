import React, { useState } from "react"
import { useField } from "../hooks"
import blogService from "../services/blogs"
import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap"

const Comment = (props) => {
  return(
    <li>{props.comment}</li>
  )
}

const Comments = (props) => {
  const [comments, setComments] = useState(props.comments)
  const commentField = useField("text")

  const addComment = (event) => {
    event.preventDefault()
    const commentObject = {
      content: commentField.value,
      blogId: props.id
    }
    blogService.addComment(commentObject).then(
      savedComment =>
        setComments(comments.concat({
          content: savedComment.content,
          id: savedComment.id
        })))
    commentField.reset()
  }
  return(
    <div>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control  value={commentField.value}
            type={commentField.type}
            onChange={commentField.onChange}/>
          <Button type="submit">Add Comment</Button>
        </Form.Group>
      </Form>
      {comments.map(comment => <Comment key={comment.id} comment = {comment.content} />)}
    </div>
  )
}

export default Comments