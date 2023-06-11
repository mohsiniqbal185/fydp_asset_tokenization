const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const mysql = require('mysql');
const {connection} = require('../config/db')


// @desc Register a new user in db
// @routes POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    const {fname, lname, email, user_password, contact, user_role, CNIC} = req.body;

    if(!email || !user_password){
        res.status(400);
        throw new Error("Please fill all the fields")
    }

    // check if user exists

    const query = `SELECT * FROM user WHERE email = '${email}'`;
    connection.query(query, function (error, results, fields) {
    if (error) {
        console.error('Error executing the query:', error);
        // Handle the error appropriately
        return;
    }

    if (results.length > 0) {
        res.status(400);
        throw new Error('User already exists')
        // console.log('User exists!');
        // User exists, do something
    } else {
        console.log('User does not exist!');
        // User does not exist, handle accordingly
    }
    });


    //hash password

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user_password, salt)

    // create user
    connection.query(`INSERT INTO user (email, fname, lname, user_password, contact, user_role, CNIC, wallet_address) 
    VALUES ('${email}', '${fname}', '${lname}', '${hashPassword}', '${contact}', '${user_role}', '${CNIC}', '0x746376428734')`, function (error, results, fields) {
        if (error) {
          console.error('Error executing the query:', error);
          // Handle the error appropriately
          return;
        }
      
        console.log('New user created successfully!');

        if(results.insertId){
            res.status(200).json({
                user_id: results.insertId,
                email: email,
                cnic: CNIC
            })
        }
        
      });


    
})

module.exports = {registerUser}