const express = require('express')
const { getYoutubeMovie, postYoutubeMovie, getYoutubeMovieById } = require('../controllers/youtubeController')
const router = express.Router()

router.route("/")
.get(getYoutubeMovie)
.post(postYoutubeMovie)

router.route("/:id")
.get(getYoutubeMovieById)

module.exports = router