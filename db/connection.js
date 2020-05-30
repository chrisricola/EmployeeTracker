const {createConnection} = require('mysql');
const util = require("util")
const connection = createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Music2020!",
    database: "employees"
  });

  connection.connect();
  connection.query = util.promisify(connection.query)

module.exports = connection;