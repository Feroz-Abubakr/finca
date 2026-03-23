import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory storage for MVP
let transactions = [];

/*
POST /exchange
*/
app.post("/exchange", (req, res) => {

  const { amount, from, to, rate } = req.body;

  const result = amount * rate;

  const tx = {
    id: Date.now(),
    amount,
    from,
    to,
    rate,
    result,
    createdAt: new Date().toLocaleString()
  };

  transactions.push(tx);

  res.json({
    status: "success",
    transaction: tx
  });

});

/*
GET /transactions
*/
app.get("/transactions", (req, res) => {
  res.json(transactions);
});

/*
GET /dashboard
*/
app.get("/dashboard", (req, res) => {

  let moneySent = 0;
  let moneyReceived = 0;

  transactions.forEach(t => {
    moneySent += Number(t.amount);
    moneyReceived += Number(t.result);
  });

  res.json({
    cashUSD: 10000,
    cashAFN: 500000,
    moneySent,
    moneyReceived,
    transactions: transactions.length
  });

});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});