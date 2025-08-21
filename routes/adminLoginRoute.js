const express = require('express')
const { loginAdmin, getAdminProfile } = require('../controllers/adminLoginController')
const verifyAdmin = require('../middleware/auth')
const router = express.Router()

router.post('/', loginAdmin)
router.get('/profile', verifyAdmin, getAdminProfile)

module.exports = router 