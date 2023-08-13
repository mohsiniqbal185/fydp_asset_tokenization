const express = require('express');
const router = express.Router();
const {uploadPaymentReceiptInPaymentTable}= require('../../controllers/user/uploadPaymentReceiptController')

router.post("/", uploadPaymentReceiptInPaymentTable)

module.exports = router;