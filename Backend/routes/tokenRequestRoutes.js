const express = require('express');
const router = express.Router();
const {buyTokenRequest}= require('../controllers/tokenRequestController')

router.post("/buy", buyTokenRequest)
// router.post("/sell", buyTokenRequest)



module.exports = router;