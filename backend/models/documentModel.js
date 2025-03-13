const pool = require('../config/db');

const uploadDocument = async (filename, filetype, filedata, description) => {
  const result = await pool.query(
    "INSERT INTO documents (filename, filetype, filedata, description) VALUES ($1, $2, $3, $4) RETURNING *",
    [filename, filetype, filedata, description]
  );
  return result.rows[0];
};

module.exports = { uploadDocument };
