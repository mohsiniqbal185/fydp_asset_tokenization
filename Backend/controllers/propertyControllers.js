const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const mysql = require('mysql');
const {db} = require('../config/db')

const getProperties = (req, res) => {
    const q = "SELECT * FROM property";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("No properies found");
      res.status(200).json(data)
    });
}

const getSingleProperty = (req, res)=> {

  const property_id = req.params.property_id;

  const q = "SELECT * FROM PROPERTY WHERE PROPERTY_ID = ?"

  db.query(q, [property_id], (err, data) => {

    if (err) return res.status(500).json(err);
    res.status(200).json(data)
  })
}

module.exports = {getProperties, getSingleProperty}