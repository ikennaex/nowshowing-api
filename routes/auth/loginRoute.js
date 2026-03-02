const express = require('express')
const { handleLogin } = require('../../controllers/auth/loginController')
const router = express.Router()

router.route("/login")
.post(handleLogin) 

module.exports = router