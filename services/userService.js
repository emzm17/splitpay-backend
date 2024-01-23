// services/userService.js
const db = require('../database');
const bcryptjs = require('bcryptjs');

const getUserByEmail = async (email) => {
  return db.query('SELECT * FROM users WHERE email = ?', [email]);
};

const createUser = async (name, email, hashedPassword) => {
  return db.query('INSERT INTO users(name, email, password, totalAmount, totalOwe, totalOwed) VALUES (?, ?, ?, ?, ?, ?)', [
    name,
    email,
    hashedPassword,
    0,
    0,
    0,
  ]);
};

const getAlluser=async=>{
   return db.query('select * from users')
}
module.exports = {
  getUserByEmail,
  createUser,
  getAlluser
};
