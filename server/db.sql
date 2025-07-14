----- MySQL Table -----
 CREATE TABLE users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255),
   email VARCHAR(255) UNIQUE,
   password TEXT,
   role ENUM('admin', 'user', 'supervisor')
 );