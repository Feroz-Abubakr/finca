CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- exchange, expense, transfer
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);