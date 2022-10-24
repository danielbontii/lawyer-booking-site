CREATE DATABASE lawyerbookingapp;

CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';

CREATE TABLE user_types(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(10) NOT NULL
);

INSERT INTO user_types (name) VALUES('admin');
INSERT INTO user_types (name) VALUES('client');
INSERT INTO user_types (name) VALUES('lawyer');

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type_id UUID REFERENCES user_types(id) NOT NULL,
    verified INTEGER DEFAULT 0
);

CREATE TABLE profiles(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    first_name VARCHAR(100) NOT NULL,
    other_names VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    phone_number VARCHAR(10)NOT NULL,
    summary VARCHAR(255),
    daily_charge REAL,
    image_url VARCHAR(255)
);

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) NOT NULL,
    reviewer_id UUID REFERENCES users(id) NOT NULL,
    rating INTEGER NOT NULL,
    review VARCHAR(750)
)

CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4(),
    case_title VARCHAR(255) NOT NULL,
    case_description VARCHAR(750) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    amount REAL NOT NULL,
    client_id UUID REFERENCES users(id),
    lawyer_id UUID REFERENCES users(id)
)