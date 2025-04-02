require("dotenv").config();
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const chatbotController = async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, // Removed "beta"
            {
                contents: [{ role: "user", parts: [{ text: userMessage }] }]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        console.log("API Response:", response.data);

        const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
        res.json({ reply: botReply });

    } catch (error) {
        console.error("Error response:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to get response from Gemini" });
    }
};



module.exports = chatbotController;
