const {db} = require('../config/db')

const buyTokenRequest = (req, res) => {
    const user_id = req.body.user_id
    const no_of_tokens = req.body.no_of_tokens
    const property_id = req.body.property_id
    const q = `INSERT INTO token_buy_request (user_id, property_id, no_of_tokens, status) VALUES (${user_id}, ${property_id}, ${no_of_tokens}, 0);`;
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Could not process request!");
      res.status(200).json(data)
    });
}

module.exports = {buyTokenRequest}