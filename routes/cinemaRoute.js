const express = require('express')
const {getCinemaMovie, postCinemaMovie, getCinemaMovieById, editCinemaMovie, deleteCinemaMovie } = require('../controllers/cinemaController')
const router = express.Router()

const upload = require("../middleware/multer");

router.route("/")
.get(getCinemaMovie)
.post(upload.single("posterUrl"), postCinemaMovie)


router.route("/:id")
.get(getCinemaMovieById)
.put(editCinemaMovie)
.delete(deleteCinemaMovie)


module.exports = router