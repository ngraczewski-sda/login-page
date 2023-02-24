const app = require("express")();
const { v4 } = require("uuid");

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

const users = [
  { username: "user1", password: "abcd1234" },
  { username: "user2", password: "1234abcd" },
];
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const validCredentials = users.some((user) => {
    return user.password === password && user.username === username;
  });

  if (validCredentials) {
    res.end("Login successful");
  }

  res.status(401);
  res.end("Login failed");
});

module.exports = app;
