const express = require('express');
const router = express.Router();
const {getUsersByAdmin} = require('../../controllers/admin/adminGetUsersController');
const {getUserProfileByAdmin} = require('../../controllers/admin/getUserProfileByAdminController');
// = require('../controllers/getUserProfileByAdminController');
router.get("/", getUsersByAdmin);
router.get("/profile", getUserProfileByAdmin);

module.exports = router;
