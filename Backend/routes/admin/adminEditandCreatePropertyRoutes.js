const express = require('express');
const router = express.Router();
const {editPropertyByAdmin} = require('../../controllers/admin/editPropertyByAdmin');
// = require('../controllers/getUserProfileByAdminController');
router.get("/edit-property", editPropertyByAdmin);

module.exports = router;