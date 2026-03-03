CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL, -- asset, liability, income, expense, equity
  currency_id INTEGER REFERENCES currencies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);