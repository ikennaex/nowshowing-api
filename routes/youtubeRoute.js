const express = require('express')
const { getYoutubeMovie, postYoutubeMovie } = require('../controllers/youtubeController')
const router = express.Router()

router.route("/")
.get(getYoutubeMovie)
.post(postYoutubeMovie)

module.exports = router