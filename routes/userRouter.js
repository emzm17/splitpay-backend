const express=require('express');
const {getallUser,getallgroup,signup,signin,updateInfo} = require('../controllers/userController')
const auth=require('../middleware/auth');
const userRouter = express.Router();



userRouter.get('/',auth,getallUser);

userRouter.get('/:id',auth,getallgroup);

userRouter.put('/',auth,updateInfo)

//signup
userRouter.post('/signup',signup);
//signin
userRouter.post('/signin',signin);




module.exports=userRouter;