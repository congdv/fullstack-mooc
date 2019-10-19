import React from "react";

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username.value}
            type={username.type}
            onChange={username.onChange}/>
        </div>

        <div>
          password
          <input
            value={password.value}
            type={password.type}
            onChange={password.onChange}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;