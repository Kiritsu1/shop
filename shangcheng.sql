/*
Navicat MySQL Data Transfer

Source Server         : Hibernate
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : shangcheng

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-09-20 21:33:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `addressid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `areaDetail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`addressid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for money_detail
-- ----------------------------
DROP TABLE IF EXISTS `money_detail`;
CREATE TABLE `money_detail` (
  `md_id` int(255) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `changeOrigin` varchar(255) DEFAULT NULL,
  `changenumber` int(11) DEFAULT NULL,
  PRIMARY KEY (`md_id`),
  KEY `md_uid` (`u_id`),
  CONSTRAINT `md_uid` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for prod
-- ----------------------------
DROP TABLE IF EXISTS `prod`;
CREATE TABLE `prod` (
  `prodid` int(11) NOT NULL AUTO_INCREMENT,
  `shopid` int(11) NOT NULL,
  `prodname` varchar(255) NOT NULL,
  `add_time` date DEFAULT NULL,
  `click` int(11) DEFAULT '0',
  `img_url` varchar(255) DEFAULT NULL,
  `sell_price` float DEFAULT '0',
  `market_price` float DEFAULT '0',
  `discount` float DEFAULT '1',
  `stock` int(11) DEFAULT '0',
  `other` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT '0',
  `descr` longtext,
  `sortid` int(11) DEFAULT NULL,
  PRIMARY KEY (`prodid`),
  KEY `shopid` (`shopid`),
  KEY `sort` (`sortid`),
  CONSTRAINT `shopid` FOREIGN KEY (`shopid`) REFERENCES `shop` (`shop_id`),
  CONSTRAINT `sort` FOREIGN KEY (`sortid`) REFERENCES `sort` (`sortid`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for prodorder
-- ----------------------------
DROP TABLE IF EXISTS `prodorder`;
CREATE TABLE `prodorder` (
  `orderid` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `shopid` int(11) NOT NULL,
  `prodid` int(11) NOT NULL,
  `state` int(11) DEFAULT '0' COMMENT '0：未付款，1：未发货,2:已发货',
  `num` int(11) DEFAULT '0',
  `sum` int(11) DEFAULT '0',
  `add_time` date DEFAULT NULL,
  `addressid` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderid`),
  KEY `uid_` (`u_id`),
  KEY `shopid_` (`shopid`),
  KEY `prodid` (`prodid`),
  CONSTRAINT `prodid` FOREIGN KEY (`prodid`) REFERENCES `prod` (`prodid`),
  CONSTRAINT `shopid_` FOREIGN KEY (`shopid`) REFERENCES `shop` (`shop_id`),
  CONSTRAINT `uid_` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `shop_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `sellcount` int(11) DEFAULT '0',
  PRIMARY KEY (`shop_id`),
  KEY `uid` (`u_id`),
  CONSTRAINT `uid` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sort
-- ----------------------------
DROP TABLE IF EXISTS `sort`;
CREATE TABLE `sort` (
  `sortid` int(11) NOT NULL AUTO_INCREMENT,
  `sortname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sortid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `u_id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `type` int(8) DEFAULT '1' COMMENT '1：用户， 2：商家',
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wallet
-- ----------------------------
DROP TABLE IF EXISTS `wallet`;
CREATE TABLE `wallet` (
  `u_id` int(11) NOT NULL,
  `money` int(11) NOT NULL,
  `foraccount` int(11) NOT NULL,
  `alreadysettled` int(11) NOT NULL,
  PRIMARY KEY (`u_id`),
  KEY `money` (`money`),
  CONSTRAINT `u_id` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
