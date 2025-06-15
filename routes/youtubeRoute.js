const express = require('express')
const { getYoutubeMovie, postYoutubeMovie, getYoutubeMovieById, editYoutubeMovie } = require('../controllers/youtubeController')
const router = express.Router()

const upload = require("../middleware/multer");

router.route("/")
.get(getYoutubeMovie)
.post(upload.single("posterUrl"), postYoutubeMovie)

router.route("/:id")
.get(getYoutubeMovieById)
.put(editYoutubeMovie)

module.exports = router