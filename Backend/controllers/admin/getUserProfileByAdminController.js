const { db } = require('../../config/db')

const getUserProfileByAdmin = (req, res) => {
    var userID = req.query.user_id;
    const q = `SELECT * FROM USER WHERE user_id=${userID};`;

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        res.status(200).json(data);
    });

};

module.exports = {getUserProfileByAdmin}