const {db} = require('../../config/db')


const uploadPaymentReceiptInPaymentTable = (req, res) => {
    const req_id = req.body.req_id
    const user_id = req.body.user_id
    const file_name = req.body.file_name
    const payment_method = req.body.payment_method
    const payment_amount = req.body.payment_amount
    const q = `INSERT INTO payment (payment_method, payment_from, req_id, payment_receipt_file_name, payment_amount) VALUES (${payment_method}, ${user_id}, ${req_id}, ${file_name}, ${payment_amount});`;
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) return res.status(404).json("Could not process request!");
      
      res.status(200).json(data)
    });
}


module.exports = {uploadPaymentReceiptInPaymentTable}