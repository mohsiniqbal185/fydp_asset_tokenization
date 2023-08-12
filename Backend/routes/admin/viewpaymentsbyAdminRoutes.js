const express = require('express');
const router = express.Router();

const {select_property} = require('../../controllers/admin/selectPropertyByAdminController');
const {viewPaymentsByAdmin} = require('../../controllers/admin/viewpaymentsbyAdminController');
const {ViewSinglePayment} = require('../../controllers/admin/viewSingleCompletedPaymentController')

router.get("/", select_property);
router.get('/:property_id', viewPaymentsByAdmin)
router.get('/:property_id/:payment_id/',ViewSinglePayment)


module.exports =router;