const {db} = require('../../config/db')

const getTotalUsersCount = (req, res) => {
    const q = "SELECT COUNT(*) as number_of_users FROM user;";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({data : data, error: "No users yet"});
      res.status(200).json(data)
    });
}

const getTotalTransactionsCount = (req, res) => {
    const q = "SELECT COUNT(*) as number_of_transactions FROM token_transactions;";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({data : data, error: "No users yet"});
      res.status(200).json(data)
    });
}

const getTotalPendingTransactionsCount = (req, res) => {
    const q = "SELECT COUNT(*) as number_of_pending_transactions FROM token_buy_request;";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({data : data, error: "No users yet"});
      res.status(200).json(data)
    });
}

const getRecentTransactions = (req, res) => {

    const q = `SELECT 
      p.name as property_name,
      p.property_code,
      receiver_user.wallet_address as receiver_wallet_address,
      tt.no_of_tokens,
      tt.date_time,
      tt.transaction_hash

     FROM token_transactions tt
     INNER JOIN property p ON p.property_id = tt.property_id
     INNER JOIN user receiver_user ON receiver_user.user_id = tt.receiver_id

     ORDER BY tt.date_time DESC
     LIMIT 10
     ;`;
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({data : data, error: "No transactions done on Platform yet!"});
      res.status(200).json(data)
    });
}

module.exports = {getTotalUsersCount, getTotalTransactionsCount, getTotalPendingTransactionsCount, getRecentTransactions}