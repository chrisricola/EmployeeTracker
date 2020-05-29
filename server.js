var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Music2020!",
  database: "employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View deparments",
        "View roles",
        "View employees",
        "Update employee role",
        "Exit",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add department":
        addDepartment();
        break;

      case "Add role":
        addRole();
        break;

      case "Add employee":
        addEmloyee();
        break;

      case "View deparments":
        viewDepartments();
        break;

      case "View roles":
        viewRoles();
        break;

      case "View employees":
        viewEmloyee();
        break;

      case "Update employee role":
        updateEmployee();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}

function addDepartment() {
    inquirer
      .prompt({
        name: "deptName",
        type: "input",
        message: "What is the name of the department?"
      })
      .then(function(answer) {
        var query = "SELECT position, song, year FROM top5000 WHERE ?";
        connection.query(query,[answer.deptName] , function(err, res) {
          if (err) throw err;
          runSearch();
        });
      });
  }

  function addRole() {
    inquirer
    .prompt([
        {
          type: "input",
          message: "What's the name of the role?",
          name: "roleName"
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "salaryTotal"
        },
        {
          type: "input",
          message: "What is the department id number?",
          name: "deptID"
        }
      ])
      .then(function(answer) {
        var query = "SELECT position, song, year FROM top5000 WHERE ?";
        connection.query(query,[answer.roleName, answer.salaryTotal, answer.deptID] , function(err, res) {
          if (err) throw err;
          runSearch();
        });
      });
    }

    function addEmloyee() {
        inquirer
        .prompt([
            {
              type: "input",
              message: "What's the first name of the employee?",
              name: "firstName"
            },
            {
              type: "input",
              message: "What's the last name of the employee?",
              name: "lastName"
            },
            {
              type: "input",
              message: "What is the employee role id number?",
              name: "roleID"
            },
            {           
              type: "input",
              message: "What is the manager id number?",
              name: "managerID"
            }
          ])
          .then(function(answer) {
            var query = "SELECT position, song, year FROM top5000 WHERE ?";
            connection.query(query,[answer.firstName, answer.lastName, answer.roleID, answer.managerID] , function(err, res) {
              if (err) throw err;
              runSearch();
            });
          });
        }

    function viewDepartments() {
        connection.query("SELECT name FROM colleges", function(err, res) {
            if (err) throw err;
          
              // Log all results of the SELECT statement
            console.log(res);
            runSearch();
            });
        }

    function viewRoles() {
        connection.query("SELECT name FROM colleges", function(err, res) {
            if (err) throw err;
          
              // Log all results of the SELECT statement
            console.log(res);
            runSearch();
            });
        }
  
    function viewEmloyee() {
        connection.query("SELECT name FROM colleges", function(err, res) {
            if (err) throw err;
              
                  // Log all results of the SELECT statement
            console.log(res);
            runSearch();
             });
        }
    function updateEmployee() {
        inquirer
        .prompt([
            {
                type: "input",
                message: "What's the name of the employee you would like to update?",
                name: "employeeUpdate"
            },
            {
                type: "input",
                message: "What is the updated role?",
                name: "updateRole"
            },
            ])
            .then(function(answer) {
            var query = "SELECT position, song, year FROM top5000 WHERE ?";
            connection.query(query,[answer.employeeUpdate, answer.updateRole] , function(err, res) {
                if (err) throw err;
                runSearch();
                });
              });
            }