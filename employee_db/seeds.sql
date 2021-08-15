INSERT INTO departments (name)
VALUES  ("Accounting"),
        ("Software Development"),
        ("Human Resources"),
        ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Lead Software Engineer", 100000.00, 2),
        ("Software Engineer", 65000.00, 2),
        ("Software Intern", 0.00, 2),
        ("HR Manager", 58000.00, 3),
        ("Marketing Lead", 75000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Thomas", "Jefferson", 1, 1),
        ("George", "Hawk", 2, 1),
        ("Theodore", "Gilgamesh", 3, 1),
        ("Adam", "Black", 3, 1),
        ("Ben", "Dovah", 4, 4),
        ("Kim", "Tank", 3, 4),
        ("Francine", "Stillwell", 2, 1),
        ("John", "Smith", 4, 5),
        ("Jane", "Doe", 4, 5);
