const {db} = require('../../config/db')

const getUserTransactions = (req, res) => {
    const user_id = req.params.user_id
    const q = "SELECT * FROM token_transactions WHERE receiver_id = ?";
  
    db.query(q,[user_id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({data : data, error: "No transactions of this user found"});
      res.status(200).json(data)
    });
}

const getRecentTransactions = (req, res) => {

    const q = `SELECT 
      p.name as property_name,
      p.property_code,
      receiver_user.wallet_address as receiver_wallet_address,
      sender_user.wallet_address as sender_wallet_address,
      tt.no_of_tokens,
      tt.date_time,
      tt.transaction_hash

     FROM token_transactions tt
     INNER JOIN property p ON p.property_id = tt.property_id
     INNER JOIN user receiver_user ON receiver_user.user_id = tt.receiver_id
     INNER JOIN user sender_user ON sender_user.user_id = tt.sender_id

     ORDER BY tt.date_time DESC
     LIMIT 5
     ;`;
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({data : data, error: "No transactions done on Platform yet!"});
      res.status(200).json(data)
    });
}

const getUserTransactionsInPastMonths = (req, res) => {
    const user_id = req.params.user_id
    const q = `
    SELECT tt.no_of_tokens, m.month_name, YEAR(tt.date_time) as year, YEAR(CURDATE()) as current_year
    FROM token_transactions AS tt
    INNER JOIN month AS m ON m.month_id = EXTRACT(MONTH FROM tt.date_time)
    WHERE tt.receiver_id = ? AND (YEAR(CURDATE()) - YEAR(tt.date_time)) <= 1
    ORDER BY tt.date_time DESC;
    `

    db.query(q,[user_id], (err, data) => {

      if (err) return res.status(500).json(err);
      if (data.length === 0) {
        const months_name = ["JAN","FEB","MAR","APR","MAY","JUNE","JUL","AUG","SEP","OCT","NOV","DEC"];
        const d = new Date();
        let months = []
        let name = months_name[d.getMonth()]
        let tokens_per_month = []
        const month_table = {"JAN": 1,"FEB": 2, "MAR": 3,"APR": 4,"MAY": 5,"JUNE": 6,"JUL": 7,"AUG": 8,"SEP": 9,"OCT": 10,"NOV": 11,"DEC": 12}
        const month_id = month_table[name]
        const iterator = month_id - 6
        if (iterator < 1){
          iterator += 12
        }

        function getKeyByValue(object, value) {
          for (let prop in object) {
              if (object.hasOwnProperty(prop)) {
                  if (object[prop] === value)
                      return prop;
              }
          }
      }
  
        for (var i= iterator; i <= month_id; i++){
          months.push(getKeyByValue(month_table, i))
        }
  
        for (var i= 0; i<months.length; i++){
          tokens_per_month.push({name: months_name[i], Total: 0})
        }

        // console.log(tokens_per_month)

        return res.status(404).json({data : tokens_per_month, error: "No transactions of this user found"});
      }

      const month_table = {"JAN": 1,"FEB": 2, "MAR": 3,"APR": 4,"MAY": 5,"JUNE": 6,"JUL": 7,"AUG": 8,"SEP": 9,"OCT": 10,"NOV": 11,"DEC": 12}
      var months = []
      const latest_month = data[0]['month_name']
      const month_id = month_table[latest_month]
      const iterator = month_id - 5
      if (iterator < 1){
        iterator += 12
      }

      function getKeyByValue(object, value) {
        for (let prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (object[prop] === value)
                    return prop;
            }
        }
      }

      for (var i= iterator; i <= month_id; i++){
        months.push(getKeyByValue(month_table, i))
      }

      let tokens_per_month = []
      for (var i= 0; i<months.length; i++){
        tokens_per_month.push({name: months[i], Total: 0})
      }

      for (var i=0; i<tokens_per_month.length; i++){
        for (var j=0; j<data.length; j++){
          if (tokens_per_month[i].name == data[j].month_name){
            tokens_per_month[i].Total += data[j].no_of_tokens
          }
        }
      }

      // console.log(tokens_per_month)
      
      res.status(200).json({data : tokens_per_month, error: null})
    });
}



module.exports = {getUserTransactions, getUserTransactionsInPastMonths, getRecentTransactions}