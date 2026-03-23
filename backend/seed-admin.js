require("dotenv").config();
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

async function seedAdmin() {
  try {
    const passwordHash = await bcrypt.hash("admin123", 10);

    const result = await pool.query(
      `
      INSERT INTO users (username, password_hash, role, branch_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username
      `,
      ["admin", passwordHash, "admin", 1]
    );

    console.log("Admin user created:", result.rows[0]);
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();