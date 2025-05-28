const express = require('express')
const { getCinemaLocation } = require('../controllers/cinemaLocationsController')

const router = express.Router()

router.route("/")
.get(getCinemaLocation)

module.exports = router