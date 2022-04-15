const mysql = require("mysql");
const util = require("util");

//MAMP Config for MacBook Pro M1
// const pool = mysql.createPool({
// connectionLimit: 10,
//     host: 'localhost',
//     database: 'users',
//     user: 'root',
//     password: 'root',
//     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
//     port: '8889'
// });

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

pool.query = util.promisify(pool.query);
module.exports = pool;
