const { db } = require('../../config/db');



const managePendingSingleTransaction = (req, res) =>{
    const reqID = req.params.req_id;
    const getPendingTransactionsDataSingleQuery = `
    SELECT 
        a.user_id AS Pledger_ID,
        CONCAT(f.fname,' ',f.lname) AS Pledger_Name,
        a.req_id,
        b.name AS Property_Name,
        a.property_id,
        d.token_name,
        DATE_FORMAT(a.date_of_request, '%Y-%m-%d %H:%i:%s') AS Date_of_Request,
        e.name AS Status,
        g.token_value AS TokenValue,
        a.no_of_tokens,
        a.no_of_tokens * g.token_value AS TransactionValue,
        d.total_supply - b.tokens_sold AS RemainingTokens,
        c.payment_amount AS Payment_Amount,
        h.payment_status,
        c.payment_id,
        c.payment_method,
        DATE_FORMAT(c.DateTime, '%Y-%m-%d %H:%i:%s') AS Date_of_Payment,
        c.payment_receipt_file_name

    FROM 
        token_buy_request a
    INNER JOIN 
        user f ON a.user_id = f.user_id
    INNER JOIN 
        property b ON a.property_id = b.property_id
    INNER JOIN 
        request_status e ON a.status = e.status_id
    INNER JOIN 
        payment c ON a.req_id = c.transaction_id
    INNER JOIN 
        payment_status h ON c.payment_status = h.payment_status_id
    INNER JOIN 
        tokens d ON b.token_id = d.token_id
    INNER JOIN 
        token_value g ON b.token_id = g.token_id
  
    WHERE 
        a.req_id = ${reqID}
    AND 
        a.status = 0;
    `;
    db.query(getPendingTransactionsDataSingleQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(data)
      });

};
module.exports = {managePendingSingleTransaction};