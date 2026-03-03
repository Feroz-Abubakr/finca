const pool = require("../database/connection");

const createExchange = async ({
  fromCurrencyCode,
  toCurrencyCode,
  fromAmount,
  toAmount,
  commissionAmount = 0,
  description,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Get currencies
    const currencyResult = await client.query(
      `SELECT id, code FROM currencies WHERE code IN ($1, $2)`,
      [fromCurrencyCode, toCurrencyCode]
    );

    if (currencyResult.rows.length !== 2) {
      throw new Error("Invalid currency code");
    }

    // 2️⃣ Get accounts
    const accountsResult = await client.query(
      `
      SELECT id, name
      FROM accounts
      WHERE name IN (
        $1,
        $2,
        'Commission Income USD',
        'Exchange Gain/Loss USD'
      )
      `,
      [`Cash ${fromCurrencyCode}`, `Cash ${toCurrencyCode}`]
    );

    const accounts = accountsResult.rows;

    const fromCashAccount = accounts.find(
      (a) => a.name === `Cash ${fromCurrencyCode}`
    );

    const toCashAccount = accounts.find(
      (a) => a.name === `Cash ${toCurrencyCode}`
    );

    const commissionAccount = accounts.find(
      (a) => a.name === "Commission Income USD"
    );

    const gainLossAccount = accounts.find(
      (a) => a.name === "Exchange Gain/Loss USD"
    );

    if (!fromCashAccount || !toCashAccount) {
      throw new Error("Cash account missing");
    }

    if (!commissionAccount) {
      throw new Error("Commission account missing");
    }

    if (!gainLossAccount) {
      throw new Error("Exchange Gain/Loss account missing");
    }

    // 3️⃣ Insert transaction WITH TYPE
    const transactionResult = await client.query(
      `
      INSERT INTO transactions (type, description)
      VALUES ($1, $2)
      RETURNING id
      `,
      ["exchange", description]
    );

    const transactionId = transactionResult.rows[0].id;

    // 4️⃣ Journal Entries

    // Debit: Cash received
    await client.query(
      `
      INSERT INTO journal_entries (transaction_id, account_id, debit, credit)
      VALUES ($1, $2, $3, 0)
      `,
      [transactionId, fromCashAccount.id, fromAmount]
    );

    // Credit: Cash given
    await client.query(
      `
      INSERT INTO journal_entries (transaction_id, account_id, debit, credit)
      VALUES ($1, $2, 0, $3)
      `,
      [transactionId, toCashAccount.id, toAmount]
    );

    // Credit: Commission
    if (commissionAmount > 0) {
      await client.query(
        `
        INSERT INTO journal_entries (transaction_id, account_id, debit, credit)
        VALUES ($1, $2, 0, $3)
        `,
        [transactionId, commissionAccount.id, commissionAmount]
      );
    }

    // 5️⃣ Gain/Loss calculation
    const difference = fromAmount - commissionAmount - toAmount;

    if (difference !== 0) {
      if (difference > 0) {
        // Gain → Credit
        await client.query(
          `
          INSERT INTO journal_entries (transaction_id, account_id, debit, credit)
          VALUES ($1, $2, 0, $3)
          `,
          [transactionId, gainLossAccount.id, difference]
        );
      } else {
        // Loss → Debit
        await client.query(
          `
          INSERT INTO journal_entries (transaction_id, account_id, debit, credit)
          VALUES ($1, $2, $3, 0)
          `,
          [transactionId, gainLossAccount.id, Math.abs(difference)]
        );
      }
    }

    await client.query("COMMIT");

    return {
      success: true,
      transactionId,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createExchange,
};