CREATE TABLE IF NOT EXISTS `dreamchasers`.`reservations` (
  `id` unsigned int NOT NULL,
  `checkin_date` date DEFAULT NULL,
  `checkout_date` date DEFAULT NULL,
  `num_adults` unsigned tinyint DEFAULT NULL,
  `num_children` unsigned tinyint DEFAULT NULL,
  `reservation_amount` unsigned int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `reservation_camp_site_FK` FOREIGN KEY (`id`) REFERENCES `camp_sites` (`id`),
  CONSTRAINT `reservation_guest_FK` FOREIGN KEY (`id`) REFERENCES `guests` (`id`)
);


CREATE TABLE IF NOT EXISTS `dreamchasers`.`camp_sites` (
  `id` unsigned int NOT NULL,
  `camp_site_number` unsigned int NOT NULL,
  `base_price` unsigned int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `camp_site_camp_status_FK` FOREIGN KEY (`id`) REFERENCES `camp_site_statuses` (`id`),
);


CREATE TABLE IF NOT EXISTS `dreamchasers`.`camp_site_statuses` (
  `id` unsigned int NOT NULL,
  `status_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE IF NOT EXISTS `dreamchasers`.`guests` (
  `id` unsigned int NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email_adress` varchar(255) NOT NULL,
  `phone_number` varchar(12) NOT NULL,
  PRIMARY KEY (`id`)
);
