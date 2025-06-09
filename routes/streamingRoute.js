const express = require('express')
const { getStreamingMovie, postStreamingMovie, getStreamingMovieById } = require('../controllers/streamingController')

const router = express.Router()

// middleware
const upload = require("../middleware/multer");

router.route("/")
.get(getStreamingMovie)
.post(upload.single("posterUrl"), postStreamingMovie)

router.route("/:id")
.get(getStreamingMovieById)

module.exports = router