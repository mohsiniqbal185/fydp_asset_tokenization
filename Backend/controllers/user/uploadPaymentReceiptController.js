const {db} = require('../../config/db')


const uploadPaymentReceiptInPaymentTable = (req, res) => {
    console.log(req.body)
    const req_id = req.body.req_id
    const user_id = req.body.user_id
    const file_name = req.body.file_name
    const payment_method = req.body.payment_method
    const payment_amount = req.body.payment_amount
    const q = `INSERT INTO payment (payment_method, payment_from, req_id, payment_receipt_file_name, payment_amount) VALUES (?, ?, ?, ?, ?);`;
  
    db.query(q,[payment_method, user_id, req_id, file_name, payment_amount], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) return res.status(404).json("Could not process request!");
      

      const tokenBuyRequestUpdateStatusQuery = 'UPDATE token_buy_request SET payment_status = 2 WHERE req_id = ?'
      db.query(tokenBuyRequestUpdateStatusQuery, [req_id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0) return res.status(404).json("Could not process request!");
        res.status(200).json(data)
      } )
      
    });
}

const getDataForCreatePayment = (req, res) => {
  const req_id = req.params.req_id
  q=`SELECT a.req_id as Request_ID,
  b.name as property_name,
  a.no_of_tokens,
  a.no_of_tokens*c.token_value AS Payment_Amount
   FROM token_buy_request a 
   INNER JOIN property b ON a.property_id = b.property_id 
   INNER JOIN token_value c ON a.token_value_id=c.token_value_id 
   WHERE a.req_id=${req_id}`

  db.query(q,  (err, data) => {
    if (err) return res.status(500).json(err);
    // if (data.length === 0) return res.status(404).json(data);       // data.length will tell that there are no pending requests of user
    res.status(200).json(data)
  });

}

const getDataForSinglePaymentReceipt = (req, res) => {
  const req_id = req.params.req_id
  q=`SELECT 
  p.payment_id,
  p.payment_method,
  u.email as payment_from,
  p.DateTime,
  ps.payment_status,
  p.payment_amount
  FROM payment p 
    INNER JOIN token_buy_request tbr ON tbr.req_id = p.req_id
    INNER JOIN payment_status ps ON tbr.payment_status = ps.payment_status_id
    INNER JOIN user u ON p.payment_from = u.user_id
  
  WHERE p.req_id = ${req_id};`

  db.query(q,  (err, data) => {
    if (err) return res.status(500).json(err);
    // if (data.length === 0) return res.status(404).json(data);       // data.length will tell that there are no pending requests of user
    res.status(200).json(data)
  });
}


module.exports = {uploadPaymentReceiptInPaymentTable, getDataForCreatePayment, getDataForSinglePaymentReceipt}