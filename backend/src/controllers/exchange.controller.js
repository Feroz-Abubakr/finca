const exchangeService = require("../services/exchange.service");

const createExchange = async (req, res) => {
  try {
    const {
      fromCurrencyCode,
      toCurrencyCode,
      fromAmount,
      toAmount,
      commissionAmount = 0,
      description,
    } = req.body;

    if (!fromCurrencyCode || !toCurrencyCode || !fromAmount || !toAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const result = await exchangeService.createExchange({
      fromCurrencyCode,
      toCurrencyCode,
      fromAmount,
      toAmount,
      commissionAmount,
      description,
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error("Exchange Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createExchange,
};