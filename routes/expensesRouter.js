const express=require('express');
const db=require('../database');


const expensesRouter=express.Router();

// get all expense from table
expensesRouter.get('/',async (req,res)=>{
    try {
      
        const group = await db.query(
            `SELECT * FROM expenses`
        );
    
        // console.log("Group Length:", group);
        if (group[0].length===0) {
            return res.status(404).json({ message: "No expense found" });
        }
    
        res.json(group[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

});

// get particular expense from table
expensesRouter.get('/:id',async (req,res)=>{
    try {
        const id=req.params.id;
      
        const group = await db.query(
            `SELECT * FROM expenses where expense_id=?`,[id]
        );
    
        // console.log("Group Length:", group);
        if (group[0].length===0) {
            return res.status(404).json({ message: "No expense found" });
        }
    
        res.json(group[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

});




// create the a expense 
expensesRouter.post('/create',async (req,res)=>{
   // destructure the amount,description,payer_id,group_id
   const {amount,description,payer_id,group_id}=req.body;
        
   try{
      const new_group=await db.query(
         `INSERT INTO expenses (amount,description,payer_id,group_id) value (?,?,?,?)`,[amount,description,payer_id,group_id]
      );
      
      res.send({message:"new expense created"});

   }catch(error){
      console.log(error);
      res.status(500).json({message:"something went wrong"});
   }
   

});






module.exports=expensesRouter;
