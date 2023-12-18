const db=require('../database');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const SECRET_KEY="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

const getallUser = async (req,res)=>{
    const users= await db.query(
        `SELECT * FROM users`
       )
    res.send(users[0]);
}

const getallgroup= async(req,res)=>{
    const id=req.params.id;
    try{
        const groups=await db.query(
           `SELECT * FROM group_s`
        );
        if(groups[0].length===0){
            return res.json({message:"no group present"});
        }
         const total_groups=[];
        for(let i=0;i<groups[0].length;i++){
                  const currgroup=JSON.stringify(groups[0][i].users_id);
                   for(let j=0;j<currgroup.length;j++){
                     if(id===currgroup[j]){
                         total_groups.push(groups[0][i]);
                         break;
                     }
                   }
        }
        res.send(total_groups);
     }catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
     }
     
}

const signup=async(req,res)=>{
    // Existing user check
      // hash password
      // user creation 
      // token generate

      const {name,email,password}=req.body;
      try{
         const existingUser=await db.query(
            `SELECT * FROM users WHERE email=?`,[email]
         );
         if(existingUser[0].email=== email){
            return res.status(400).json({message:"user already exist"});
         } 


         const hashedpassword=await bcrypt.hash(password,10);
         
         
         const user=await db.query(
            `INSERT INTO users(name,email,password) values(?,?,?)`,[name,email,hashedpassword]
         );

         const token=jwt.sign({
            email:user.email,id:user.user_id
         },SECRET_KEY);
         res.status(201).json({
            user:user,result:token
         });
         
      } catch(error){
          console.log(error);
          res.status(500).json({message:"something went wrong"});
      }
}


const signin=async(req,res)=>{
    const { email, password } = req.body;
try {
   
   
   const existingUser = await db.query(
      `SELECT * FROM users WHERE email=?`, [email]
  );
 
    if (existingUser.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    const existingCurrUser = existingUser[0];
    console.log(existingCurrUser);

  
    const matchPassword = await bcrypt.compare(password, existingCurrUser.password);

  
    if (!matchPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

  
    const token = jwt.sign({
        email: existingCurrUser.email, id: existingCurrUser.user_id
    }, SECRET_KEY);

    res.status(201).json({
        user: existingCurrUser, result: token
    });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
}


}



















module.exports={
    getallUser,getallgroup,signup,signin
}