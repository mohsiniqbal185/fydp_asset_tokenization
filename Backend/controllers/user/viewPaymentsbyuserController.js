const { db } = require('../../config/db');


const viewPaymentsByUser = (req, res) => {
    const user_id = req.params.user_id;
    const getPaymentDataForCompletedTransactionsQuery = `SELECT e.payment_status,a.req_id,a.payment_id,b.user_id AS UserID, CONCAT(b.fname,' ',b.lname) AS UserName, a.payment_amount AS Payment_Amount,DATE_FORMAT(a.DateTime, '%Y-%m-%d %H:%i:%s')  AS DATE_TIME, a.payment_method, a.payment_receipt_file_name  FROM payment a INNER JOIN user b on a.payment_from = b.user_id INNER JOIN token_transactions d on d.payment_id = a.payment_id INNER JOIN token_buy_request e on a.req_id = e.req_id WHERE b.user_id=${user_id} and e.payment_status=3 ORDER BY a.DateTime DESC;
    ;`;
    const getPaymentDataForPledgedTransactionsQuery = `SELECT a.req_id, a.payment_id as payment_id, b.user_id AS UserID, CONCAT(b.fname,' ',b.lname) AS UserName, a.payment_amount AS Payment_Amount, c.payment_status ,DATE_FORMAT(a.DateTime, '%Y-%m-%d %H:%i:%s')  AS DATE_TIME, a.payment_method, a.payment_receipt_file_name  FROM payment a INNER JOIN user b on a.payment_from = b.user_id INNER JOIN token_buy_request d on d.req_id = a.req_id INNER JOIN payment_status c on d.payment_status=c.payment_status_id WHERE d.user_id=${user_id} and d.payment_status!=3 ORDER BY a.DateTime DESC;
    ;`;


    const promises = [
        new Promise((resolve, reject) => {
            db.query(getPaymentDataForCompletedTransactionsQuery, (err, PaymentDataForCompletedTransactions) => {
                if (err) reject(err);
                resolve(PaymentDataForCompletedTransactions);
            });
        }),
        new Promise((resolve, reject) => {
            db.query(getPaymentDataForPledgedTransactionsQuery, (err, PaymentDataForPledgedTransactions) => {
                if (err) reject(err);
                resolve(PaymentDataForPledgedTransactions);
            });
        }),
 
    ];

    // Use Promise.all to wait for both queries to complete
    Promise.all(promises)
        .then(([PaymentDataForCompletedTransactions, PaymentDataForPledgedTransactions]) => {
            // Combine the data from both queries if needed
            const combinedData = {
                PaymentDataForCompletedTransactions: PaymentDataForCompletedTransactions,
                PaymentDataForPledgedTransactions: PaymentDataForPledgedTransactions,
            };

            res.status(200).json(combinedData);
        })
        .catch((err) => {
            console.error("Error executing queries:", err);
            res.status(500).json(err);
        });

};


module.exports = { viewPaymentsByUser };