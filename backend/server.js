const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require("./routes/uploadRoutes");
const landRoutes = require('./routes/landRoutes');
const contactRoutes = require("./routes/contactRoutes");
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api", uploadRoutes);
app.use('/api/land', landRoutes);
app.use("/api/contact", contactRoutes);

// Server Listening
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
