const path = require("path");
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;

// Create Server From Express App
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(publicPath));

// Make Server Listen to Client Events
io.on("connection", (socket) => {
  console.log("A new User just Connected");

  socket.on("disconnect", (socket) => {
    console.log("User was Disconnected!");
  });
});

server.listen(port, () => {
  console.log(`server is Up on port ${port}`);
});
