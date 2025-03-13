const { uploadDocument } = require("../models/documentModel");

const handleFileUpload = async (req, res) => {
  const { description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const uploadedFile = await uploadDocument(
      file.originalname,
      file.mimetype,
      file.buffer,
      description
    );

    res.status(201).json({
      message: "File uploaded successfully!",
      file: uploadedFile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { handleFileUpload };
