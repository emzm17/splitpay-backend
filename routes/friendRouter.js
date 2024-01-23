const express=require('express');
const auth=require('../middleware/auth');
const friendRouter = express.Router();


friendRouter.get('/',auth,getAllfriend);
friendRouter.post('/send-friend-request/:userId',auth,sendRequest);
friendRouter.post('/accept-friend-request/:userId',auth,acceptRequest);
friendRouter.get('/friend-request/',auth,getrequestfriendList);



module.exports=friendRouter;