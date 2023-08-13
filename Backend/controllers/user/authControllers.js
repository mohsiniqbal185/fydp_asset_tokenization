const bcrypt = require('bcryptjs');
const bcrypt2 = require('bcrypt');
const nodemailer = require("nodemailer");

const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const mysql = require('mysql');
const { ethers } = require("ethers");
const {db} = require('../../config/db')

const kyc_verify = require('../kyc_verify');

const registerUser = async (req, res) => {
  // CHECK IF USER EXISTS
  console.log(req.body);

  const checkUserQuery = "SELECT * FROM user WHERE email = ?";
  
  db.query(checkUserQuery, [req.body.email], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json({ error: "User already exists!" });

    // HASH THE PASSWORD
    try {
      const salt = await bcrypt2.genSalt(10);
      const hashedPassword = await bcrypt2.hash(req.body.password, salt);

      if (!hashedPassword) {
        return res.status(400).json({ error: "Password is required." });
      }

      // CREATE A NEW USER
      const insertUserQuery =
        "INSERT INTO user (email, fname, lname, user_password, contact, CNIC) VALUES (?, ?, ?, ?, ?, ?)";
  
      const userValues = [
        req.body.email,
        req.body.fname,
        req.body.lname,
        hashedPassword,
        req.body.contact,
        req.body.CNIC,
      ];
  
      db.query(insertUserQuery, userValues, async (err, userData) => {
        if (err) return res.status(500).json(err);
        
        if (!userData.insertId) {
          return res.status(500).json({ error: "User registration failed." });
        }
        
        const mnemonic = process.env.MNEMON;
        const masterNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
        const derivedNode = masterNode.derivePath(`m/44'/60'/0'/0/${userData.insertId}`);
        const wallet = new ethers.Wallet(derivedNode.privateKey);
        const address = wallet.address;

        try {
          // KYC VERIFICATION
          const verifiedKyc = await kyc_verify(address);

          if (!verifiedKyc) {
            return res.status(403).json({ error: "KYC verification failed." });
          }

          // UPDATE WALLET ADDRESS AND SEND WELCOME EMAIL
          const updateWalletQuery = "UPDATE user SET wallet_address = ? WHERE email = ?";

          db.query(updateWalletQuery, [address, req.body.email], async (err, walletData) => {
            if (err) return res.status(500).json(err);

            // SEND WELCOME EMAIL
            const messageData = {
              from: "asaanreiturns@gmail.com",
              to: req.body.email,
              subject: "Welcome to AsaanREITurns.",
              text: `Hi ${req.body.fname} ${req.body.lname}, \n \nWelcome to AsaanREITurns. We are delighted to have you on board! \n \nRegards, \nAsaanREITurns Team`
            };

            const transporter = nodemailer.createTransport({
              service: "gmail",
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              auth: {
                user: "asaanreiturns@gmail.com",
                pass: process.env.EMAIL_PASS,
              },
            });

            transporter.sendMail(messageData, (err, info) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ error: "Error sending welcome email." });
              } else {
                console.log("Welcome email sent:", info.response);
                return res.status(200).json("User has been created.");
              }
            });
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error: "Error verifying KYC." });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error hashing password." });
    }
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