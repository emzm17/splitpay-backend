// services/groupService.js
const db = require('../database');
const redis = require('ioredis');

const redisClient = new redis({
  host: 'redis',
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

const getAllUserGroups = async (userId) => {
  const keyName = 'getappGroups';
  const cached = await redisClient.get(keyName);

  if (cached) {
    return JSON.parse(cached);
  } else {
    try {
      const groups = await db.query('SELECT * FROM group_s where created_by=?',[userId]);

      // console.log(groups[0]);  
      if (groups[0].length === 0) {
        return { message: 'no group present' };
      }

      redisClient.set(keyName, JSON.stringify(groups[0]), { EX: 30 });
      return groups[0];
    } catch (error) {
      console.log(error);
      throw new Error('something went wrong');
    }
  }
};
const createGroup = async (name, usersId, createdBy) => {
    const usersIdJson = usersId;
    usersIdJson.push(createdBy);
   
  
    try {
      await db.query('INSERT INTO group_s (name, users_id, created_by) VALUES (?, ?, ?)', [
        name,
        JSON.stringify(usersIdJson),
        createdBy,
      ]);
      return { message: 'New group created' };
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  };
  
  // const getAllExpenseGroup = async (groupId) => {
  //   try {
  //     const expenseList = await db.query('SELECT * FROM expenses WHERE group_id = ?', [groupId]);
  
  //     if (expenseList[0].length === 0) {
  //       throw new Error('No expense record found for this group');
  //     }
  
  //     return expenseList[0];
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('Something went wrong');
  //   }
  // };
  

  const getAllgroups= async()=> {
      try{
         const groups= await db.query('SELECT * FROM group_s');
        //  console.log(groups[0]);
         if(groups[0].length===0)
         throw new Error('No groups found');
         
         return groups[0];

        
      }catch(error){
         throw new Error('Something went wrong');
      }
     
  }

module.exports = {
  getAllUserGroups,createGroup,getAllgroups
};
