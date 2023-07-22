const express = require('express');
const router = express.Router();
const {getUserTransactions}= require('../controllers/tokenTransactionsController')

router.get("/", getUserTransactions)
// router.get("/:property_id", getSingleProperty)


module.exports = router;