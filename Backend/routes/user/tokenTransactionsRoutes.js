const express = require('express');
const router = express.Router();
const {getUserTransactions, getAllTransactions}= require('../../controllers/user/tokenTransactionsController')

router.get("/single-user/:user_id", getUserTransactions)

// router.get("/:property_id", getSingleProperty)


module.exports = router;