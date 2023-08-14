const { db, query } = require('../../config/db')
const { use } = require('../../routes/user/authRoutes')


const requestMarketSale = async (req, res) => {
  const user_id = req.body.user_id
  const no_of_tokens = Number(req.body.no_of_tokens)
  const property_id = req.body.property_id


  // Get token value id from property id
  const q1 = "SELECT token_value_id FROM token_value a INNER JOIN property b ON a.token_id = b.token_id WHERE property_id = ? ORDER BY a.token_value_id DESC LIMIT 1;";

  const q = `INSERT INTO token_market_sale (seller_id, property_id, no_of_tokens, sold,payment_done, token_value_id) VALUES (?,?,?,?,?,?);`;
  try {
    // Execute the first query
    const resultQ1 = await query(q1, [property_id]);
    // Extract the token_value_id from the first row
    const tokenValueId = resultQ1[0].token_value_id;

    // Execute the second query using the extracted token_value_id
    await query(q, [user_id, property_id, no_of_tokens, 0, 1, tokenValueId]);
    console.log('Token market sale request successfully added');
    return res.status(200).json({ message: "token market sale added" })
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "there was an error" })


  }



}

const getMarketSaleRequestsOfUser = (req, res) => {

  const user_id = req.params.user_id

  const q = `
  SELECT 
  tmr.idtoken_market_sale as request_id,
  tmr.seller_id,
  CONCAT(u.fname,' ',u.lname) AS user_name,
  tmr.pledger_id,
  CONCAT(u1.fname, ' ', u1.lname) AS pledger_name,
  p.name as property_name,
  tmr.no_of_tokens,
  tmr.date_time,
  f.payment_status,
  tv.token_value,
  t.token_symbol,
  tmr.no_of_tokens * tv.token_value AS cost_of_tokens,
  tmr.sold,
  tmr.payment_done

  FROM token_market_sale tmr
  LEFT JOIN property p ON p.property_id = tmr.property_id
  LEFT JOIN user u ON tmr.seller_id = u.user_id
  LEFT JOIN user u1 ON tmr.pledger_id = u1.user_id
  LEFT JOIN payment_status f on tmr.payment_id = f.payment_status_id
  LEFT JOIN tokens t ON p.token_id = t.token_id
  LEFT JOIN token_value tv ON tmr.token_value_id = tv.token_value_id

    WHERE tmr.seller_id = ?
    
  `;

  db.query(q, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    // if (data.length === 0) return res.status(404).json(data);       // data.length will tell that there are no pending requests of user
    res.status(200).json(data)
  });

}

// Get all market sale requests
const getAllPendingMarketSaleRequests = (req, res) => {


  const q = `
  SELECT 
  tmr.idtoken_market_sale as request_id,
  tmr.seller_id,
  CONCAT(u.fname,' ',u.lname) AS user_name,
  tmr.pledger_id,
  CONCAT(u1.fname, ' ', u1.lname) AS pledger_name,
  p.name as property_name,
  tmr.no_of_tokens,
  tmr.date_time,
  f.payment_status,
  tv.token_value,
  t.token_symbol,
  tmr.no_of_tokens * tv.token_value AS cost_of_tokens,
  tmr.sold,
  tmr.payment_done

  FROM token_market_sale tmr
  LEFT JOIN property p ON p.property_id = tmr.property_id
  LEFT JOIN user u ON tmr.seller_id = u.user_id
  LEFT JOIN user u1 ON tmr.pledger_id = u1.user_id
  LEFT JOIN payment_status f on tmr.payment_id = f.payment_status_id
  LEFT JOIN tokens t ON p.token_id = t.token_id
  LEFT JOIN token_value tv ON tmr.token_value_id = tv.token_value_id
    
    where tmr.sold=0
  `;

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err);
    // if (data.length === 0) return res.status(404).json(data);       // data.length will tell that there are no pending requests of user
    res.status(200).json(data)
  });

}


const DeletePendingMarketSaleRequestsOfUser = async (req, res) => {

  const request_id = req.params.request_id

  const q1 = `SELECT * FROM token_market_sale where idtoken_market_sale= ? and sold=0`
  const q2 = `
   DELETE from token_market_sale where idtoken_market_sale= ${request_id} and sold=0
  `;

  try {
    // Execute the first query
    const resultQ1 = await query(q1, [request_id]);
    if (resultQ1.length == 0) {
      res.status(400).json({message:"already sold or deleted, cannot delete"})
    }
    db.query(q2)
    return res.status(200).json({message: "deleted successfully"})

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "there was an error" })

  }

}


module.exports = { requestMarketSale, getMarketSaleRequestsOfUser, getAllPendingMarketSaleRequests, DeletePendingMarketSaleRequestsOfUser }