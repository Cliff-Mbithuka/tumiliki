const express = require("express");
const chatbotController = require("../controllers/chatbotController");

const router = express.Router();

// Define chatbot route
router.post("/chatbot", chatbotController);

module.exports = router;
