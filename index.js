const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.send("WebSocket server is running!");
});

let waitingUser = null;

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    if (waitingUser) {
        socket.emit("partner", waitingUser.id);
        waitingUser.emit("partner", socket.id);
        waitingUser = null;
    } else {
        waitingUser = socket;
        socket.emit("message", "Waiting for a partner...");
    }

    socket.on("skip", () => {
        if (waitingUser === socket) waitingUser = null;
        socket.emit("partner", null);
    });

    socket.on("disconnect", () => {
        if (waitingUser === socket) waitingUser = null;
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
