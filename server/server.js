const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const connectDb = require("./config/mongo");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

dotenv.config();
connectDb();
const app = express();

app.use(express.json()); // to accept json data
// app.use(express.urlencoded);
app.get("/", (req, res) => {
  return res.send("Hello....!");
});

// routs all the request's witch has a url /ap/user
// to userRouts
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error in shooting up the server: ${error}`);
  }

  console.log(`Server is up and running on PORT : ${PORT}`);
});
