const {db} = require('../../config/db')

const getTotalInvestedAmount = (req, res) => {
    const user_id = req.body.user_id
    const q = `
    SELECT 
    `;
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Could not process request!");
      res.status(200).json(data)
    });
}

const getActiveInvestments = (req, res) => {
    const user_id = req.params.user_id
    const q = `
    SELECT 
    p.property_id,
    p.name as property_name,
    SUM(tt.no_of_tokens) as no_of_tokens,
    p.location as property_location,
    p.property_code

    FROM token_transactions tt
    INNER JOIN property p ON p.property_id = tt.property_id
    WHERE tt.receiver_id = ?

    GROUP BY p.name
    ORDER BY no_of_tokens DESC;
    `;
  
    db.query(q, [user_id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("No Transactions of this user");
      res.status(200).json(data)
    });
}

module.exports = {getActiveInvestments}