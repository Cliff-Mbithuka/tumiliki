const pool = require("../config/db"); // Database connection
const multer = require("multer");
const path = require("path");

// Set up file storage
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("evidence");

// Handle fraud report submission
exports.reportFraud = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: "File upload failed" });

    const { fullName, email, phone, fraudType, description } = req.body;
    const evidence = req.file ? req.file.filename : null;

    try {
      const query = `
        INSERT INTO fraud_reports (full_name, email, phone, fraud_type, description, evidence) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
      `;
      const values = [fullName, email, phone, fraudType, description, evidence];
      const result = await pool.query(query, values);

      res.status(201).json({ message: "Fraud report submitted", report: result.rows[0] });
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  });
};
