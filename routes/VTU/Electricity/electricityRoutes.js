const express = require('express')
const { getDiscoProviders, verifyMeterNumber, buyElectricity } = require('../../../controllers/VTU/Electricity/electricityController')
const { authToken } = require('../../../middleware/auth')
const verifyPasscode = require('../../../middleware/verifyPasscode')
const router = express.Router()

router.get('/get-disco-providers', authToken, getDiscoProviders )    
router.post('/verify-meter-number', authToken, verifyMeterNumber )    
router.post('/buy-electricity', authToken, verifyPasscode, buyElectricity )    
 
module.exports = router  