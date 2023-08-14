const express = require('express');
const router = express.Router();
const { requestMarketSale, getMarketSaleRequestsOfUser,getAllPendingMarketSaleRequests, DeletePendingMarketSaleRequestsOfUser } = require('../../controllers/user/tokenMarketSaleController')

router.post("/", requestMarketSale)
router.get("/list/:user_id", getMarketSaleRequestsOfUser)
router.get("/list", getAllPendingMarketSaleRequests)
router.get("/delete_market_sale/:request_id", DeletePendingMarketSaleRequestsOfUser)
module.exports = router;