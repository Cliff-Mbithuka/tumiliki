const pool = require('../config/db');

const createUser = async (username, email, hashedPassword, photo_url = null, google_id = null) => {
  const query = `
    INSERT INTO users (username, email, password, photo_url, google_id, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *;
  `;
  const values = [username, email, hashedPassword, photo_url, google_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};


const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
const updateUserPhoto = async (userId, photoUrl) => {
  const query = `UPDATE users SET photo_url = $1 WHERE id = $2 RETURNING *`;
  const values = [photoUrl, userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = { createUser, findUserByEmail, updateUserPhoto };


