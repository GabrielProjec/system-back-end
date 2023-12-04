const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUser} = require("../controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/logout", logoutUser )
router.get("/getUser", getUser)

module.exports = router;
