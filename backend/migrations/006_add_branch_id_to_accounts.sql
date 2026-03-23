-- Add branch_id column to accounts if it does not exist
ALTER TABLE accounts
ADD COLUMN IF NOT EXISTS branch_id INTEGER;

-- Create cash_balances table if it does not exist
CREATE TABLE IF NOT EXISTS cash_balances (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER NOT NULL,
    currency VARCHAR(10) NOT NULL,
    amount NUMERIC(18,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index safely (this fixes your error)
CREATE INDEX IF NOT EXISTS idx_cash_balances_branch_currency
ON cash_balances (branch_id, currency);