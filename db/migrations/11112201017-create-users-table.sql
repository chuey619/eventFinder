CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    name VARCHAR(255),
    password_digest VARCHAR(255),
    email VARCHAR(255),
    UNIQUE (email)
);