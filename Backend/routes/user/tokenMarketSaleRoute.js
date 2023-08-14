const express = require('express');
const router = express.Router();
const { requestMarketSale, getMarketSaleRequestsOfUser,getAllPendingMarketSaleRequests, DeletePendingMarketSaleRequestsOfUser, pledgePendingMarketSaleTokens, uploadPaymentReceiptForMarketSale, getMarketSalePaymentDataForSingleReceipt } = require('../../controllers/user/tokenMarketSaleController')

router.post("/", requestMarketSale)
router.get("/list/:user_id", getMarketSaleRequestsOfUser)
router.get("/list", getAllPendingMarketSaleRequests)
router.get("/delete_market_sale/:request_id", DeletePendingMarketSaleRequestsOfUser)
router.post("/pledge/:request_id/:user_id", pledgePendingMarketSaleTokens)
router.post("/upload_payment", uploadPaymentReceiptForMarketSale)
router.get("/get_payment_receipt/:request_id", getMarketSalePaymentDataForSingleReceipt)
module.exports = router;