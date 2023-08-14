const { db } = require('../../config/db')

const getExistingTokenPrice = (req, res) => {
    const property_id = req.params.property_id;
    const getPropertyDetailsQuery = `SELECT a.token_value from token_value a inner join property b on a.token_id=b.token_id where b.property_id = ? ORDER BY a.token_value DESC LIMIT 1`;

 db.query(getPropertyDetailsQuery,[property_id], (err,data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(data)
      });

}
const SetNewTokenPrice = (req, res) => {
    const property_id = req.params.property_id;
    const token_value =req.body.token_value;
    const getPropertyDetailsQuery = 'INSERT INTO token_value(token_id,token_value) VALUES ((select token_id from property where property_id = ?),?)';

 db.query(getPropertyDetailsQuery, [property_id,token_value],(err,data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({message:"token value updated"})
      });

}
module.exports = {getExistingTokenPrice, SetNewTokenPrice}