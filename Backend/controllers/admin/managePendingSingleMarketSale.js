const { db } = require('../../config/db');



const managePendingSingleMarketSale = (req, res) =>{
    const reqID = req.params.req_id;
    const getPendingTransactionsDataSingleQuery = `
    SELECT 
    a.seller_id AS Seller_ID,
    CONCAT(f.fname,' ',f.lname) AS Seller_Name,
    a.pledger_id AS Pledger_ID,
    CONCAT(f1.fname,' ',f1.lname) AS Pledger_Name,
        a.token_value_id,
        a.req_id,
        a.property_id,
        d.token_name,
        DATE_FORMAT(a.date_of_request, '%Y-%m-%d %H:%i:%s') AS Date_of_Request,
        g.token_value AS TokenValue,
        a.no_of_tokens,
        a.no_of_tokens * g.token_value AS TransactionValue,
        d.total_supply - b.tokens_sold AS RemainingTokens,
        c.payment_amount AS Payment_Amount,
        a.payment_done,
        c.payment_id,
        c.payment_method,
        DATE_FORMAT(c.DateTime, '%Y-%m-%d %H:%i:%s') AS Date_of_Payment,
        f.wallet_address AS Seller_Wallet_Address,
        f1.wallet_address AS Pledger_Wallet_Address,
        k.contract_address as Property_Contract_Address,
        c.payment_receipt_file_name

    FROM 
        token_market_sale a
    INNER JOIN 
        user f ON a.seller_id = f.user_id
    INNER JOIN 
        user f1 ON a.pledger_id = f1.user_id
    INNER JOIN 
        payment c ON a.idtoken_market_sale = c.req_id
    INNER JOIN 
        payment_status h ON a.payment_status = h.payment_status_id
    INNER JOIN 
        token_value g ON a.token_value_id = g.token_value_id
  
    WHERE 
        a.idtoken_market_sale = ${reqID}
    AND 
        a.status = 0;
    `;
    db.query(getPendingTransactionsDataSingleQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(data)
      });

};
module.exports = {managePendingSingleMarketSale};