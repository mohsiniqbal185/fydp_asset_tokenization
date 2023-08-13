const express = require('express');
const router = express.Router();
const {buyTokenRequest, getPendingRequestsOfUser,DeletePendingRequestsOfUser, getDataForCreatePayment}= require('../../controllers/user/tokenRequestController')

router.post("/buy", buyTokenRequest)
router.get("/pending/:user_id", getPendingRequestsOfUser)
router.get("/pending/delete_buy_request/:request_id", DeletePendingRequestsOfUser)
// router.get('/pending/get_data_for_create_payment/:req_id', getDataForCreatePayment )
module.exports = router;