const db = require("../database/connection");


/* TOTAL PROFIT */

const getTotalProfit = async (req, res) => {
  try {

    const result = await db.query(`
      SELECT SUM(profit) AS total_profit
      FROM transactions
    `);

    res.json({
      message: "Profit report generated",
      totalProfit: result.rows[0].total_profit || 0
    });

  } catch (error) {

    console.error("REPORT ERROR:", error);

    res.status(500).json({
      error: "Report failed"
    });

  }
};



/* DAILY PROFIT */

const getDailyProfit = async (req, res) => {
  try {

    const result = await db.query(`
      SELECT SUM(profit) AS daily_profit
      FROM transactions
      WHERE DATE(created_at) = CURRENT_DATE
    `);

    res.json({
      message: "Daily profit report",
      dailyProfit: result.rows[0].daily_profit || 0
    });

  } catch (error) {

    console.error("DAILY REPORT ERROR:", error);

    res.status(500).json({
      error: "Daily report failed"
    });

  }
};



/* MONTHLY PROFIT */

const getMonthlyProfit = async (req, res) => {
  try {

    const result = await db.query(`
      SELECT SUM(profit) AS monthly_profit
      FROM transactions
      WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)
    `);

    res.json({
      message: "Monthly profit report",
      monthlyProfit: result.rows[0].monthly_profit || 0
    });

  } catch (error) {

    console.error("MONTHLY REPORT ERROR:", error);

    res.status(500).json({
      error: "Monthly report failed"
    });

  }
};


module.exports = {
  getTotalProfit,
  getDailyProfit,
  getMonthlyProfit
};