import React from "react"
import { Form, Button } from "react-bootstrap"

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control value={username.value}
            type={username.type}
            onChange={username.onChange}/>

          <Form.Label>Password:</Form.Label>
          <Form.Control
            value={password.value}
            type={password.type}
            onChange={password.onChange}/>
          <Button variant="primary" type="submit">Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm