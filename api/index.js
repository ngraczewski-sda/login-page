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
