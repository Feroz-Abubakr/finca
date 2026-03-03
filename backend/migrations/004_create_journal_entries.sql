CREATE TABLE IF NOT EXISTS journal_entries (
  id SERIAL PRIMARY KEY,
  transaction_id INTEGER REFERENCES transactions(id) ON DELETE CASCADE,
  account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE,
  debit NUMERIC DEFAULT 0 CHECK (debit >= 0),
  credit NUMERIC DEFAULT 0 CHECK (credit >= 0),
  created_at TIMESTAMP DEFAULT NOW()
);