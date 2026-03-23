const db = require("../database/connection");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid username"
      });
    }

    const user = result.rows[0];

    if (password !== "admin123") {
      return res.status(401).json({
        error: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Login failed"
    });
  }
};

module.exports = {
  login
};