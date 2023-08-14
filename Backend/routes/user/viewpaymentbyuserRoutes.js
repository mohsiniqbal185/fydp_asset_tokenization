const express = require('express');
const router = express.Router();
const {viewPaymentsByUser}= require('../../controllers/user/viewPaymentsbyuserController')

router.get("/:user_id", viewPaymentsByUser)


module.exports = router;