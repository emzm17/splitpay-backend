const expenseService = require('../services/expenseService');

const getAllExpense = async (req, res) => {
  try {
    await expenseService.getallExpense(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


const getParticularExpense = async (req, res) => {
  try {
    await expenseService.getparticularExpense(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const createExpense = async (req, res) => {
  try {
    await expenseService.createExpense(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getParticularExpenseById = async (req, res) => {
  try {
    await expenseService.particularExpense(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports = {
  getAllExpense,
  getParticularExpense,
  createExpense,
  getParticularExpenseById
};