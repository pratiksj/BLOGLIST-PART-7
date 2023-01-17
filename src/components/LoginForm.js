import { Button, TextField } from "@mui/material";

const LoginForm = ({ handleSubmit }) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField name="username" label="username" />
        </div>
        <div>
          <TextField label="password" name="password" />
        </div>

        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
