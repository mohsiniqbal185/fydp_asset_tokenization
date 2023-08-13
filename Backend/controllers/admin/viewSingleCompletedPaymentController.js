const { db } = require('../../config/db');



const ViewSinglePayment = (req, res) =>{
    const paymentID = req.params.payment_id;
    // const getCompletedPaymentsDataSingleQuery = `
    // SELECT a.transaction_id,a.payment_id,b.user_id AS UserID, CONCAT(b.fname,' ',b.lname) AS UserName, a.payment_amount AS Payment_Amount, c.payment_status ,DATE_FORMAT(a.DateTime, '%Y-%m-%d %H:%i:%s')  AS DATE_TIME, a.payment_method, a.payment_receipt_file_name  FROM payment a INNER JOIN user b on a.payment_from = b.user_id INNER JOIN payment_status c on a.payment_status=c.payment_status_id WHERE a.payment_id=${paymentID} ORDER BY a.DateTime DESC
    // `;
    const getCompletedPaymentsDataSingleQuery = `SELECT a.payment_id,a.payment_method,CONCAT(b.fname,' ',b.lname) AS Payment_From, a.DateTime, a.payment_amount,f.payment_status FROM payment a INNER JOIN user b ON a.payment_from=b.user_id INNER JOIN token_buy_request c on a.req_id = c.req_id INNER JOIN payment_status f on c.payment_status = f.payment_status_id WHERE a.payment_id=${paymentID}`;
    db.query(getCompletedPaymentsDataSingleQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(data)
      });

};
module.exports = {ViewSinglePayment};