const express = require('express');
const router = express.Router();
const {getTotalUsersCount, getTotalTransactionsCount, getTotalPendingTransactionsCount, getRecentTransactions}= require('../../controllers/admin/showStatsController')

router.get("/users-count", getTotalUsersCount)
router.get("/transactions-count", getTotalTransactionsCount)
router.get("/pending-transactions-count", getTotalPendingTransactionsCount)
router.get("/recent-transactions", getRecentTransactions)
// router.get("/:property_id", getSingleProperty)


module.exports = router;