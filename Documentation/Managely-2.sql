-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 14, 2023 at 07:29 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Managely`
--

-- --------------------------------------------------------

--
-- Table structure for table `EmployeeInfo`
--

CREATE TABLE `EmployeeInfo` (
  `ID` int(20) NOT NULL,
  `fName` varchar(255) NOT NULL COMMENT 'References EIA',
  `lName` varchar(255) NOT NULL COMMENT 'References EIA',
  `gender` char(1) NOT NULL COMMENT 'References EIA',
  `dateOfBirth` date NOT NULL COMMENT 'References EIA',
  `termInfo` varchar(2) NOT NULL COMMENT 'References EIA',
  `salary` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `EmployeeInfo`
--

INSERT INTO `EmployeeInfo` (`ID`, `fName`, `lName`, `gender`, `dateOfBirth`, `termInfo`, `salary`) VALUES
(345, 'Bobby', 'Jenkins', 'M', '1995-10-01', 'Q1', 60000),
(3425, 'Bob', 'Jenkin', 'M', '1996-10-01', 'Q2', 60000),
(12425, 'Po', 'J', 'M', '1976-10-01', 'Q3', 50000);

-- --------------------------------------------------------

--
-- Table structure for table `EmployeeInfoAdmin`
--

CREATE TABLE `EmployeeInfoAdmin` (
  `aID` int(20) NOT NULL,
  `SSN` int(9) NOT NULL,
  `aFName` varchar(255) NOT NULL,
  `aLName` varchar(255) NOT NULL,
  `agender` varchar(1) NOT NULL,
  `aDateOfBirth` date NOT NULL,
  `aTermInfo` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `EmployeeInfoAdmin`
--

INSERT INTO `EmployeeInfoAdmin` (`aID`, `SSN`, `aFName`, `aLName`, `agender`, `aDateOfBirth`, `aTermInfo`) VALUES
(1, 313424581, 'Donald', 'Dutch', 'M', '1981-12-02', 'Q3'),
(345, 352914372, 'Bobby', 'Jenkins', 'M', '1995-10-01', 'Q1'),
(3425, 152914372, 'Bob', 'Jenkin', 'M', '1996-10-01', 'Q2'),
(12425, 122914372, 'Po', 'J', 'M', '1976-10-01', 'Q3');

-- --------------------------------------------------------

--
-- Table structure for table `Inventory`
--

CREATE TABLE `Inventory` (
  `typeID` int(20) NOT NULL,
  `invenID` int(20) NOT NULL COMMENT 'Relates to Inventory ',
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Inventory`
--

INSERT INTO `Inventory` (`typeID`, `invenID`, `name`, `brand`, `price`, `amount`) VALUES
(5, 312, 'works', 'idk', 29.99, 7),
(32, 312, 'nep', 'idk', 29.99, 7);

-- --------------------------------------------------------

--
-- Table structure for table `Login details`
--

CREATE TABLE `Login details` (
  `ID` int(20) NOT NULL COMMENT 'References EIA',
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Login details`
--

INSERT INTO `Login details` (`ID`, `username`, `password`, `email`) VALUES
(12425, 'Default', 'nice', 'default@gmail.com');

INSERT INTO `Login details` (`ID`, `username`, `password`, `email`) VALUES
(12427, 'Default', 'nice', 'defaultEmployee@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Positions`
--

CREATE TABLE `Positions` (
  `employeeID` int(20) NOT NULL,
  `invenTypeID` int(20) NOT NULL COMMENT 'References Inventory',
  `job` varchar(255) NOT NULL,
  `salary` int(6) NOT NULL COMMENT 'References employeeInfo',
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Positions`
--

INSERT INTO `Positions` (`employeeID`, `invenTypeID`, `job`, `salary`, `description`) VALUES
(345, 0, 'Engineer', 60000, 'This can be anything'),
(3425, 0, 'Engineer', 60000, 'This can be anything'),
(12425, 0, 'Engineer', 50000, 'This can be anything');

-- --------------------------------------------------------

--
-- Table structure for table `Schedule`
--

CREATE TABLE `Schedule` (
  `sID` int(20) NOT NULL COMMENT 'References EIA',
  `sFName` varchar(255) NOT NULL,
  `sLName` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `dateTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Schedule`
--

INSERT INTO `Schedule` (`sID`, `sFName`, `sLName`, `date`, `dateTime`) VALUES
(345, 'Bobby', 'Jenkins', '2021-02-12', '01:00:00'),
(3425, 'Bob', 'Jenkin', '2021-02-12', '01:00:00'),
(12425, 'Po', 'J', '2021-02-12', '01:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `EmployeeInfo`
--
ALTER TABLE `EmployeeInfo`
  ADD PRIMARY KEY (`ID`,`fName`,`lName`,`gender`,`dateOfBirth`,`termInfo`);

--
-- Indexes for table `EmployeeInfoAdmin`
--
ALTER TABLE `EmployeeInfoAdmin`
  ADD PRIMARY KEY (`aID`,`SSN`,`aFName`,`aLName`,`agender`,`aDateOfBirth`,`aTermInfo`);

--
-- Indexes for table `Inventory`
--
ALTER TABLE `Inventory`
  ADD PRIMARY KEY (`typeID`);

--
-- Indexes for table `Login details`
--
ALTER TABLE `Login details`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Positions`
--
ALTER TABLE `Positions`
  ADD PRIMARY KEY (`employeeID`,`invenTypeID`,`salary`);

--
-- Indexes for table `Schedule`
--
ALTER TABLE `Schedule`
  ADD PRIMARY KEY (`sID`,`sFName`,`sLName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
