import { Button, TextField } from "@mui/material";

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
          {/* <input type="text" name="username" /> */}
          <TextField name="username" label="username" />
        </div>
        <div>
          {/* <input type="password" name="password" /> */}
          <TextField label="password" name="password" />
        </div>
        {/* <button type="submit">login</button> */}
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
