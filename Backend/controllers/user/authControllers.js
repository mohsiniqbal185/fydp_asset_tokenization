const bcrypt = require('bcryptjs');
const bcrypt2 = require('bcrypt');
const nodemailer = require("nodemailer");

const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const mysql = require('mysql');
const { ethers } = require("ethers");
const {db} = require('../../config/db')


const registerUser = (req, res) => {
    //CHECK USER IF EXISTS
    console.log(req.body)
  
    const q = "SELECT * FROM user WHERE email = ?";
  
    db.query(q, [req.body.email], async (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json({error: "User already exists!"});
      //CREATE A NEW USER
      //Hash the password
      const salt = await  bcrypt2.genSalt(10);
      const hashedPassword = await  bcrypt2.hash(req.body.password, salt);

      if (!hashedPassword) {
        // Handle the case where the password is missing or empty
        return res.status(400).json({ error: "Password is required." });
      }
  
      const q =
        "INSERT INTO user (email, fname, lname, user_password, contact, CNIC) VALUE (?)";
  
      const values = [
        req.body.email,
        req.body.fname,
        req.body.lname,
        hashedPassword,
        req.body.contact,
        req.body.CNIC,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        // console.log(data)

        if (!data.insertId) {
          return res.status(500).json({ error: "User registration failed." });
        }
        
        const mnemonic = process.env.MNEMON;
        const masterNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
        const derivedNode = masterNode.derivePath(`m/44'/60'/0'/0/${data.insertId}`);
        const wallet = new ethers.Wallet(derivedNode.privateKey);
        const address = wallet.address;

        const wallet_query = "UPDATE user SET wallet_address = ? WHERE email = ?;";

        db.query(wallet_query,[address, req.body.email], async (err, data) => {
          if (err) return res.status(500).json(err);

          //Proceed to send welcome email to the new user

          const config = {
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "asaanreiturns@gmail.com",
              pass: process.env.EMAIL_PASS
            }
          }

          const sendMail = (messageData) => {
            const transporter = nodemailer.createTransport(config);
            transporter.sendMail(messageData, (err, info) => {
              if (err){
                console.log(err)
              }else{
                return info.response;
              }
            })
          }

          messageData = {
            "from": "asaanreiturns@gmail.com",
            "to": req.body.email,
            "subject": "Welcome to AsaanREITurns.",
            "text": `Hi ${req.body.fname} ${req.body.lname}, \n \nWelcome to AsaanREITurns. We are delighted to have you on board ! \n \nRegards, \nAsaanREITurns Team`
          }

          const sent = sendMail(messageData)

          return res.status(200).json("User has been created.");
        })
      
      });
    });
  };

  //GET
  const login = (req, res) => {
      if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
        // console.log(req.session.user)
      } else {
        res.send({ loggedIn: false });
      }
  }

  //POST 
  const loginUser = (req, res) => {
    const q = "SELECT * FROM user WHERE email = ?";
  
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({error: "User not found!"});
  
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].user_password
      );
  
      if (!checkPassword)
        return res.status(400).json({error:"Wrong password!"});
  
      const { user_password, ...userData } = data[0];
  
      //create a session of this user in the browser and give him the user data
      req.session.user = userData;
      // console.log(req.session.user);
      res.status(200).json(userData);
    });
  };

  const logoutUser = (req, res) => {
    res.clearCookie("accessToken",{
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been logged out.")
  };

module.exports = {registerUser, loginUser, logoutUser, login}