CREATE DATABASE IF NOT EXISTS `splitpay`;
USE `splitpay`;

DROP TABLE IF EXISTS `users`;
create table `users`(
     user_id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL,
     totalAmount DECIMAL(10,2),
     totalOwe DECIMAL(10,2),
     totalOwed DECIMAL(10,2),
     friend_list json
);

DROP TABLE IF EXISTS `group_s`;
create table `group_s`(
     id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     users_id json NOT NULL,
     created_by INT NOT NULL,
     FOREIGN KEY (created_by) REFERENCES users(user_id)
);

DROP TABLE IF EXISTS `expenses`;
create table `expenses`(
     expense_id INT PRIMARY KEY AUTO_INCREMENT,
     amount DECIMAL(10,2) NOT NULL,
     description VARCHAR(255) NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     payer_id INT NOT NULL,
     group_id INT NOT NULL,
     FOREIGN KEY (payer_id) REFERENCES users(user_id),
     FOREIGN KEY (group_id) REFERENCES group_s(id)
);
DROP TABLE IF EXISTS `friendships`;
CREATE TABLE friendships (
  friendship_id INT PRIMARY KEY AUTO_INCREMENT,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  FOREIGN KEY (user1_id) REFERENCES users(user_id),
  FOREIGN KEY (user2_id) REFERENCES users(user_id)
);