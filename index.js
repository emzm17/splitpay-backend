const express = require('express');
const db=require('./database');
const app=express();
app.use(express.json());


const userRouter = require('./routes/userRouter');
const groupRouter = require('./routes/groupRouter');
const expensesRouter = require('./routes/expensesRouter');
const settlementRouter = require('./routes/settlementRouter');


app.use('/users',userRouter);
app.use('/groups',groupRouter);
app.use('/expenses',expensesRouter);
app.use('/settlement',settlementRouter);




app.listen(8080,( )=>{
      console.log('server is running at port no 8080');
});


















