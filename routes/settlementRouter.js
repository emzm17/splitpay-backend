const express=require('express');
const { settlement} = require('../controllers/settlementController');
const auth=require('../middleware/auth');
const settlementRouter=express.Router();


settlementRouter.get('/:id',settlement);

















module.exports=settlementRouter;