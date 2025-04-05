const pool = require('../db'); // Assuming you are using pg Pool

// Create Land Sale
exports.createLandSale = async (req, res) => {
  try {
    const { title_number, description, price } = req.body;
    const photo_url = req.file ? req.file.path : null; // If using multer for photo upload
    const seller_id = req.user.id; // Assuming req.user is set after login

    const newSale = await pool.query(
      `INSERT INTO land_sales (title_number, description, price, photo_url, seller_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title_number, description, price, photo_url, seller_id]
    );

    res.status(201).json(newSale.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
