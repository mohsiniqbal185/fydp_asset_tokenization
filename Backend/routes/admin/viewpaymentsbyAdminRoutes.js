const express = require('express');
const router = express.Router();

const {select_property} = require('../../controllers/admin/selectPropertyByAdminController');
const {viewPaymentsByAdmin} = require('../../controllers/admin/viewpaymentsbyAdminController');

router.get("/", select_property);
router.get('/:property_id', viewPaymentsByAdmin)

module.exports =router;