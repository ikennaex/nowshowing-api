const express = require('express')
const { getStreamingMovie, postStreamingMovie, getStreamingMovieById } = require('../controllers/streamingController')

const router = express.Router()

router.route("/")
.get(getStreamingMovie)
.post(postStreamingMovie)

router.route("/:id")
.get(getStreamingMovieById)

module.exports = router