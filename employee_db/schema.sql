CREATE DATABASE IF NOT EXISTS employees_db;

USE employees_db;

CREATE TABLE IF NOT EXISTS department (
    id INT NOT NULL PRIMARY KEY AUTO,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
    id  INT NOT NULL PRIMARY KEY AUTO,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE SET NULL,
);

CREATE TABLE IF NOT EXISTS employee (
    id INT NOT NULL PRIMARY KEY AUTO,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY(manager_id) REFERENCES 
);

