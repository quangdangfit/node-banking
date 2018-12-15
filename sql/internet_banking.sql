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

 Date: 15/12/2018 16:15:27
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
  `role` int(10) NULL DEFAULT 3,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '81dc9bdb52d04dc20036dbd8313ed055', 'Quang', 'Dang', 'admin@gmail.com', 123456789, 1);
INSERT INTO `users` VALUES (7, 'quang', '81dc9bdb52d04dc20036dbd8313ed055', 'Quang', 'Dang', 'quang@gmail.com', 789456123, 3);
INSERT INTO `users` VALUES (8, 'staff', '81dc9bdb52d04dc20036dbd8313ed055', NULL, NULL, 'staff@gmail.com', NULL, 3);

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
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_account
-- ----------------------------
INSERT INTO `users_account` VALUES (28, 1, 1997000000, 0, '2018-12-15 13:14:05.000000');
INSERT INTO `users_account` VALUES (29, 1, 1997000001, 0, '2018-12-15 13:14:13.000000');
INSERT INTO `users_account` VALUES (30, 1, 1997000002, 0, '2018-12-15 13:14:18.000000');
INSERT INTO `users_account` VALUES (31, 1, 1997000003, 0, '2018-12-15 14:23:07.000000');
INSERT INTO `users_account` VALUES (32, 1, 1997000004, 0, '2018-12-15 14:37:37.000000');
INSERT INTO `users_account` VALUES (33, 1, 1997000005, 0, '2018-12-15 14:40:22.000000');
INSERT INTO `users_account` VALUES (34, 1, 1997000006, 0, '2018-12-15 14:40:32.000000');
INSERT INTO `users_account` VALUES (35, 1, 1997000007, 0, '2018-12-15 15:24:21.000000');

-- ----------------------------
-- Table structure for users_role
-- ----------------------------
DROP TABLE IF EXISTS `users_role`;
CREATE TABLE `users_role`  (
  `id` int(10) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_role
-- ----------------------------
INSERT INTO `users_role` VALUES (1, 'admin');
INSERT INTO `users_role` VALUES (2, 'staff');
INSERT INTO `users_role` VALUES (3, 'member');

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_token
-- ----------------------------
INSERT INTO `users_token` VALUES (1, 1, 'tyIKqMSv2EglLnoUnWMdRKKLQH46m2fYMy5CiOPd0vGTWaM0Uwsp2WQWBxWlYk8O5bRx61DIFceLCAhC', '2018-12-15 08:50:50.000000', '2018-12-15 16:12:35.000000');
INSERT INTO `users_token` VALUES (2, 7, 'Mu6RfPwNrWLouSWeXAX268KzgoPRqK6UBiATCt2sk1mP8HEhtZgiahJL3tfqUcKpOg74FVn7Nt1Ba3t8', '2018-12-15 16:13:18.000000', NULL);

SET FOREIGN_KEY_CHECKS = 1;
