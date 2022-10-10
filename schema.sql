CREATE DATABASE lawyerbookingapp;

CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';

CREATE TABLE user_types(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(10) NOT NULL
);

INSERT INTO user_types (type) VALUES('admin');
INSERT INTO user_types (type) VALUES('client');
INSERT INTO user_types (type) VALUES('lawyer');

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type_id VARCHAR(100) REFERENCES user_types(id)
);