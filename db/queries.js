const connection = require('./connection');

const db = {
    viewAll: (table)=> connection.query(`SELECT * FROM ${table}`),
    addOne: (table,obj)=> connection.query(`INSERT INTO ${table} SET ?`, obj),
    // updateOne: (table,id,obj)=> connection.query(`UPDATE ${table} WHERE id=${id} SET ?`, obj)
}
module.exports = db;