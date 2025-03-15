const { insertLandRecord, getAllLandRecords, getLandByTitleNumber } = require('../models/LandModel');
const { uploadCSVData } = require('../utils/csvUploader');
const path = require('path');
// Insert land data
const uploadLandData = async (req, res) => {
  try {
    const landData = req.body;
    const newRecord = await insertLandRecord(landData);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Failed to upload land data' });
  }
};

// Fetch all land records
const fetchAllLandRecords = async (req, res) => {
  try {
    const records = await getAllLandRecords();
    res.status(200).json(records);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Failed to fetch land records' });
  }
};

// Fetch a single land record by title number
const fetchLandByTitle = async (req, res) => {
  try {
    const { titleNumber } = req.params;
    const record = await getLandByTitleNumber(titleNumber);
    if (!record) return res.status(404).json({ message: 'Land record not found' });
    res.status(200).json(record);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Failed to fetch land record' });
  }
};

// Upload CSV data
const uploadCSV = async (req, res) => {
    const csvPath = path.join(__dirname, '../data/synthetic_land_data.csv');
    try {
      uploadCSVData(csvPath);
      res.status(200).json({ message: 'CSV data uploaded successfully!' });
    } catch (error) {
      console.error('CSV Upload Error:', error);
      res.status(500).json({ message: 'CSV upload failed' });
    }
  };

module.exports = {
  uploadLandData,
  fetchAllLandRecords,
  fetchLandByTitle,
  uploadCSV,
};
