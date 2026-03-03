const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

// Register new user
router.post("/register", userController.register);

// Get all users
router.get("/", userController.getAll);

module.exports = router;