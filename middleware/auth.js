const jwt=require('jsonwebtoken');
const SECRET_KEY="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
const auth=(req,res,next)=>{

    try{

        let token=req.headers.authorization;
        if(token){
             token=token.split(" ")[1];
             let user=jwt.verify(token,SECRET_KEY);
             req.user_id=user.user_id;

        }
        else{
             res.status(404).json({message:"unauthorized user"});
        }

        next();

    }catch(error){
        res.status(404).json({message:"unauthorized user"});
    }


}

module.exports=auth;