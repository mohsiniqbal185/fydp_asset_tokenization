const express = require('express');
const router = express.Router();

const {getActiveInvestments,getDatatoSellInvestments} = require('../../controllers/user/portfolioController')

router.get("/:user_id", getActiveInvestments)
router.get('/get-data-to-sell/:property_id',getDatatoSellInvestments)

module.exports = router;