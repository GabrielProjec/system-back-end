const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUser, updateUser} = require("../controllers/UserController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/logout", logoutUser )
router.get("/getUser", protect, getUser)
router.patch("/updateUser", protect, updateUser)

module.exports = router;
