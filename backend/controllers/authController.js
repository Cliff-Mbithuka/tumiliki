const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { createUser, findUserByEmail } = require("../models/User");

// Register a new user
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered. Try logging in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database with default values for photo and Google ID
    const newUser = await createUser(username, email, hashedPassword, null, null);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// User Login
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    const { password: _, ...userData } = user;
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Google Authentication (Redirect to Google login)
const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

// Google OAuth Callback
const googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, async (err, user) => {
    if (err || !user) {
      console.error("Google Authentication Error:", err);
      return res.redirect(`${process.env.CLIENT_URL}/sign-in`);
    }

    try {
      let existingUser = await findUserByEmail(user.email);

      if (!existingUser) {
        // Create new user with Google ID and profile photo
        existingUser = await createUser(user.displayName, user.email, "", user.photos[0].value, user.id);
      }

      const token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      });

      res.redirect(`${process.env.CLIENT_URL}`); 
    } catch (dbError) {
      console.error("Error saving Google user:", dbError);
      res.redirect(`${process.env.CLIENT_URL}/sign-in`);
    }
  })(req, res, next);
};

// Get the currently authenticated user
const getCurrentUser = async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.token) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserByEmail(decoded.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      photo: user.photo_url, 
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Logout user
const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};

module.exports = {
  register,
  login,
  googleAuth,
  googleCallback,
  getCurrentUser,
  logout,
};

