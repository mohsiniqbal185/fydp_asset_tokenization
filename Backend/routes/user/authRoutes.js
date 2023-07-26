const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser} = require('../../controllers/user/authControllers')

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/logout", logoutUser)

module.exports = router;