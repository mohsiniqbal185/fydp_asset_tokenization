const { db } = require('../../config/db');
const qs = require('qs');


// const urlParams = new URLSearchParams(window.location.search);

// Get the value of a specific parameter
// const paramValue = urlParams.get('paramName');

const viewtokentransactionsbyAdmin = (req, res) => {

    const propertyId = req.params.property_id;


    // console.log(paramValue);

    // Get the value of a specific parameter
    // const paramValue = urlParams.get('property_id')
    // const getTransactionsDataQuery = `SELECT * FROM token_transactions a INNER JOIN property b ON a.property_id=b.property_id INNER JOIN user c ON a.receiver_id = c.user_id INNER JOIN tokens d ON b.token_id = d.token_id INNER JOIN token_value e ON d.token_id = e.token_id WHERE a.property_id=${propertyId};`;
    const getTransactionsDataQuery = `SELECT * FROM token_transactions a INNER JOIN property b ON a.property_id=b.property_id INNER JOIN tokens c ON b.token_id = c.token_id INNER JOIN token_value d ON a.token_value_id = d.token_value_id INNER JOIN user e ON a.receiver_id = e.user_id WHERE  a.property_id=${propertyId};`;
    const getPendingTransactionsDataQuery = `
    SELECT 
        a.user_id AS Pledger_ID,
        CONCAT(f.fname,' ',f.lname) AS Pledger_Name,
        a.req_id,
        b.name AS Property_Name,
        a.property_id,
        h.payment_status,
        d.token_name,
        DATE_FORMAT(a.date_of_request, '%Y-%m-%d %H:%i:%s') AS date_of_request,
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
        payment_status h ON a.payment_status = h.payment_status_id
    INNER JOIN 
        tokens d ON b.token_id = d.token_id
    INNER JOIN 
        token_value g ON a.token_value_id = g.token_value_id
  
    WHERE 
        a.property_id = ${propertyId}
    AND 
        a.status = 0;
    `;
    const promises = [

        new Promise((resolve, reject) => {
            db.query(getTransactionsDataQuery, (err, transactionsData) => {
                if (err) reject(err);
                resolve(transactionsData);
            });
        }),
        new Promise((resolve, reject) => {
            db.query(getPendingTransactionsDataQuery, (err, PendingTransactionsData) => {
                if (err) reject(err);
                resolve(PendingTransactionsData);
            });
        }),
    ];

    // Use Promise.all to wait for both queries to complete
    Promise.all(promises)
        .then(([transactionsData, PendingTransactionsData]) => {
            // Combine the data from both queries if needed
            const combinedData = {
                transactionsData: transactionsData,
                PendingTransactionsData: PendingTransactionsData,
            };

            res.status(200).json(combinedData);
        })
        .catch((err) => {
            console.error("Error executing queries:", err);
            res.status(500).json(err);
        });

    // db.query(getTransactionsDataQuery, (err, data) => {
    //     if (err) return res.status(200).json(err);
    //     res.status(200).json(data);

    // })
}
module.exports = { viewtokentransactionsbyAdmin };