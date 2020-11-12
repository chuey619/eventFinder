CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL,
    price FLOAT NOT NULL,
    description TEXT,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id)
);