const express = require('express')
const { handleLogin } = require('../controllers/loginController')
const router = express.Router()

router.route("/")
.get(handleLogin)

module.exports = router