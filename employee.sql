DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  dept VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roll (
  id INT NOT NULL AUTO_INCREMENT,
  rolename VARCHAR(45) NULL,
  salary DECIMAL(10,2) NULL,
  deptid INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(45) NULL,
  lasttname VARCHAR(45) NULL,
  roleid INT NULL,
  managerid INT NULL,
  PRIMARY KEY (id)
);