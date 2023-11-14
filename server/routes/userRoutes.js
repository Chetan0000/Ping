const express = require("express");
const router = express.Router();

const {
  registerUser,
  authUser,
  allUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/signUp").post(registerUser);
router.post("/login", authUser);
router.get("/", protect, allUser);

module.exports = router;
