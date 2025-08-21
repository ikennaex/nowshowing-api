const express = require('express')
const router = express.Router()

const { getShowtimes, postShowtime, getShowtimesByCinema, editShowtime, deleteShowtime, getShowtimesByMovie } = require('../controllers/showtimeController');
const verifyAdmin = require('../middleware/auth');

router.route("/")
.get(getShowtimes)
.post(verifyAdmin, postShowtime)

router.route("/:id") 
.get(getShowtimesByMovie)
.put(verifyAdmin, editShowtime)
.delete(verifyAdmin, deleteShowtime)


module.exports = router