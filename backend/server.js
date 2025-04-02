const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
console.log("API Key:", process.env.GEMINI_API_KEY); // Add this line to check

require("./config/passport");
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require("./routes/uploadRoutes");
const landRoutes = require('./routes/landRoutes');
const contactRoutes = require("./routes/contactRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const passport = require("./config/passport"); 
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();



// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));
// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {  httpOnly: true,
        secure: false, 
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
app.use("/api", chatbotRoutes);
// Server Listening
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
