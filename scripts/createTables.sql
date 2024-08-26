CREATE TABLE your_table (
    id SERIAL PRIMARY KEY,
    data TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
