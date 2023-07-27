const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, login} = require('../../controllers/user/authControllers')

router.post("/login", loginUser)
router.get("/login", login)
router.post("/register", registerUser)
router.post("/logout", logoutUser)

module.exports = router;