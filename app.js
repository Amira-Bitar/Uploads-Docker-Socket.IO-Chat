const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

const errorHandler = require("./middleware/errorHandler");
const app = express();

const server = http.createServer(app);

const io = new Server(server);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "view"));
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
    server.listen(process.env.PORT, () => {
      console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}`);
    });

  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/upload", require("./routes/upload.routes"));
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    //  مستخدم انضم للدردشة
    socket.on("chat:join", (data) => {
        console.log(`${data.username} joined the chat`);

        socket.emit("chat:join", {
            message: `Welcome ${data.username}!`
        });

        socket.broadcast.emit("chat:join", {
            message: `${data.username} joined the chat`
        });
    });

    //  إرسال رسالة
    socket.on("chat:message", (data) => {
        console.log(`${data.username}: ${data.text}`);

        io.emit("chat:message", {
            username: data.username,
            text: data.text
        });
    });

    socket.on("chat:typing", (data) => {
    console.log(`${data.username} is typing...`);
  
    socket.broadcast.emit("chat:typing", {
        username: data.username
    });
    });

        socket.on("chat:stopTyping", (data) => {
        socket.broadcast.emit("chat:stopTyping", data);
        });
  
    // عند قطع الاتصال
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        socket.broadcast.emit("user-left", {
            message: `User ${socket.id} left the chat`
        });
    });
});
app.get("/", (req, res) => {
    res.render("index");
});
app.use(errorHandler);