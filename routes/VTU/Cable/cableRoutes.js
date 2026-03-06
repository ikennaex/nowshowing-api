const express = require('express')
const { getCableProviders, getCablePlans, verifyIuc, buyCableSubscription } = require('../../../controllers/VTU/Cable/cableController')
const { authToken } = require('../../../middleware/auth')
const router = express.Router()

router.get('/get-cable-providers', authToken, getCableProviders )    
router.post('/get-cable-plans', authToken, getCablePlans )   
router.post('/verify-iuc', authToken, verifyIuc )   
router.post('/buy-cable-subscription', authToken, buyCableSubscription )   

module.exports = router  