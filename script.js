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
        database: 'employees_db'
    },
    console.log('connected to employee database')
)

db.connect((err) => {
    if (err) console.log('error connecting');
    console.log(err)
})

userChoices();

function userChoices() {
    inquirer
    .prompt([
        { 
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View All Departments','View All Roles','View All Employees', 'Add Department', 'Add Role', 'Add Employee'],
            name: 'choice',
        },
    ]).then((answer) => {
        switch (answer.choice) {
            case 'View All Departments':
                console.log(1);
                viewAllDepartments();
                break;
            case 'View All Roles':
                console.log(2);
                viewAllRoles();
                break;
            case 'View All Employees':
                console.log(3);
                viewAllEmployees();
                break;
            case 'Add Department':
                console.log(4);
                addDepartment();
                break;
            case 'Add Role':
                console.log(5);
                addRole();
                break;
            case 'Add Employee':
                console.log(6);
                addEmployee();
                break;
        };
        userChoices();
    });
}


function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    }
    // connection.
    //  shows formatted sql table with department names and ID's
)}

function viewAllRoles() {
    //  shows job title
    //  shows role id
    //  shows department role belongs to
}

function viewAllEmployees() {
    // shows employee id's
    // shows first names
    // shows last names
    // shows job title
    // shows department
    // shows salaries
    // shows their managers
}

function addDepartment() {
    return inquirer.prompt([
        { 
            type: 'input', 
            name: 'departmentName',
            message: 'Input the name of the department.'
        },
    ])
    //  enters department name to database
}

function addRole() {
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
            name: 'departmentName',
            message: 'Input the department name.'
        },
    ])
    // add role to database
    // db.query INSERT INTO roles (roleName, roleSalary, departmentName)
}

function addEmployee() {
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
            type:'input',
            name: 'employeeRole',
            message: 'Input the employees role.',
        },
    ])
    // takes all values and merges with sql table,
}
