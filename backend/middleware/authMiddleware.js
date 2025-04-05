const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Check both cookies and Authorization header
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Authentication required',
      shouldLogout: true
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ 
      success: false,
      message: 'Invalid or expired token',
      shouldLogout: true
    });
  }
};
module.exports = authMiddleware;
