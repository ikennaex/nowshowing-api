const express = require('express')
const { registerAdmin } = require('../../controllers/admin/adminRegisterController')
const router = express.Router()

router.post('/', registerAdmin)

module.exports = router