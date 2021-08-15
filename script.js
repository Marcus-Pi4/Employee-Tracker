const express = require('express');
const mysql = require('mysql');
const path = require('path');
const inquirer = require('inquirer');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employee_db'
    },
    console.log('connected to employee database')
)

db.connect((err) => {
    if (err) console.log('error connecting');
    console.log(err)
})

start();

async function start() {
    const choice = await userChoices();
    await choiceSwitch(choice);
    const answer = await promptToContinue();
    if (answer.continue) {
        start();
    } else {
        console.log('Goodbye!');
        return '';
    }
    return '';
}

function promptToContinue() {
    return inquirer.prompt([
        {
          type: 'confirm',
          message: 'do you want to continue',
          name: 'continue',
        },
      ]);
}

function userChoices() {
    return inquirer.prompt([
        { 
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department', 
                'Add Role',
                'Add Employee'
            ],
            name: 'choice',
        },
    ])
}
async function choiceSwitch(userChoice) {
    switch (userChoice.choice) {
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'Add Department':
            let addDepartmentArray = await addDepartmentPrompt();
            db.query(`INSERT INTO departments (name) VALUES ('${addDepartmentArray.departmentName}')`);
            viewAllDepartments();
            break;
        case 'Add Role':
            let addRoleArray = await addRolePrompt();
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${addRoleArray.roleName}', '${addRoleArray.roleSalary}', '${addRoleArray.departmentId}')`);
            console.log(addRoleArray);
            viewAllRoles();
            break;
        case 'Add Employee':
            let addEmployeeArray = await addEmployeePrompt();
            console.log(addEmployeeArray);
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${addEmployeeArray.firstName}', '${addEmployeeArray.lastName}', '${addEmployeeArray.employeeRoleId}', '${addEmployeeArray.managerId}')`);
            viewAllEmployees();
            break;
    };
}

function viewAllDepartments() {
    db.query('SELECT * FROM departments ORDER BY id', (err, result) => {
        if (err) {
            console.log(err);
            }
            console.table(result);
    }
)}

function viewAllRoles() {
    db.query('SELECT * FROM roles ORDER BY id', (err, result) => {
        if (err) {
            console.log(err);
            }
            console.table(result);
    }
)}

function viewAllEmployees() {
    db.query('SELECT * FROM employees ORDER BY id', (err, result) => {
        if (err) {
            console.log(err);
            }
            console.table(result);
        }
)}

function addDepartmentPrompt() {
    return inquirer.prompt([
        { 
            type: 'input', 
            name: 'departmentName',
            message: 'Input the name of the department.'
        },
    ])
}

function addRolePrompt() {
    return inquirer.prompt([
        { 
            type: 'input', 
            name: 'roleName',
            message: 'Input the role name.'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Input the role salary.'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Input the department ID.'
        },
    ])
}

function addEmployeePrompt() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Input the employees first name.'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Input the employees last name.',
        },
        {
            type: 'input',
            name: 'employeeRoleId',
            message: 'Input the employee role ID.',
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Input the employees manager ID'
        },
    ])
}
