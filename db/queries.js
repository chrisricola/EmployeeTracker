const connection = require('./connection');

const db = {
    viewAll: (table)=> connection.query(`SELECT * FROM ${table}`),
    addOne: (table,obj)=> connection.query(`INSERT INTO ${table} SET ?`, obj),
    updateRole: (table,id,role_id)=> connection.query(`UPDATE ${table} SET role_id = ? WHERE id=${id}`, role_id)
}
module.exports = db;
