-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2025 at 06:14 AM
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
('CAT1003', 'Network Equipment'),
('CAT1004', 'dummy category 1');

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
('EQ1047', 'Projector', 'SUB1010', 'T1002'),
('EQ1048', 'dummy equipment 01', 'SUB1011', 'T1003'),
('EQ1049', 'dummy equipment 2', 'SUB1011', 'T1005');

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
('IT100001', 'lala', 'EQ1002', 'asdad', 'B1003', 'M1006', '2025-02-05 23:46:32', 'adada', 'Disposed (not scraped)', 'adadad', 'dadad', 'adadad', 'adad', 'adad', 'adada', 'adadad', '2025-02-01', 'adadad', 'adadad', 'adadad', '', 12344, '', '2025-02-13', 'qdd', 'sdfsf', 'sfsfsf', 'sfsfs', 'sdfsfsf', '', '', '', 0, 0, 0, '', '', 0, '2025-02-01', '2025-02-24'),
('IT100002', 'Panasonic Printer', 'EQ1025', 'Laser Printer', 'B1008', 'M1015', '2025-02-09 12:56:59', 'PN123456', 'Operational', '', 'Line A', 'Store 1', 'Factory A', 'Factory B', 'Rack 5', 'LN7890', '2024-01-15', 'RCV9876', 'INV12345', 'PO54321', 'Panasonic Vendor', 500, 'USD', '2024-02-01', '192.168.1.10', '255.255.255.0', '192.168.1.1', '8.8.8.8', 'Ethernet 1', 'Printer-01', '', '', 0, 0, 0, '', '', 0, '2024-02-01', '2028-02-01'),
('IT100003', 'Cisco Router X1', 'EQ1010', 'Dual-Band Wireless Router', 'B1001', 'M1001', '2025-02-09 12:56:59', 'RTR56789', 'Operational', 'New installation', 'Line B', 'Store 2', 'Factory C', 'Factory D', 'Rack 1', 'LN2345', '2024-02-01', 'RCV5678', 'INV23456', 'PO67890', 'Cisco Vendor', 1200, 'USD', '2024-02-05', '192.168.1.1', '255.255.255.0', '192.168.1.254', '8.8.4.4', 'Ethernet 2', 'Router-01', '', '', 0, 0, 0, '', '', 0, '2024-02-05', '2027-02-05'),
('IT100004', 'Dell Latitude 5420', 'EQ1022', '14-inch Business Laptop', 'B1003', 'M1005', '2025-02-09 12:56:59', 'LT123456', 'Operational', '', 'Line C', 'Store 3', 'Factory A', 'Factory B', 'Desk 1', 'LN5678', '2024-03-01', 'RCV1234', 'INV34567', 'PO76543', 'Dell Vendor', 1500, 'USD', '2024-03-10', '', '', '', '', '', 'Laptop-01', 'Windows 11', 'x64', 512, 200, 16, 'DDR4', 'Intel i7', 3.5, '2024-03-10', '2027-03-10'),
('IT100005', 'Cisco IP Phone Set', 'EQ1007', 'VOIP Office Phone', 'B1001', 'M1001', '2025-02-09 12:56:59', 'IP123456', 'Operational', '', 'Line D', 'Store 4', 'Factory B', 'Factory C', 'Desk 3', 'LN9876', '2024-02-10', 'RCV4321', 'INV65432', 'PO87654', 'Cisco Vendor', 250, 'USD', '2024-02-20', '', '', '', '', '', 'IP-Phone-01', '', '', 0, 0, 0, '', '', 0, '2024-02-20', '2028-02-20'),
('IT100006', 'Samsung Storage Device', 'EQ1023', '1TB SSD', 'B1006', 'M1011', '2025-02-09 12:56:59', 'ST123456', 'Operational', '', 'Line E', 'Store 5', 'Factory C', 'Factory D', 'Server Room', 'LN4567', '2024-03-15', 'RCV6789', 'INV78910', 'PO34567', 'Samsung Vendor', 200, 'USD', '2024-03-20', '', '', '', '', '', 'Storage-01', '', '', 0, 0, 0, '', '', 0, '2024-03-20', '2027-03-20'),
('IT100007', 'Panasonic Projector', 'EQ1027', 'Full HD 1080p', 'B1008', 'M1015', '2025-02-09 12:56:59', 'PJ123456', 'Operational', '', 'Line F', 'Store 6', 'Factory D', 'Factory A', 'Conference Room', 'LN8765', '2024-04-01', 'RCV4567', 'INV56789', 'PO12345', 'Panasonic Vendor', 800, 'USD', '2024-04-10', '', '', '', '', '', 'Projector-01', '', '', 0, 0, 0, '', '', 0, '2024-04-10', '2028-04-10'),
('IT100008', 'HP PowerEdge Server', 'EQ1020', 'High-Performance Rack Server', 'B1002', 'M1019', '2025-02-09 12:56:59', 'SV123456', 'Operational', '', 'Line G', 'Store 7', 'Factory A', 'Factory B', 'Data Center', 'LN6543', '2024-04-15', 'RCV8765', 'INV23456', 'PO98765', 'HP Vendor', 5000, 'USD', '2024-04-20', '', '', '', '', '', 'Server-01', 'Linux', 'x64', 2048, 1000, 128, 'DDR4', 'Intel Xeon', 2.8, '2024-04-20', '2030-04-20'),
('IT100009', 'Brother Printer', 'EQ1025', 'Laser Multifunction Printer', 'B1009', 'M1016', '2025-02-09 12:56:59', 'PR123456', 'Operational', '', 'Line H', 'Store 8', 'Factory C', 'Factory D', 'Office Floor', 'LN4321', '2024-05-01', 'RCV9876', 'INV34567', 'PO65432', 'Brother Vendor', 600, 'USD', '2024-05-10', '', '', '', '', '', 'Printer-02', '', '', 0, 0, 0, '', '', 0, '2024-05-10', '2029-05-10'),
('IT100010', 'MacBook Pro 14', 'EQ1022', 'M1 Chip 16GB RAM', 'B1005', 'M1009', '2025-02-09 12:56:59', 'LT654321', 'Operational', '', 'Line I', 'Store 9', 'Factory D', 'Factory A', 'Workstation 1', 'LN3210', '2024-06-01', 'RCV6789', 'INV45678', 'PO78901', 'Apple Vendor', 2500, 'USD', '2024-06-10', '', '', '', '', '', 'MacBook-01', 'macOS', 'ARM64', 1024, 500, 16, 'DDR4', 'Apple M1', 3.2, '2024-06-10', '2029-06-10'),
('IT100011', 'Cisco Firewall 7500', 'EQ1017', 'Enterprise Security Firewall', 'B1001', 'M1018', '2025-02-09 12:56:59', 'FW123456', 'Operational', '', 'Line J', 'Store 10', 'Factory B', 'Factory C', 'Server Rack 5', 'LN2109', '2024-07-01', 'RCV5678', 'INV67890', 'PO12345', 'Cisco Vendor', 3000, 'USD', '2024-07-10', '', '', '', '', '', 'Firewall-01', '', '', 0, 0, 0, '', '', 0, '2024-07-10', '2030-07-10'),
('IT100012', 'Panasonic Printer', 'EQ1025', 'Laser Printer', 'B1008', 'M1015', '2025-02-09 13:03:40', 'PN123456', 'Idle (ready to go)', '', 'Line A', 'Store 1', 'Factory A', 'Factory B', 'Rack 5', 'LN7890', '2024-01-15', 'RCV9876', 'INV12345', 'PO54321', 'Panasonic Vendor', 500, 'USD', '2024-02-01', '192.168.1.10', '255.255.255.0', '192.168.1.1', '8.8.8.8', 'Ethernet 1', 'Printer-01', '', '', 0, 0, 0, '', '', 0, '2024-02-01', '2028-02-01'),
('IT100013', 'Cisco Router X1', 'EQ1010', 'Dual-Band Wireless Router', 'B1001', 'M1001', '2025-02-09 13:03:40', 'RTR56789', 'Issued', 'New installation', 'Line B', 'Store 2', 'Factory C', 'Factory D', 'Rack 1', 'LN2345', '2024-02-01', 'RCV5678', 'INV23456', 'PO67890', 'Cisco Vendor', 1200, 'USD', '2024-02-05', '192.168.1.1', '255.255.255.0', '192.168.1.254', '8.8.4.4', 'Ethernet 2', 'Router-01', '', '', 0, 0, 0, '', '', 0, '2024-02-05', '2027-02-05'),
('IT100014', 'Dell Latitude 5420', 'EQ1022', '14-inch Business Laptop', 'B1003', 'M1005', '2025-02-09 13:03:40', 'LT123456', 'Under Maintenance', '', 'Line C', 'Store 3', 'Factory A', 'Factory B', 'Desk 1', 'LN5678', '2024-03-01', 'RCV1234', 'INV34567', 'PO76543', 'Dell Vendor', 1500, 'USD', '2024-03-10', '', '', '', '', '', 'Laptop-01', 'Windows 11', 'x64', 512, 200, 16, 'DDR4', 'Intel i7', 3.5, '2024-03-10', '2027-03-10'),
('IT100015', 'Cisco IP Phone Set', 'EQ1007', 'VOIP Office Phone', 'B1001', 'M1001', '2025-02-09 13:03:40', 'IP123456', 'Backup (Ready to go)', '', 'Line D', 'Store 4', 'Factory B', 'Factory C', 'Desk 3', 'LN9876', '2024-02-10', 'RCV4321', 'INV65432', 'PO87654', 'Cisco Vendor', 250, 'USD', '2024-02-20', '', '', '', '', '', 'IP-Phone-01', '', '', 0, 0, 0, '', '', 0, '2024-02-20', '2028-02-20'),
('IT100016', 'Samsung Storage Device', 'EQ1023', '1TB SSD', 'B1006', 'M1011', '2025-02-09 13:03:40', 'ST123456', 'Disposed (scraped)', '', 'Line E', 'Store 5', 'Factory C', 'Factory D', 'Server Room', 'LN4567', '2024-03-15', 'RCV6789', 'INV78910', 'PO34567', 'Samsung Vendor', 200, 'USD', '2024-03-20', '', '', '', '', '', 'Storage-01', '', '', 0, 0, 0, '', '', 0, '2024-03-20', '2027-03-20'),
('IT100017', 'Panasonic Projector', 'EQ1027', 'Full HD 1080p', 'B1008', 'M1015', '2025-02-09 13:03:40', 'PJ123456', 'Newly Received', '', 'Line F', 'Store 6', 'Factory D', 'Factory A', 'Conference Room', 'LN8765', '2024-04-01', 'RCV4567', 'INV56789', 'PO12345', 'Panasonic Vendor', 800, 'USD', '2024-04-10', '', '', '', '', '', 'Projector-01', '', '', 0, 0, 0, '', '', 0, '2024-04-10', '2028-04-10'),
('IT100018', 'HP PowerEdge Server', 'EQ1020', 'High-Performance Rack Server', 'B1002', 'M1019', '2025-02-09 13:03:40', 'SV123456', 'Back to Vendor', '', 'Line G', 'Store 7', 'Factory A', 'Factory B', 'Data Center', 'LN6543', '2024-04-15', 'RCV8765', 'INV23456', 'PO98765', 'HP Vendor', 5000, 'USD', '2024-04-20', '', '', '', '', '', 'Server-01', 'Linux', 'x64', 2048, 1000, 128, 'DDR4', 'Intel Xeon', 2.8, '2024-04-20', '2030-04-20'),
('IT100019', 'Brother Printer', 'EQ1025', 'Laser Multifunction Printer', 'B1009', 'M1016', '2025-02-09 13:03:40', 'PR123456', 'In Transition (Location)', '', 'Line H', 'Store 8', 'Factory C', 'Factory D', 'Office Floor', 'LN4321', '2024-05-01', 'RCV9876', 'INV34567', 'PO65432', 'Brother Vendor', 600, 'USD', '2024-05-10', '', '', '', '', '', 'Printer-02', '', '', 0, 0, 0, '', '', 0, '2024-05-10', '2029-05-10'),
('IT100020', 'MacBook Pro 14', 'EQ1022', 'M1 Chip 16GB RAM', 'B1005', 'M1009', '2025-02-09 13:03:40', 'LT654321', 'Not Identified', '', 'Line I', 'Store 9', 'Factory D', 'Factory A', 'Workstation 1', 'LN3210', '2024-06-01', 'RCV6789', 'INV45678', 'PO78901', 'Apple Vendor', 2500, 'USD', '2024-06-10', '', '', '', '', '', 'MacBook-01', 'macOS', 'ARM64', 1024, 500, 16, 'DDR4', 'Apple M1', 3.2, '2024-06-10', '2029-06-10'),
('IT100021', 'Cisco Firewall 7500', 'EQ1017', 'Enterprise Security Firewall', 'B1001', 'M1018', '2025-02-09 13:03:40', 'FW123456', 'Disposed (not scraped)', '', 'Line J', 'Store 10', 'Factory B', 'Factory C', 'Server Rack 5', 'LN2109', '2024-07-01', 'RCV5678', 'INV67890', 'PO12345', 'Cisco Vendor', 3000, 'USD', '2024-07-10', '', '', '', '', '', 'Firewall-01', '', '', 0, 0, 0, '', '', 0, '2024-07-10', '2030-07-10'),
('IT100022', 'Dell Monitor', 'EQ1026', '24-inch Full HD', 'B1003', 'M1020', '2025-02-09 13:06:14', 'MN654321', 'Under Maintenance', '', 'Line A', 'Store 1', 'Factory A', 'Factory B', 'Office Desk', 'LN2345', '2024-02-01', 'RCV9876', 'INV87654', 'PO12345', 'Dell Vendor', 250, 'USD', '2024-02-05', '', '', '', '', '', 'Monitor-01', '', '', 0, 0, 0, '', '', 0, '2024-02-05', '2027-02-05'),
('IT100023', 'Microsoft Webcam', 'EQ1031', 'HD 1080p', 'B1007', 'M1013', '2025-02-09 13:06:14', 'WB987654', 'Idle (ready to go)', '', 'Line B', 'Store 2', 'Factory C', 'Factory D', 'Rack 2', 'LN5678', '2024-03-01', 'RCV54321', 'INV65432', 'PO67890', 'Microsoft Vendor', 150, 'USD', '2024-03-10', '', '', '', '', '', 'Webcam-01', '', '', 0, 0, 0, '', '', 0, '2024-03-10', '2028-03-10'),
('IT100024', 'Panasonic IP Camera', 'EQ1037', 'Night Vision Security Camera', 'B1008', 'M1015', '2025-02-09 13:06:14', 'IPCAM123', 'Issued', '', 'Line C', 'Store 3', 'Factory B', 'Factory C', 'Surveillance Room', 'LN8765', '2024-04-01', 'RCV78901', 'INV34567', 'PO76543', 'Panasonic Vendor', 900, 'USD', '2024-04-10', '', '', '', '', '', 'Camera-01', '', '', 0, 0, 0, '', '', 0, '2024-04-10', '2029-04-10'),
('IT100025', 'Samsung Smart Terminal', 'EQ1036', 'POS Terminal', 'B1006', 'M1012', '2025-02-09 13:06:14', 'ST987654', 'Newly Received', '', 'Line D', 'Store 4', 'Factory C', 'Factory D', 'Checkout Counter', 'LN4321', '2024-05-01', 'RCV56789', 'INV23456', 'PO98765', 'Samsung Vendor', 1200, 'USD', '2024-05-10', '', '', '', '', '', 'Terminal-01', '', '', 0, 0, 0, '', '', 0, '2024-05-10', '2028-05-10'),
('IT100026', 'HP EliteBook 850', 'EQ1022', 'Business Laptop 15-inch', 'B1002', 'M1003', '2025-02-09 13:06:14', 'LT654987', 'Disposed (scraped)', '', 'Line E', 'Store 5', 'Factory A', 'Factory B', 'Workstation 2', 'LN3210', '2024-06-01', 'RCV67890', 'INV56789', 'PO34567', 'HP Vendor', 2000, 'USD', '2024-06-10', '', '', '', '', '', 'Laptop-02', 'Windows 10', 'x64', 512, 300, 16, 'DDR4', 'Intel i5', 3.1, '2024-06-10', '2028-06-10'),
('IT100027', 'LG Disc Writer', 'EQ1028', 'DVD/Blu-ray RW Drive', 'B1009', 'M1016', '2025-02-09 13:06:14', 'DW987654', 'Disposed (not scraped)', '', 'Line F', 'Store 6', 'Factory C', 'Factory D', 'Storage Room', 'LN2109', '2024-07-01', 'RCV34567', 'INV98765', 'PO12345', 'LG Vendor', 150, 'USD', '2024-07-10', '', '', '', '', '', 'DiscWriter-01', '', '', 0, 0, 0, '', '', 0, '2024-07-10', '2028-07-10'),
('IT100028', 'Cisco Firewall 7500', 'EQ1017', 'Enterprise Security Firewall', 'B1001', 'M1018', '2025-02-09 13:06:14', 'FW654321', 'Back to Vendor', '', 'Line G', 'Store 7', 'Factory A', 'Factory B', 'Server Rack 3', 'LN7890', '2024-08-01', 'RCV45678', 'INV67890', 'PO54321', 'Cisco Vendor', 3500, 'USD', '2024-08-10', '', '', '', '', '', 'Firewall-02', '', '', 0, 0, 0, '', '', 0, '2024-08-10', '2029-08-10'),
('IT100029', 'Bose Speaker', 'EQ1032', 'Wireless Bluetooth Speaker', 'B1009', 'M1017', '2025-02-09 13:06:14', 'SP123456', 'Not Identified', '', 'Line H', 'Store 8', 'Factory C', 'Factory D', 'Reception', 'LN8765', '2024-09-01', 'RCV23456', 'INV34567', 'PO65432', 'Bose Vendor', 300, 'USD', '2024-09-10', '', '', '', '', '', 'Speaker-01', '', '', 0, 0, 0, '', '', 0, '2024-09-10', '2029-09-10'),
('IT100030', 'Canon Scanner', 'EQ1044', 'Flatbed A4 Scanner', 'B1010', 'M1017', '2025-02-09 13:06:14', 'SC654321', 'In Transition (Location)', '', 'Line I', 'Store 9', 'Factory D', 'Factory A', 'Admin Office', 'LN3210', '2024-10-01', 'RCV56789', 'INV23456', 'PO76543', 'Canon Vendor', 500, 'USD', '2024-10-10', '', '', '', '', '', 'Scanner-01', '', '', 0, 0, 0, '', '', 0, '2024-10-10', '2029-10-10'),
('IT100031', 'Cisco Switch Z9', 'EQ1012', 'Managed Network Switch', 'B1001', 'M1002', '2025-02-09 13:06:14', 'SW987654', 'Backup (Ready to go)', '', 'Line J', 'Store 10', 'Factory B', 'Factory C', 'Network Rack', 'LN6543', '2024-11-01', 'RCV67890', 'INV98765', 'PO34567', 'Cisco Vendor', 1500, 'USD', '2024-11-10', '', '', '', '', '', 'Switch-01', '', '', 0, 0, 0, '', '', 0, '2024-11-10', '2029-11-10');

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
('SUB1010', 'Visuals', 'CAT1002'),
('SUB1011', 'dummy sub category 01', 'CAT1004');

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
('T1004', 'IT Software Team'),
('T1005', 'dummy team 01');

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
('U1011', 'Sakib Al Hasan', '1234', 'T1004', 'Admin'),
('U1012', 'Abu Sayed', '1234', 'T1005', 'IT Member');

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
