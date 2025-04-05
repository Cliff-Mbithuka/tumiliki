const pool = require('../config/db');
const { validationResult } = require('express-validator');

const createLandSale = async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title_number, description, price, location } = req.body;
    const photo_url = req.file ? req.file.path : null;
    const seller_id = req.user.id;

    // Validate price is positive
    if (parseFloat(price) <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    // Validate file type if photo exists
    if (req.file && !req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ message: "Only image files are allowed" });
    }

    const newSale = await pool.query(
      `INSERT INTO land_sales 
       (title_number, description, price, location, photo_url, seller_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title_number, description, price, location, photo_url, seller_id]
    );

    res.status(201).json(newSale.rows[0]);
  } catch (error) {
    console.error(error.message);
    
    // Handle duplicate title number
    if (error.code === '23505') {
      return res.status(400).json({ message: "This title number is already registered" });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createLandSale,
};
