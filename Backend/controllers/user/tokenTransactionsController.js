const {db} = require('../../config/db')

const getUserTransactions = (req, res) => {
    const user_id = req.params.user_id
    const q = "SELECT * FROM token_transactions WHERE receiver_id = ?";
  
    db.query(q,[user_id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("No transactions of this user found");
      res.status(200).json(data)
    });
}

// const getAllTransactions = (req, res) => {
//   const q = "SELECT * FROM token_transactions;"
//   db.query(q, (err, data) =>  {
//     if (err) return res.status(500).json(err);
//     if (data.length === 0) return res.status(404).json("No transactions yet");
//     res.status(200).json(data)
//   })
// }

module.exports = {getUserTransactions}