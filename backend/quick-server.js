const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let transactions = [];

app.post("/exchange", (req, res) => {
  const { amount, rate } = req.body;

  const result = amount * rate;

  const tx = {
    id: Date.now(),
    amount,
    rate,
    result
  };

  transactions.push(tx);

  res.json({ status: "success", transaction: tx });
});

app.get("/transactions", (req, res) => {
  res.json(transactions);
});

app.get("/dashboard", (req, res) => {
  res.json({
    cashUSD: 10000,
    cashAFN: 500000,
    moneySent: 0,
    moneyReceived: 0,
    transactions: transactions.length
  });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});