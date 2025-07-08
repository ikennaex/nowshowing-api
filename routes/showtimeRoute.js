const express = require('express')
const router = express.Router()

const { getShowtimes, postShowtime, getShowtimesByCinema, editShowtime, deleteShowtime, getShowtimesByMovie } = require('../controllers/showtimeController');

router.route("/")
.get(getShowtimes)
.post(postShowtime)

router.route("/:id") 
.get(getShowtimesByMovie)
.put(editShowtime)
.delete(deleteShowtime)


module.exports = router