const csvParser = require('csv-parser');
const fs = require('fs');
const pool = require('../config/db');

// Function to upload CSV data
const uploadCSVData = async (filePath) => {
  const records = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        if (row.previous_owners.includes(',')) {
            row.previous_owners = `{${row.previous_owners.split(',').map(owner => `"${owner.trim()}"`).join(',')}}`;
          } else {
            row.previous_owners = `{${row.previous_owners}}`; // ✅ Convert single owner to array
          }
        // console.log('Row:', row);
        records.push(row);
      })
      .on('end', async () => {
        // console.log('All Records:', records);
        try {
          for (const record of records) {
            await pool.query(`
              INSERT INTO land_records (
    title_number, owner_name, previous_owners, land_size, location, latitude, longitude, 
    climate, soil_type, price, transaction_history, dispute_status, court_case_link,
    land_use_type, water_electricity_access, road_access, flood_risk_level, land_slope,
    proximity_to_amenities, reserved_status
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 
    $14, $15, $16, $17, $18, $19, $20
  ) ON CONFLICT (title_number) 
  DO UPDATE SET 
    owner_name = EXCLUDED.owner_name,
    previous_owners = EXCLUDED.previous_owners,
    land_size = EXCLUDED.land_size,
    location = EXCLUDED.location,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    climate = EXCLUDED.climate,
    soil_type = EXCLUDED.soil_type,
    price = EXCLUDED.price,
    transaction_history = EXCLUDED.transaction_history,
    dispute_status = EXCLUDED.dispute_status,
    court_case_link = EXCLUDED.court_case_link,
    land_use_type = EXCLUDED.land_use_type,
    water_electricity_access = EXCLUDED.water_electricity_access,
    road_access = EXCLUDED.road_access,
    flood_risk_level = EXCLUDED.flood_risk_level,
    land_slope = EXCLUDED.land_slope,
    proximity_to_amenities = EXCLUDED.proximity_to_amenities,
    reserved_status = EXCLUDED.reserved_status;
            `, [
              record.title_number,
              record.owner_name,
              record.previous_owners,
              record.land_size,
              record.location,
              record.latitude,
              record.longitude,
              record.climate,
              record.soil_type,
              record.price,
              record.transaction_history,
              record.dispute_status,
              record.court_case_link,
              record.land_use_type,
              record.water_electricity_access,
              record.road_access,
              record.flood_risk_level,
              record.land_slope,
              record.proximity_to_amenities,
              record.reserved_status
            ]);
          }
          resolve('CSV data inserted successfully');
        } catch (error) {
          console.error('CSV Upload Error:', error);
          reject(error);
        }
      });
  });
};

module.exports = { uploadCSVData };
