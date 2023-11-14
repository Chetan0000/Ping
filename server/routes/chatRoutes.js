const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChats,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController.js");
const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

//rout 1 -> access chats <post>
router.post("/", protect, accessChat);

// rout 2 -> fetch chats <get>
router.get("/", protect, fetchChats);

// rout 3 -> create group <post>
router.post("/group", protect, createGroupChats);

// rout 4 -> rename group <put>
router.put("/rename", protect, renameGroup);

// rout 5 -> remove from group <put>
router.put("/groupadd", protect, addToGroup);

//  route 6 -> add to group <put>
router.put("/groupremove", protect, removeFromGroup);

module.exports = router;
