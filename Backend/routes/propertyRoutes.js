const express = require('express');
const router = express.Router();
const {getProperties}= require('../controllers/propertyControllers')

router.get("/", getProperties)
// router.post("/register", )
// router.post("/logout", )

module.exports = router;