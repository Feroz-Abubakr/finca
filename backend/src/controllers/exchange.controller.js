const db = require("../database/connection");

const createExchange = async (req, res) => {
  try {

    const { type, description, branch_id, profit } = req.body;

    const query = `
      INSERT INTO transactions (type, description, branch_id, profit)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [type, description, branch_id, profit];

    const result = await db.query(query, values);

    res.status(201).json({
      message: "Transaction created successfully",
      transaction: result.rows[0]
    });

  } catch (error) {

    console.error("Exchange Error:", error);

    res.status(500).json({
      error: "Exchange failed"
    });

  }
};

module.exports = {
  createExchange
};