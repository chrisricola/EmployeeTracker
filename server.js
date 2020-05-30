const db = require('./db/queries');
var inquirer = require("inquirer");
const addPrompts = {
  "employee": [
    { 
      message: "What is the employee's first name?",
      name: "first_name"
    },
    {
      message: "What is the employee's last name?",
      name: "last_name"
    },
    {
      message: "What is the employee's role id?",
      name: "role_id"
    },
    {
      message: "what is the employee's manager's employee id?",
      name: "manager_id"
    }
  ],
  "department":{
    message: "What is the name of the new department?",
    name: "name"
  },
  // "role": [
  //   {
  //     message: "What's the name of the role?",
  //     name: "title"
  //   },
  //   {
  //     message: "What is the salary for this role?",
  //     name: "salary"
  //   },
  //   {
  //     message: "What is the department id number?",
  //     name: "department_id"
  //   }
  // ],
}
async function runSearch() {
  const {action} = await inquirer.prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Exit",
      ]
    })

      switch (action.split(' ')[0]) {
      case "View":
       const table = await db.viewAll(action.split(' ')[1].slice(0,action.split(' ')[1].length-1))
        console.table(table);
        setTimeout(runSearch,2000);
      case "Add":
       const data = await inquirer.prompt(addPrompts[action.split(' ')[1]]);
        await db.addOne(action.split(' ')[1],data);
        console.log('added new record!');
        setTimeout(runSearch, 2000)

      // case "Update employee role":
      //   const update = await inquirer.prompt(addPrompts[action.split(' ')[1]]);
      //   await db.updateOne(action.split(' ')[1],update);
      //   console.log('added new record!');
      //   setTimeout(runSearch, 2000)
      //   break;

      case "exit":
        connection.end();
        break;
      }
  
    console.log("oops I didn't wait")
}

async function addPrompt(prompt){
  return await inquirer.prompt(prompt)
  .catch(err => this._errorMessage(err.code));
}

// function addDepartment() {
//     inquirer
//       .prompt({
//         name: "deptName",
//         type: "input",
//         message: "What is the name of the department?"
//       })
//       .then(function(answer) {
//         var query = "SELECT * FROM  WHERE ?";
// connection.query(query,[answer.deptName] , function(err, res) {
//           if (err) throw err;
//           runSearch();
//         });
//       });

//   }

  // function addRole() {
  //   inquirer
  //   .prompt([
  //       {
  //         type: "input",
  //         message: "What's the name of the role?",
  //         name: "roleName"
  //       },
  //       {
  //         type: "input",
  //         message: "What is the salary for this role?",
  //         name: "salaryTotal"
  //       },
  //       {
  //         type: "input",
  //         message: "What is the department id number?",
  //         name: "deptID"
  //       }
  //     ])
  //     .then(function(answer) {
  //       var query = "SELECT position, song, year FROM top5000 WHERE ?";
  //       connection.query(query,[answer.roleName, answer.salaryTotal, answer.deptID] , function(err, res) {
  //         if (err) throw err;
  //         runSearch();
  //       });
  //     });
  //   }

    // function addEmloyee() {
    //     inquirer
    //     .prompt([
    //         {
    //           type: "input",
    //           message: "What's the first name of the employee?",
    //           name: "firstName"
    //         },
    //         {
    //           type: "input",
    //           message: "What's the last name of the employee?",
    //           name: "lastName"
    //         },
    //         {
    //           type: "input",
    //           message: "What is the employee role id number?",
    //           name: "roleID"
    //         },
    //         {           
    //           type: "input",
    //           message: "What is the manager id number?",
    //           name: "managerID"
    //         }
    //       ])
          // .then(function(answer) {
          //   var query = "SELECT position, song, year FROM top5000 WHERE ?";
          //   connection.query(query,[answer.firstName, answer.lastName, answer.roleID, answer.managerID] , function(err, res) {
          //     if (err) throw err;
          //     runSearch();
          //   });
          // });
        // }

    // function viewDepartments() {
    //     connection.query("SELECT name FROM colleges", function(err, res) {
    //         if (err) throw err;
          
    //           // Log all results of the SELECT statement
    //         console.log(res);
    //         runSearch();
    //         });
    //     }

    // function viewRoles() {
    //     connection.query("SELECT name FROM colleges", function(err, res) {
    //         if (err) throw err;
          
    //           // Log all results of the SELECT statement
    //         console.log(res);
    //         runSearch();
    //         });
    //     }
  
    // function viewEmloyee() {
    //     connection.query("SELECT name FROM colleges", function(err, res) {
    //         if (err) throw err;
              
    //               // Log all results of the SELECT statement
    //         console.log(res);
    //         runSearch();
    //          });
    //     }
    // function updateEmployee() {
    //     inquirer
    //     .prompt([
    //         {
    //             type: "input",
    //             message: "What's the name of the employee you would like to update?",
    //             name: "employeeUpdate"
    //         },
    //         {
    //             type: "input",
    //             message: "What is the updated role?",
    //             name: "updateRole"
    //         },
    //         ])
    //         // .then(function(answer) {
    //         // var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //         // connection.query(query,[answer.employeeUpdate, answer.updateRole] , function(err, res) {
    //         //     if (err) throw err;
    //         //     runSearch();
    //         //     });
    //         //   });
    //         }
  runSearch()