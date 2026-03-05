const express = require('express')
const { createVirtualAccount } = require('../../controllers/wallet/virtualAccountsController')
const router = express.Router()

router.post('/create-virtual-account', createVirtualAccount )   

module.exports = router  