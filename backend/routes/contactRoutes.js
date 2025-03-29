const express = require("express");
const { sendMessage } = require("../controllers/contactController");

const router = express.Router();

//  Define Contact Route
router.post("/", sendMessage);

module.exports = router;
