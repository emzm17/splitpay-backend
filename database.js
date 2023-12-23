const mysql = require("mysql2");
const dotenv = require("dotenv");
const createPool = require("mysql2");
dotenv.config();

const connection = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  })
  .promise();

console.log("Connecting to database");

module.exports = connection;
