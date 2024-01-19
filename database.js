const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_database,
    connectTimeout: 20000 
  }).promise()


console.log("Connecting to database");

module.exports = connection;
