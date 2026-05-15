const express = require('express')
const { authToken } = require('../../../middleware/auth')
const deleteAccount = require('../../../controllers/user/profile/deleteUserController')
const router = express.Router()
    
router.post('/account/delete', authToken, deleteAccount)   
module.exports = router  