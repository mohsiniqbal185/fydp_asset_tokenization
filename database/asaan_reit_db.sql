/*
SQLyog Community
MySQL - 10.4.18-MariaDB : Database - asaan_reit_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `property` */

CREATE TABLE `property` (
  `property_id` int(11) NOT NULL,
  `property_type` varchar(50) DEFAULT NULL,
  `value_in_pkr` decimal(10,2) DEFAULT NULL,
  `no_of_tokens` int(11) DEFAULT NULL,
  `tokens_sold` int(11) DEFAULT NULL,
  `size_of_property` decimal(10,2) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `property` */

/*Table structure for table `rent` */

CREATE TABLE `rent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) DEFAULT NULL,
  `rent_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `rent` */

/*Table structure for table `rental_month` */

CREATE TABLE `rental_month` (
  `month_id` int(11) NOT NULL AUTO_INCREMENT,
  `month_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`month_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `rental_month` */

/*Table structure for table `rental_transactions` */

CREATE TABLE `rental_transactions` (
  `rental_transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `rental_month_id` int(11) DEFAULT NULL,
  `rental_year_id` int(11) DEFAULT NULL,
  `rental_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`rental_transaction_id`),
  KEY `property_id` (`property_id`),
  KEY `rental_month_id` (`rental_month_id`),
  KEY `rental_year_id` (`rental_year_id`),
  CONSTRAINT `rental_transactions_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  CONSTRAINT `rental_transactions_ibfk_2` FOREIGN KEY (`rental_month_id`) REFERENCES `rental_month` (`month_id`),
  CONSTRAINT `rental_transactions_ibfk_3` FOREIGN KEY (`rental_year_id`) REFERENCES `rental_year` (`year_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `rental_transactions` */

/*Table structure for table `rental_year` */

CREATE TABLE `rental_year` (
  `year_id` int(11) NOT NULL AUTO_INCREMENT,
  `year_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`year_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `rental_year` */

/*Table structure for table `smart_contracts` */

CREATE TABLE `smart_contracts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) DEFAULT NULL,
  `deployer_address` varchar(150) DEFAULT NULL,
  `contract_address` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `smart_contracts_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `smart_contracts` */

/*Table structure for table `token_transactions` */

CREATE TABLE `token_transactions` (
  `token_transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `no_of_tokens` int(11) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `transaction_hash` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`token_transaction_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `token_transactions_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `token_transactions` */

/*Table structure for table `tokens` */

CREATE TABLE `tokens` (
  `token_id` int(11) NOT NULL AUTO_INCREMENT,
  `token_name` varchar(100) DEFAULT NULL,
  `token_symbol` varchar(10) DEFAULT NULL,
  `token_value` decimal(10,2) DEFAULT NULL,
  `total_supply` int(11) DEFAULT NULL,
  PRIMARY KEY (`token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `tokens` */

/*Table structure for table `user` */

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `user_role` int(11) DEFAULT NULL,
  `CNIC` varchar(100) DEFAULT NULL,
  `wallet_address` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
