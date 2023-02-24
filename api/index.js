const app = require("express")();

const users = [
  { username: "user1", password: "abcd1234" },
  { username: "user2", password: "1234abcd" },
];
app.get("/api/login", (req, res) => {
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
