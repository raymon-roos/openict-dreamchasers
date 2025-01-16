-- use dreamchasers;

START TRANSACTION;

INSERT INTO addresses (id, country_id, postcode, city, street, number, suffix) VALUES
(1, 'US', '10001', 'New York', 'Broadway', 123, 'A'),
(2, 'CA', 'M5H 2N2', 'Toronto', 'Queen St', 456, ''),
(3, 'GB', 'SW1A 1AA', 'London', 'Downing St', 10, ''),
(4, 'AU', '2000', 'Sydney', 'George St', 789, 'B'),
(5, 'NL', '1012 JS', 'Amsterdam', 'Damstraat', 1, 'A'),
(6, 'US', '30303', 'Atlanta', 'Peachtree St', 789, ''),
(7, 'NL', '2595 AK', 'The Hague', 'Laan van NOI', 100, 'C'),
(8, 'GB', 'E1 6AN', 'London', 'Brick Lane', 200, '');

INSERT INTO guests (id, first_name, middle_name, last_name, date_of_birth, email, phone_number, address_id) VALUES
(1, 'John', 'A.', 'Doe', '1985-04-12', 'john.doe@example.com', '+11234567890', 1),
(2, 'Jane', 'B.', 'Smith', '1992-07-08', 'jane.smith@example.com', '+11234567891', 2),
(3, 'Robert', NULL, 'Johnson', '1978-03-23', 'robert.johnson@example.com', '+11234567892', 3),
(4, 'Emily', 'C.', 'Brown', '2000-12-05', 'emily.brown@example.com', '+11234567893', 4),
(5, 'Klaas', '', 'Willem', '1993-05-18', 'klaas@example.com', '+31234567894', 5),
(6, 'Alice', 'D.', 'Cooper', '1990-01-15', 'alice.cooper@example.com', '+11234567895', 6),
(7, 'Henk', '', 'de Vries', '1988-11-10', 'henk@example.com', '+31234567896', 7),
(8, 'Sarah', 'E.', 'Lee', '1995-06-25', 'sarah.lee@example.com', '+11234567897', 8);

INSERT INTO admins (username, email, password) VALUES
('boerbert', 'boerbert@example.com', 'password123');

INSERT INTO house_rules (sort, rule_text) VALUES
(1, "Huisdieren toegestaan, maximaal 2 huisdieren per standplaats. Per huisdier, per nacht, € 2,50,- extra"),
(2, "Open vuur en BBQ verboden, gaskeukens en gas-BBQ toegestaan"),
(3, "Zwembad open van 10:00 tot 21:00"),
(4, "Na 22:00 stil op de camping"),
(5, "Toegang camping van 07:00 's ochtends tot 23:00 's avonds"),
(6, "Inchecken vanaf 15:00, uitchecken uiterlijk om 10:00"),
(7, "Restaurant open van 11:00 tot 20:00 (sluit keuken)"),
(8, "Geen jongeren groepen"),
(9, "Bezoekers overdag toegestaan");

INSERT INTO payment_methods (id, name) VALUES
(1, 'Credit Card'),
(2, 'PayPal'),
(3, 'Ideal');

INSERT INTO payment_statuses (id, status) VALUES
(1, 'Pending'),
(2, 'Completed'),
(3, 'Failed');

INSERT INTO payments (id, method_id, status_id, total_price, completed_at) VALUES
(1, 1, 2, 100.0, '2023-12-20 14:00:00'),
(2, 2, 1, 200.0, NULL),
(3, 3, 2, 150.0, '2023-12-21 10:30:00'),
(4, 1, 2, 120.0, '2023-12-22 16:45:00'),
(5, 2, 1, 180.0, NULL),
(6, 3, 2, 250.0, '2023-12-23 18:00:00'),
(7, 1, 2, 300.0, '2023-12-24 12:00:00'),
(8, 2, 1, 400.0, NULL);

INSERT INTO accommodation_types (id, type, max_guests, price) VALUES
(1, 'kampeerplaats', 1, 50.0),
(2, 'bungalow', 2, 75.0);

INSERT INTO accommodation_features (id, accommodation_type_id, description, price) VALUES
(1, 1, 'Ocean View', 10.0),
(2, 2, 'Balcony', 15.0);

INSERT INTO accommodations (id, accommodation_type_id, accommodation_number, coordinate) VALUES
(1, 1, 101, ST_GeomFromText('POINT(40.7128 -74.0060)')),
(2, 2, 202, ST_GeomFromText('POINT(43.65107 -79.347015)')),
(3, 1, 102, ST_GeomFromText('POINT(51.5074 -0.1278)')),
(4, 2, 203, ST_GeomFromText('POINT(52.379189 4.899431)')),
(5, 2, 204, ST_GeomFromText('POINT(48.8566 2.3522)'));

INSERT INTO reservations (id, guest_id, payment_id, accommodation_id, checkin, checkout) VALUES
(1, 1, 1, 1, '2024-01-01', '2024-01-05'),
(2, 2, 2, 2, '2024-02-01', '2024-02-10'),
(3, 3, 3, 3, '2024-03-01', '2024-03-05'),
(4, 4, 4, 4, '2024-04-01', '2024-04-07'),
(5, 5, 5, 5, '2024-05-01', '2024-05-03'),
(6, 6, 6, 1, '2024-06-01', '2024-06-05'),
(7, 7, 7, 2, '2024-07-01', '2024-07-06'),
(8, 8, 8, 3, '2024-08-01', '2024-08-07');

INSERT INTO price_categories (id, category_name, price) VALUES
(1, 'Standard Cleaning Fee', 20.0),
(2, 'Late Checkout Fee', 30.0);

INSERT INTO line_items (id, payment_id, category_id, quantity) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 1, 3),
(4, 4, 2, 1),
(5, 5, 1, 2),
(6, 6, 2, 3),
(7, 7, 1, 1),
(8, 8, 2, 4);

COMMIT;
