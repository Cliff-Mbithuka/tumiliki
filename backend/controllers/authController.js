const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');
// const pool = require("../config/db");
const passport = require("passport");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered. Try logging in." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const newUser = await createUser(username, email, hashedPassword);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found. Please sign up first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password. Try again." });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: true, // Secure, not accessible by JavaScript
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "Lax",
    });

    const { password: _, ...userData } = user;
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};





// @desc   Redirect user to Google login
// @route  GET /api/auth/google
const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

// @desc   Google OAuth callback
// @route  GET /api/auth/google/callback
const googleCallback = (req, res) => {
  passport.authenticate("google", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.redirect("http://localhost:3000/sign-in");
    }

    try {
      // Check if user exists in the database
      let existingUser = await findUserByEmail(user.email);

      if (!existingUser) {
        // If user doesn't exist, create a new one
        existingUser = await createUser(user.displayName, user.email, "", user.photos[0].value);
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      console.log("Generated Token:", token);
      // Store token as HTTP-Only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      });

      res.redirect("http://localhost:3000"); // Redirect to home page
    } catch (dbError) {
      console.error("Error saving Google user:", dbError);
      res.redirect("http://localhost:3000/sign-in");
    }
  })(req, res);
};



// @desc   Get logged-in user
// @route  GET /api/auth/me
const getCurrentUser = async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.token) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    const token = req.cookies.token; // Get token from cookies
    console.log("Token received:", token); 
    if (!token) {

      return res.status(401).json({ message: "Not authenticated" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user data:", decoded); 
    const user = await findUserByEmail(decoded.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      photo: user.photo, // Include photo URL for navbar
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};


// @desc   Logout user
// @route  GET /api/auth/logout
const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });

    res.clearCookie("connect.sid"); // Clear session cookie
    res.json({ message: "Logged out successfully" });
  });
};



module.exports = { 
  register, 
  login, 
  googleAuth, 
  googleCallback,
  getCurrentUser, 
  logout 
};

