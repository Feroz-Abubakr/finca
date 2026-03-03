const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./routes/user.route");
const exchangeRoutes = require("./routes/exchange.route");

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "FinCa Exchange ERP API Running" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/exchange", exchangeRoutes);

module.exports = app;