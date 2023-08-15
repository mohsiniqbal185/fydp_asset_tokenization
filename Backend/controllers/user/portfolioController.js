const {db} = require('../../config/db')


const getActiveInvestments = (req, res) => {
    const user_id = req.params.user_id
    const q = `
    SELECT 
    p.property_id,
    p.name as property_name,
    th.no_of_tokens,
    p.location as property_location,
    p.property_code

    FROM token_holders th
    INNER JOIN property p ON p.property_id = th.property_id
    WHERE th.user_id = ?;
    `;
  
    db.query(q, [user_id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("No Transactions of this user");
      res.status(200).json(data)
    });
}
const getDatatoSellInvestments = (req, res) => {
  const property_id = req.params.property_id
  const q = `
  SELECT 
  p.name as property_name,
  tv.token_value as token_value
  FROM token_value tv
  INNER JOIN property p ON p.token_id = tv.token_id
  WHERE p.property_id = ?

  ORDER BY tv.token_value_id DESC limit 1;
  `;

  db.query(q, [property_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("there was an error");
    res.status(200).json(data)
  });
}

module.exports = {getActiveInvestments,getDatatoSellInvestments}