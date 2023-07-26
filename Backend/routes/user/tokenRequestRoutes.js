const express = require('express');
const router = express.Router();
const {buyTokenRequest, getPendingRequestsOfUser}= require('../../controllers/user/tokenRequestController')

router.post("/buy", buyTokenRequest)
router.get("/pending/:user_id", getPendingRequestsOfUser)



module.exports = router;