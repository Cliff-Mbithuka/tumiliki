const express = require("express");
const { reportFraud } = require("../controllers/reportFraudController");

const router = express.Router();

router.post("/report-fraud", reportFraud);

module.exports = router;
