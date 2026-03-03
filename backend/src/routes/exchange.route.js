const express = require("express");
const router = express.Router();
const exchangeController = require("../controllers/exchange.controller");

router.post("/", exchangeController.createExchange);

module.exports = router;