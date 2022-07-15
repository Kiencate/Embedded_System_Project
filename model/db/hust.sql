/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 8.0.29 : Database - hust
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`hust` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `hust`;

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `admin` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`admin`),
  UNIQUE KEY `admin` (`admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `account` */

insert  into `account`(`admin`,`password`) values 
('hqtruong','010200');

/*Table structure for table `atm` */

DROP TABLE IF EXISTS `atm`;

CREATE TABLE `atm` (
  `Id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Location` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `atm` */

insert  into `atm`(`Id`,`Location`) values 
('101','Bach Khoa'),
('102','Vinschool'),
('103','Honda'),
('104','Vinfast');

/*Table structure for table `battery` */

DROP TABLE IF EXISTS `battery`;

CREATE TABLE `battery` (
  `Id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `capacity` int unsigned NOT NULL COMMENT 'mAh',
  `unitPrice` int unsigned NOT NULL COMMENT '/ 1%',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `battery` */

insert  into `battery`(`Id`,`capacity`,`unitPrice`) values 
('12v',12000,500),
('24V',20000,1000);

/*Table structure for table `payment` */

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `atmId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `batteryId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `capacity` int unsigned NOT NULL COMMENT '%',
  `totalPrice` int unsigned NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `payment_ibfk_2` (`atmId`),
  KEY `typeOfBattery` (`batteryId`),
  KEY `userId` (`userId`),
  CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`atmId`) REFERENCES `atm` (`Id`),
  CONSTRAINT `payment_ibfk_3` FOREIGN KEY (`batteryId`) REFERENCES `battery` (`Id`),
  CONSTRAINT `payment_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `payment` */

insert  into `payment`(`Id`,`userId`,`atmId`,`batteryId`,`capacity`,`totalPrice`) values 
(1,1,'101','12v',10,5000);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cardId` varchar(50) NOT NULL,
  `balance` int unsigned DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `cardId` (`cardId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user` */

insert  into `user`(`Id`,`firstName`,`lastName`,`phone`,`email`,`cardId`,`balance`) values 
(1,'Truong','Ha Quang','0395870206','truong.hq182843@sis.hust.edu.vn','105.141.167.178',100000),
(2,'Kien','Vu Duc','0369650673','kien.vd182620@sis.hust.edu.vn','0.130.176.26',100000),
(3,'Long','Tran Viet','0001112222','long.vl182669@sis.hust.edu.vn','0.130.176.28',100000);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
