const express = require('express')
const { getDashboard } = require('../../controllers/admin/dashboardController')
const { verifyAdmin } = require('../../middleware/auth')
const router = express.Router()

router.get('/dashboard', verifyAdmin, getDashboard)

module.exports = router