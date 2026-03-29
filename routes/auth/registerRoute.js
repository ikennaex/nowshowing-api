const express = require('express')
const { handleRegister } = require('../../controllers/auth/registerController')
const router = express.Router()

router.post("/register", handleRegister)


module.exports = router