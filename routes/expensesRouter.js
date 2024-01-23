const express=require('express');
const { createExpense,getallExpense,getparticularExpense} = require('../controllers/expenseController');
const expenseService=require('../services/expenseService');
const auth=require('../middleware/auth');
const expensesRouter=express.Router();

// get all expense from table
expensesRouter.get('/',auth,expenseService.getallExpense);
// get all expense from particular group id
expensesRouter.get('/:id',auth,expenseService.getparticularExpense);
// create the a expense 
expensesRouter.post('/create',auth,expenseService.createExpense);






module.exports=expensesRouter;
