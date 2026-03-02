const express = require('express')
const { getDiscoProviders, verifyMeterNumber, buyElectricity } = require('../../../controllers/VTU/Electricity/electricityController')
const router = express.Router()

router.get('/get-disco-providers', getDiscoProviders )    
router.post('/verify-meter-number', verifyMeterNumber )    
router.post('/buy-electricity', buyElectricity )    
 
module.exports = router  