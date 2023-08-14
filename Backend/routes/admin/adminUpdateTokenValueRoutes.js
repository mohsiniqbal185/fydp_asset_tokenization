const express = require('express');
const router = express.Router();
const {getExistingTokenPrice,SetNewTokenPrice} = require('../../controllers/admin/updateTokenPrice');
// const {getUsersByAdmin} = require('../../controllers/admin/adminGetUsersController');
// const {getUserProfileByAdmin} = require('../../controllers/admin/getUserProfileByAdminController');
// = require('../controllers/getUserProfileByAdminController');
router.get("/:property_id", getExistingTokenPrice);
router.post("/update/:property_id", SetNewTokenPrice);

module.exports = router;
