const express = require('express');
const router = express.Router();
const {getUserTransactions, getUserTransactionsInPastMonths}= require('../../controllers/user/tokenTransactionsController')

router.get("/single-user/:user_id", getUserTransactions)
router.get("/single-user/past/:user_id", getUserTransactionsInPastMonths)

// router.get("/:property_id", getSingleProperty)


module.exports = router;