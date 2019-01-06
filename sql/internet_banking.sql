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

 Date: 06/01/2019 21:14:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fee_type
-- ----------------------------
DROP TABLE IF EXISTS `fee_type`;
CREATE TABLE `fee_type`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fee_type
-- ----------------------------
INSERT INTO `fee_type` VALUES (1, 'Sender Paid');
INSERT INTO `fee_type` VALUES (2, 'Recipients Paid');

-- ----------------------------
-- Table structure for recipient_list
-- ----------------------------
DROP TABLE IF EXISTS `recipient_list`;
CREATE TABLE `recipient_list`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `account_number` int(16) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `recipient_user_account_frk`(`account_number`) USING BTREE,
  INDEX `recipient_user_frk`(`uid`) USING BTREE,
  CONSTRAINT `recipient_user_account_frk` FOREIGN KEY (`account_number`) REFERENCES `users_account` (`account_number`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `recipient_user_frk` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recipient_list
-- ----------------------------
INSERT INTO `recipient_list` VALUES (1, 1, 'quangbd', 1997000008);
INSERT INTO `recipient_list` VALUES (2, 1, 'quangbd', 1997000008);
INSERT INTO `recipient_list` VALUES (3, 1, 'long', 1997000003);

-- ----------------------------
-- Table structure for transfers
-- ----------------------------
DROP TABLE IF EXISTS `transfers`;
CREATE TABLE `transfers`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `src_account` int(16) UNSIGNED NOT NULL,
  `dest_account` int(16) UNSIGNED NOT NULL,
  `amount` int(16) NOT NULL,
  `fee_type` int(6) NOT NULL DEFAULT 1,
  `note` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `state` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_at` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `transfer_account_src`(`src_account`) USING BTREE,
  INDEX `transfer_account_dest`(`dest_account`) USING BTREE,
  CONSTRAINT `transfer_account_dest` FOREIGN KEY (`dest_account`) REFERENCES `users_account` (`account_number`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `transfer_account_src` FOREIGN KEY (`src_account`) REFERENCES `users_account` (`account_number`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 86 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of transfers
-- ----------------------------
INSERT INTO `transfers` VALUES (4, 1997000000, 1997000001, 100000, 1, NULL, 'done', '2018-12-16 14:19:27.000000');
INSERT INTO `transfers` VALUES (5, 1997000000, 1997000001, 100000, 1, NULL, 'done', '2018-12-16 14:21:02.000000');
INSERT INTO `transfers` VALUES (6, 1997000000, 1997000001, 1000000, 1, NULL, 'done', '2018-12-16 14:26:28.000000');
INSERT INTO `transfers` VALUES (7, 1997000000, 1997000001, 10000000, 1, NULL, 'done', '2018-12-16 14:31:57.000000');
INSERT INTO `transfers` VALUES (8, 1997000000, 1997000002, 1000000, 1, NULL, 'done', '2018-12-16 14:33:00.000000');
INSERT INTO `transfers` VALUES (9, 1997000000, 1997000002, 1000000, 1, NULL, 'done', '2018-12-16 14:33:29.000000');
INSERT INTO `transfers` VALUES (10, 1997000000, 1997000002, 1000000, 1, NULL, 'done', '2018-12-16 14:33:34.000000');
INSERT INTO `transfers` VALUES (11, 1997000000, 1997000002, 1000000, 1, NULL, 'done', '2018-12-16 14:49:11.000000');
INSERT INTO `transfers` VALUES (12, 1997000001, 1997000004, 1000000, 1, NULL, 'done', '2018-12-16 14:49:51.000000');
INSERT INTO `transfers` VALUES (13, 1997000001, 1997000004, 1000000, 1, NULL, 'done', '2018-12-16 14:49:57.000000');
INSERT INTO `transfers` VALUES (14, 1997000001, 1997000004, 1000000, 1, NULL, 'done', '2018-12-16 14:50:04.000000');
INSERT INTO `transfers` VALUES (15, 1997000001, 1997000004, 1000000, 1, NULL, 'done', '2018-12-16 16:52:30.000000');
INSERT INTO `transfers` VALUES (16, 1997000001, 1997000004, 1000000, 1, NULL, 'done', '2018-12-16 16:53:00.000000');
INSERT INTO `transfers` VALUES (17, 1997000001, 1997000004, 1000000, 1, NULL, 'done', '2018-12-16 16:54:42.000000');
INSERT INTO `transfers` VALUES (18, 1997000004, 1997000001, 1000000, 1, NULL, 'done', '2018-12-16 16:56:31.000000');
INSERT INTO `transfers` VALUES (19, 1997000004, 1997000001, 1000000, 1, NULL, 'done', '2019-01-06 11:09:53.000000');
INSERT INTO `transfers` VALUES (20, 1997000004, 1997000001, 1000000, 1, NULL, 'done', '2019-01-06 11:10:20.000000');
INSERT INTO `transfers` VALUES (21, 1997000004, 1997000001, 1000000, 1, NULL, 'done', '2019-01-06 11:10:49.000000');
INSERT INTO `transfers` VALUES (22, 1997000004, 1997000001, 1000000, 1, NULL, 'done', '2019-01-06 11:11:09.000000');
INSERT INTO `transfers` VALUES (23, 1997000004, 1997000001, 1000000, 1, NULL, 'done', '2019-01-06 12:06:26.000000');
INSERT INTO `transfers` VALUES (24, 1997000004, 1997000001, 1000000, 1, NULL, 'done', '2019-01-06 12:06:57.000000');
INSERT INTO `transfers` VALUES (35, 1997000004, 1997000001, 100000, 1, NULL, 'done', '2019-01-06 15:22:10.000000');
INSERT INTO `transfers` VALUES (46, 1997000004, 1997000001, 100000, 1, NULL, 'done', '2019-01-06 15:40:47.000000');
INSERT INTO `transfers` VALUES (49, 1997000004, 1997000001, 100000, 1, NULL, 'done', '2019-01-06 15:47:15.000000');
INSERT INTO `transfers` VALUES (59, 1997000000, 1997000001, 43434343, 1, '', 'to confirm', '2019-01-06 16:03:17.000000');
INSERT INTO `transfers` VALUES (60, 1997000000, 1997000001, 43434343, 1, '', 'to confirm', '2019-01-06 16:04:49.000000');
INSERT INTO `transfers` VALUES (61, 1997000000, 1997000001, 43434343, 1, '', 'to confirm', '2019-01-06 16:05:27.000000');
INSERT INTO `transfers` VALUES (62, 1997000000, 1997000001, 3434343, 1, '', 'to confirm', '2019-01-06 16:05:55.000000');
INSERT INTO `transfers` VALUES (63, 1997000000, 1997000001, 43434343, 1, '', 'to confirm', '2019-01-06 16:07:29.000000');
INSERT INTO `transfers` VALUES (64, 1997000000, 1997000001, 43434343, 1, '', 'to confirm', '2019-01-06 16:10:50.000000');
INSERT INTO `transfers` VALUES (65, 1997000000, 1997000001, 3434343, 1, '', 'to confirm', '2019-01-06 16:22:36.000000');
INSERT INTO `transfers` VALUES (66, 1997000000, 1997000001, 3434343, 1, '', 'to confirm', '2019-01-06 16:24:20.000000');
INSERT INTO `transfers` VALUES (67, 1997000000, 1997000001, 3434343, 1, '', 'to confirm', '2019-01-06 16:26:06.000000');
INSERT INTO `transfers` VALUES (68, 1997000000, 1997000001, 43434343, 1, '', 'to confirm', '2019-01-06 16:33:33.000000');
INSERT INTO `transfers` VALUES (69, 1997000000, 1997000001, 3434343, 1, '', 'to confirm', '2019-01-06 16:35:48.000000');
INSERT INTO `transfers` VALUES (70, 1997000004, 1997000001, 100000, 1, NULL, 'done', '2019-01-06 16:36:26.000000');
INSERT INTO `transfers` VALUES (71, 1997000000, 1997000001, 43434343, 1, '', 'to confirm', '2019-01-06 16:38:00.000000');
INSERT INTO `transfers` VALUES (72, 1997000000, 1997000001, 43434343, 1, '', 'to confirm', '2019-01-06 16:41:00.000000');
INSERT INTO `transfers` VALUES (73, 1997000000, 1997000001, 43434343, 1, '', 'to confirm', '2019-01-06 16:43:05.000000');
INSERT INTO `transfers` VALUES (74, 1997000000, 1997000001, 200000, 1, '', 'done', '2019-01-06 16:44:25.000000');
INSERT INTO `transfers` VALUES (75, 1997000002, 1997000000, 3434343, 1, '', 'done', '2019-01-06 16:47:08.000000');
INSERT INTO `transfers` VALUES (76, 1997000000, 1997000001, 1000000000, 1, '', 'to confirm', '2019-01-06 16:48:30.000000');
INSERT INTO `transfers` VALUES (77, 1997000004, 1997000001, 100000, 1, NULL, 'to confirm', '2019-01-06 18:23:59.000000');
INSERT INTO `transfers` VALUES (78, 1997000004, 1997000001, 100000, 1, NULL, 'to confirm', '2019-01-06 18:24:41.000000');
INSERT INTO `transfers` VALUES (79, 1997000004, 1997000001, 100000, 1, NULL, 'to confirm', '2019-01-06 18:29:48.000000');
INSERT INTO `transfers` VALUES (80, 1997000004, 1997000001, 100000, 1, NULL, 'to confirm', '2019-01-06 18:31:36.000000');
INSERT INTO `transfers` VALUES (81, 1997000000, 1997000001, 7944344, 1, '', 'to confirm', '2019-01-06 18:41:03.000000');
INSERT INTO `transfers` VALUES (82, 1997000000, 1997000001, 7944344, 1, '', 'to confirm', '2019-01-06 18:44:33.000000');
INSERT INTO `transfers` VALUES (83, 1997000000, 1997000001, 7944344, 1, '', 'to confirm', '2019-01-06 18:45:14.000000');
INSERT INTO `transfers` VALUES (84, 1997000000, 1997000001, 7944344, 1, '', 'to confirm', '2019-01-06 18:45:46.000000');
INSERT INTO `transfers` VALUES (85, 1997000000, 1997000001, 7944344, 1, '', 'to confirm', '2019-01-06 18:47:04.000000');

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
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '81dc9bdb52d04dc20036dbd8313ed055', 'Quang', 'Dang', 'nguyendangquangkt@gmail.com', 123456789, 1);
INSERT INTO `users` VALUES (7, 'quang', '81dc9bdb52d04dc20036dbd8313ed055', 'Quang', 'Dang', 'quang@gmail.com', 789456123, 3);
INSERT INTO `users` VALUES (8, 'staff', '81dc9bdb52d04dc20036dbd8313ed055', NULL, NULL, 'quang.dp@teko.vn', NULL, 3);
INSERT INTO `users` VALUES (16, 'quangdang', '81dc9bdb52d04dc20036dbd8313ed055', NULL, NULL, 'quangdangfit@gmail.com', NULL, 3);
INSERT INTO `users` VALUES (17, 'quangdangfit', '81dc9bdb52d04dc20036dbd8313ed055', NULL, NULL, 'quangdangfit@gmail.com', NULL, 3);

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
  INDEX `id`(`id`) USING BTREE,
  INDEX `account_number`(`account_number`) USING BTREE,
  CONSTRAINT `user_account_frk` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_account
-- ----------------------------
INSERT INTO `users_account` VALUES (28, 1, 1997000000, 7944344, '2018-12-15 13:14:05.000000');
INSERT INTO `users_account` VALUES (29, 1, 1997000001, 10230000, '2018-12-15 13:14:13.000000');
INSERT INTO `users_account` VALUES (30, 1, 1997000002, 555658, '2018-12-15 13:14:18.000000');
INSERT INTO `users_account` VALUES (31, 1, 1997000003, 0, '2018-12-15 14:23:07.000000');
INSERT INTO `users_account` VALUES (32, 1, 1997000004, 6890101, '2018-12-15 14:37:37.000000');
INSERT INTO `users_account` VALUES (33, 1, 1997000005, 0, '2019-01-05 10:04:10.000000');
INSERT INTO `users_account` VALUES (34, 1, 1997000006, 0, '2019-01-05 10:04:31.000000');
INSERT INTO `users_account` VALUES (35, 1, 1997000007, 4000000, '2019-01-05 10:05:07.000000');
INSERT INTO `users_account` VALUES (36, 7, 1997000008, 10000000, '2019-01-05 10:05:31.000000');
INSERT INTO `users_account` VALUES (37, 8, 1997000009, 12000000, '2019-01-06 15:37:55.000000');
INSERT INTO `users_account` VALUES (38, 8, 1997000010, 25000000, '2019-01-06 15:38:15.000000');

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_token
-- ----------------------------
INSERT INTO `users_token` VALUES (1, 1, 'QQ0tZDeKiC8GWag7qt4ZU3kOjOa2A3qxgR0HzApvoewRBjWTHvGUVSHlrG1QTrekDNEt5CpQCWYqZKUi', '2018-12-15 08:50:50.000000', '2019-01-06 18:03:58.000000');
INSERT INTO `users_token` VALUES (2, 7, 'uFzaxvgTpPkB4r8AJ7JnIr4zj19XXMZrnqwsg33s93HyBsDnAhH60RbQ1fgU1ISj386MwlZNp2U7ojAP', '2018-12-15 16:13:18.000000', '2018-12-16 16:16:09.000000');
INSERT INTO `users_token` VALUES (3, 8, '4wI0ZkaPP9R1QFq84lEbAuyIUyBNpDxdKPMZo3FK0cYuciLKUlVDLLTgzvZp3lKX5dx7m51vy5lWWPc1', '2019-01-06 15:34:01.000000', '2019-01-06 17:41:36.000000');

SET FOREIGN_KEY_CHECKS = 1;
