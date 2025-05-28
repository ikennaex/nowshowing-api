const express = require('express')
const {getCinemaMovie, postCinemaMovie } = require('../controllers/cinemaController')
const router = express.Router()

router.route("/")
.get(getCinemaMovie)
.post(postCinemaMovie)

module.exports = router