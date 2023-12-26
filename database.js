const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    connectTimeout: 20000 
  }).promise()


console.log("Connecting to database");

module.exports = connection;
