const express = require('express')
const router = express.Router()

const upload = require("../middleware/multer");
const { getMovies, postMovie, getMovieById, editMovie, deleteMovie } = require('../controllers/movieController');
const verifyAdmin = require('../middleware/auth');

router.route("/")
.get(getMovies)
.post(verifyAdmin, upload.single("posterUrl"), postMovie)

router.route("/:id") 
.get(getMovieById)
.put(verifyAdmin, editMovie)
.delete(verifyAdmin, deleteMovie)


module.exports = router