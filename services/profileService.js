// services/userService.js
const db = require('../db'); // Assuming db is your database connection
const bcryptjs = require('bcryptjs');

const getUserByEmail = async (email) => {
  return db.query('SELECT * FROM users WHERE email = ?', [email]);
};

const updateUser = async (id, name, email, hashedPassword) => {
  return db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?', [name, email, hashedPassword, id]);
};

module.exports = {
  getUserByEmail,
  updateUser,
};
