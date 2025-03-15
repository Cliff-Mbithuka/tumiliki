const pool = require('../config/db');

// Insert land data into the database
const insertLandRecord = async (landData) => {
  const query = `
    INSERT INTO land_records (
      title_number, owner_name, previous_owners, land_size, location, latitude, longitude, 
      climate, soil_type, price, transaction_history, dispute_status, court_case_link,
      land_use_type, water_electricity_access, road_access, flood_risk_level, land_slope,
      proximity_to_amenities, reserved_status
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 
      $14, $15, $16, $17, $18, $19, $20
    ) RETURNING *;
  `;
  
  const values = [
    landData.title_number, 
    landData.owner_name, 
    landData.previous_owners,
    landData.land_size, 
    landData.location, 
    landData.latitude, 
    landData.longitude,
    landData.climate, 
    landData.soil_type, 
    landData.price, 
    landData.transaction_history, 
    landData.dispute_status, 
    landData.court_case_link, 
    landData.land_use_type,
    landData.water_electricity_access, 
    landData.road_access, 
    landData.flood_risk_level, 
    landData.land_slope, 
    landData.proximity_to_amenities, 
    landData.reserved_status
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Fetch all land records
const getAllLandRecords = async () => {
  const query = `SELECT * FROM land_records`;
  const result = await pool.query(query);
  return result.rows;
};

// Fetch a single land record by title number
const getLandByTitleNumber = async (titleNumber) => {
  const query = `SELECT * FROM land_records WHERE title_number = $1`;
  const result = await pool.query(query, [titleNumber]);
  return result.rows[0];
};

module.exports = {
  insertLandRecord,
  getAllLandRecords,
  getLandByTitleNumber
};
