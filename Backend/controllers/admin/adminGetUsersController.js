const {db} = require('../../config/db')

// const getUsersByAdmin = (req,res) => {
//     // var userData = 'user data';
//     const q = `SELECT user_id,CONCAT(fname,' ',lname) AS User , email FROM USER;`;
  
//     db.query(q, (err, data) => {
//       if (err) return res.status(500).json(err);
//       res.status(200).json(data)
//     });
//     // res.status(200).json({ message: "Hello World4!" });
// }
const getUsersByAdmin = (req, res) => {
    const userId = req.body.userId
    const q = `SELECT user_id,CONCAT(fname,' ',lname) AS User , email FROM USER;`;
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(data)
      });
}
module.exports = {getUsersByAdmin}