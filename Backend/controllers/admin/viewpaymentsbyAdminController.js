const { db } = require('../../config/db');


const viewPaymentsByAdmin = (req, res) => {
    const propertyId = req.params.property_id;
    const getPaymentDataForCompletedTransactionsQuery = `SELECT b.user_id AS UserID, CONCAT(b.fname,' ',b.lname) AS UserName, a.payment_amount AS Payment_Amount, c.payment_status ,DATE_FORMAT(a.DateTime, '%Y-%m-%d %H:%i:%s')  AS DATE_TIME, a.payment_method, a.payment_receipt_address  FROM payment a INNER JOIN user b on a.payment_from = b.user_id INNER JOIN payment_status c on a.payment_status=c.payment_status_id INNER JOIN token_transactions d on d.payment_id = a.payment_id WHERE d.property_id=${propertyId} ORDER BY a.DateTime DESC;
    ;`;
    const getPaymentDataForPledgedTransactionsQuery = `SELECT b.user_id AS UserID, CONCAT(b.fname,' ',b.lname) AS UserName, a.payment_amount AS Payment_Amount, c.payment_status ,DATE_FORMAT(a.DateTime, '%Y-%m-%d %H:%i:%s')  AS DATE_TIME, a.payment_method, a.payment_receipt_address  FROM payment a INNER JOIN user b on a.payment_from = b.user_id INNER JOIN payment_status c on a.payment_status=c.payment_status_id INNER JOIN token_buy_request d on d.req_id = a.transaction_id WHERE d.property_id=${propertyId} ORDER BY a.DateTime DESC;
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


module.exports = { viewPaymentsByAdmin };