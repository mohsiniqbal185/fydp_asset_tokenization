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
const getTokenDataFromSmartContract = require('../get_property_token_blockchain');
const getTokenSupplyFromSmartContract = require('../getTotalSupply');
async function getSmartContractData(req, res) {
    const { smartContractAddress } = req.body;
    // abi=JSON.parse(smartContractABI)
    console.log(smartContractAddress);

    // console.log(smartContractABI);

    try {
        const tokenData = await getTokenDataFromSmartContract(smartContractAddress);
        const tokenSupply = await getTokenSupplyFromSmartContract(smartContractAddress);
        console.log(tokenSupply);
        // Modify this part based on the structure of your token data response
        const tokens = tokenData.response; // Array of token objects
        const smartContractAddress1 = tokenData.smart_contract_address
        // Extracting name and symbol values from each token object
        const tokenNames = tokens.map(token => token.name);
        const tokenSymbol = tokens.map(token => token.symbol);


        res.status(200).json({ smart_Contract_Address: smartContractAddress1, tokenName: tokenNames, tokenSymbol: tokenSymbol, totalSupply: tokenSupply });
    } catch (error) {
        console.error('Error fetching token data:', error);
        res.status(500).json({ error: 'An error occurred while fetching token data' });
    }
}
async function insertPropertyByAdmin(req, res) {
    const propertyData = req.body;
    const smartContractAddress = propertyData.smartContractAddress;
    const tokenName = propertyData.tokenName;
    const tokenSupply = propertyData.tokenSupply;
    const tokenShortForm = propertyData.tokenShortForm;
    const value_in_pkr = propertyData.value_in_pkr;
    const size_of_property = propertyData.size_of_property;
    const location = propertyData.location;
    const property_name = propertyData.property_name;
    const token_value = propertyData.token_value;
    const property_code = propertyData.property_code;
    const property_type = propertyData.property_type;

    // ${tokenName},${tokenShortForm},${tokenSupply}
    insertinTokenstablequery = `INSERT INTO tokens(token_name,token_symbol,total_supply) VALUES(?,?,?);`//${property_type},${value_in_pkr},${value_in_pkr},(SELECT MAX(token_id) FROM tokens ),0,${size_of_property},${location},${property_name},${property_code}
    insertinPropertyTablequery  =  'INSERT INTO property(property_type,value_in_pkr,token_id,tokens_sold,size_of_property,location,name,property_code) VALUES(?,?,(SELECT MAX(token_id) FROM tokens ),0,?,?,?,?);'
    insertIntokenvaluetablequery = 'INSERT INTO token_value(token_id,token_value) VALUES ((SELECT MAX(token_id) FROM tokens),?);';
    insertinSmartContractsquery= `INSERT INTO smart_contracts(property_id,contract_address,kyc_contract_address) VALUES((SELECT MAX(property_id) FROM property ),?,"0x605b246eeE74010959B4fD434FFC90b5c3d85C13");`
    const promises = [
        new Promise((resolve, reject) => {
            db.query(insertinTokenstablequery,[tokenName,tokenShortForm,tokenSupply] ,(err, userData) => {
                if (err) reject(err);
                resolve(userData);
            });
        }),
        new Promise((resolve, reject) => {
            db.query(insertinPropertyTablequery, [property_type,value_in_pkr,size_of_property,location,property_name,property_code] ,(err, transactionsData) => {
                if (err) reject(err);
                resolve(transactionsData);
            });
        }),
        new Promise((resolve, reject) => {
            db.query(insertIntokenvaluetablequery, [token_value],(err, PendingTransactionsData) => {
                if (err) reject(err);
                resolve(PendingTransactionsData);
            });
        }),
        new Promise((resolve, reject) => {
            db.query(insertinSmartContractsquery, [smartContractAddress], (err, PendingTransactionsData) => {
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

            res.status(200).json({message:"Property Created !"});
        })
        .catch((err) => {
            console.error("Error executing queries:", err);
            res.status(500).json(err);
        });
}
    
module.exports = { getSmartContractData , insertPropertyByAdmin};
