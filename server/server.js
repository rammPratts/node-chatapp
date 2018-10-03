const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    socket.emit("newMessage",{
        from: "queso",
        text: "ola chicos xd",
        createdAt: 123
    })

    socket.on("createMessage", (message) => {
        console.log("New message sent: ", message);
    })
});

server.listen(port, () => {
    console.log("Server is up on "+port);
})