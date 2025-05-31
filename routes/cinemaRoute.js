const express = require('express')
const {getCinemaMovie, postCinemaMovie, getCinemaMovieById } = require('../controllers/cinemaController')
const router = express.Router()

router.route("/")
.get(getCinemaMovie)
.post(postCinemaMovie)


router.route("/:id")
.get(getCinemaMovieById)

module.exports = router