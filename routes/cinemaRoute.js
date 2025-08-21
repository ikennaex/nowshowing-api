const express = require('express')
const {getCinemaMovie, postCinemaMovie, getCinemaMovieById, editCinemaMovie, deleteCinemaMovie } = require('../controllers/cinemaController')
const router = express.Router()

const upload = require("../middleware/multer");
const verifyAdmin = require('../middleware/auth');

router.route("/")
.get(getCinemaMovie)
.post(verifyAdmin, upload.single("posterUrl"), postCinemaMovie)


router.route("/:id")
.get(getCinemaMovieById)
.put(verifyAdmin, editCinemaMovie)
.delete(verifyAdmin, deleteCinemaMovie)


module.exports = router