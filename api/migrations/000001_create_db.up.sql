-- Create the 'countries' table
CREATE TABLE IF NOT EXISTS countries (
    iso_code VARCHAR(3) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the 'addresses' table
CREATE TABLE IF NOT EXISTS addresses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    country_id VARCHAR(3) NOT NULL,
    postcode VARCHAR(20),
    city VARCHAR(255),
    street VARCHAR(255),
    number INT,
    suffix VARCHAR(50),
    FOREIGN KEY (country_id) REFERENCES countries(iso_code)
);

-- Create the 'guests' table
CREATE TABLE IF NOT EXISTS guests (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    birthday DATE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    address BIGINT UNSIGNED,
    created_at DATE NOT NULL,
    FOREIGN KEY (address) REFERENCES addresses(id)
);

-- Create the 'payment_methods' table
CREATE TABLE IF NOT EXISTS payment_methods (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the 'payment_statuses' table
CREATE TABLE IF NOT EXISTS payment_statuses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(255) NOT NULL UNIQUE
);

-- Create the 'payments' table
CREATE TABLE IF NOT EXISTS payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    method_id BIGINT UNSIGNED NOT NULL,
    status_id BIGINT UNSIGNED NOT NULL,
    total_price FLOAT NOT NULL,
    completed_at DATE,
    created_at DATE NOT NULL,
    FOREIGN KEY (method_id) REFERENCES payment_methods(id),
    FOREIGN KEY (status_id) REFERENCES payment_statuses(id)
);

-- Create the 'site_types' table
CREATE TABLE IF NOT EXISTS site_types (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL UNIQUE,
    created_at DATE NOT NULL
);

-- Create the 'camp_sites' table
CREATE TABLE IF NOT EXISTS camp_sites (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    site_type_id BIGINT UNSIGNED NOT NULL,
    site_number INT UNSIGNED NOT NULL,
    coordinate POINT NOT NULL,
    created_at DATE NOT NULL,
    FOREIGN KEY (site_type_id) REFERENCES site_types(id)
);

-- Create the 'reservations' table
CREATE TABLE IF NOT EXISTS reservations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    guest_id BIGINT UNSIGNED NOT NULL,
    payment_id BIGINT UNSIGNED NOT NULL,
    camp_site_id BIGINT UNSIGNED NOT NULL,
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    created_at DATE NOT NULL,
    FOREIGN KEY (guest_id) REFERENCES guests(id),
    FOREIGN KEY (payment_id) REFERENCES payments(id),
    FOREIGN KEY (camp_site_id) REFERENCES camp_sites(id)
);

-- Create the 'price_categories' table
CREATE TABLE IF NOT EXISTS price_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE,
    price FLOAT NOT NULL
);

-- Create the 'line_items' table
CREATE TABLE IF NOT EXISTS line_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    payment_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    created_at DATE NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES payments(id),
    FOREIGN KEY (category_id) REFERENCES price_categories(id)
);
