const LoginForm = ({
  handleSubmit,
  // handleUsernameChange,
  // handlePasswordChange,
  // username,
  // password,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input type="text" name="username" />
        </div>
        <div>
          password
          <input type="password" name="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
