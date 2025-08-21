const express = require('express')
const { getYoutubeMovie, postYoutubeMovie, getYoutubeMovieById, editYoutubeMovie, deleteYoutubeMovie } = require('../controllers/youtubeController')
const router = express.Router()

const upload = require("../middleware/multer");
const verifyAdmin = require('../middleware/auth');

router.route("/")
.get(getYoutubeMovie)
.post(verifyAdmin, upload.single("posterUrl"), postYoutubeMovie)

router.route("/:id")
.get(getYoutubeMovieById)
.put(verifyAdmin, editYoutubeMovie)
.delete(verifyAdmin, deleteYoutubeMovie)

module.exports = router