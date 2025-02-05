-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2025 at 12:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `itam`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands_t`
--

CREATE TABLE `brands_t` (
  `brand_id` varchar(10) NOT NULL,
  `brand_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brands_t`
--

INSERT INTO `brands_t` (`brand_id`, `brand_name`) VALUES
('B1001', 'Cisco'),
('B1002', 'HP'),
('B1003', 'Dell'),
('B1004', 'Lenovo'),
('B1005', 'Apple'),
('B1006', 'Samsung'),
('B1007', 'Microsoft'),
('B1008', 'Panasonic'),
('B1009', 'Brother'),
('B1010', 'Canon');

--
-- Triggers `brands_t`
--
DELIMITER $$
CREATE TRIGGER `before_insert_brands_t` BEFORE INSERT ON `brands_t` FOR EACH ROW BEGIN
    DECLARE new_id INT;
    SET new_id = (SELECT COALESCE(MAX(SUBSTRING(brand_id, 2)), 1000) + 1 FROM brands_t);
    SET NEW.brand_id = CONCAT('B', new_id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `category_t`
--

CREATE TABLE `category_t` (
  `category_id` varchar(10) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category_t`
--

INSERT INTO `category_t` (`category_id`, `category_name`) VALUES
('CAT1001', 'ITS Equipment'),
('CAT1002', 'Office Equipment'),
('CAT1003', 'Network Equipment');

--
-- Triggers `category_t`
--
DELIMITER $$
CREATE TRIGGER `before_insert_category_t` BEFORE INSERT ON `category_t` FOR EACH ROW BEGIN
    DECLARE new_id INT;
    SET new_id = (SELECT COALESCE(MAX(SUBSTRING(category_id, 4)), 1000) + 1 FROM category_t);
    SET NEW.category_id = CONCAT('CAT', new_id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `equipment_t`
--

CREATE TABLE `equipment_t` (
  `equipment_id` varchar(10) NOT NULL,
  `equipment_name` varchar(255) NOT NULL,
  `sub_category_id` varchar(10) DEFAULT NULL,
  `team_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment_t`
--

INSERT INTO `equipment_t` (`equipment_id`, `equipment_name`, `sub_category_id`, `team_id`) VALUES
('EQ1001', 'TVSS', 'SUB1001', 'T1002'),
('EQ1002', 'EMS', 'SUB1001', 'T1002'),
('EQ1003', 'Dehumidifier(ITS)', 'SUB1001', 'T1002'),
('EQ1004', 'Humidity Sensor', 'SUB1001', 'T1002'),
('EQ1005', 'Rack', 'SUB1001', 'T1002'),
('EQ1006', 'Desk Phone', 'SUB1002', 'T1001'),
('EQ1007', 'IP Phone Set', 'SUB1002', 'T1001'),
('EQ1008', 'IP Phone Expansion Module', 'SUB1002', 'T1001'),
('EQ1009', 'Wireless Access Point', 'SUB1002', 'T1001'),
('EQ1010', 'Router', 'SUB1002', 'T1001'),
('EQ1011', 'Patch Panel', 'SUB1002', 'T1001'),
('EQ1012', 'Switch', 'SUB1002', 'T1001'),
('EQ1013', 'POE Injector', 'SUB1002', 'T1001'),
('EQ1014', 'Radio Device', 'SUB1002', 'T1001'),
('EQ1015', 'Cell Phone', 'SUB1003', 'T1003'),
('EQ1016', 'Tab', 'SUB1003', 'T1003'),
('EQ1017', 'Firewall', 'SUB1003', 'T1003'),
('EQ1018', 'PDU', 'SUB1003', 'T1003'),
('EQ1019', 'IPAD', 'SUB1003', 'T1003'),
('EQ1020', 'Server', 'SUB1003', 'T1003'),
('EQ1021', 'Computer CPU', 'SUB1003', 'T1002'),
('EQ1022', 'Laptop', 'SUB1003', 'T1002'),
('EQ1023', 'Storage Device', 'SUB1003', 'T1002'),
('EQ1024', 'RFID Terminal', 'SUB1003', 'T1002'),
('EQ1025', 'Printers', 'SUB1004', 'T1002'),
('EQ1026', 'Monitor', 'SUB1004', 'T1002'),
('EQ1027', 'Projector', 'SUB1004', 'T1002'),
('EQ1028', 'Disc Writer', 'SUB1004', 'T1002'),
('EQ1029', 'Signature Pad', 'SUB1004', 'T1002'),
('EQ1030', 'BGMEA-Dongol Key', 'SUB1005', 'T1003'),
('EQ1031', 'Webcam', 'SUB1005', 'T1003'),
('EQ1032', 'Speaker', 'SUB1005', 'T1003'),
('EQ1033', 'RF Init Machine', 'SUB1005', 'T1003'),
('EQ1034', 'Power Box', 'SUB1005', 'T1003'),
('EQ1035', 'Junction Box', 'SUB1005', 'T1003'),
('EQ1036', 'Smart Terminal', 'SUB1005', 'T1003'),
('EQ1037', 'IP Camera', 'SUB1006', 'T1003'),
('EQ1038', 'Analog Camera', 'SUB1006', 'T1003'),
('EQ1039', 'Digital Camera', 'SUB1006', 'T1003'),
('EQ1040', 'Time and Attendance Device', 'SUB1007', 'T1003'),
('EQ1041', 'Biometric Finger Scanner', 'SUB1007', 'T1003'),
('EQ1042', 'Photocopy Machine(Multi)', 'SUB1008', 'T1004'),
('EQ1043', 'Photocopy Machine(single)', 'SUB1009', 'T1004'),
('EQ1044', 'Scanner', 'SUB1004', 'T1004'),
('EQ1045', 'FAX Machine', 'SUB1004', 'T1004'),
('EQ1046', 'Speakerphone', 'SUB1004', 'T1004'),
('EQ1047', 'Projector', 'SUB1010', 'T1002');

--
-- Triggers `equipment_t`
--
DELIMITER $$
CREATE TRIGGER `before_insert_equipment_t` BEFORE INSERT ON `equipment_t` FOR EACH ROW BEGIN
    DECLARE new_id INT;
    SET new_id = (SELECT COALESCE(MAX(SUBSTRING(equipment_id, 3)), 1000) + 1 FROM equipment_t);
    SET NEW.equipment_id = CONCAT('EQ', new_id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `items_t`
--

CREATE TABLE `items_t` (
  `item_id` varchar(10) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `equipment_id` varchar(10) DEFAULT NULL,
  `item_variation` varchar(255) DEFAULT NULL,
  `brand_id` varchar(10) DEFAULT NULL,
  `model_id` varchar(10) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `manufacture_no` varchar(255) DEFAULT NULL,
  `status_details` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `line_name` varchar(255) DEFAULT NULL,
  `store_name` varchar(255) DEFAULT NULL,
  `present_factory` varchar(255) DEFAULT NULL,
  `owner_factory` varchar(255) DEFAULT NULL,
  `physical_location` varchar(255) DEFAULT NULL,
  `license_no` varchar(255) DEFAULT NULL,
  `license_date` date DEFAULT NULL,
  `rcv_no` varchar(255) DEFAULT NULL,
  `invoice_no` varchar(255) DEFAULT NULL,
  `po_no` varchar(255) DEFAULT NULL,
  `vendor` varchar(255) DEFAULT NULL,
  `unit_price` float DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `ship_date` date DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `subnet_musk` varchar(45) DEFAULT NULL,
  `gateway` varchar(45) DEFAULT NULL,
  `DNS` varchar(255) DEFAULT NULL,
  `ethernet_details` varchar(255) DEFAULT NULL,
  `host_name` varchar(255) DEFAULT NULL,
  `operating_system` varchar(255) DEFAULT NULL,
  `platform` varchar(255) DEFAULT NULL,
  `provioned_space` float DEFAULT NULL,
  `used_space` float DEFAULT NULL,
  `memory_size` float DEFAULT NULL,
  `ram_details` varchar(255) DEFAULT NULL,
  `cpu_model` varchar(255) DEFAULT NULL,
  `cpu_clock` float DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `expiration_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items_t`
--

INSERT INTO `items_t` (`item_id`, `item_name`, `equipment_id`, `item_variation`, `brand_id`, `model_id`, `timestamp`, `manufacture_no`, `status_details`, `remarks`, `line_name`, `store_name`, `present_factory`, `owner_factory`, `physical_location`, `license_no`, `license_date`, `rcv_no`, `invoice_no`, `po_no`, `vendor`, `unit_price`, `currency`, `ship_date`, `ip_address`, `subnet_musk`, `gateway`, `DNS`, `ethernet_details`, `host_name`, `operating_system`, `platform`, `provioned_space`, `used_space`, `memory_size`, `ram_details`, `cpu_model`, `cpu_clock`, `start_date`, `expiration_date`) VALUES
('IT100001', 'lala', 'EQ1002', 'asdad', 'B1003', 'M1006', '2025-02-05 23:46:32', 'adada', 'Disposed (not scraped)', 'adadad', 'dadad', 'adadad', 'adad', 'adad', 'adada', 'adadad', '2025-02-01', 'adadad', 'adadad', 'adadad', '', 12344, '', '2025-02-13', 'qdd', 'sdfsf', 'sfsfsf', 'sfsfs', 'sdfsfsf', '', '', '', 0, 0, 0, '', '', 0, '2025-02-01', '2025-02-24');

--
-- Triggers `items_t`
--
DELIMITER $$
CREATE TRIGGER `before_insert_items_t` BEFORE INSERT ON `items_t` FOR EACH ROW BEGIN
    DECLARE new_id INT;
    SET new_id = (SELECT COALESCE(MAX(SUBSTRING(item_id, 3)), 100000) + 1 FROM items_t);
    SET NEW.item_id = CONCAT('IT', new_id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `model_t`
--

CREATE TABLE `model_t` (
  `model_id` varchar(10) NOT NULL,
  `model_name` varchar(255) NOT NULL,
  `brand_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `model_t`
--

INSERT INTO `model_t` (`model_id`, `model_name`, `brand_id`) VALUES
('M1001', 'Cisco Router X1', 'B1001'),
('M1002', 'Cisco Switch Z9', 'B1001'),
('M1003', 'HP EliteBook 850', 'B1002'),
('M1004', 'HP ProDesk 600', 'B1002'),
('M1005', 'Dell Latitude 5420', 'B1003'),
('M1006', 'Dell PowerEdge T40', 'B1003'),
('M1007', 'Lenovo ThinkPad X1', 'B1004'),
('M1008', 'Lenovo IdeaPad 5', 'B1004'),
('M1009', 'MacBook Pro 14', 'B1005'),
('M1010', 'iMac M1', 'B1005'),
('M1011', 'Samsung Galaxy Tab S7', 'B1006'),
('M1012', 'Samsung Note 20', 'B1006'),
('M1013', 'Microsoft Surface Pro 7', 'B1007'),
('M1014', 'Microsoft Lumia 950', 'B1007'),
('M1015', 'Panasonic Toughbook FZ', 'B1008'),
('M1016', 'Brother HL-2350DW', 'B1009'),
('M1017', 'Canon PIXMA TS9150', 'B1010'),
('M1018', 'Cisco Firewall 7500', 'B1001'),
('M1019', 'HP LaserJet Pro MFP', 'B1002'),
('M1020', 'Dell OptiPlex 3080', 'B1003');

--
-- Triggers `model_t`
--
DELIMITER $$
CREATE TRIGGER `before_insert_model_t` BEFORE INSERT ON `model_t` FOR EACH ROW BEGIN
    DECLARE new_id INT;
    SET new_id = (SELECT COALESCE(MAX(SUBSTRING(model_id, 2)), 1000) + 1 FROM model_t);
    SET NEW.model_id = CONCAT('M', new_id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `sub_category_t`
--

CREATE TABLE `sub_category_t` (
  `sub_category_id` varchar(10) NOT NULL,
  `sub_category_name` varchar(255) NOT NULL,
  `category_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_category_t`
--

INSERT INTO `sub_category_t` (`sub_category_id`, `sub_category_name`, `category_id`) VALUES
('SUB1001', 'Data Center Equipment', 'CAT1001'),
('SUB1002', 'Network and Communication', 'CAT1001'),
('SUB1003', 'Computer Equipment', 'CAT1001'),
('SUB1004', 'Peripherals', 'CAT1001'),
('SUB1005', 'IT Accessories', 'CAT1001'),
('SUB1006', 'Camera', 'CAT1001'),
('SUB1007', 'Access Control', 'CAT1001'),
('SUB1008', 'Multi-Functional Machine', 'CAT1002'),
('SUB1009', 'Single Functional Machine', 'CAT1002'),
('SUB1010', 'Visuals', 'CAT1002');

--
-- Triggers `sub_category_t`
--
DELIMITER $$
CREATE TRIGGER `before_insert_sub_category_t` BEFORE INSERT ON `sub_category_t` FOR EACH ROW BEGIN
    DECLARE new_id INT;
    SET new_id = (SELECT COALESCE(MAX(SUBSTRING(sub_category_id, 4)), 1000) + 1 FROM sub_category_t);
    SET NEW.sub_category_id = CONCAT('SUB', new_id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `teams_t`
--

CREATE TABLE `teams_t` (
  `team_id` varchar(10) NOT NULL,
  `team_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams_t`
--

INSERT INTO `teams_t` (`team_id`, `team_name`) VALUES
('T1001', 'IT Networking Team'),
('T1002', 'IT Hardware Team'),
('T1003', 'IT Security and Access Control Team'),
('T1004', 'IT Software Team');

--
-- Triggers `teams_t`
--
DELIMITER $$
CREATE TRIGGER `before_insert_teams_t` BEFORE INSERT ON `teams_t` FOR EACH ROW BEGIN
    DECLARE new_id INT;
    SET new_id = (SELECT COALESCE(MAX(SUBSTRING(team_id, 2)), 1000) + 1 FROM teams_t);
    SET NEW.team_id = CONCAT('T', new_id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_t`
--

CREATE TABLE `user_t` (
  `user_id` varchar(10) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `team_id` varchar(10) DEFAULT NULL,
  `dept` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_t`
--

INSERT INTO `user_t` (`user_id`, `user_name`, `password`, `team_id`, `dept`) VALUES
('U1001', 'John Doe', '1234', 'T1001', 'IT Member'),
('U1002', 'Jane Smith', '1234', 'T1001', 'IT Member'),
('U1003', 'Alice Johnson', '1234', 'T1002', 'IT Member'),
('U1004', 'Bob Martin', '1234', 'T1002', 'IT Member'),
('U1006', 'David White', '1234', 'T1003', 'IT Member'),
('U1007', 'Emily Clark', '1234', 'T1004', 'IT Member'),
('U1008', 'Franklin Evans', '1234', 'T1004', 'IT Member'),
('U1009', 'Shanjidul Hasan Shajid', '1234', 'T1001', 'Super Admin'),
('U1010', 'Sarwar Shahidi', '1234', 'T1004', 'Admin'),
('U1011', 'Sakib Al Hasan', '1234', 'T1004', 'Admin');

--
-- Triggers `user_t`
--
DELIMITER $$
CREATE TRIGGER `before_insert_user_t` BEFORE INSERT ON `user_t` FOR EACH ROW BEGIN
    DECLARE new_id INT;
    SET new_id = (SELECT COALESCE(MAX(SUBSTRING(user_id, 2)), 1000) + 1 FROM user_t);
    SET NEW.user_id = CONCAT('U', new_id);
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands_t`
--
ALTER TABLE `brands_t`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `category_t`
--
ALTER TABLE `category_t`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `equipment_t`
--
ALTER TABLE `equipment_t`
  ADD PRIMARY KEY (`equipment_id`),
  ADD KEY `sub_category_id` (`sub_category_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `items_t`
--
ALTER TABLE `items_t`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `equipment_id` (`equipment_id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `model_id` (`model_id`);

--
-- Indexes for table `model_t`
--
ALTER TABLE `model_t`
  ADD PRIMARY KEY (`model_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `sub_category_t`
--
ALTER TABLE `sub_category_t`
  ADD PRIMARY KEY (`sub_category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `teams_t`
--
ALTER TABLE `teams_t`
  ADD PRIMARY KEY (`team_id`);

--
-- Indexes for table `user_t`
--
ALTER TABLE `user_t`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `equipment_t`
--
ALTER TABLE `equipment_t`
  ADD CONSTRAINT `equipment_t_ibfk_1` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category_t` (`sub_category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `equipment_t_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams_t` (`team_id`) ON DELETE CASCADE;

--
-- Constraints for table `items_t`
--
ALTER TABLE `items_t`
  ADD CONSTRAINT `items_t_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipment_t` (`equipment_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `items_t_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands_t` (`brand_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `items_t_ibfk_3` FOREIGN KEY (`model_id`) REFERENCES `model_t` (`model_id`) ON DELETE CASCADE;

--
-- Constraints for table `model_t`
--
ALTER TABLE `model_t`
  ADD CONSTRAINT `model_t_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands_t` (`brand_id`) ON DELETE CASCADE;

--
-- Constraints for table `sub_category_t`
--
ALTER TABLE `sub_category_t`
  ADD CONSTRAINT `sub_category_t_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category_t` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_t`
--
ALTER TABLE `user_t`
  ADD CONSTRAINT `user_t_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams_t` (`team_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
