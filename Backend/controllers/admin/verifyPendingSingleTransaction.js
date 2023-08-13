const { db } = require('../../config/db');

const verifySinglePayment = (req, res) => {
    const reqID = req.params.req_id;
    const verifySinglePendingTransactionQuery = `UPDATE token_buy_request
    SET payment_status = 3
    WHERE req_id=${reqID};`;
    db.query(verifySinglePendingTransactionQuery, (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(`Request ID ${reqID} Verified`)
      });

};
module.exports ={verifySinglePayment};
