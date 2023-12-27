const db=require('../database');
const redis=require('redis');
const redisclient=redis.createClient();
redisclient.connect();

const getallExpense = async(req,res)=>{
    try {
      
        const group = await db.query(
            `SELECT * FROM expenses`
        );
    
        // console.log("Group Length:", group);
        if (group[0].length===0) {
            return res.status(404).json({ message: "No expense found" });
        }
    
        res.status(201).json(group[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


const getparticularExpense=async(req,res)=>{
 
   
    let keyname='getexpense';
    let cached=await redisclient.get(keyname);
    // redisclient.disconnect();

    if(cached){
        //  console.log('cached');
        //  const result = await redisclient.get(keyname);
        //  console.log(result);

        return res.status(201).json(JSON.parse(cached));
    }
    else{
        try {
            // console.log('first time cached');
            const id=req.params.id;
            const group = await db.query(
                `SELECT * FROM expenses where expense_id=?`,[id]
            );
        
            // console.log("Group Length:", group);
            if (group[0].length===0) {
                return res.status(404).json({ message: "No expense found" });
            }
            redisclient.set(keyname,JSON.stringify((group[0])),{EX:30});
           return  res.json(group[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    
}

const createExpense=async(req,res)=>{
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
   
}
// redisclient.disconnect();
module.exports={
    createExpense,getallExpense,getparticularExpense
};