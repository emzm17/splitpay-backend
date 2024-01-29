
const db=require('../database');
const  graph=require('../utils/graph');

function maximun_amount(amount){
    let ans=0;
    for(let i=1;i<amount.length;i++){
           if(amount[i]>amount[ans]){
            ans=i;
           }
    }
    return ans;
}

function minimun_amount(amount){
    let ans=0
    for(let i=1;i<amount.length;i++){
     if(amount[i]<amount[ans] && amount[i]!=0){
        ans=i;
     }
    }
    return ans;
    }

    
    const logEntries=[];
    async function min_cash_flow(amount){    
    let maxi_credit=maximun_amount(amount);
    let mini_debit=minimun_amount(amount);
    
    if(amount[maxi_credit] === 0 && amount[mini_debit] === 0){
          return;
    }
    
    let mini=Math.min(amount[maxi_credit],-amount[mini_debit]);
    amount[maxi_credit]-=mini;
    amount[mini_debit]+=mini;
    
 


    const logEntry = {
        payer: mini_debit,
        payee: maxi_credit,
        amount: mini
    };

    logEntries.push(logEntry);
    min_cash_flow(amount);
    }


    const settlement= async (groupId) => {
        try {
            const expenses = await db.query(`select * from expenses where group_id=?`, [groupId]);
            const group = await db.query(`select * from group_s where id=?`, [groupId]);
            const delete_expense = await db.query('delete from expenses where group_id=?',[groupId]);
            if(expenses[0].length==0){
                return res.json({message:"all settlement is complete"})
            }
    
  
            const size = group[0][0].users_id.length;
            var maxi_size=0;
            for(var i=0;i<size;i++){
                    maxi_size=Math.max(maxi_size,parseInt(group[0][0].users_id[i]));
            }
            let settlement_graph=new graph(maxi_size+1); 
            for (let i = 0; i < expenses[0].length; i++) {
                let expense = expenses[0][i];
            
                const amount = (expense.amount) / size;
                const actualAmount=amount.toFixed(2);
                for (let idx = 0; idx < group[0][0].users_id.length; idx++) {
                    let group_item = group[0][0].users_id[idx];
                    if (group_item == expense.payer_id) {
                              continue;
                    } else {
                         settlement_graph.addEdge(group_item,expense.payer_id,actualAmount);
                         
                    }
                }
            }
            // row-paye
            // colu-receive
           const N=maxi_size;
           let amount=Array(maxi_size+1).fill(0);
           
            for(let i=1;i<maxi_size+1;i++){
                for(let j=1;j<maxi_size+1;j++){
                   amount[i]+=( parseFloat(settlement_graph.adjMatrix[j][i])-parseFloat(settlement_graph.adjMatrix[i][j]));
                }
             }        
        logEntries=[]
        min_cash_flow(amount);           
            for(let i=0;i<logEntries.length;i++){
                  const updateAmount=await db.query(
                    `select * from users where user_id=?`,[logEntries[i].payer]
                  );
                //   console.log((updateAmount[0][0].totalOwe));
                  const updateAmounttotalOwe=parseFloat(updateAmount[0][0].totalOwe)-logEntries[i].amount;
               
                //   console.log(updateAmounttotalOwe)
                  const updatedAmounttotOwed=await db.query(
                        `update users set totalOwe=? where user_id=?`,[updateAmounttotalOwe,parseInt(logEntries[i].payer)]
                  );
                  const updatetotalAmount=await db.query(
                    `select * from users where user_id=?`,[logEntries[i].payee]
                  );
                  let updatetotalAmountRecord=parseFloat(updatetotalAmount[0][0].totalOwed)-logEntries[i].amount;
                  if(updatetotalAmountRecord<0){
                    updatetotalAmountRecord=0;
                  }
                  const updatedtotalAmount=await db.query(
                        `update users set totalOwed=? where user_id=?`,[updatetotalAmountRecord,parseInt(logEntries[i].payee)]
                  );
               
                // console.log(updatetotalAmountRecord)
            }
            
        
            return logEntries;
            
        
    
        } catch (error) {
            console.error(error);
            throw new Error('something went wrong');
        }
    };


    module.exports={
        settlement
    };
    
    
    
    
    
    
    
    