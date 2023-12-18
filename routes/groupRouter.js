const express=require('express');
const{groupCreate,getallexpenseGroup} = require('../controllers/groupController');



const groupRouter=express.Router();


// creation of group
groupRouter.post('/create',groupCreate)

// search for a expense in group
// groupRouter.get('/:id',async(req,res)=>{
//    try {
//       const id = req.params.id;
  
      
//       const group = await db.query(
//           `SELECT * FROM group_s WHERE id=?`, [id]
//       );
  
//       // console.log("Group Length:", group);
//       if (group[0].length===0) {
//           return res.status(404).json({ message: "No group found" });
//       }
  
//       res.json(group[0]);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Something went wrong" });
//   }
  
   

   // get all expense of that group;
groupRouter.get('/:id',getallexpenseGroup)




module.exports=groupRouter;