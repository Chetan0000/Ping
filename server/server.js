const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");

const app = express();
dotenv.config();

// app.use(express.urlencoded);
app.get("/", (req, res) => {
  return res.send("Hello....!");
});

app.get("/chats", (req, res) => {
  console.log(chats);
  return res.send(chats);
});

app.get("/chats/:id", async (req, res) => {
  let id = req.params.id;
  let chat = chats.find((c) => {
    // console.log(c);
    return c._id;
  });
  console.log(chat);
  return res.send(`HHHHH ${chat}`);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error in shooting up the server: ${error}`);
  }

  console.log(`Server is up and running on PORT : ${PORT}`);
});
