const express = require('express')
const { getDataPlans, getDataNetworks, buyData } = require('../../../controllers/VTU/Data/dataController')
const { authToken } = require('../../../middleware/auth')
const router = express.Router()

router.get('/get-data-networks', authToken, getDataNetworks )  
router.post('/get-data-plans', authToken, getDataPlans )
router.post('/buy-data', authToken, buyData )
module.exports = router  