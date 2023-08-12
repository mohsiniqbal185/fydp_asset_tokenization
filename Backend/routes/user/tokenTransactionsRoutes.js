const express = require('express');
const router = express.Router();
const {getUserTransactions, getUserTransactionsInPastMonths, getRecentTransactions}= require('../../controllers/user/tokenTransactionsController')

router.get("/recent-transactions", getRecentTransactions)
router.get("/single-user/:user_id", getUserTransactions)
router.get("/single-user/past/:user_id", getUserTransactionsInPastMonths)

// router.get("/:property_id", getSingleProperty)


module.exports = router;