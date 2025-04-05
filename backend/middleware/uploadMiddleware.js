const multer = require("multer");
const storage = multer.memoryStorage(); // storing in memory (buffer)
const upload = multer({ storage });

module.exports = upload;
