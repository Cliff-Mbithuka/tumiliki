const express = require('express');
// const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require("./routes/uploadRoutes");
const landRoutes = require('./routes/landRoutes');
const contactRoutes = require("./routes/contactRoutes");
const passport = require("./config/passport"); // Ensure this is required
const session = require("express-session");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();


// Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from frontend
  credentials: true, // Allow cookies and auth headers
}));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {  httpOnly: true,
        secure: false, // Change to true in production (HTTPS)
        sameSite: "Lax", },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api", uploadRoutes);
app.use('/api/land', landRoutes);
app.use("/api/contact", contactRoutes);

// Server Listening
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
