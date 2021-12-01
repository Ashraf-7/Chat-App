const path = require("path");
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const formatMessage = require("../utils/messages");
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");

// Create Server From Express App
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use Static Path
const publicPath = path.join(__dirname, "/../public");
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

// Users Array
const users = [
  {
    email: "ashraf@ashraf.com",
    password: 123456,
  },
  {
    email: "omar@omar.com",
    password: 123456,
  },
  {
    email: "amira@amira.com",
    password: 123456,
  },
];

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: uuid(),
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(flash());

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", (req, res) => {
  try {
    users.push({
      id: Data.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
    console.log("Catch Error");
  }
  console.log(users);
});

app.post("/login", (req, res) => {
  let username = req.body.email;
  let password = req.body.password;

  if (
    users.some((user) => {
      return user.email == username && user.password == password;
    })
  ) {
    console.log(username);
    req.session.user = username;
    res.redirect("/chat");
  } else {
    console.error("Login Error"); // return done(null, false, { message: "Email or Password Incorrect" });
  }
});

app.get("/chat", (req, res) => {
  res.render("index.ejs", { username: req.session.user });
});

// Make Server Listen to Client Events
io.on("connection", (socket) => {
  console.log("message", formatMessage("User", "A new User just Connected"));

  // Listen to chatMessage
  socket.on("chatMessage", (data) => {
    io.emit("message", {
      message: data.message,
      socketId: socket.id,
    });
  });

  socket.on("disconnect", (socket) => {
    console.log("message", formatMessage("User", "User was Disconnected!"));
  });
});

// Server Listen to Port 3000
server.listen(port, () => {
  console.log(`server is Up on port ${port}`);
});
