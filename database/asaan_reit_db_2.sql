-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2023 at 10:32 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asaan_reit_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `property_id` int(11) NOT NULL,
  `property_type` varchar(50) DEFAULT NULL,
  `value_in_pkr` decimal(10,2) DEFAULT NULL,
  `no_of_tokens` int(11) DEFAULT NULL,
  `tokens_sold` int(11) DEFAULT NULL,
  `size_of_property` decimal(10,2) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `property_code` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`property_id`, `property_type`, `value_in_pkr`, `no_of_tokens`, `tokens_sold`, `size_of_property`, `location`, `name`, `image`, `property_code`) VALUES
(1, 'rental', 15000000.00, 1000, 100, 500.00, 'Chowk Waris Khan Murree Road. Rawalpindi. Punjab.', 'Kareem Plaza', '/assets/property1.jpg', 'KP'),
(2, 'rental', 25000000.00, 2000, 200, 600.00, 'C-192, North Nazimabad, Karachi, Sindh.', 'Shah Jehan Plaza', '/assets/property2.jpg', 'SJP');

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

CREATE TABLE `rent` (
  `id` int(11) NOT NULL,
  `property_id` int(11) DEFAULT NULL,
  `rent_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rental_month`
--

CREATE TABLE `rental_month` (
  `month_id` int(11) NOT NULL,
  `month_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rental_month`
--

INSERT INTO `rental_month` (`month_id`, `month_name`) VALUES
(1, 'JAN'),
(2, 'FEB'),
(3, 'MAR'),
(4, 'APR'),
(5, 'MAY'),
(6, 'JUN'),
(7, 'JUL'),
(8, 'AUG'),
(9, 'SEP'),
(10, 'OCT'),
(11, 'NOV'),
(12, 'DEC');

-- --------------------------------------------------------

--
-- Table structure for table `rental_transactions`
--

CREATE TABLE `rental_transactions` (
  `rental_transaction_id` int(11) NOT NULL,
  `property_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `date_time` datetime DEFAULT current_timestamp(),
  `rental_month_id` int(11) DEFAULT NULL,
  `rental_year_id` int(11) DEFAULT NULL,
  `rental_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rental_year`
--

CREATE TABLE `rental_year` (
  `year_id` int(11) NOT NULL,
  `year_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `request_status`
--

CREATE TABLE `request_status` (
  `status_id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request_status`
--

INSERT INTO `request_status` (`status_id`, `name`) VALUES
(0, 'PENDING'),
(1, 'APPROVED'),
(2, 'REJECTED');

-- --------------------------------------------------------

--
-- Table structure for table `smart_contracts`
--

CREATE TABLE `smart_contracts` (
  `id` int(11) NOT NULL,
  `property_id` int(11) DEFAULT NULL,
  `deployer_address` varchar(150) DEFAULT NULL,
  `contract_address` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `token_id` int(11) NOT NULL,
  `token_name` varchar(100) DEFAULT NULL,
  `token_symbol` varchar(10) DEFAULT NULL,
  `token_value` decimal(10,2) DEFAULT NULL,
  `total_supply` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `token_buy_request`
--

CREATE TABLE `token_buy_request` (
  `req_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `property_id` int(11) DEFAULT NULL,
  `no_of_tokens` int(11) DEFAULT NULL,
  `date_of_request` datetime DEFAULT current_timestamp(),
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `token_buy_request`
--

INSERT INTO `token_buy_request` (`req_id`, `user_id`, `property_id`, `no_of_tokens`, `date_of_request`, `status`) VALUES
(1, 9, 1, 2, '2023-07-23 01:22:22', 0),
(2, 8, 1, 7, '2023-07-23 01:23:14', 0);

-- --------------------------------------------------------

--
-- Table structure for table `token_holders`
--

CREATE TABLE `token_holders` (
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `no_of_tokens` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `token_holders`
--

INSERT INTO `token_holders` (`user_id`, `property_id`, `no_of_tokens`) VALUES
(8, 1, 5),
(9, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `token_transactions`
--

CREATE TABLE `token_transactions` (
  `token_transaction_id` int(11) NOT NULL,
  `property_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `no_of_tokens` int(11) DEFAULT NULL,
  `date_time` datetime DEFAULT current_timestamp(),
  `transaction_hash` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `token_transactions`
--

INSERT INTO `token_transactions` (`token_transaction_id`, `property_id`, `sender_id`, `receiver_id`, `no_of_tokens`, `date_time`, `transaction_hash`) VALUES
(3, 1, 3, 9, 2, '2023-07-22 20:06:31', '0xc13d7905be5c989378a945487cd2a1193627ae606009e28e296d48ddaec66162'),
(4, 1, 3, 9, 3, '2023-07-22 20:07:13', '0xc13d7905be5c989378a945487cd2a1193627ae606009e28e296d48ddaec66163'),
(5, 1, 3, 8, 5, '2023-07-22 20:08:17', '0xc13d7905be5c989378a945487cd2a1193627ae606009e28e296d48ddaec66164');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `user_role` int(11) DEFAULT NULL,
  `CNIC` varchar(100) DEFAULT NULL,
  `wallet_address` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `fname`, `lname`, `user_password`, `contact`, `user_role`, `CNIC`, `wallet_address`) VALUES
(3, 'hamza@gmail.com', 'hamza', 'junaid', '$2a$10$RTS83rTyRB4MjabKbuIASeOwI6U553wAMVooo0S0YilOKXemSwmO.', '03312554581', 0, '12344567888', '0x746376428734'),
(8, 'hamza2@gmail.com', 'hamza', 'junaid', '$2a$10$I02Qnp6.qaZcz6k.ylbSROcLZyL0UCbLd3ToU7dHFIo8Ro.imjNOe', '03312554581', 0, '12344567888', NULL),
(9, 'zaki@gmail.com', 'zaki', 'junaid', '$2a$10$.3CVnijlQiQ9vL5DovxvR.CubUPiDFbCfn5iZEf41nAbGa00gorey', '03312554352', 1, '4210177399572', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`property_id`);

--
-- Indexes for table `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `rental_month`
--
ALTER TABLE `rental_month`
  ADD PRIMARY KEY (`month_id`);

--
-- Indexes for table `rental_transactions`
--
ALTER TABLE `rental_transactions`
  ADD PRIMARY KEY (`rental_transaction_id`),
  ADD KEY `property_id` (`property_id`),
  ADD KEY `rental_month_id` (`rental_month_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `rental_year`
--
ALTER TABLE `rental_year`
  ADD PRIMARY KEY (`year_id`);

--
-- Indexes for table `request_status`
--
ALTER TABLE `request_status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `smart_contracts`
--
ALTER TABLE `smart_contracts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`token_id`);

--
-- Indexes for table `token_buy_request`
--
ALTER TABLE `token_buy_request`
  ADD PRIMARY KEY (`req_id`),
  ADD KEY `property_id` (`property_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `token_holders`
--
ALTER TABLE `token_holders`
  ADD PRIMARY KEY (`user_id`,`property_id`),
  ADD KEY `property_tokenHolder_FK` (`property_id`);

--
-- Indexes for table `token_transactions`
--
ALTER TABLE `token_transactions`
  ADD PRIMARY KEY (`token_transaction_id`),
  ADD KEY `property_id` (`property_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rent`
--
ALTER TABLE `rent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rental_month`
--
ALTER TABLE `rental_month`
  MODIFY `month_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `rental_transactions`
--
ALTER TABLE `rental_transactions`
  MODIFY `rental_transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rental_year`
--
ALTER TABLE `rental_year`
  MODIFY `year_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `smart_contracts`
--
ALTER TABLE `smart_contracts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `token_buy_request`
--
ALTER TABLE `token_buy_request`
  MODIFY `req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `token_transactions`
--
ALTER TABLE `token_transactions`
  MODIFY `token_transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rent`
--
ALTER TABLE `rent`
  ADD CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`);

--
-- Constraints for table `rental_transactions`
--
ALTER TABLE `rental_transactions`
  ADD CONSTRAINT `rental_transactions_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  ADD CONSTRAINT `rental_transactions_ibfk_2` FOREIGN KEY (`rental_month_id`) REFERENCES `rental_month` (`month_id`),
  ADD CONSTRAINT `rental_transactions_ibfk_4` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `rental_transactions_ibfk_5` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `smart_contracts`
--
ALTER TABLE `smart_contracts`
  ADD CONSTRAINT `smart_contracts_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`);

--
-- Constraints for table `token_buy_request`
--
ALTER TABLE `token_buy_request`
  ADD CONSTRAINT `token_buy_request_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  ADD CONSTRAINT `token_buy_request_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `token_buy_request_ibfk_3` FOREIGN KEY (`status`) REFERENCES `request_status` (`status_id`);

--
-- Constraints for table `token_holders`
--
ALTER TABLE `token_holders`
  ADD CONSTRAINT `property_tokenHolder_FK` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `user_tokenHolder_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `token_transactions`
--
ALTER TABLE `token_transactions`
  ADD CONSTRAINT `token_transactions_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  ADD CONSTRAINT `token_transactions_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `token_transactions_ibfk_3` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
