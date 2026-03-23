const db = require("../config/db");

async function createExchange(branchId, data) {
  const { fromCurrency, toCurrency, fromAmount } = data;

  try {
    // get market rate
    const rateResult = await db.query(
      `SELECT rate FROM exchange_rates 
       WHERE base_currency = $1 AND target_currency = $2 
       ORDER BY created_at DESC LIMIT 1`,
      [fromCurrency, toCurrency]
    );

    if (rateResult.rows.length === 0) {
      throw new Error("Exchange rate not found");
    }

    const rate = rateResult.rows[0].rate;

    // calculate amounts
    const toAmount = fromAmount * rate;

    // example profit (1 AFN per USD)
    const profit = fromAmount * 1;

    // update balances
    await db.query(
      `UPDATE cash_balances 
       SET amount = amount - $1
       WHERE currency = $2 AND branch_id = $3`,
      [fromAmount, fromCurrency, branchId]
    );

    await db.query(
      `UPDATE cash_balances 
       SET amount = amount + $1
       WHERE currency = $2 AND branch_id = $3`,
      [toAmount, toCurrency, branchId]
    );

    // save transaction
    const transaction = await db.query(
      `INSERT INTO transactions 
      (type, description, branch_id, profit)
      VALUES ($1,$2,$3,$4)
      RETURNING *`,
      [
        "exchange",
        `Exchange ${fromAmount} ${fromCurrency} -> ${toAmount} ${toCurrency} @ rate ${rate}`,
        branchId,
        profit
      ]
    );

    return transaction.rows[0];

  } catch (error) {
    throw error;
  }
}

module.exports = {
  createExchange
};