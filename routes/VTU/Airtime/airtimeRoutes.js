const express = require('express')
const { buyAirtime, getAvailableNetworks } = require('../../../controllers/VTU/Airtime/airtimeController')
const { authToken } = require('../../../middleware/auth')
const verifyPasscode = require('../../../middleware/verifyPasscode')
const router = express.Router()

router.get('/get-available-networks', authToken, getAvailableNetworks )   
router.post('/buy-airtime', authToken, verifyPasscode, buyAirtime)   
module.exports = router  