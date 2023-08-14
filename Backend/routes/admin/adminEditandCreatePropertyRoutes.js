const express = require('express');
const router = express.Router();
const {editPropertyByAdmin} = require('../../controllers/admin/editPropertyByAdmin');
const {getSmartContractData , insertPropertyByAdmin} = require('../../controllers/admin/createPropertyController')
// = require('../controllers/getUserProfileByAdminController');
router.post("/edit-property", editPropertyByAdmin);
router.post("/create-property", getSmartContractData);
router.post("/insert-property", insertPropertyByAdmin);

module.exports = router;