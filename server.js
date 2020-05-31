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
  "role": [
    {
      message: "What's the name of the role?",
      name: "title"
    },
    {
      message: "What is the salary for this role?",
      name: "salary"
    },
    {
      message: "What is the department id number?",
      name: "department_id"
    }
  ]
}
async function runSearch() {
  try{

  
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
        break;
      case "Add":
       const data = await inquirer.prompt(addPrompts[action.split(' ')[1]]);
        await db.addOne(action.split(' ')[1],data);
        console.log('added new record!');
        setTimeout(runSearch, 2000);
        break;
      case "Update":
        const emp = await db.viewAll('employee');
        const empChoices = emp.reduce((a,b)=> (a[`${b.first_name} ${b.last_name}`]=b.id,a),{});
        const roles = await db.viewAll('role');
        const roleChoices = roles.reduce((a,b)=> (a[b.title]=b.id, a),{});
        const {id,role_id} = await inquirer.prompt([
          {
            message: "Which employee would you like to update?",
            type: "list",
            name: "id",
            choices: Object.keys(empChoices)
          },
          {
            message: "What is this person's new role?",
            type: "list",
            name: "role_id",
            choices: Object.keys(roleChoices)
          }
        ]);

       await db.updateRole('employee', empChoices[id],roleChoices[role_id])
       console.log('success!')
        setTimeout(runSearch, 2000)
        break;

      case "Exit":
        return
      }
}catch(err){
  console.log(err)
  }
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