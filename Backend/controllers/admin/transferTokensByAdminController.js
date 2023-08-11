const { db } = require('../../config/db');

// const transferTokens = require('../transfer_tokens');

// const TransferTokens=(req,res)=> {

//     const value = 5;
//     const contractAddress = "0x0073CD1A0312758473ab56488946cCFc82EA89A9";
//     const toAddress = "0x0FBa45095d72152dbeeF6017d21b1866D3b4c99B";  
//     // Call the transferTokens function
//     transferTokens(contractAddress, value, toAddress);

//     // Execute other queries and code...
//   }

//   // Call your controller function
//   module.exports = {TransferTokens};
const transferTokens = require('../transfer_tokens');
async function TransferTokens(req,res) {
    property_id =Number (req.query.property_id);
    no_of_tokens = Number (req.query.no_of_tokens);
    user_wallet_address = req.query.user_wallet_address;
    property_contract_address = req.query.property_contract_address;
    pledger_id = Number (req.query.pledger_id);
    payment_id = Number (req.query.payment_id);
    req_id = Number (req.query.req_id);
    tokens_sold =Number  (req.query.tokens_sold);
    // Replace these variables with your actual values
    const contractAddress = '0x0073CD1A0312758473ab56488946cCFc82EA89A9';
    const privateKey = "503259ad1995c4d6c1ff137b9cf9458d8ae431c53bd3b517e4b918d6546a6da5";
    const infuraApiKey = "871a013c7c6847ab848c305add3fa472";
    const toAddress = "0x0FBa45095d72152dbeeF6017d21b1866D3b4c99B";
    const value = 5;
    // try {
        transaction_hash =await transferTokens(property_contract_address, privateKey, infuraApiKey, user_wallet_address, no_of_tokens);
        console.log('done',transaction_hash);
        updatedtokenssold= tokens_sold + no_of_tokens;
        getaddTokenTransactionQuery='INSERT INTO token_transactions(property_id,sender_id,receiver_id,no_of_tokens,transaction_hash,payment_id) VALUES (?,?,?,?,?,?)';
        getupdateTokenbuyStatusQuery = 'UPDATE token_buy_request SET status=1 where req_id=?;';
        getupdateTokensSoldQuery = 'UPDATE property SET  tokens_sold=? where property_id=?;';
        // data = await db.query(getaddTokenTransactionQuery, [property_id, 3,pledger_id, no_of_tokens, transaction_hash, payment_id]);
        // console.log(data);
        // await db.query(getupdateTokenbuyStatusQuery, [req_id]);
        // // await db.query(updateTokensSoldQuery, [updatedtokenssold, property_id]);
      
        // // Commit the transaction
        // await db.commit();
        const promises = [
            new Promise((resolve, reject) => {
                db.query(getaddTokenTransactionQuery,[property_id,3, pledger_id, no_of_tokens, transaction_hash, payment_id], (err, addTokenTransactionQuery) => {
                    if (err) reject(err);
                    resolve(addTokenTransactionQuery);
                });
            }),
            new Promise((resolve, reject) => {
                db.query(getupdateTokenbuyStatusQuery, [req_id],(err, updateTokenbuyStatusQuery) => {
                    if (err) reject(err);
                    resolve(updateTokenbuyStatusQuery);
                });
            }),
            new Promise((resolve, reject) => {
              db.query(getupdateTokensSoldQuery, [updatedtokenssold,property_id],(err, updateTokensSoldQuery) => {
                  if (err) reject(err);
                  resolve(updateTokensSoldQuery);
              });
          }),
     
        ];
        Promise.all(promises)
        .then(([addTokenTransactionQuery],updateTokenbuyStatusQuery) => {
            // Combine the data from both queries if needed
            const combinedData = {
                updateTokenbuyStatusQuery: updateTokenbuyStatusQuery,
                addTokenTransactionQuery: addTokenTransactionQuery,
            };

            res.status(200).json({message:'queries executed'});
        })
        
        .catch((err) => {
            console.error("Error executing queries:", err);
            res.status(500).json(err);
        });

      //   // Send a successful response
      //   res.status(200).json({ message: 'Tokens transferred and queries executed successfully' });
      // } catch (error) {
      //   // If an error occurs, rollback the transaction
      //   await db.query('ROLLBACK');
      
      //   // Handle the error and send an error response
      //   res.status(500).json({ error: 'An error occurred while processing the transaction' });
      // }
        
        // res.status(200).json(transaction_hash)
        // } catch (error) {
        //   // Return an error response
        //   return {
        //     success: false,
        //     message: "Error transferring tokens: " + error.message
        //   };
        // }
}
module.exports = { TransferTokens };




