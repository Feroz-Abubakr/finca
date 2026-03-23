require('dotenv').config();
const pool = require('./src/database/connection');

async function seedBranches() {
  try {
    const existing = await pool.query(
      "SELECT * FROM branches WHERE name = $1",
      ["Main Branch"]
    );

    if (existing.rows.length === 0) {
      await pool.query(
        "INSERT INTO branches (name) VALUES ($1)",
        ["Main Branch"]
      );
      console.log("Main Branch seeded successfully.");
    } else {
      console.log("Main Branch already exists.");
    }

    process.exit();
  } catch (error) {
    console.error("Error seeding branches:", error);
    process.exit(1);
  }
}

seedBranches();