const db = require('../database');
const graph = require('../utils/graph');

const maximun_amount = (amount) => {
  let ans = 0;
  for (let i = 1; i < amount.length; i++) {
    if (amount[i] > amount[ans]) {
      ans = i;
    }
  }
  return ans;
};

const minimun_amount = (amount) => {
  let ans = 0;
  for (let i = 1; i < amount.length; i++) {
    if (amount[i] < amount[ans] && amount[i] !== 0) {
      ans = i;
    }
  }
  return ans;
};

const min_cash_flow = (amount, logEntries) => {
  let maxi_credit = maximun_amount(amount);
  let mini_debit = minimun_amount(amount);

  if (amount[maxi_credit] === 0 && amount[mini_debit] === 0) {
    return;
  }

  let mini = Math.min(amount[maxi_credit], -amount[mini_debit]);
  amount[maxi_credit] -= mini;
  amount[mini_debit] += mini;

  const logEntry = {
    payer: mini_debit,
    payee: maxi_credit,
    amount: mini,
  };

  logEntries.push(logEntry);
  min_cash_flow(amount, logEntries);
};

const settlement = async (groupId) => {
  try {
    const expenses = await db.query('SELECT * FROM expenses WHERE group_id=?', [groupId]);
    const group = await db.query('SELECT * FROM group_s WHERE id=?', [groupId]);

    if (expenses[0].length === 0) {
      return { message: 'All settlement is complete' };
    }

    const size = group[0][0].users_id.length;
    const settlement_graph = new graph(size);

    for (let i = 0; i < expenses[0].length; i++) {
      const expense = expenses[0][i];
      const amount = expense.amount / size;
      for (let idx = 0; idx < group[0][0].users_id.length; idx++) {
        const group_item = group[0][0].users_id[idx];
        if (group_item === expense.payer_id) {
          continue;
        } else {
          settlement_graph.addEdge(group_item, expense.payer_id, amount.toFixed(2));
        }
      }
    }

    const N = size;
    const amount = Array(size).fill(0);

    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++) {
        amount[i - 1] += parseFloat(settlement_graph.adjMatrix[j][i]) - parseFloat(settlement_graph.adjMatrix[i][j]);
      }
    }

    const logEntries = [];
    min_cash_flow(amount, logEntries);

    for (let i = 0; i < logEntries.length; i++) {
      const updateAmount = await db.query('SELECT * FROM users WHERE user_id=?', [logEntries[i].payer]);
      const updateAmounttotalOwe = parseFloat(updateAmount[0][0].totalOwe) - logEntries[i].amount;
      await db.query('UPDATE users SET totalOwe=? WHERE user_id=?', [updateAmounttotalOwe, parseInt(logEntries[i].payer)]);

      const updatetotalAmount = await db.query('SELECT * FROM users WHERE user_id=?', [logEntries[i].payee]);
      let updatetotalAmountRecord = parseFloat(updatetotalAmount[0][0].totalOwed) - logEntries[i].amount;
      if (updatetotalAmountRecord < 0) {
        updatetotalAmountRecord = 0;
      }
      await db.query('UPDATE users SET totalOwed=? WHERE user_id=?', [updatetotalAmountRecord, parseInt(logEntries[i].payee)]);
    }

    return { settlement: logEntries };
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  settlement,
};