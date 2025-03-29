const express = require("express");
const { chatWithBot } = require("../controllers/chatbotController");

const router = express.Router();

// Define chatbot route
router.post("/", chatWithBot);

module.exports = router;
