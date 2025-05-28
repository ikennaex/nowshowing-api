const express = require('express')
const { handleRegister } = require('../controllers/registerController')
const router = express.Router()

router.route("/")
.post(handleRegister)


module.exports = router