const mysql = require('mysql2');
const dbConnection = mysql.createPool({
    host     : 'localhost', // MYSQL HOST NAME
    user     : 'root', // MYSQL USERNAME
    password : 'password', // MYSQL PASSWORD
    database : 'docpat' // MYSQL DB NAME
}).promise();
module.exports = dbConnection;