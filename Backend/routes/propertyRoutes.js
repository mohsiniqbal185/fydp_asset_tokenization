const express = require('express');
const router = express.Router();
const {getProperties, getSingleProperty}= require('../controllers/propertyControllers')

router.get("/", getProperties)
router.get("/:property_id", getSingleProperty)


module.exports = router;