-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2023 at 06:16 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS=0;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asaan_reit_db_2`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_user`
--

CREATE TABLE `admin_user` (
  `user_id` int(11) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `CNIC` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_user`
--

INSERT INTO `admin_user` (`user_id`, `fname`, `lname`, `email`, `password`, `CNIC`) VALUES
(3, 'mohsin', 'iqbal', 'caadasd', 'daadsdas', 'daaadsdsa');

-- --------------------------------------------------------

--
-- Table structure for table `month`
--

CREATE TABLE `month` (
  `month_id` int(11) NOT NULL,
  `month_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `month`
--

INSERT INTO `month` (`month_id`, `month_name`) VALUES
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
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_from` int(11) DEFAULT NULL,
  `DateTime` datetime DEFAULT current_timestamp(),
  `req_id` int(11) DEFAULT NULL,
  `payment_receipt_file_name` varchar(50) DEFAULT NULL,
  `payment_amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `payment_method`, `payment_from`, `DateTime`, `req_id`, `payment_receipt_file_name`, `payment_amount`) VALUES
(1, 'CASH', 3, '2023-08-02 14:41:57', 1, NULL, 2000),
(2, 'CASH', 8, '2023-08-02 19:19:55', 2, NULL, 7000);

-- --------------------------------------------------------

--
-- Table structure for table `payment_status`
--

CREATE TABLE `payment_status` (
  `payment_status_id` int(11) NOT NULL,
  `payment_status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment_status`
--

INSERT INTO `payment_status` (`payment_status_id`, `payment_status`) VALUES
(1, 'PENDING'),
(2, 'BEING PROCESSED'),
(3, 'VERIFIED');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `property_id` int(11) NOT NULL,
  `property_type` varchar(50) DEFAULT NULL,
  `value_in_pkr` decimal(10,2) DEFAULT NULL,
  `token_id` int(11) DEFAULT NULL,
  `tokens_sold` int(11) DEFAULT NULL,
  `size_of_property` decimal(10,2) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `property_code` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`property_id`, `property_type`, `value_in_pkr`, `token_id`, `tokens_sold`, `size_of_property`, `location`, `name`, `image`, `property_code`) VALUES
(1, 'rental', '15000000.00', 1, 39, '500.00', 'Chowk Waris Khan Murree Road. Rawalpindi. Punjab.', 'Kareem Plaza', '/assets/property1.jpg', 'KP'),
(2, 'rental', '25000000.00', 2, 200, '600.00', 'C-192, North Nazimabad, Karachi, Sindh.', 'Shah Jehan Plaza', '/assets/property2.jpg', 'SJP');

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

CREATE TABLE `rent` (
  `id` int(11) NOT NULL,
  `property_id` int(11) DEFAULT NULL,
  `rent_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rental_year`
--

CREATE TABLE `rental_year` (
  `year_id` int(11) NOT NULL,
  `year_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `request_status`
--

CREATE TABLE `request_status` (
  `status_id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `contract_address` varchar(150) DEFAULT NULL,
  `kyc_contract_address` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `smart_contracts`
--

INSERT INTO `smart_contracts` (`id`, `property_id`, `deployer_address`, `contract_address`, `kyc_contract_address`) VALUES
(1, 1, '0x3325069334629ab8e61B4f59e24FF893d88FaF69', '0x0073CD1A0312758473ab56488946cCFc82EA89A9', '0x605b246eeE74010959B4fD434FFC90b5c3d85C13');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`token_id`, `token_name`, `token_symbol`, `token_value`, `total_supply`) VALUES
(1, 'Dolmen Mall Reit Token', 'DMRT', '1.00', 100),
(2, 'Ocean Mall Reit Token', 'OMRT', '2.00', 200);

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
  `status` int(11) DEFAULT NULL,
  `payment_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `token_buy_request`
--

INSERT INTO `token_buy_request` (`req_id`, `user_id`, `property_id`, `no_of_tokens`, `date_of_request`, `status`, `payment_status`) VALUES
(1, 9, 1, 2, '2023-07-23 01:22:22', 0, 1),
(2, 8, 1, 7, '2023-07-23 01:23:14', 0, 1),
(3, 8, 1, 5, '2023-08-11 01:48:21', 0, 1),
(4, 8, 1, 2, '2023-08-11 01:58:59', 1, 2),
(5, 8, 1, 3, '2023-08-11 02:10:32', 0, 1),
(6, 11, 1, 5, '2023-08-12 19:32:40', 0, NULL),
(7, 8, 1, 2, '2023-08-12 20:44:28', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `token_holders`
--

CREATE TABLE `token_holders` (
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `no_of_tokens` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `transaction_hash` varchar(150) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `token_transactions`
--

INSERT INTO `token_transactions` (`token_transaction_id`, `property_id`, `sender_id`, `receiver_id`, `no_of_tokens`, `date_time`, `transaction_hash`, `payment_id`) VALUES
(3, 1, 3, 9, 4, '2023-07-22 20:06:31', '0xc13d7905be5c989378a945487cd2a1193627ae606009e28e296d48ddaec66162', 1),
(4, 1, 3, 9, 10, '2023-07-22 20:07:13', '0xc13d7905be5c989378a945487cd2a1193627ae606009e28e296d48ddaec66163', NULL),
(51, 1, 3, 9, 2, '2023-08-11 02:45:04', NULL, 1),
(52, 1, 3, 9, 2, '2023-08-11 02:45:14', '0x5e113b395b487f0debc399de07043ba94e649d8132374312fe61038217abefaa', 1),
(53, 1, 3, 9, 2, '2023-08-11 02:45:16', '0x9dcc78e86af9a3d171c0e12c6fa158cb63a9d3bc06fe5d7fcdb568f77c1eda0b', 1),
(54, 1, 3, 9, 2, '2023-08-11 02:49:15', NULL, 1),
(55, 1, 3, 9, 2, '2023-08-11 02:49:49', '0xfd386b3b5f8392929c3ec7f9b80c2fe90e9d710f0d34a7e688ea049960cd0a38', 1),
(56, 1, 3, 9, 2, '2023-08-11 02:51:06', NULL, 1),
(57, 1, 3, 9, 2, '2023-08-11 02:51:16', '0x9e1cb93e63fbc90ea21efe0de4bf08ebcf6f49e794414053315d0a294037171f', 1),
(58, 1, 3, 9, 2, '2023-08-11 02:54:18', NULL, 1),
(59, 1, 3, 9, 2, '2023-08-11 02:54:28', '0x295aaac3c02d8dcbc93c3ff51046ed231704b8de1aaeee64c8781d9c05757e23', 1),
(60, 1, 3, 9, 2, '2023-08-11 02:56:13', NULL, 1),
(61, 1, 3, 9, 2, '2023-08-11 02:56:25', '0x74b1d5cbd9db248ce38209744ccd24a1b872de70dcbc49608530e43a9527fe1d', 1),
(62, 1, 3, 9, 2, '2023-08-11 02:56:27', '0xbe0cd36d4a5567b2834ba1272198a01f284cd1f278c59158560e36a92179dd02', 1),
(194, 1, 3, 9, 2, '2023-08-12 17:56:04', '0x2f7761a266045c646b51f35d5b18760c3d5da75fc441ad857595a96e6dc64289', 1);

-- --------------------------------------------------------

--
-- Table structure for table `token_value`
--

CREATE TABLE `token_value` (
  `token_value_id` int(11) NOT NULL,
  `token_id` int(11) DEFAULT NULL,
  `token_value` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `token_value`
--

INSERT INTO `token_value` (`token_value_id`, `token_id`, `token_value`) VALUES
(1, 1, 1000),
(2, 2, 2000);

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
  `CNIC` varchar(100) DEFAULT NULL,
  `wallet_address` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `fname`, `lname`, `user_password`, `contact`, `CNIC`, `wallet_address`) VALUES
(3, 'hamza4@gmail.com', 'hamza', 'junaid', '$2a$10$RTS83rTyRB4MjabKbuIASeOwI6U553wAMVooo0S0YilOKXemSwmO.', '03312554581', '12344567888', '0x746376428734'),
(8, 'hamza2@gmail.com', 'hamza', 'junaid', '$2a$10$I02Qnp6.qaZcz6k.ylbSROcLZyL0UCbLd3ToU7dHFIo8Ro.imjNOe', '03312554581', '12344567888', '0x0FBa45095d72152dbeeF6017d21b1866D3b4c99B'),
(9, 'zaki@gmail.com', 'zaki', 'junaid', '$2a$10$.3CVnijlQiQ9vL5DovxvR.CubUPiDFbCfn5iZEf41nAbGa00gorey', '03312554352', '4210177399572', '0x0FBa45095d72152dbeeF6017d21b1866D3b4c99B'),
(11, 'mohsiniqbal@gmail.com', 'Mohsin', 'Iqbal', '$2b$10$ufo5traV9TnFEajCREwZPO8gQNItcdPDV8NynLQ4GfPNMIxVwCe5C', '03342090953', '12345676', '0x3851D2a418BF9504a41aE091Ce7913C6Ffbb0f39'),
(12, 'mohsiniqbal185@gmail.com', 'Mohsin', 'Iqbal', '$2b$10$DF/JFNnE3BtNrQIV..5uOeWRQsSTtrOiy8yeaiFYxmoixbdAxYagK', '03342090953', '21244114132132123', '0xDe5e93d932E1a9A86772DE9018844a6c13223aA8');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_user`
--
ALTER TABLE `admin_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `month`
--
ALTER TABLE `month`
  ADD PRIMARY KEY (`month_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `fk_payment_from` (`payment_from`),
  ADD KEY `fk_transaction_id` (`req_id`);

--
-- Indexes for table `payment_status`
--
ALTER TABLE `payment_status`
  ADD PRIMARY KEY (`payment_status_id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`property_id`),
  ADD KEY `fk_tokens` (`token_id`);

--
-- Indexes for table `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

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
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `fk_payment` (`payment_id`);

--
-- Indexes for table `token_value`
--
ALTER TABLE `token_value`
  ADD PRIMARY KEY (`token_value_id`),
  ADD KEY `token_id` (`token_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_user`
--
ALTER TABLE `admin_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `month`
--
ALTER TABLE `month`
  MODIFY `month_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_status`
--
ALTER TABLE `payment_status`
  MODIFY `payment_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rent`
--
ALTER TABLE `rent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `token_buy_request`
--
ALTER TABLE `token_buy_request`
  MODIFY `req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `token_transactions`
--
ALTER TABLE `token_transactions`
  MODIFY `token_transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT for table `token_value`
--
ALTER TABLE `token_value`
  MODIFY `token_value_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_payment_from` FOREIGN KEY (`payment_from`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_transaction_id` FOREIGN KEY (`req_id`) REFERENCES `token_buy_request` (`req_id`);

--
-- Constraints for table `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `fk_tokens` FOREIGN KEY (`token_id`) REFERENCES `tokens` (`token_id`);

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
  ADD CONSTRAINT `rental_transactions_ibfk_2` FOREIGN KEY (`rental_month_id`) REFERENCES `month` (`month_id`),
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
  ADD CONSTRAINT `fk_admin_sender` FOREIGN KEY (`sender_id`) REFERENCES `admin_user` (`user_id`),
  ADD CONSTRAINT `fk_payment` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`),
  ADD CONSTRAINT `token_transactions_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  ADD CONSTRAINT `token_transactions_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `token_value`
--
ALTER TABLE `token_value`
  ADD CONSTRAINT `token_value_ibfk_1` FOREIGN KEY (`token_id`) REFERENCES `tokens` (`token_id`);
COMMIT;
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
