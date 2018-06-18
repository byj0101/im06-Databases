DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  text VARCHAR(100) NOT NULL,
  roomname VARCHAR(100) NOT NULL,
  created DATETIME NOT NULL,
  PRIMARY KEY(id)
);


/* Create other tables and define schemas for them here! */


CREATE TABLE users(
  id INT(11) NOT NULL AUTO_INCREMENT,
  uname VARCHAR(100) NOT NULL,
  PRIMARY KEY(id)
);






/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

