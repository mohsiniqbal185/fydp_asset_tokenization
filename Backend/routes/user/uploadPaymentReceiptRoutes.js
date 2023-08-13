const express = require('express');
const router = express.Router();
const {uploadPaymentReceiptInPaymentTable, getDataForCreatePayment, getDataForSinglePaymentReceipt}= require('../../controllers/user/uploadPaymentReceiptController')

router.post("/", uploadPaymentReceiptInPaymentTable)
router.get('/get_data_for_create_payment/:req_id', getDataForCreatePayment)
router.get("/get_data_for_single_payment_receipt/:req_id", getDataForSinglePaymentReceipt)

module.exports = router;