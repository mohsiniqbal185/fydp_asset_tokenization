const express = require('express');
const router = express.Router();

const {select_property} = require('../../controllers/admin/selectPropertyByAdminController');
const {managePendingTransactions} = require('../../controllers/admin/managePendingTransactionsController');
const {managePendingSingleTransaction} = require('../../controllers/admin/managePendingSingleTransaction');
const {verifySinglePayment} = require('../../controllers/admin/verifyPendingSingleTransaction');
const {TransferTokens} = require('../../controllers/admin/transferTokensByAdminController');
const { verifySingleMarketSale } = require('../../controllers/admin/verifyPendingSingleMarketSale');
const { managePendingSingleMarketSale } = require('../../controllers/admin/managePendingSingleMarketSale');
router.get("/", select_property);
router.get('/transfer_tokens',TransferTokens)

router.get('/:property_id', managePendingTransactions)
router.get('/manage/:req_id', managePendingSingleTransaction)
router.get('/manage/verify/:req_id', verifySinglePayment)
router.post('/manage_sale/verify/:req_id', verifySingleMarketSale)
router.get('/manage_sale/:req_id', managePendingSingleMarketSale)




module.exports =router;