import { useState } from "react";
import { Button } from "../../components/button/Button";
import { Error } from "../../components/error/Error";
import { Input } from "../../components/Input/Input";
import { useAuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const validateUsername = (username) => {
  if (!username) {
    return "Username is required";
  }
};

const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }
};

export const LoginView = () => {
  const [{ username, password }, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const errors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginData({
      username,
      password,
      [name]: value,
    });
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const { login, error } = useAuthContext();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.password || errors.username) {
      return;
    }

    login({ username, password }).then(() => {
      history.push("/home");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <Error>{error}</Error>}
      <Input
        label="Username"
        required
        name="username"
        id="username"
        value={username}
        onChange={handleChange}
        error={errors.username}
        touched={touched.username}
      />

      <Input
        label="Password"
        required
        name="password"
        id="password"
        type="password"
        value={password}
        onChange={handleChange}
        error={errors.password}
        touched={touched.password}
      />
      <Button disabled={errors.password || errors.username}>Log in</Button>
    </form>
  );
};
