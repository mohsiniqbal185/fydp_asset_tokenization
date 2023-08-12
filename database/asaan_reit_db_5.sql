-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2023 at 02:25 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


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
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_from` int(11) DEFAULT NULL,
  `DateTime` datetime DEFAULT current_timestamp(),
  `transaction_id` int(11) DEFAULT NULL,
  `payment_receipt_file_name` varchar(50) DEFAULT NULL,
  `payment_status` int(11) DEFAULT NULL,
  `payment_amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `payment_method`, `payment_from`, `DateTime`, `transaction_id`, `payment_receipt_file_name`, `payment_status`, `payment_amount`) VALUES
(1, 'CASH', 3, '2023-08-02 14:41:57', 1, NULL, 3, 2000),
(2, 'CASH', 8, '2023-08-02 19:19:55', 2, NULL, 3, 7000);

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
(1, 'rental', '15000000.00', 1, 37, '500.00', 'Chowk Waris Khan Murree Road. Rawalpindi. Punjab.', 'Kareem Plaza', '/assets/property1.jpg', 'KP'),
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
-- Table structure for table `rental_month`
--

CREATE TABLE `rental_month` (
  `month_id` int(11) NOT NULL,
  `month_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 9, 1, 2, '2023-07-23 01:22:22', 1, 1),
(2, 8, 1, 7, '2023-07-23 01:23:14', 1, 1),
(3, 8, 1, 5, '2023-08-11 01:48:21', 0, 1),
(4, 8, 1, 2, '2023-08-11 01:58:59', 1, 2),
(5, 8, 1, 3, '2023-08-11 02:10:32', 0, 1);

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
(63, 1, 3, 9, 2, '2023-08-11 03:00:53', '0xcc210879ba9a4063bc81a1f18e2670b542369b8cc450ded86a711485376e3766', 1),
(64, 1, 3, 9, 2, '2023-08-11 03:03:41', '0xe3750e1d2e34472e0966f39442dab1093f753bb74c5435e4c672502be893989c', 1),
(65, 1, 3, 9, 2, '2023-08-11 03:03:41', NULL, 1),
(66, 1, 3, 9, 2, '2023-08-11 03:04:03', '0x543a9959c7f783fb0d9cf33b4f9931512d39ba65e0bbc50eace7d929b791343d', 1),
(67, 1, 3, 9, 2, '2023-08-11 03:04:29', NULL, 1),
(68, 1, 3, 9, 2, '2023-08-11 03:04:39', '0xe4f0a6c18f9205d377fe27ac57654f206f5f6db938e064f952ea7361fe2e87f5', 1),
(69, 1, 3, 9, 2, '2023-08-11 03:08:22', NULL, 1),
(70, 1, 3, 9, 2, '2023-08-11 03:08:28', '0x7bebede561b921580d0690ca59b15ec2692ec1aaa4d5ab2ea9496fbabd45023b', 1),
(71, 1, 3, 9, 2, '2023-08-11 03:08:32', NULL, 1),
(72, 1, 3, 9, 2, '2023-08-11 03:08:37', '0xfe8dee54ecadf9cc4108ecbb605b1a79812bc5fa26e9368796deacfb7966803c', 1),
(73, 1, 3, 9, 2, '2023-08-11 03:08:38', '0xcc863cd2a5cbfe8f77423d27b6623108194931f5e6f36eddef89d5f9fd53481a', 1),
(74, 1, 3, 9, 2, '2023-08-11 03:09:15', NULL, 1),
(75, 1, 3, 9, 2, '2023-08-11 03:09:25', '0x0828661ac23967a4df20232c3556e22c86a75546e2362fb514839b5a3bedb706', 1),
(76, 1, 3, 9, 2, '2023-08-11 03:09:37', NULL, 1),
(77, 1, 3, 9, 2, '2023-08-11 03:10:03', '0xae6200593e8effba7018d84b567ab09286f80490e53f3136bcbf7ef3e269417b', 1),
(78, 1, 3, 9, 2, '2023-08-11 03:12:32', NULL, 1),
(79, 1, 3, 9, 2, '2023-08-11 03:12:36', NULL, 1),
(80, 1, 3, 9, 2, '2023-08-11 03:12:37', NULL, 1),
(81, 1, 3, 9, 2, '2023-08-11 03:12:37', NULL, 1),
(82, 1, 3, 9, 2, '2023-08-11 03:12:38', '0x9ab6f132f8068141bb3235c756067017e7681a783ce6c0d2620331c7db27d3b1', 1),
(83, 1, 3, 9, 2, '2023-08-11 03:12:40', NULL, 1),
(84, 1, 3, 9, 2, '2023-08-11 03:12:40', NULL, 1),
(85, 1, 3, 9, 2, '2023-08-11 03:12:40', NULL, 1),
(86, 1, 3, 9, 2, '2023-08-11 03:12:44', NULL, 1),
(87, 1, 3, 9, 2, '2023-08-11 03:12:44', NULL, 1),
(88, 1, 3, 9, 2, '2023-08-11 03:12:44', NULL, 1),
(89, 1, 3, 9, 2, '2023-08-11 03:12:44', NULL, 1),
(90, 1, 3, 9, 2, '2023-08-11 03:12:47', NULL, 1),
(91, 1, 3, 9, 2, '2023-08-11 03:12:47', NULL, 1),
(92, 1, 3, 9, 2, '2023-08-11 03:12:47', NULL, 1),
(93, 1, 3, 9, 2, '2023-08-11 03:12:50', '0x50a99ae7dd16c7e7eb1fa1c35259eff8e016a3e0d39df6d5140e174656c07fe2', 1),
(94, 1, 3, 9, 2, '2023-08-11 03:12:50', '0xd7e5772e756c35fddb8de0946365ca31d5e09ae8d4be22da8aade5dbcb75205b', 1),
(95, 1, 3, 9, 2, '2023-08-11 03:12:50', '0x60e28b828c98b82241fd880ed714864fba8f3347a3adc472f1324c62e356fd7d', 1),
(96, 1, 3, 9, 2, '2023-08-11 03:12:50', NULL, 1),
(97, 1, 3, 9, 2, '2023-08-11 03:12:51', NULL, 1),
(98, 1, 3, 9, 2, '2023-08-11 03:12:53', NULL, 1),
(99, 1, 3, 9, 2, '2023-08-11 03:12:54', NULL, 1),
(100, 1, 3, 9, 2, '2023-08-11 03:12:54', NULL, 1),
(101, 1, 3, 9, 2, '2023-08-11 03:12:57', NULL, 1),
(102, 1, 3, 9, 2, '2023-08-11 03:12:58', NULL, 1),
(103, 1, 3, 9, 2, '2023-08-11 03:13:01', NULL, 1),
(104, 1, 3, 9, 2, '2023-08-11 03:13:01', '0xb145ece39f8e0e26c83d1902256395a7a40df0f6104149070bbcabecfe7b7ae1', 1),
(105, 1, 3, 9, 2, '2023-08-11 03:13:03', '0x518128199c0ca87092f2ca9e2fb1bd841cece656b22ffdf088a65dd88961037a', 1),
(106, 1, 3, 9, 2, '2023-08-11 03:13:04', NULL, 1),
(107, 1, 3, 9, 2, '2023-08-11 03:13:04', '0x7ef9d3f868f68cdc33956437b7a7c1217159b648b146195fdc5f897688f51dca', 1),
(108, 1, 3, 9, 2, '2023-08-11 03:13:08', NULL, 1),
(109, 1, 3, 9, 2, '2023-08-11 03:13:08', NULL, 1),
(110, 1, 3, 9, 2, '2023-08-11 03:13:11', NULL, 1),
(111, 1, 3, 9, 2, '2023-08-11 03:13:27', '0x97fe776122c349a49968f43d441255801ba57d80f22d57706e5b47b221eab12d', 1),
(112, 1, 3, 9, 2, '2023-08-11 03:13:27', '0x3d225e313f53340ef1decbd9ae5094bf85cef6453a04e737ffc2235a2a140946', 1),
(113, 1, 3, 9, 2, '2023-08-11 03:13:28', '0x2da2b4b53e0794e16f9e4b4aff72c849f925b13a98320d833c2ada86813509eb', 1),
(114, 1, 3, 9, 2, '2023-08-11 03:13:28', '0xbd69e9b856c7956666a963f406929111cc2833213bce23bd64d1196bc2595e91', 1),
(115, 1, 3, 9, 2, '2023-08-11 03:13:30', NULL, 1),
(116, 1, 3, 9, 2, '2023-08-11 03:13:31', NULL, 1),
(117, 1, 3, 9, 2, '2023-08-11 03:13:31', '0x9f6d36ef7e90f25677c856b90b851cabfe8fd182dc3ea05fadf25fa2055d45f3', 1),
(118, 1, 3, 9, 2, '2023-08-11 03:13:31', NULL, 1),
(119, 1, 3, 9, 2, '2023-08-11 03:13:32', '0x44adde257edf445d85b024198cb2b6cde206d4c1381ce9aeff1afa93cf2f9903', 1),
(120, 1, 3, 9, 2, '2023-08-11 03:13:34', NULL, 1),
(121, 1, 3, 9, 2, '2023-08-11 03:13:34', NULL, 1),
(122, 1, 3, 9, 2, '2023-08-11 03:13:35', NULL, 1),
(123, 1, 3, 9, 2, '2023-08-11 03:13:37', NULL, 1),
(124, 1, 3, 9, 2, '2023-08-11 03:13:38', NULL, 1),
(125, 1, 3, 9, 2, '2023-08-11 03:13:39', '0xe65e7d2cc1ab8dd8868a428ed629b370fba4e8d5043044dbd23da995d36faa5d', 1),
(126, 1, 3, 9, 2, '2023-08-11 03:13:40', '0x8ea292dc83dfbaf53abb2ffbfeb94cc82e4d9f148ea784f1ec98861a7056d78a', 1),
(127, 1, 3, 9, 2, '2023-08-11 03:13:41', NULL, 1),
(128, 1, 3, 9, 2, '2023-08-11 03:13:43', NULL, 1),
(129, 1, 3, 9, 2, '2023-08-11 03:13:45', NULL, 1),
(130, 1, 3, 9, 2, '2023-08-11 03:13:48', NULL, 1),
(131, 1, 3, 9, 2, '2023-08-11 11:29:52', NULL, 1),
(132, 1, 3, 9, 2, '2023-08-11 11:30:08', '0xef0cb93f41f30da838de4774900bd147e1642d6433fd6ec6c03ce24474fc54cb', 1),
(133, 1, 3, 9, 2, '2023-08-11 11:30:21', '0x5c0035aecfbddc7a9352499edc02631affc10dfc919925dcce057b997ef5fec9', 1),
(134, 1, 3, 9, 2, '2023-08-11 11:30:34', '0xafd4bbc919b015796deb5ea774662ac620120e18e90ce2219dd8f14eb5f1498c', 1),
(135, 1, 3, 9, 2, '2023-08-11 11:30:47', '0x4da41eb4628c7f0de13ccb1831860d52ad9c331af3ebe804493676885253eb21', 1),
(136, 1, 3, 9, 2, '2023-08-11 11:30:57', '0x5c4e95ef3d524f2f9850d77090856ea2fd9e7d20566f8959767ff05785ab6632', 1),
(137, 1, 3, 9, 2, '2023-08-11 11:31:10', '0xed84a794ae6a73b9d1d317661a71f21d77dc4138d3aa18fc8e020e028214cf0e', 1),
(138, 1, 3, 9, 2, '2023-08-11 11:31:11', '0x52c02209cb989691196bcf0c7729a297409ac190ff98c2d5eb901de97f23495b', 1),
(139, 1, 3, 9, 2, '2023-08-11 11:31:21', '0x6f665a5d87cc4871491ff35204724107aaf51d4583fa769b9b0f440270635176', 1),
(140, 1, 3, 9, 2, '2023-08-11 11:31:23', '0x3c35f07280cd2a3d7122efd94e6d438d0f6f7d710bcd4bc28a7419c37c21b24b', 1),
(141, 1, 3, 9, 2, '2023-08-11 11:31:34', '0x5893c7dfbb260f9e1c83e11215b4610e88c9591d718da89e4aee0635aa0160d7', 1),
(142, 1, 3, 9, 2, '2023-08-11 11:31:34', NULL, 1),
(143, 1, 3, 9, 2, '2023-08-11 11:31:34', NULL, 1),
(144, 1, 3, 9, 2, '2023-08-11 11:31:44', NULL, 1),
(145, 1, 3, 9, 2, '2023-08-11 11:31:45', '0x57cff979a0bb04d3eba750d5d07d7f3bec692334976bfdbc4f1e9951db3b8b04', 1),
(146, 1, 3, 9, 2, '2023-08-11 11:31:47', NULL, 1),
(147, 1, 3, 9, 2, '2023-08-11 11:31:47', '0xa2a6af858dccbcc3ff2a45dc43814702de6afb60b6b92fc86c761d12317e2aca', 1),
(148, 1, 3, 9, 2, '2023-08-11 11:31:48', NULL, 1),
(149, 1, 3, 9, 2, '2023-08-11 11:31:57', '0x35acc74d3474e2f08a01822cf3526a2881934320f65277daa806e83d8883ff6f', 1),
(150, 1, 3, 9, 2, '2023-08-11 11:31:57', '0x4b1c118743b1411ae10bba8adfda489170d37bf52e921cbd803eb4dc89eb4a20', 1),
(151, 1, 3, 9, 2, '2023-08-11 11:31:58', NULL, 1),
(152, 1, 3, 9, 2, '2023-08-11 11:31:58', '0x404cd01777489d934f7fde59f76c46c44f5ab62ec165c6e6df1fd06079cee051', 1),
(153, 1, 3, 9, 2, '2023-08-11 11:32:00', NULL, 1),
(154, 1, 3, 9, 2, '2023-08-11 11:32:08', NULL, 1),
(155, 1, 3, 9, 2, '2023-08-11 11:32:20', '0x47f5ee4d00601e538bc9b16078c67e3b1b718281a010d5ec7880d3b2b61b163a', 1),
(156, 1, 3, 9, 2, '2023-08-11 11:32:20', '0x47f5ee4d00601e538bc9b16078c67e3b1b718281a010d5ec7880d3b2b61b163a', 1),
(157, 1, 3, 9, 2, '2023-08-11 11:32:21', '0x1f045cdd21b11f2eca2439adfc0d107132d2c4fd8a80daa1c96c954fa4f2f2da', 1),
(158, 1, 3, 9, 2, '2023-08-11 11:32:22', '0x9019336b78ba29d1b045d8ff82ef8c733bc621d4f229b5df9d532d542fb77d80', 1),
(159, 1, 3, 9, 2, '2023-08-11 11:32:22', '0x5bbbbf5f929d4042a5b29e2f19b4281f954dc362194637b9743b8b418e95dddb', 1),
(160, 1, 3, 9, 2, '2023-08-11 11:32:22', '0x658e813f9882812d3c87f0edb57ea07f3a04406e87dc4d3c247d9cac834736ca', 1),
(161, 1, 3, 9, 2, '2023-08-11 11:35:22', '0xfa9e84371de1999aea0ebf0cdee64e1281f352131d5e73e6625e56d8b9d95bc0', 1),
(162, 1, 3, 9, 2, '2023-08-11 11:35:32', '0xb9b00c0c0755c0ee936e453a8b3fef91fb44306cb6eb033f869ef00217e9346d', 1),
(163, 1, 3, 9, 2, '2023-08-11 11:36:45', '0x2fd80af5149f2e836017139908a42514a17a772b985e8b26a615931875e52323', 1),
(164, 1, 3, 9, 2, '2023-08-11 11:36:58', '0xacb74b64f38514822d57f7ff69440a27e91e24a5e1ba191d9529c1871b0eb055', 1),
(165, 1, 3, 9, 2, '2023-08-11 11:41:11', '0x3ab148f8c2431b1755549797f1ac598015e4f384ed606e756660795b63624920', 1),
(166, 1, 3, 9, 2, '2023-08-11 11:41:20', '0xf17c7f23bbeac5162dfc084a558cab0c2d02d0d09ee308ae55ff6822593bf1c8', 1),
(167, 1, 3, 9, 2, '2023-08-11 11:41:46', '0x317be76333dca52ec64b4555cee0de1866d2b98ad5c41eb82108beac00f6b3cd', 1),
(168, 1, 3, 9, 2, '2023-08-11 11:45:07', '0x289811d1a72a3d6105dbaa9157d2b18a63756ccf3611d1bf99c72ef5ee54e793', 1),
(169, 1, 3, 9, 2, '2023-08-11 11:45:44', NULL, 1),
(170, 1, 3, 9, 2, '2023-08-11 11:45:44', '0x5686e1b679bb5177fb787699e32e94924d25d3c42fd51f75624dda35d9062816', 1),
(171, 1, 3, 9, 2, '2023-08-11 11:45:58', '0xac0918ed14d0e03a15b172c30d6b96deb97a97bc9448afc0fbd656232dbc0dec', 1),
(172, 1, 3, 9, 2, '2023-08-11 11:49:08', '0x2afbae595b4e693589c81334c4cbaab028a6f5199bff572c81d2d0f06aa27bb5', 1),
(174, 1, 3, 9, 2, '2023-08-11 12:04:35', '0x7114668c6a35b58579d8b7a2bbd9b27328d9dd5266774259879334d472bd6eb2', 1),
(175, 1, 3, 9, 2, '2023-08-11 12:12:46', '0x3b10825df53e92010429209ac8aa643a4fb5962b3ea662afee707079fc328100', 1),
(176, 1, 3, 9, 2, '2023-08-11 12:14:10', '0xb2c1d5bdaeb87ce4a1d83b099cf5383933c44d51595a0f1ed5a137483bc5370a', 1),
(177, 1, 3, 9, 2, '2023-08-11 12:15:35', '0x2c753fb2b5db4d9958dfd4c4fbc0cb773ef0f42c8834d15b3dcc114aed1e8b7a', 1),
(178, 1, 3, 8, 7, '2023-08-11 12:24:47', '0xad82499d3a820e989c57dbcfb45df27f8c32c156b9e21c1b6d5f4d6e84e98695', 2),
(179, 1, 3, 8, 7, '2023-08-11 12:31:34', '0xc768ac24b78c1366500d6c13b515a79148f02e8228dc1bbe82d18c822b44ad25', 2),
(180, 1, 3, 9, 2, '2023-08-11 12:39:35', '0xb89d4a0eebec965c86a242d3e102e3484cc664c84178e3c2d24075a718077f84', 1),
(181, 1, 3, 8, 7, '2023-08-11 12:40:32', '0xe06ad6a83aa22e4ab52d47c59b720dd8d53a9d2ad6ccfbd87b7dc8de35ce9973', 2),
(182, 1, 3, 9, 2, '2023-08-11 12:46:35', NULL, 1),
(183, 1, 3, 9, 2, '2023-08-11 12:46:44', '0x541109fef69ea2787393048e4c33d51c194730422f8d648c8d3e79905e700a93', 1),
(184, 1, 3, 9, 2, '2023-08-11 12:46:46', '0x796a279d9cf658599c6425078556e42e2ea5bd21c347a1eeed849ce9102091e0', 1),
(185, 1, 3, 9, 2, '2023-08-11 12:47:21', '0x19b374fc665c69f86fa08983a13417219bb96ae0c3a8e6d2a08a4b19a35d9194', 1),
(186, 1, 3, 9, 2, '2023-08-11 12:53:26', NULL, 1),
(187, 1, 3, 9, 2, '2023-08-11 12:53:32', '0xcec6933855fef764fbb4c6f1cfe231c6a66485eae413e9e24db9bec1631761d2', 1),
(188, 1, 3, 9, 2, '2023-08-11 13:00:47', '0x6052a624962a03feeca40fbdd10dd3ba85c9f446c92951d518dfe6cbb8b1c6de', 1),
(189, 1, 3, 8, 7, '2023-08-11 13:01:23', '0x685f11332ce9f2873373175f1fa9340c18477389c469002dde077798c642de19', 2),
(190, 1, 3, 9, 2, '2023-08-11 13:06:32', '0xe430b1c32293e3b7b75a0ca4643a638c0994be0172236db8ae03916823bedc57', 1),
(191, 1, 3, 9, 2, '2023-08-11 13:10:57', '0xa976c6bb6668871c184df314b84c806fd617a3a48f95bde5fb0c3163a9e58574', 1),
(192, 1, 3, 9, 2, '2023-08-11 13:18:36', '0x321f81aecf5d2bb7847497bd143c44593ceecb05f56f21299ad55b0f1470a0d4', 1),
(193, 1, 3, 9, 2, '2023-08-11 13:20:33', '0x07c4f8294b5c924efdf6a41367e435fad7eb55e2a995fd74ea341ac72f90bb77', 1);

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
(9, 'zaki@gmail.com', 'zaki', 'junaid', '$2a$10$.3CVnijlQiQ9vL5DovxvR.CubUPiDFbCfn5iZEf41nAbGa00gorey', '03312554352', '4210177399572', '0x0FBa45095d72152dbeeF6017d21b1866D3b4c99B');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_user`
--
ALTER TABLE `admin_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `fk_payment_from` (`payment_from`),
  ADD KEY `fk_transaction_id` (`transaction_id`),
  ADD KEY `fk_payment_status` (`payment_status`);

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
  MODIFY `req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `token_transactions`
--
ALTER TABLE `token_transactions`
  MODIFY `token_transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

--
-- AUTO_INCREMENT for table `token_value`
--
ALTER TABLE `token_value`
  MODIFY `token_value_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_payment_from` FOREIGN KEY (`payment_from`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_payment_status` FOREIGN KEY (`payment_status`) REFERENCES `payment_status` (`payment_status_id`),
  ADD CONSTRAINT `fk_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `token_buy_request` (`req_id`);

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
