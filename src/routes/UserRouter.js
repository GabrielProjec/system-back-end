const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  loginStatus,
  upgradeUser,
  sendAutomatedEmail
} = require("../controllers/UserController");
const {
  protect,
  adminOlny,
  authorOlny,
} = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", protect, getUser);
router.patch("/updateUser", protect, updateUser);
router.delete("/:id", protect, adminOlny, deleteUser);
router.get("/getUsers", protect, authorOlny, getUsers);
router.get("/loginStatus", loginStatus);
router.post("/upgradeUser", protect, adminOlny, upgradeUser);
router.post("/sendAutomatedEmail", protect, sendAutomatedEmail)

module.exports = router;
