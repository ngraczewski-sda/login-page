import { BASE_URL } from "../constants/baseUrl";

export const postRegister = ({ username, password }) => {
  return fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postLogin = ({ username, password }) => {
  return fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
