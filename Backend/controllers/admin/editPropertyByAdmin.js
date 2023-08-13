const { db } = require('../../config/db')

const editPropertyByAdmin = (req, res) => {
    const property_id = req.query.property_id;
    const getPropertyDetailsQuery = `SELECT * FROM property WHERE property_id=${property_id};`;

 db.query(getPropertyDetailsQuery, (err,data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(data)
      });

}
module.exports = {editPropertyByAdmin}