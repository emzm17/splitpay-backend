// controllers/groupController.js
const groupService = require('../services/groupService');

const groupCreate = async (req, res) => {
  const { name, users_id, created_by } = req.body;

  try {
    await groupService.createGroup(name, users_id, created_by);
    res.status(200).json({ message: 'New group created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// const getAllExpenseGroup = async (req, res) => {
//   const groupId = req.params.id;
//   try {
//     const expenseList = await groupService.getAllExpenseGroup(groupId);
//     res.status(200).json(expenseList);
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// }
const getallusergroup = async (req, res) => {
  try {
    const groups = await groupService.getAllUserGroups(req.user_id);
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong' });
  }
};

const getAll = async (req,res)=>{
   try{

    const groups=await groupService.getAllgroups();
    res.status(201).json(groups);

   }catch(error){
    res.status(500).json({ message:"something went wrong" });
   }
}

module.exports = {
  groupCreate,
  getallusergroup,
  getAll,
  // getAllExpenseGroup
};
