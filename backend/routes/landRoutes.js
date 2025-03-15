const express = require('express');
const { uploadLandData, fetchAllLandRecords, fetchLandByTitle, uploadCSV } = require('../controllers/landController');

const router = express.Router();

// Route to upload land data
router.post('/upload', uploadLandData);

// Route to fetch all land data
router.get('/all', fetchAllLandRecords);

// Route to fetch land by title number
router.get('/:titleNumber', fetchLandByTitle);

router.post('/uploadCSV', uploadCSV);
module.exports = router;
