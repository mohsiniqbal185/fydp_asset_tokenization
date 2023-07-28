const express = require('express');
const router = express.Router();

const {select_property} = require('../../controllers/admin/selectPropertyByAdminController');
const {viewtokentransactionsbyAdmin} = require('../../controllers/admin/viewtokentransactionsbyAdminController');

router.get("/", select_property);
router.get('/:property_id', viewtokentransactionsbyAdmin)

module.exports =router;