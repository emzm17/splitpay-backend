const express=require('express');
const{groupCreate,getallusergroup,getAll} = require('../controllers/groupController');
const auth=require('../middleware/auth');
const groupRouter=express.Router();


// creation of group
groupRouter.post('/create',auth,groupCreate)

//  // get all expense of that group;
// groupRouter.get('/:id',auth,getAllExpenseGroup)

// get all groups where current user involve
groupRouter.get('/',auth,getallusergroup)

// get all groups
groupRouter.get('/all',auth,getAll);





module.exports=groupRouter;