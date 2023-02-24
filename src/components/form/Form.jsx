import { useState } from "react";

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

export const Form = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.password || errors.username) {
      return;
    }

    fetch("/api/login", {
      method: "POST",
      body: {
        username,
        password,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          required
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
        />
        {!!errors.username && <div>{errors.username}</div>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        {!!errors.password && <div>{errors.password}</div>}
        <button>Log in</button>
      </div>
    </form>
  );
};
