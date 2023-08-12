const express = require('express');
const router = express.Router();

const {getActiveInvestments} = require('../../controllers/user/portfolioController')

router.get("/:user_id", getActiveInvestments)

module.exports = router;