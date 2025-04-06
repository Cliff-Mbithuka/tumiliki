const express = require("express");
const router = express.Router();
const { createLandSale, getLandSales,getAllLandSales,deleteLandSale } = require("../controllers/landSaleController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Create Land Sale - proper middleware order
router.post("/", authMiddleware, upload.single("photo"),  createLandSale);

// Fetch all lands for marketplace
router.get('/marketplace', getLandSales);
router.get('/', getAllLandSales);
// Add this to your routes file
router.delete('/:id', authMiddleware, deleteLandSale);
module.exports = router;