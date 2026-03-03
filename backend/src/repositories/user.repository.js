const pool = require("../database/connection");

/**
 * Create new user
 */
const createUser = async (name, email, passwordHash, role = "user") => {
  const query = `
    INSERT INTO users (name, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at;
  `;

  const values = [name, email, passwordHash, role];

  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Find user by email
 */
const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

/**
 * Get all users
 */
const getAllUsers = async () => {
  const result = await pool.query(
    "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
  );

  return result.rows;
};

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
};