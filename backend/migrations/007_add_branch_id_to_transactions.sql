ALTER TABLE transactions
ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES branches(id);