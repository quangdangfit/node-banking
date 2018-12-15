/*
 Navicat Premium Data Transfer

 Source Server         : vagrant_mysql
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : 192.168.102.25:3306
 Source Schema         : internet_banking

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 15/12/2018 13:16:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` decimal(20, 0) NULL DEFAULT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '81dc9bdb52d04dc20036dbd8313ed055', 'Quang', 'Dang', 'admin@gmail.com', 123456789);
INSERT INTO `users` VALUES (7, 'quang', '81dc9bdb52d04dc20036dbd8313ed055', 'Quang', 'Dang', 'quang@gmail.com', 789456123);

-- ----------------------------
-- Table structure for users_account
-- ----------------------------
DROP TABLE IF EXISTS `users_account`;
CREATE TABLE `users_account`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` int(10) UNSIGNED NOT NULL,
  `account_number` int(16) UNSIGNED NOT NULL,
  `balance` int(16) UNSIGNED NULL DEFAULT 0,
  `create_at` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `account_number`) USING BTREE,
  INDEX `user_account_frk`(`uid`) USING BTREE,
  CONSTRAINT `user_account_frk` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_account
-- ----------------------------
INSERT INTO `users_account` VALUES (28, 1, 1997000000, 0, '2018-12-15 13:14:05.000000');
INSERT INTO `users_account` VALUES (29, 1, 1997000001, 0, '2018-12-15 13:14:13.000000');
INSERT INTO `users_account` VALUES (30, 1, 1997000002, 0, '2018-12-15 13:14:18.000000');

-- ----------------------------
-- Table structure for users_token
-- ----------------------------
DROP TABLE IF EXISTS `users_token`;
CREATE TABLE `users_token`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` int(10) UNSIGNED NOT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_at` datetime(6) NULL DEFAULT NULL,
  `write_at` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `users_token_frk`(`uid`) USING BTREE,
  CONSTRAINT `users_token_frk` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_token
-- ----------------------------
INSERT INTO `users_token` VALUES (1, 1, 'zFv3XZjcgCLpQjod4kMU53N2PWEbMZe1pbPDgZqRzsTr4vhvaydD4h3mjWRO8SS0fQ9hSQpDy9XHlpZq', '2018-12-15 08:50:50.000000', '2018-12-15 13:13:09.000000');

SET FOREIGN_KEY_CHECKS = 1;
