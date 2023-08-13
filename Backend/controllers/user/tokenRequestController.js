const {db , query} = require('../../config/db')
const { use } = require('../../routes/user/authRoutes')


const buyTokenRequest = async (req, res) => {
    const user_id = req.body.user_id
    const no_of_tokens = Number(req.body.no_of_tokens)
    const property_id = req.body.property_id
    const q1 = "SELECT token_value_id FROM token_value a INNER JOIN property b ON a.token_id = b.token_id WHERE property_id = ? ORDER BY a.token_value_id DESC LIMIT 1;";   
  //  await db.query(q1,[property_id], (err, data) => {
  //     if (err) return res.status(500).json(err);
  //     if (data.length === 0) return res.status(404).json("Could not process request!");
  //     const token_value = data[0];
  //     console.log(token_value);
  //   });
    const q = `INSERT INTO token_buy_request (user_id, property_id, no_of_tokens, status,payment_status,token_value_id) VALUES (?,?,?,?,?,?);`;
    // response = await executeQueries(q,q1,user_id,no_of_tokens,property_id);
    try {
      // Execute the first query
      const resultQ1 = await query(q1, [property_id]);
      console.log('q1 executed');
      // Extract the token_value_id from the first row
      const tokenValueId = resultQ1[0].token_value_id;
  
      // Execute the second query using the extracted token_value_id
      await query(q, [user_id,property_id,no_of_tokens,0,1, tokenValueId]);
      console.log('q2 executed');
      console.log('Token buy request added successfully');
      return res.status(200).json({message:"token buy request added"})
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({message:"there was an error"})

  
    } 



}

const getPendingRequestsOfUser = (req, res) => {

  const user_id = req.params.user_id

  // const q = "SELECT * FROM token_buy_request where user_id = ? AND status = 0"
  const q = `
    SELECT 
      tbr.req_id,
      tbr.user_id,
      CONCAT(u.fname,' ',u.lname) AS user_name,
      p.name as property_name,
      tbr.no_of_tokens,
      tbr.date_of_request,
      f.payment_status,
      tv.token_value,
      t.token_symbol,
      tbr.no_of_tokens * tv.token_value AS cost_of_tokens

    FROM token_buy_request tbr
    INNER JOIN property p ON p.property_id = tbr.property_id
    INNER JOIN user u ON tbr.user_id = u.user_id
    INNER JOIN payment_status f on tbr.payment_status = f.payment_status_id
    INNER JOIN tokens t ON p.token_id = t.token_id
    INNER JOIN token_value tv ON tbr.token_value_id = tv.token_value_id
    
    WHERE tbr.user_id = ? AND tbr.status = 0
    
  `;
  
  

  db.query(q, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    // if (data.length === 0) return res.status(404).json(data);       // data.length will tell that there are no pending requests of user
    res.status(200).json(data)
  });

}
const getDataForCreatePayment = (req, res) => {
  const request_id = req.params.request_id
  q=`SELECT a.req_id as Request_ID,b.name as property_name,a.no_of_tokens,a.no_of_tokens*c.token_value AS Payment_Amount FROM token_buy_request a INNER JOIN property b ON a.property_id = b.property_id INNER JOIN token_value c ON a.token_value_id=c.token_value_id where a.req_id=${request_id}`

  db.query(q,  (err, data) => {
    if (err) return res.status(500).json(err);
    // if (data.length === 0) return res.status(404).json(data);       // data.length will tell that there are no pending requests of user
    res.status(200).json(data)
  });

}
const DeletePendingRequestsOfUser = (req, res) => {

  const request_id = req.params.request_id

  // const q = "SELECT * FROM token_buy_request where user_id = ? AND status = 0"
  const q = `
   DELETE from token_buy_req where req_id= ${request_id}
  `;
  
  

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    // if (data.length === 0) return res.status(404).json(data);       // data.length will tell that there are no pending requests of user
    res.status(200).json(data)
  });

}


module.exports = {buyTokenRequest, getPendingRequestsOfUser, DeletePendingRequestsOfUser, getDataForCreatePayment}