CREATE TABLE IF NOT EXISTS countries (
    iso_code CHAR(2) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS addresses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    country_code VARCHAR(3) NOT NULL,
    postcode VARCHAR(20),
    city VARCHAR(255),
    street VARCHAR(255),
    number INT,
    suffix VARCHAR(10),
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME,
    FOREIGN KEY (country_code) REFERENCES countries(iso_code)
);

CREATE TABLE IF NOT EXISTS guests (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    address_id BIGINT UNSIGNED NOT NULL,
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME,
    FOREIGN KEY (address_id) REFERENCES addresses(id)
);

CREATE TABLE IF NOT EXISTS admins (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME
);

CREATE TABLE IF NOT EXISTS house_rules (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sort INT UNIQUE NOT NULL,
    rule_text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_methods (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME
);

CREATE TABLE IF NOT EXISTS payment_statuses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(255) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME
);

CREATE TABLE IF NOT EXISTS payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    method_id BIGINT UNSIGNED NOT NULL,
    status_id BIGINT UNSIGNED NOT NULL,
    total_price FLOAT NOT NULL,
    completed_at DATETIME,
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME,
    FOREIGN KEY (method_id) REFERENCES payment_methods(id),
    FOREIGN KEY (status_id) REFERENCES payment_statuses(id)
);

CREATE TABLE IF NOT EXISTS accommodation_types (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) UNIQUE NOT NULL,
    max_guests INT NOT NULL,
    price FLOAT NOT NULL,
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME
);

CREATE TABLE IF NOT EXISTS accommodation_features (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    accommodation_type_id BIGINT UNSIGNED NOT NULL,
    description VARCHAR(255) UNIQUE NOT NULL,
    price FLOAT,
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME,
    FOREIGN KEY (accommodation_type_id) REFERENCES accommodation_types(id)
);

CREATE TABLE IF NOT EXISTS accommodations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    accommodation_type_id BIGINT UNSIGNED NOT NULL,
    accommodation_number SMALLINT UNSIGNED NOT NULL,
    coordinate GEOMETRY NOT NULL,
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME,
    FOREIGN KEY (accommodation_type_id) REFERENCES accommodation_types(id)
);

CREATE TABLE IF NOT EXISTS reservations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    guest_id BIGINT UNSIGNED NOT NULL,
    payment_id BIGINT UNSIGNED NOT NULL,
    accommodation_id BIGINT UNSIGNED NOT NULL,
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME,
    canceled_at DATETIME,
    FOREIGN KEY (guest_id) REFERENCES guests(id),
    FOREIGN KEY (payment_id) REFERENCES payments(id),
    FOREIGN KEY (accommodation_id) REFERENCES accommodations(id)
);

CREATE TABLE IF NOT EXISTS price_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) UNIQUE NOT NULL,
    price FLOAT NOT NULL,
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME
);

CREATE TABLE IF NOT EXISTS line_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    payment_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    created_at DATETIME DEFAULT now(),
    updated_at DATETIME ON UPDATE now(),
    deleted_at DATETIME,
    FOREIGN KEY (payment_id) REFERENCES payments(id),
    FOREIGN KEY (category_id) REFERENCES price_categories(id)
);
