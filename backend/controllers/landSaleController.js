const pool = require("../config/db");
const { validationResult } = require("express-validator");
const fs = require('fs');
// const path = require('path');

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const createLandSale = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array(),
      message: "Validation failed" 
    });
  }

  try {
    console.log("Authenticated User:", req.user); // Debug log
    
    const { title_number, description, price, location } = req.body;
    const photo_url = req.file ? req.file.path : null;
    const seller_id = req.user.id; // This should now work

    if (!seller_id) {
      console.error("Seller ID missing despite authentication");
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    if (!title_number || !description || !price || !location) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    if (parseFloat(price) <= 0) {
      return res.status(400).json({ 
        success: false,
        message: "Price must be greater than 0" 
      });
    }

    const newSale = await pool.query(
      `INSERT INTO land_sales 
       (title_number, description, price, location, photo_url, seller_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title_number, description, price, location, photo_url, seller_id]
    );

    res.status(201).json({
      success: true,
      data: newSale.rows[0]
    });

  } catch (error) {
    console.error("Server error:", error);
    
    // Clean up uploaded file if error occurred
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    if (error.code === "23505") {
      return res.status(400).json({ 
        success: false,
        message: "This title number is already registered" 
      });
    }

    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

// Fetch all lands for sale
const getLandSales = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        title_number, 
        description, 
        price, 
        location, 
        photo_url, 
        seller_id,
        created_at
      FROM land_sales
      ORDER BY created_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllLandSales = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         id, 
         title_number, 
         description, 
         price, 
         location, 
         photo_url, 
         seller_id, 
         created_at 
       FROM land_sales
       ORDER BY created_at DESC`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add to your landSaleController.js
// In landSaleController.js
const deleteLandSale = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  console.log(`Delete attempt - User: ${userId}, Land: ${id}`); // Debug log

  try {
    // 1. Check if land exists
    const landResult = await pool.query(
      'SELECT seller_id FROM land_sales WHERE id = $1',
      [id]
    );

    if (landResult.rows.length === 0) {
      console.log('Land not found');
      return res.status(404).json({ 
        success: false,
        message: 'Land listing not found' 
      });
    }

    // 2. Verify ownership
    const land = landResult.rows[0];
    if (land.seller_id !== userId) {
      console.log(`Ownership mismatch - Land owner: ${land.seller_id}, User: ${userId}`);
      return res.status(403).json({
        success: false,
        message: 'You are not the owner of this listing'
      });
    }

    // 3. Delete if checks pass
    await pool.query('DELETE FROM land_sales WHERE id = $1', [id]);
    console.log('Deletion successful');
    res.status(200).json({ 
      success: true,
      message: 'Listing deleted successfully' 
    });

  } catch (error) {
    console.error('Delete error:', error.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error during deletion' 
    });
  }
};

// Add to your exports
module.exports = {
  createLandSale,
  getLandSales,
  getAllLandSales,
  deleteLandSale,
};
