const pool = require("../database/connection");

/*
GET DAILY REPORT
*/
exports.getDailyReport = async (branchId) => {

  const result = await pool.query(
    `
    SELECT 
      COUNT(*) AS total_exchanges,
      COALESCE(SUM(profit),0) AS total_profit
    FROM transactions
    WHERE branch_id = $1
      AND type = 'exchange'
      AND DATE(created_at) = CURRENT_DATE
    `,
    [branchId]
  );

  return {
    date: new Date().toISOString().split("T")[0],
    total_exchanges: parseInt(result.rows[0].total_exchanges),
    total_profit: parseFloat(result.rows[0].total_profit)
  };
};