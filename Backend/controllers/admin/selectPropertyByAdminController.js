const {db} = require('../../config/db');


const select_property = (req,res) => {
    const q= 'SELECT * FROM property';
    db.query(q,(err,data) => {
        if (err) return res.status(200).json(err);
        res.status(200).json(data);

    })
}
module.exports= {select_property};