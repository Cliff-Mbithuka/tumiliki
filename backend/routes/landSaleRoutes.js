const express = require("express");
const router = express.Router();
const { createLandSale } = require("../controllers/landSaleController");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Create Land Sale
router.post("/", authMiddleware, upload.single("photo"), createLandSale);

module.exports = router;
