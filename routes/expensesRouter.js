const express=require('express');
const { createExpense,getallExpense,getparticularExpense} = require('../controllers/expenseController');
const auth=require('../middleware/auth');
const expensesRouter=express.Router();

// get all expense from table
expensesRouter.get('/',auth,getallExpense);

// get particular expense from table
expensesRouter.get('/:id',auth,getparticularExpense);


// create the a expense 
expensesRouter.post('/create',auth,createExpense);






module.exports=expensesRouter;
