const axios = require("axios");

const chatWithBot = async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Error in chatbot response:", error);
        res.status(500).json({ error: "Failed to get response from ChatGPT" });
    }
};

module.exports = { chatWithBot };
