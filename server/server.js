const express = require("express");
const dotenv = require("dotenv");
// const chats = require("./data");
const connectDb = require("./config/mongo");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config();
connectDb();
const app = express();
app.use(express.urlencoded());
app.use(express.json()); // to accept json data
// app.use(express.urlencoded);
// app.get("/", (req, res) => {
//   return res.send("Hello....!");
// });

// routs all the request's witch has a url /ap/user
// to userRouts
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// ------------------------Deployment-------------------
const _dirname1 = path.resolve();
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(_dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running successfully");
  });
}
// ------------------------Deployment-------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error in shooting up the server: ${error}`);
  }

  console.log(`Server is up and running on PORT : ${PORT}`);
});

// socket.io connection
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io ");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined the room :" + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    if (!chat.users) return console.log("Chats.user not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) {
      } else {
        socket.in(user._id).emit("Message received", newMessageReceived);
      }
    });
  });
});
