/*
Navicat MySQL Data Transfer

Source Server         : ECS云数据库
Source Server Version : 80022

Target Server Type    : MYSQL
Target Server Version : 80022
File Encoding         : 65001

Date: 2020-11-17 17:54:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(15) DEFAULT NULL,
  `iconCls` varchar(60) DEFAULT NULL,
  `rowCls` varchar(60) DEFAULT NULL,
  `expanded` tinyint(1) DEFAULT NULL,
  `selectable` tinyint(1) DEFAULT NULL,
  `viewType` varchar(60) DEFAULT NULL,
  `routeId` varchar(60) DEFAULT NULL,
  `leaf` tinyint(1) DEFAULT NULL,
  `pid` int DEFAULT NULL,
  `order_no` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', 'Dashboard', 'x-fa fa-desktop', 'nav-tree-badge nav-tree-badge-new', null, null, 'admindashboard', 'dashboard', '1', '0', '1');
INSERT INTO `menu` VALUES ('2', '用户中心', 'x-fa fa-home', null, '0', '0', null, null, '0', '0', '2');
INSERT INTO `menu` VALUES ('3', '用户管理', 'x-fa fa-user', null, null, null, 'accountuser', null, '1', '2', '1');
INSERT INTO `menu` VALUES ('4', '菜单管理', 'x-fa fa-coffee', null, null, null, 'menu', null, '1', '2', '2');
INSERT INTO `menu` VALUES ('5', 'Email', 'x-fa fa-send', 'nav-tree-badge nav-tree-badge-hot', null, null, 'email', null, '1', '0', '3');
INSERT INTO `menu` VALUES ('6', 'Profile', 'x-fa fa-user', null, null, null, 'profile', null, '1', '0', '4');
INSERT INTO `menu` VALUES ('7', 'Search results', 'x-fa fa-search', null, null, null, 'searchresults', null, '1', '0', '5');
INSERT INTO `menu` VALUES ('8', 'FAQ', 'x-fa fa-question', null, null, null, 'faq', null, '1', '0', '6');
INSERT INTO `menu` VALUES ('9', 'Pages', 'x-fa fa-leanpub', null, '0', '0', null, null, '0', '0', '7');
INSERT INTO `menu` VALUES ('10', 'Blank Page', 'x-fa fa-file-o', null, null, null, 'pageblank', null, '1', '9', '1');
INSERT INTO `menu` VALUES ('11', '404 Error', 'x-fa fa-exclamation-triangle', null, null, null, 'page404', null, '1', '9', '2');
INSERT INTO `menu` VALUES ('12', '500 Error', 'x-fa fa-times-circle', null, null, null, 'page500', null, '1', '9', '3');
INSERT INTO `menu` VALUES ('13', 'Lock Screen', 'x-fa fa-lock', null, null, null, 'lockscreen', null, '1', '9', '4');
INSERT INTO `menu` VALUES ('14', 'Login', 'x-fa fa-check', null, null, null, 'login', null, '1', '9', '5');
INSERT INTO `menu` VALUES ('15', 'Register', 'x-fa fa-pencil-square-o', null, null, null, 'register ', null, '1', '9', '6');
INSERT INTO `menu` VALUES ('16', 'Password Reset', 'x-fa fa-lightbulb-o', null, null, null, 'passwordreset', null, '1', '9', '7');
INSERT INTO `menu` VALUES ('17', 'Widgets', 'x-fa fa-flask', null, null, null, 'widgets', null, '1', '0', '8');
INSERT INTO `menu` VALUES ('18', 'Forms', 'x-fa fa-edit', null, null, null, 'forms', null, '1', '0', '9');
INSERT INTO `menu` VALUES ('19', 'Charts', 'x-fa fa-pie-chart', null, null, null, 'charts', null, '1', '0', '10');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(60) NOT NULL,
  `usercode` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '编号',
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `alias` varchar(20) NOT NULL COMMENT '姓名',
  `header` varchar(100) DEFAULT NULL COMMENT '用户头像',
  `sex` varchar(1) DEFAULT NULL COMMENT '性别 M:男 F:女',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '修改时间',
  `is_deleted` tinyint(1) NOT NULL COMMENT '已删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usercode` (`usercode`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户信息';

