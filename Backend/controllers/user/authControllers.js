const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const mysql = require('mysql');
const {db} = require('../../config/db')


const registerUser = (req, res) => {
    //CHECK USER IF EXISTS
  
    const q = "SELECT * FROM user WHERE email = ?";
  
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");
      //CREATE A NEW USER
      //Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  
      const q =
        "INSERT INTO user (email, fname, lname, user_password, contact, user_role, CNIC) VALUE (?)";
  
      const values = [
        req.body.email,
        req.body.fname,
        req.body.lname,
        hashedPassword,
        req.body.contact,
        req.body.user_role,
        req.body.CNIC,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
  };

  const loginUser = (req, res) => {
    const q = "SELECT * FROM user WHERE email = ?";
  
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
  
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].user_password
      );
  
      if (!checkPassword)
        return res.status(400).json("Wrong password!");
  
      const token = jwt.sign({ id: data[0].user_id }, "secretkey");
  
      const { password, ...others } = data[0];
  
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    });
  };

  const logoutUser = (req, res) => {
    res.clearCookie("accessToken",{
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been logged out.")
  };

module.exports = {registerUser, loginUser, logoutUser}