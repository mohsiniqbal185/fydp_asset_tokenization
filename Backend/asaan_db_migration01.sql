-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2023 at 12:04 AM
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


CREATE TABLE `asaan_reit_db_3`.`token_market_sale` (
  `idtoken_market_sale` INT NOT NULL AUTO_INCREMENT,
  `property_id` INT NULL,
  `seller_id` INT NULL,
  `pledger_id` INT NULL,
  `no_of_tokens` INT NULL,
  `date_time` DATETIME NULL,
  `payment_id` INT NULL,
  `token_value_id` INT NOT NULL,
  `sold` TINYINT NOT NULL DEFAULT 0,
  `payment_done` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idtoken_market_sale`),
  INDEX `property_id_idx` (`property_id` ASC),
  INDEX `seller_id_fk_idx` (`seller_id` ASC),
  INDEX `pledger_id_fk_idx` (`pledger_id` ASC),
  INDEX `token_value_id_fk_idx` (`token_value_id` ASC),
  INDEX `payment_id_fk_idx` (`payment_id` ASC),
  CONSTRAINT `property_id_fk`
    FOREIGN KEY (`property_id`)
    REFERENCES `asaan_reit_db_3`.`property` (`property_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `seller_id_fk`
    FOREIGN KEY (`seller_id`)
    REFERENCES `asaan_reit_db_3`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `pledger_id_fk`
    FOREIGN KEY (`pledger_id`)
    REFERENCES `asaan_reit_db_3`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `token_value_id_fk`
    FOREIGN KEY (`token_value_id`)
    REFERENCES `asaan_reit_db_3`.`token_value` (`token_value_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `payment_id_fk`
    FOREIGN KEY (`payment_id`)
    REFERENCES `asaan_reit_db_3`.`payment` (`payment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


ALTER TABLE `asaan_reit_db_3`.`token_market_sale` 
CHANGE COLUMN `date_time` `date_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ;

ALTER TABLE `asaan_reit_db_3`.`payment` 
DROP FOREIGN KEY `fk_transaction_id`;
ALTER TABLE `asaan_reit_db_3`.`payment` 
DROP INDEX `fk_transaction_id` ;
