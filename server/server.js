const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const connectDb = require("./config/mongo");
const userRoutes = require("./routes/userRoutes");

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

// app.user(notFound);
// app.user(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error in shooting up the server: ${error}`);
  }

  console.log(`Server is up and running on PORT : ${PORT}`);
});
