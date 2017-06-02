DROP DATABASE IF EXISTS chatdb;
CREATE DATABASE chatdb;

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(140),
  firstname VARCHAR(140),
  lastname VARCHAR(140),
  email VARCHAR(140),
  password VARCHAR(140),
  salt VARCHAR(500),
  role VARCHAR(140)
);

CREATE TABLE IF NOT EXISTS room_members(
  activeUserId VARCHAR(300),
  id INTEGER,
  roomId INTEGER
);

CREATE TABLE IF NOT EXISTS messages(
 messageId SERIAL PRIMARY KEY,
 roomId INTEGER,
 id INTEGER,
 receiverId INTEGER,
 textMessage VARCHAR(3000),
 messageTime TIMESTAMP,
 color VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS privateMessages(
 privateMessageId SERIAL PRIMARY KEY,
 id INTEGER,
 receiverId INTEGER
);

CREATE TABLE IF NOT EXISTS chatRooms(
 roomId SERIAL PRIMARY KEY,
 roomName VARCHAR(140)
);
