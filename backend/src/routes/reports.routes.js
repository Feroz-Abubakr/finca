const express = require("express");
const router = express.Router();

const reportsController = require("../controllers/reports.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/profit", authMiddleware, reportsController.getTotalProfit);

router.get("/daily", authMiddleware, reportsController.getDailyProfit);

router.get("/monthly", authMiddleware, reportsController.getMonthlyProfit);

module.exports = router;