const { db } = require('../../config/db');

const managePendingTransactions = (req, res) =>{

    const propertyId = req.params.property_id;


    // console.log(paramValue);

    // Get the value of a specific parameter
    // const paramValue = urlParams.get('property_id')
    const getPendingTransactionsDataQuery = `
    SELECT 
        a.user_id AS Pledger_ID,
        CONCAT(f.fname,' ',f.lname) AS Pledger_Name,
        a.req_id,
        b.name AS Property_Name,
        a.property_id,
        h.payment_status,
        d.token_name,
        a.date_of_request,
        e.name AS Status,
        g.token_value AS TokenValue,
        a.no_of_tokens,
        a.no_of_tokens * g.token_value AS TransactionValue,
        d.total_supply - b.tokens_sold AS RemainingTokens
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
        a.property_id = ${propertyId}
    AND 
        a.status = 0;
    `;
    db.query(getPendingTransactionsDataQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(data)
      });
};

module.exports = {managePendingTransactions};