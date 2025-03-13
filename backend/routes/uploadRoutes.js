const express = require("express");
const multer = require("multer");
const { handleFileUpload } = require("../controllers/documentController");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), handleFileUpload);

module.exports = router;
