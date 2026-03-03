require("dotenv").config();
const pool = require("./src/database/connection");

const seedAccounts = async () => {
  try {
    // Get all currencies
    const currencyResult = await pool.query("SELECT id, code FROM currencies");
    const currencies = currencyResult.rows;

    for (const currency of currencies) {
      const cashAccountName = `Cash ${currency.code}`;
      const commissionAccountName = `Commission Income ${currency.code}`;

      // Cash account (asset)
      await pool.query(
        `
        INSERT INTO accounts (name, type, currency_id)
        VALUES ($1, 'asset', $2)
        ON CONFLICT DO NOTHING;
        `,
        [cashAccountName, currency.id]
      );

      // Commission account (income)
      await pool.query(
        `
        INSERT INTO accounts (name, type, currency_id)
        VALUES ($1, 'income', $2)
        ON CONFLICT DO NOTHING;
        `,
        [commissionAccountName, currency.id]
      );
    }

    console.log("Accounts seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Account seeding failed:", error);
    process.exit(1);
  }
};

seedAccounts();