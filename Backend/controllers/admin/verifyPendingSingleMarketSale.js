const { db } = require('../../config/db');

const verifySingleMarketSale = (req, res) => {
    const reqID = req.params.req_id;
    const verifySinglePendingTransactionQuery = `UPDATE token_market_sale
    SET sold=1
    WHERE req_id=${reqID};`;
    db.query(verifySinglePendingTransactionQuery, (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(`Request ID ${reqID} Verified`)
      });

};
module.exports ={verifySingleMarketSale};
