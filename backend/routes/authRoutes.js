const express = require("express");
const verifyToken = require("../middleware/verify"); 
const { register, login } = require("../controllers/authController");
const { googleAuth, googleCallback, getCurrentUser, logout } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/google", googleAuth); // Redirect to Google
router.get("/google/callback", googleCallback); // Google callback
router.get("/me",verifyToken, getCurrentUser); // Get logged-in user
router.post("/logout", logout); // Logout user

module.exports = router;
