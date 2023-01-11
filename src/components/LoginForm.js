import { TextField, Button } from "@mui/material";

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
          <TextField name="username" label="username" />
          {/* <input type="text" name="username" /> */}
        </div>
        <div>
          <TextField label="password" name="password" />

          {/* <input type="password" name="password" /> */}
        </div>
        <Button variant="contained" color="primary" type="login">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
