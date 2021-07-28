CREATE DATABASE IF NOT EXISTS employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id  INT NOT NULL PRIMARY KEY AUTO,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id),
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);

