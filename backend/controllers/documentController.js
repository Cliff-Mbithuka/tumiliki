const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const Tesseract = require("tesseract.js");
const { uploadDocument } = require("../models/documentModel");
const pool = require("../config/db");

// Function to extract title number from text
const extractTitleFromText = (text) => {
  const regex = /\b(?:KAJIADO\/LOODARIAK|LR\d{6})\b/i;
  const match = text.match(regex);
  return match ? match[0].toUpperCase() : null;
};



// Function to extract text from an image using Tesseract OCR
const extractTextFromImage = async (imageBuffer) => {
  const { data: { text } } = await Tesseract.recognize(imageBuffer);
  return text;
};

// Function to extract title number based on file type
const extractTitleNumber = async (file) => {
  const fileType = file.mimetype;

  try {
    if (fileType === "application/pdf") {
      const data = await pdfParse(file.buffer);
      return extractTitleFromText(data.text);
    } else if (fileType === "application/msword") {
      const { value } = await mammoth.extractRawText({ buffer: file.buffer });
      return extractTitleFromText(value);
    } else if (fileType === "text/plain") {
      return extractTitleFromText(file.buffer.toString("utf-8"));
    } else if (fileType.startsWith("image/")) {
      const imageText = await extractTextFromImage(file.buffer);
      return extractTitleFromText(imageText);
    }
  } catch (error) {
    console.error("Error extracting text:", error);
  }

  return null;
};

// File upload handler with title verification
const handleFileUpload = async (req, res) => {
  const { description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    // Extract title number from the uploaded file
    const titleNumber = await extractTitleNumber(file);

    if (!titleNumber) {
      return res.status(400).json({ message: "No valid title number found in the document." });
    }

    // Check if the title number exists in the database
    const result = await pool.query("SELECT * FROM land_records WHERE title_number = $1", [titleNumber]);
    const landFound = result.rows.length > 0;

    if (!landFound) {
      return res.status(404).json({ message: "Land title not found in the system." });
    }

    // Store document in database
    const uploadedFile = await uploadDocument(
      file.originalname,
      file.mimetype,
      file.buffer,
      description
    );

    res.status(201).json({
      message: "File uploaded successfully! Title number verified.",
      titleNumber,
      file: uploadedFile,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { handleFileUpload };

