const express=require('express');
const {getallUser,getallgroup,signup,signin,acceptRequest,sendRequest,getAllfriend,getrequestfriendList} = require('../controllers/userController')
const auth=require('../middleware/auth');
const userRouter = express.Router();



userRouter.get('/',auth,getallUser);
//signup
userRouter.post('/signup',signup);
//signin
userRouter.post('/signin',signin);




module.exports=userRouter;