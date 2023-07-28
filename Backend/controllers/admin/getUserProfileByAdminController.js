const { db } = require('../../config/db')

const getUserProfileByAdmin = (req, res) => {
    // var userID = req.query.user_id;
    // const q = `SELECT * FROM USER a INNER JOIN token_transactions b WHERE a.user_id=${userID} and a.user_id = b.receiver_id ;`;

    // db.query(q, (err, data) => {
    //     if (err) return res.status(500).json(err)
    //     res.status(200).json(data);
    // });
    const userID = req.query.user_id;
    const getUserQuery = `SELECT * FROM USER WHERE user_id=${userID};`;
    const getTransactionsDataQuery = `SELECT * FROM token_transactions a INNER JOIN property b ON a.property_id=b.property_id INNER JOIN tokens c ON b.token_id = c.token_id INNER JOIN token_value d ON c.token_id = d.token_id WHERE a.receiver_id=${userID};`;
    const getPendingTransactionsDataQuery = `
  SELECT 
      a.req_id,
      b.name AS Property_Name,
      a.property_id,
      c.payment_status,
      d.token_name,
      a.date_of_request,
      e.name AS Status,
      a.no_of_tokens,
      f.token_value,

      a.no_of_tokens * f.token_value AS TransactionValue,
      d.total_supply - b.tokens_sold AS RemainingTokens
  FROM 
      token_buy_request a
  INNER JOIN 
      property b ON a.property_id = b.property_id
      INNER JOIN 
      request_status e ON a.status = e.status_id
  INNER JOIN 
      payment_status c ON a.payment_status = c.payment_status_id
  INNER JOIN 
      tokens d ON b.token_id = d.token_id
    INNER JOIN 
      token_value f ON b.token_id = f.token_id

  WHERE 
      a.user_id = ${userID}
  AND 
      a.status = 0;
  `;

    // Create an array of promises for both queries
    const promises = [
        new Promise((resolve, reject) => {
            db.query(getUserQuery, (err, userData) => {
                if (err) reject(err);
                resolve(userData);
            });
        }),
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
        .then(([userData, transactionsData, PendingTransactionsData]) => {
            // Combine the data from both queries if needed
            const combinedData = {
                user: userData,
                transactionsData: transactionsData,
                PendingTransactionsData: PendingTransactionsData,
            };

            res.status(200).json(combinedData);
        })
        .catch((err) => {
            console.error("Error executing queries:", err);
            res.status(500).json(err);
        });

};

module.exports = { getUserProfileByAdmin }