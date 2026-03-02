const express = require('express')
const { buyAirtime, getAvailableNetworks } = require('../../../controllers/VTU/Airtime/airtimeController')
const router = express.Router()

router.get('/get-available-networks', getAvailableNetworks )   
router.post('/buy-airtime', buyAirtime)   
module.exports = router  