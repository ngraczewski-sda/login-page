const app = require("express")();
var cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

const users = [
  { username: "user1", password: "Abcd1234" },
  { username: "user2", password: "1234Abcd" },
];

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400);
    res.end("Empty username");
    return;
  }

  const passwordInUse = users.find((user) => user.password === password);
  if (passwordInUse) {
    res.status(409);
    res.end(`Password already in use by ${passwordInUse.username}`);
    return;
  }

  const usernameInUse = users.some((user) => user.username === username);
  if (usernameInUse) {
    res.status(409);
    res.end("Username in use");
    return;
  }

  if (!password) {
    res.status(400);
    res.end("Empty password");
    return;
  }

  users.push({
    username,
    password,
  });

  res.status(201);
  res.end("User created");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);

  const validCredentials = users.some((user) => {
    return user.password === password && user.username === username;
  });

  if (validCredentials) {
    res.end("Login successful");
    return;
  }

  res.status(401);
  res.end("Login failed");
});

module.exports = app;
