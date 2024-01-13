const express = require("express");
const router = express.Router();

const {
  registerUser,
  authUser,
  allUer,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/signUp").post(registerUser);
router.post("/login", authUser);
router.get("/", protect, allUer);

module.exports = router;
