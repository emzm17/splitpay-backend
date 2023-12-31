const db = require("../database");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const updateInfo = async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.user_id; 

  const hashedpassword = await bcryptjs.hash(password, 10);
  try {
    
    const uniqueemail=await db.query(
      `select from users where email=?`,[email]
    );

    if(unqiueemail[0].length>0){  
        return res.status(400).json({message:"this email already exist please signin"});
    }
    
    const existingUser = await db.query(
      `UPDATE users SET name = ?,email = ?,password = ?  where user_id = ?`,
      [name, email, hashedpassword, id]
    );

    //  console.log(existingUser[0].affectedRows);
    if (existingUser[0].affectedRows > 0) {
      res.json({ message: "User data updated" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = {
  updateInfo,
};
