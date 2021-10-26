DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username varchar(20) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    hash TEXT NOT NULL,
    admin BOOL DEFAULT FALSE
);

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    city TEXT,
    occasion TEXT,
    details TEXT,
date TEXT
    );

    CREATE TABLE pictures(
        picture_id SERIAL PRIMARY KEY,
        url TEXT,
        public_id TEXT,
        post_id INT,
        FOREIGN KEY(post_id) REFERENCES posts(post_id)
    );