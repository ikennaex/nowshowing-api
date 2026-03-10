const express = require('express')
const { setPasscode } = require('../../controllers/user/passcodeController')
const { authToken } = require('../../middleware/auth')
const verifyPasscode = require('../../middleware/verifyPasscode')
const router = express.Router()

router.post('/set-passcode', authToken, verifyPasscode, setPasscode)


module.exports = router 