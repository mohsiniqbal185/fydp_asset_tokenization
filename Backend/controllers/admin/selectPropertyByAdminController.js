const {db} = require('../../config/db');


const select_property = (req,res) => {
    const q= `SELECT * from property a inner join token_value b on a.token_id = b.token_id where token_value_id = (select MAX(token_value_id) From token_value where token_id=a.token_id);
    `;
    db.query(q,(err,data) => {
        if (err) return res.status(200).json(err);
        res.status(200).json(data);

    })
}
module.exports= {select_property};