const mysql = require("mysql");
const dotenv = require("dotenv");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

// connection.connect((err) => {
//     if (err) {
//         console.log(err.message);
//     }
//     console.log('db ' + connection.state);
// });

module.exports = { db };
