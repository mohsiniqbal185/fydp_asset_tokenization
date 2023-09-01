const { db } = require('../../config/db');
const transferMarketSale = require('../transfer_market_sale');

async function verifySingleMarketSale(req, res) {
    const Seller_ID = req.body.Seller_ID;
    const Seller_Name = req.body.Seller_Name;
    const Pledger_ID = req.body.Pledger_ID;
    const Pledger_Name = req.body.Pledger_Name;
    const token_value_id = req.body.token_value_id;
    const idtoken_market_sale = req.body.idtoken_market_sale;
    const property_id = req.body.property_id;
    const token_name = req.body.token_name;
    const Date_of_Request = req.body.Date_of_Request;
    const TokenValue = req.body.TokenValue;
    const no_of_tokens = req.body.no_of_tokens;
    const TransactionValue = req.body.TransactionValue;
    const RemainingTokens = req.body.RemainingTokens;
    const Payment_Amount = req.body.Payment_Amount;
    const payment_done = req.body.payment_done;
    const payment_id = req.body.payment_id;
    const payment_method = req.body.payment_method;
    const Date_of_Payment = req.body.Date_of_Payment;
    const Seller_Wallet_Address = req.body.Seller_Wallet_Address;
    const Pledger_Wallet_Address = req.body.Pledger_Wallet_Address;
    const Property_Contract_Address = req.body.Property_Contract_Address;
    const payment_receipt_file_name = req.body.payment_receipt_file_name;
    const req_id = req.body.req_id;
    transaction_hash = await transferMarketSale(Seller_Wallet_Address, Pledger_Wallet_Address, no_of_tokens, Property_Contract_Address,);
    console.log(transaction_hash);
    const addtransactionquery = 'Insert into token_transactions(property_id,sender_id,receiver_id,no_of_tokens,transaction_hash,payment_id,token_value_id) VALUES(?,?,?,?,?,?,?)';

    const verifySinglePendingTransactionQuery = 'UPDATE token_market_sale SET sold=1 WHERE idtoken_market_sale=?;';
    // db.query(verifySinglePendingTransactionQuery, [req_id], (err, res) => {
    //     console.log('token market sale table updated');
    //     if(err){
    //         console.log('an error occurred');
    //     }
    //     else{
    //         console.log('done');
    //     // res.status(200).json({message:'queries executed'});
    //     }
    // });
    checkfortokenholder = 'SELECT no_of_tokens from token_holders where user_id = ? and property_id=?;';
    addnewtokenholder = 'INSERT into token_holders(user_id,property_id,no_of_tokens) VALUES (?,?,?);';
    // updatetokenholder = 'update token_holders set no_of_tokens=?;';
    gettokensofseller = 'SELECT no_of_tokens from token_holders where user_id = ? and property_id=?;';
    deletetokensofseller = "Delete from token_holders where user_id=? and property_id=?";
    updatetokensInTokenholders = "update token_holders set no_of_tokens = ? where user_id=? and property_id=?";
    // db.query(verifySinglePendingTransactionQuery, (err) => {
    //     if (err) return res.status(500).json(err);
    //     res.status(200).json(`Request ID ${req_id} Verified`)
    //   });
        const promises = [
          new Promise((resolve, reject) => {
              db.query(addtransactionquery,[property_id,Seller_ID, Pledger_ID, no_of_tokens, transaction_hash, payment_id,token_value_id], (err, addTokenTransactionQuery) => {
                  if (err) reject(err);
                  resolve(addTokenTransactionQuery);
              });
          }),
          new Promise((resolve, reject) => {
              db.query(verifySinglePendingTransactionQuery, [req_id],(err, verifySinglePendingTransactionQuery) => {
                  if (err) reject(err);
                  resolve(verifySinglePendingTransactionQuery);
              });
          }),
        //   new Promise((resolve, reject) => {
        //     db.query(getupdateTokensSoldQuery, [updatedtokenssold,property_id],(err, updateTokensSoldQuery) => {
        //         if (err) reject(err);
        //         resolve(updateTokensSoldQuery);
        //     });
        // }),
        new Promise((resolve, reject) => {
          // Execute the checkfortokenholder query
          db.query(checkfortokenholder, [Pledger_ID, property_id], (err, result) => {
              if (err) {
                  reject(err);
              } else {
                  // Check if any rows were returned

                  if (result.length > 0) {
                      // If no_of_tokens exists, execute the updatetokenholder query
                      const existingNoOfTokens = result[0].no_of_tokens;
                      const updatedNoOfTokens = existingNoOfTokens + no_of_tokens;
                      db.query(updatetokensInTokenholders, [updatedNoOfTokens,Pledger_ID,property_id], (err, updateResult) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(updateResult);
                        }
                    });

                  } else {
                      // If no_of_tokens doesn't exist, execute the addnewtokenholder query
                     
                      db.query(addnewtokenholder, [Pledger_ID,property_id,no_of_tokens], (err, addResult)=> {
                              if (err) {
                                  reject(err);
                              } else {
                                  resolve(addResult);
                              }
                          });
                  }
              }
          });
      }),
      new Promise((resolve, reject) => {
        // Execute the checkfortokenholder query
        db.query(gettokensofseller, [Seller_ID, property_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                // Check if any rows were returned
                if (result[0].no_of_tokens===no_of_tokens) {
                    db.query(deletetokensofseller, [Seller_ID, property_id], (err, deletedSeller) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(deletedSeller);
                        }
                    });
                    // If no_of_tokens exists, execute the updatetokenholder query

                } else {
                    // If no_of_tokens doesn't exist, execute the addnewtokenholder query
                    const existingNoOfTokens = result[0].no_of_tokens;
                    const updatedNoOfTokens = existingNoOfTokens - no_of_tokens;
                        db.query(updatetokensInTokenholders, [updatedNoOfTokens,Seller_ID,property_id], (err, SubtractedTokensOfSeller) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(SubtractedTokensOfSeller);
                            }
                        });

                }
            }
        });
    })


      ];
      Promise.all(promises)
      .then(() => {
          // Combine the data from both queries if needed
        //   const combinedData = {
        //       updateTokenbuyStatusQuery: updateTokenbuyStatusQuery,
        //       addTokenTransactionQuery: addTokenTransactionQuery,
        //   };

          res.status(200).json({message:'queries executed'});
      })

      .catch((err) => {
          console.error("Error executing queries:", err);
          res.status(500).json(err);
      });

};
module.exports = { verifySingleMarketSale };
