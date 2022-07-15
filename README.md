
/*
MySQL DATABASE
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
  `admin` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`admin`),
  UNIQUE KEY `admin` (`admin`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `account` */

INSERT  INTO `account`(`admin`,`password`) VALUES 
('hqtruong','010200');

/*Table structure for table `atm` */

DROP TABLE IF EXISTS `atm`;

CREATE TABLE `atm` (
  `Id` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Location` VARCHAR(50) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `atm` */

INSERT  INTO `atm`(`Id`,`Location`) VALUES 
('101','Bach Khoa'),
('102','Vinschool'),
('103','Honda'),
('104','Vinfast');

/*Table structure for table `battery` */

DROP TABLE IF EXISTS `battery`;

CREATE TABLE `battery` (
  `Id` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `capacity` INT UNSIGNED NOT NULL COMMENT 'mAh',
  `unitPrice` INT UNSIGNED NOT NULL COMMENT '/ 1%',
  PRIMARY KEY (`Id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `battery` */

INSERT  INTO `battery`(`Id`,`capacity`,`unitPrice`) VALUES 
('12v',12000,500),
('24V',20000,1000);

/*Table structure for table `payment` */

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` INT UNSIGNED NOT NULL,
  `atmId` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `batteryId` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `capacity` INT UNSIGNED NOT NULL COMMENT '%',
  `totalPrice` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `payment_ibfk_2` (`atmId`),
  KEY `typeOfBattery` (`batteryId`),
  KEY `userId` (`userId`),
  CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`atmId`) REFERENCES `atm` (`Id`),
  CONSTRAINT `payment_ibfk_3` FOREIGN KEY (`batteryId`) REFERENCES `battery` (`Id`),
  CONSTRAINT `payment_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`)
) ENGINE=INNODB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `payment` */

INSERT  INTO `payment`(`Id`,`userId`,`atmId`,`batteryId`,`capacity`,`totalPrice`) VALUES 
(1,1,'101','12v',10,5000);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastName` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `cardId` VARCHAR(50) NOT NULL,
  `balance` INT UNSIGNED DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `cardId` (`cardId`)
) ENGINE=INNODB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user` */

INSERT  INTO `user`(`Id`,`firstName`,`lastName`,`phone`,`email`,`cardId`,`balance`) VALUES 
(1,'Truong','Ha Quang','0395870206','truong.hq182843@sis.hust.edu.vn','105.141.167.178',100000),
(2,'Kien','Vu Duc','0369650673','kien.vd182620@sis.hust.edu.vn','0.130.176.26',100000),
(3,'Long','Tran Viet','0001112222','long.vl182669@sis.hust.edu.vn','0.130.176.28',100000);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;



>>>>>>> 0203cae8f770a1b319578d12c58dbc811c80ee15
