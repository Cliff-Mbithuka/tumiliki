const jwt = require('jsonwebtoken');
const { Pool } = require('pg'); // Import Pool from pg

// Initialize the pool with your database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Get token from header or cookies
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                 req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Get user from database
    const user = await pool.query(
      'SELECT * FROM users WHERE id = $1', 
      [decoded.userId]
    );

    if (!user.rows[0]) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication failed' 
      });
    }

    // 4. Attach user to request
    req.user = user.rows[0];
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Please authenticate' 
    });
  }
};

module.exports = authMiddleware;