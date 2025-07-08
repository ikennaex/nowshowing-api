const express = require('express')
const router = express.Router()

const upload = require("../middleware/multer");
const { getMovies, postMovie, getMovieById, editMovie, deleteMovie } = require('../controllers/movieController');

router.route("/")
.get(getMovies)
.post(upload.single("posterUrl"), postMovie)

router.route("/:id") 
.get(getMovieById)
.put(editMovie)
.delete(deleteMovie)


module.exports = router