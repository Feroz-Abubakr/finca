const express = require("express");
const router = express.Router();
const db = require("../database/connection");

router.get("/", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM transactions ORDER BY created_at DESC"
    );

    res.json(result.rows);

  } catch (error) {

    console.error("Transactions error:", error);

    res.status(500).json({
      error: "Failed to fetch transactions"
    });

  }

});

module.exports = router;