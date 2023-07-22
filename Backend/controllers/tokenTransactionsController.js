const {db} = require('../config/db')

const getUserTransactions = (req, res) => {
    const userId = req.body.userId
    const q = "SELECT * FROM token_transactions WHERE receiver_id = ?";
  
    db.query(q,[userId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("No transactions found");
      res.status(200).json(data)
    });
}

module.exports = {getUserTransactions}