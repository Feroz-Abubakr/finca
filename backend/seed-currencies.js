require("dotenv").config();
const pool = require("./src/database/connection");

const seedCurrencies = async () => {
  try {
    const currencies = [
      { code: "USD", name: "US Dollar", symbol: "$" },
      { code: "AFN", name: "Afghan Afghani", symbol: "؋" },
      { code: "EUR", name: "Euro", symbol: "€" },
      { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
      { code: "TOM", name: "Iran Toman", symbol: "﷼" },
      { code: "UZS", name: "Uzbekistan Som", symbol: "soʻm" },
      { code: "CNY", name: "Chinese Yuan", symbol: "¥" }
    ];

    for (const currency of currencies) {
      await pool.query(
        `
        INSERT INTO currencies (code, name, symbol)
        VALUES ($1, $2, $3)
        ON CONFLICT (code) DO NOTHING;
        `,
        [currency.code, currency.name, currency.symbol]
      );
    }

    console.log("Currencies seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedCurrencies();