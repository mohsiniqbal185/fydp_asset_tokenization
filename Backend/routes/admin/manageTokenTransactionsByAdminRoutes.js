const express = require('express');
const router = express.Router();

const {select_property} = require('../../controllers/admin/selectPropertyByAdminController');
const {managePendingTransactions} = require('../../controllers/admin/managePendingTransactionsController');
const {managePendingSingleTransaction} = require('../../controllers/admin/managePendingSingleTransaction');
const {verifySinglePayment} = require('../../controllers/admin/verifyPendingSingleTransaction');
router.get("/", select_property);
router.get('/:property_id', managePendingTransactions)
router.get('/manage/:req_id', managePendingSingleTransaction)
router.get('/manage/verify/:req_id', verifySinglePayment)




module.exports =router;