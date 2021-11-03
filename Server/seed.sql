DROP TABLE IF EXISTS pictures;

DROP TABLE IF EXISTS posts;

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
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
    description TEXT,
    public_id TEXT,
    post_id INT,
    FOREIGN KEY(post_id) REFERENCES posts(post_id)
);

CREATE TABLE tags(
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(30) NOT NULL,
    picture_id INT,
    FOREIGN KEY (picture_id) REFERENCES pictures(picture_id),
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

CREATE TABLE trips(
    trip_id SERIAL PRIMARY KEY,
    trip_name VARCHAR(50) NOT NULL,
    date_from TEXT,
    date_to TEXT,
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);