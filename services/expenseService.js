// services/expenseService.js
// const db = require('../database');
// const redisClient = require('../utils/redis');
// const dotenv = require('dotenv');
// dotenv.config();

// const getallExpense = async (req, res) => {
//   try {
//     const group = await db.query(`SELECT * FROM expenses`);

//     if (group[0].length === 0) {
//       return res.status(404).json({ message: 'No expense found' });
//     }

//     res.status(201).json(group[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// const getparticularExpense = async (req, res) => {
//   const keyname = 'getexpense';
//   const cached = await redisclient.get(keyname);

//   if (cached) { 
//     return res.status(201).json(JSON.parse(cached));
//   } else {
//     try {
//       const id = req.params.id;
//       const group = await db.query(`SELECT * FROM expenses where group_id=?`, [id]);

//       if (group[0].length === 0) {
//         return res.status(404).json({ message: 'No expense found' });
//       }

//       redisclient.set(keyname, JSON.stringify(group[0]), { EX: 30 });
//       return res.status(200).json(group[0]);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Something went wrong' });
//     }
//   }
// };

// const createExpense = async (req, res) => {
//   // destructure the amount, description, payer_id, group_id
//   const { amount, description, payer_id, group_id } = req.body;

//   try {
//     const group = await db.query(`SELECT * FROM group_s where id=?`, [group_id]);
//     if (group[0].length === 0) {
//       return res.json({ message: 'No group present' });
//     }

//     const new_expense = await db.query(
//       `INSERT INTO expenses (amount,description,payer_id,group_id) value (?,?,?,?)`,
//       [amount, description, payer_id, group_id]
//     );

//     for (let i = 0; i < group[0].length; i++) {
//       const currgroup = JSON.stringify(group[0][i].users_id);
//       let sz = 0;
//       for (let i = 0; i < currgroup.length; i++) {
//         if (currgroup[i] !== ',' && currgroup[i] !== ']' && currgroup[i] !== '[') sz++;
//       }

//       const eachContribute = amount / sz;
//       const eachContributeRound = eachContribute.toFixed(2);

//       const totalAmount = amount - eachContributeRound;
//       const currentUserAmount = await db.query(`SELECT totalAmount from users where user_id =?`, [
//         payer_id,
//       ]);

//       const totalAmountUser = parseInt(currentUserAmount[0][0].totalAmount) + totalAmount;

//       const updateUserAmount = await db.query(
//         'UPDATE users set totalAmount=?,totalOwed=? where user_id=?',
//         [totalAmountUser, totalAmount, payer_id]
//       );

//       for (let j = 0; j < currgroup.length; j++) {
//         if (
//           payer_id !== currgroup[j] &&
//           currgroup[j] !== ',' &&
//           currgroup[j] !== '[' &&
//           currgroup[j] !== ']'
//         ) {
//           const youOwe = await db.query(
//             `UPDATE users set totalOwe=? where user_id=?`,
//             [eachContributeRound, currgroup[j]]
//           );
//         }
//       }
//     }

//     res.send({ message: 'New expense created' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// const particularExpense=async(req,res)=>{
//   const keyname = 'getParticularexpense';
//   const cached = await redisclient.get(keyname);

//   if (cached) { 
//     return res.status(201).json(JSON.parse(cached));
//   } else {
//     try {
//       const id = req.params.id;
//       const group = await db.query(`SELECT * FROM expenses where expense_id`, [id]);

//       if (group[0].length === 0) {
//         return res.status(404).json({ message: 'No expense found' });
//       }

//       redisclient.set(keyname, JSON.stringify(group[0]), { EX: 30 });
//       return res.status(200).json(group[0]);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Something went wrong' });
//     }
//   }
// }


// module.exports = {
//   createExpense,
//   getallExpense,
//   getparticularExpense,
//   particularExpense
// };

const db = require('../database');
const redisclient = require('../utils/redis');
const dotenv = require('dotenv');
dotenv.config();

const getallExpense = async (req, res) => {
  try {
    const group = await db.query(`SELECT * FROM expenses`);

    if (group[0].length === 0) {
      return res.status(404).json({ message: 'No expense found' });
    }

    res.status(201).json(group[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getparticularExpense = async (req, res) => {
  const keyname = 'getexpense';
  const cached = await redisclient.get(keyname);

  if (cached) { 
    return res.status(201).json(JSON.parse(cached));
  } else {
    try {
      const id = req.params.id;
      const group = await db.query(`SELECT * FROM expenses where group_id=?`, [id]);

      if (group[0].length === 0) {
        return res.status(404).json({ message: 'No expense found' });
      }

      redisclient.set(keyname, JSON.stringify(group[0]), { EX: 30 });
      return res.status(200).json(group[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

const createExpense = async (req, res) => {
  // destructure the amount, description, payer_id, group_id
  const { amount, description, payer_id, group_id } = req.body;

  try {
    const group = await db.query(`SELECT * FROM group_s where id=?`, [group_id]);
    if (group[0].length === 0) {
      return res.json({ message: 'No group present' });
    }

    const new_expense = await db.query(
      `INSERT INTO expenses (amount,description,payer_id,group_id) value (?,?,?,?)`,
      [amount, description, payer_id, group_id]
    );

    for (let i = 0; i < group[0].length; i++) {
      const currgroup = JSON.stringify(group[0][i].users_id);
      let sz = 0;
      for (let i = 0; i < currgroup.length; i++) {
        if (currgroup[i] !== ',' && currgroup[i] !== ']' && currgroup[i] !== '[') sz++;
      }

      const eachContribute = amount / sz;
      const eachContributeRound = eachContribute.toFixed(2);

      const totalAmount = amount - eachContributeRound;
      const currentUserAmount = await db.query(`SELECT totalAmount from users where user_id =?`, [
        payer_id,
      ]);

      const totalAmountUser = parseInt(currentUserAmount[0][0].totalAmount) + totalAmount;

      const updateUserAmount = await db.query(
        'UPDATE users set totalAmount=?,totalOwed=? where user_id=?',
        [totalAmountUser, totalAmount, payer_id]
      );

      for (let j = 0; j < currgroup.length; j++) {
        if (
          payer_id !== currgroup[j] &&
          currgroup[j] !== ',' &&
          currgroup[j] !== '[' &&
          currgroup[j] !== ']'
        ) {

          const currentUserAmount = await db.query(
            `SELECT total_amount from users where user_id =$1`,[currgroup[j]]
          );
          const totalAmountUser=parseInt(currentUserAmount.rows[0].total_amount)+eachContribute
          const youOwe = await db.query(
            `UPDATE users set totalOwe=?,totalAmount=? where user_id=?`,
            [eachContributeRound, totalAmountUser,currgroup[j]]
          );
        }
      }
    }

    res.status(201).json({ message: 'New expense created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const particularExpense=async(req,res)=>{
  const keyname = 'getParticularexpense';
  const cached = await redisclient.get(keyname);

  if (cached) { 
    return res.status(201).json(JSON.parse(cached));
  } else {
    try {
      const id = req.params.id;
      const group = await db.query(`SELECT * FROM expenses where expense_id`, [id]);

      if (group[0].length === 0) {
        return res.status(404).json({ message: 'No expense found' });
      }

      redisclient.set(keyname, JSON.stringify(group[0]), { EX: 30 });
      return res.status(200).json(group[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}

module.exports = {
  createExpense,
  getallExpense,
  getparticularExpense,
  particularExpense
};
