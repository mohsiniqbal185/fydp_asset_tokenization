const mysql = require("mysql");
const dotenv = require("dotenv");
const util = require("util");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});
const query = util.promisify(db.query).bind(db);

// connection.connect((err) => {
//     if (err) {
//         console.log(err.message);
//     }
//     console.log('db ' + connection.state);
// });

module.exports = { db, query };
