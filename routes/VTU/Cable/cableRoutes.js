const express = require('express')
const { getCableProviders, getCablePlans, verifyIuc, buyCableSubscription } = require('../../../controllers/VTU/Cable/cableController')
const router = express.Router()

router.get('/get-cable-providers', getCableProviders )    
router.get('/get-cable-plans', getCablePlans )   
router.post('/verify-iuc', verifyIuc )   
router.post('/buy-cable-subscription', buyCableSubscription )   

module.exports = router  