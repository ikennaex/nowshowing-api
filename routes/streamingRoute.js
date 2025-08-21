const express = require('express')
const { getStreamingMovie, postStreamingMovie, getStreamingMovieById, editStreamingMovie, deleteStreamingMovie } = require('../controllers/streamingController')

const router = express.Router()

// middleware
const upload = require("../middleware/multer");
const verifyAdmin = require('../middleware/auth');

router.route("/")
.get(getStreamingMovie)
.post(verifyAdmin, upload.single("posterUrl"), postStreamingMovie)

router.route("/:id")
.get(getStreamingMovieById)
.put(verifyAdmin, editStreamingMovie)
.delete(verifyAdmin, deleteStreamingMovie)



module.exports = router