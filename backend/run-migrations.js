require("dotenv").config();

const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

async function runMigrations() {
  try {
    const migrationsPath = path.join(__dirname, "migrations");
    const files = fs.readdirSync(migrationsPath).sort();

    for (const file of files) {
      const filePath = path.join(migrationsPath, file);
      const sql = fs.readFileSync(filePath, "utf8");

      console.log(`Running migration: ${file}`);
      await pool.query(sql);
    }

    console.log("All migrations executed successfully.");
    process.exit();
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();