const express = require('express')
const { getDataPlans, getDataNetworks, buyData } = require('../../../controllers/VTU/Data/dataController')
const router = express.Router()

router.get('/get-data-networks', getDataNetworks )  
router.post('/get-data-plans', getDataPlans )
router.post('/buy-data', buyData )
module.exports = router  