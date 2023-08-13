const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const mysql = require('mysql');
const {db} = require('../../config/db')

const getProperties = (req, res) => {
    const q = "SELECT * from property a inner join token_value b on a.token_id = b.token_id where token_value_id = (select MAX(token_value_id) From token_value where token_id=a.token_id);";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("No properies found");
      res.status(200).json(data)
    });
}

const getSingleProperty = (req, res)=> {

  const property_id = req.params.property_id;

  const q = `
  SELECT 
  p.token_id,
  p.property_id,
  p.name AS property_name,
  p.image,
  p.tokens_sold,
  p.location,
  t.total_supply,
  tv.token_value AS token_price,
  t.total_supply - p.tokens_sold AS tokens_left


FROM 
  property p
  INNER JOIN 
    tokens t ON p.token_id = t.token_id
  INNER JOIN  
    token_value tv ON t.token_id = tv.token_id

WHERE
  p.property_id = ? and tv.token_value_id = (select MAX(token_value_id) From token_value where token_id=p.token_id);
  `;

  db.query(q, [property_id], (err, data) => {

    if (err) return res.status(500).json(err);
    res.status(200).json(data)
  })
}

module.exports = {getProperties, getSingleProperty}