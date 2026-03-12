const express = require('express')
const { setPasscode, forgotPasscode, resetPasscode, verifyOtp } = require('../../controllers/user/passcodeController')
const { authToken } = require('../../middleware/auth')
const router = express.Router()

router.post('/set-passcode', authToken, setPasscode)
router.post('/verify-pin-otp', authToken, verifyOtp)
router.post('/forgot-passcode', authToken, forgotPasscode)
router.post('/reset-passcode', authToken, resetPasscode)


module.exports = router 