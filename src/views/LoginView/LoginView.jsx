import { useState } from "react";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/Input/Input";
import { useAuthContext } from "../../context/AuthContext";

const validateUsername = (username) => {
  if (!username) {
    return "Username is required";
  }
};

const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must have at least 8 signs";
  }

  if (!/.*[A-Z].*/.test(password)) {
    return "Password must have at least one uppercase letter";
  }

  if (!/.*[0-9].*/.test(password)) {
    return "Password must have at least one number";
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

  const { login } = useAuthContext();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.password || errors.username) {
      return;
    }

    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Username"
        required
        name="username"
        id="username"
        value={username}
        onChange={handleChange}
        error={errors.username}
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
      />
      <Button>Log in</Button>
    </form>
  );
};
