const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const auth=(req,res,next)=>{

    try{

        let token=req.headers.authorization;
        if(token){
             token=token.split(" ")[1];
             let user=jwt.verify(token,process.env.SECRET_KEY);
             req.user_id=user.id;

        }
        else{
             res.status(401).json({message:"unauthorized user"});
        }

        next();

    }catch(error){
        res.status(401).json({message:"unauthorized user"});
    }


}

module.exports=auth;