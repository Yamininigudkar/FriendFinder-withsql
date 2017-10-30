DROP DATABASE IF EXISTS friend_finder_db;
CREATE DATABASE friend_finder_db;
USE friend_finder_db;

-- Create the table plans.
CREATE TABLE friends
(
id int NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL,
photo varchar(1000) NOT NULL,
PRIMARY KEY (id)
);
CREATE TABLE scores
( 
id int NOT NULL AUTO_INCREMENT,
q1 int(10),
q2 int(10),
q3 int(10),
q4 int(10),
q5 int(10),
q6 int(10),
q7 int(10),
q8 int(10),
q9 int(10),
q10 int(10),
PRIMARY KEY (id)
)
